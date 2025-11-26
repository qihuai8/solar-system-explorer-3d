import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import { Mesh, DoubleSide, MathUtils, Group } from 'three';
import { PlanetData, MoonData } from '../types';
import { TextureErrorBoundary } from './TextureErrorBoundary';

interface PlanetProps {
  data: PlanetData;
  timeSpeed: number;
  showOrbit: boolean;
  onSelect: (name: string) => void;
  setRef?: (name: string, object: Mesh | null) => void;
}

// Sub-component to handle texture loading
const PlanetSurface: React.FC<{ data: PlanetData, hovered: boolean }> = ({ data, hovered }) => {
    const texture = useTexture(data.textureUrl);
    
    return (
        <meshStandardMaterial 
            map={texture}
            color={hovered ? '#ffffff' : '#eeeeee'} // Slight highlight on hover
            roughness={0.8}
            metalness={0.1}
        />
    );
};

// Sub-component for Moon Surface
const MoonSurface: React.FC<{ data: MoonData }> = ({ data }) => {
    // This component is only rendered if data.textureUrl exists
    const texture = useTexture(data.textureUrl!);
    return <meshStandardMaterial map={texture} />;
};

export const Planet: React.FC<PlanetProps> = ({ data, timeSpeed, showOrbit, onSelect, setRef }) => {
  const meshRef = useRef<Mesh>(null);
  const orbitGroupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  // Random initial start angle (Mean Anomaly)
  const [startAngle] = useState(() => Math.random() * Math.PI * 2);

  // Register ref with parent for camera tracking
  useEffect(() => {
    if (setRef && meshRef.current) {
        setRef(data.name, meshRef.current);
    }
    return () => {
        if (setRef) setRef(data.name, null);
    };
  }, [setRef, data.name]);

  // Pre-calculate rotations for inclination
  const { inclinationRad, ascendingNodeRad } = useMemo(() => ({
    inclinationRad: MathUtils.degToRad(data.orbitInclination),
    ascendingNodeRad: MathUtils.degToRad(data.orbitAscendingNode)
  }), [data.orbitInclination, data.orbitAscendingNode]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * timeSpeed * 0.1;
    
    // Orbital movement: Rotate the group around its local Y axis (which is tilted)
    if (orbitGroupRef.current) {
        orbitGroupRef.current.rotation.y = startAngle + t * data.speed;
    }

    // Self rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed;
    }
  });

  const fallbackMaterial = <meshStandardMaterial color={data.color} />;

  return (
    <group>
      <group rotation={[0, ascendingNodeRad, 0]}>
        <group rotation={[inclinationRad, 0, 0]}>
            
            {/* Orbit Path (Static Visual) */}
            {showOrbit && (
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={DoubleSide} />
                </mesh>
            )}

            {/* Rotating Group containing the Planet */}
            <group ref={orbitGroupRef}>
                <group position={[data.distance, 0, 0]}>
                
                {/* The Planet Mesh */}
                <mesh 
                    ref={meshRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(data.name);
                    }}
                    onPointerOver={() => {
                        document.body.style.cursor = 'pointer';
                        setHovered(true);
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = 'auto';
                        setHovered(false);
                    }}
                >
                    <sphereGeometry args={[data.radius, 64, 64]} />
                    
                    {/* Use Suspense for texture loading with ErrorBoundary */}
                    <TextureErrorBoundary fallback={fallbackMaterial}>
                        <Suspense fallback={fallbackMaterial}>
                            <PlanetSurface data={data} hovered={hovered} />
                        </Suspense>
                    </TextureErrorBoundary>
                    
                    {/* Planet Label */}
                    <Html distanceFactor={40} position={[0, data.radius + 1, 0]}>
                        <div className={`text-xs font-mono select-none transition-opacity duration-300 ${hovered ? 'opacity-100 text-white font-bold' : 'opacity-60 text-gray-300'}`}>
                            {data.name}
                        </div>
                    </Html>
                </mesh>

                {/* Rings (Saturn special case) */}
                {data.hasRings && (
                    <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
                        <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
                        <meshStandardMaterial 
                            color={data.ringColor} 
                            transparent 
                            opacity={0.8} 
                            side={DoubleSide} 
                        />
                    </mesh>
                )}

                {/* Moons */}
                {data.moons.map((moon) => (
                    <Moon 
                        key={moon.name} 
                        data={moon} 
                        timeSpeed={timeSpeed} 
                        planetRadius={data.radius} 
                    />
                ))}
                </group>
            </group>
        </group>
      </group>
    </group>
  );
};

interface MoonProps {
    data: MoonData;
    timeSpeed: number;
    planetRadius: number;
}

const Moon: React.FC<MoonProps> = ({ data, timeSpeed, planetRadius }) => {
    const moonRef = useRef<Mesh>(null);
    const groupRef = useRef<Group>(null);
    const [startAngle] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * timeSpeed * 0.5; // Moons are faster relative to system
        if (groupRef.current) {
            groupRef.current.rotation.y = startAngle + t * data.speed;
        }
    });

    return (
        <group ref={groupRef}>
             {/* Orbit Line for Moon */}
             <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={DoubleSide} />
            </mesh>

            <mesh 
                ref={moonRef} 
                position={[data.distance, 0, 0]}
            >
                <sphereGeometry args={[data.radius, 32, 32]} />
                {data.textureUrl ? (
                    <TextureErrorBoundary fallback={<meshStandardMaterial color={data.color} />}>
                        <Suspense fallback={<meshStandardMaterial color={data.color} />}>
                            <MoonSurface data={data} />
                        </Suspense>
                    </TextureErrorBoundary>
                ) : (
                    <meshStandardMaterial color={data.color} />
                )}
            </mesh>
        </group>
    )
}