import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { OortCloud } from './OortCloud';
import { PLANETS } from '../constants';
import { SolarSystemState } from '../types';

interface SceneProps extends SolarSystemState {
  onPlanetSelect: (name: string) => void;
}

const SceneContent: React.FC<SceneProps> = ({ 
    timeSpeed, 
    showOrbits, 
    onPlanetSelect,
    selectedPlanet
}) => {
    const controlsRef = useRef<any>(null);
    // Store refs to planet meshes to track their world positions
    const planetRefs = useRef<{[key: string]: THREE.Mesh}>({});
    
    // Helper to keep camera relative offset when following
    const [isTransitioning, setIsTransitioning] = useState(false);
    const lastSelectedPlanet = useRef<string | null>(null);

    // Callback for children to register themselves
    const setPlanetRef = (name: string, mesh: THREE.Mesh | null) => {
        if (mesh) {
            planetRefs.current[name] = mesh;
        } else {
            delete planetRefs.current[name];
        }
    };

    useFrame((state, delta) => {
        const controls = controlsRef.current;
        if (!controls) return;

        const targetVec = new THREE.Vector3();

        if (selectedPlanet && planetRefs.current[selectedPlanet]) {
            // 1. Get current world position of the planet
            planetRefs.current[selectedPlanet].getWorldPosition(targetVec);
            
            // 2. Smoothly move the controls target (the point we rotate around) to the planet
            controls.target.lerp(targetVec, 0.1);

            // 3. Handle Zoom-in transition
            if (selectedPlanet !== lastSelectedPlanet.current) {
                lastSelectedPlanet.current = selectedPlanet;
                setIsTransitioning(true);
            }

            if (isTransitioning) {
                // Determine ideal distance based on planet radius (e.g., 5x radius)
                const planetData = PLANETS.find(p => p.name === selectedPlanet);
                const minDistance = planetData ? planetData.radius * 6 : 20;

                // Calculate current distance from camera to target
                const currentDist = state.camera.position.distanceTo(targetVec);

                // If we are too far, zoom in. If we are close, stop "forcing" the zoom so user can rotate
                if (currentDist > minDistance + 1) {
                    // Move camera towards planet, maintaining direction
                    const direction = new THREE.Vector3().subVectors(state.camera.position, targetVec).normalize();
                    const newPos = targetVec.clone().add(direction.multiplyScalar(minDistance));
                    state.camera.position.lerp(newPos, 0.05);
                } else {
                    setIsTransitioning(false); // Arrived close enough
                }
            }

        } else {
            // Reset to Sun center if nothing selected
            if (lastSelectedPlanet.current !== null) {
                lastSelectedPlanet.current = null;
            }
            controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        }

        controls.update();
    });

    return (
        <>
             {/* Background */}
            <color attach="background" args={['#000005']} />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Controls */}
            <OrbitControls 
                ref={controlsRef}
                minDistance={5} 
                maxDistance={500} 
                enablePan={true}
                enableZoom={true}
            />

            {/* System Contents */}
            <Sun />
            
            {PLANETS.map((planet) => (
                <Planet 
                    key={planet.name}
                    data={planet}
                    timeSpeed={timeSpeed}
                    showOrbit={showOrbits}
                    onSelect={onPlanetSelect}
                    setRef={setPlanetRef}
                />
            ))}

            <OortCloud />
        </>
    );
}

export const SolarSystemScene: React.FC<SceneProps> = (props) => {
  return (
    <Canvas camera={{ position: [0, 60, 150], fov: 45 }}>
      <SceneContent {...props} />
    </Canvas>
  );
};