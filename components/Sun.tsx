import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';
import { SUN_TEXTURE_URL } from '../constants';
import { TextureErrorBoundary } from './TextureErrorBoundary';

// Sub-component that actually loads the texture
const SunTextureMaterial: React.FC = () => {
  const texture = useTexture(SUN_TEXTURE_URL);
  
  return (
    <meshStandardMaterial 
      map={texture}
      emissiveMap={texture}
      emissive="#FDB813" 
      emissiveIntensity={0.6} 
      color="#ffffff"
      roughness={1}
    />
  );
};

// Fallback material if texture fails or is loading
const SunFallbackMaterial: React.FC = () => (
  <meshStandardMaterial 
    color="#FDB813" 
    emissive="#FDB813" 
    emissiveIntensity={0.5} 
  />
);

export const Sun: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Light source coming from the sun */}
      <pointLight position={[0, 0, 0]} intensity={3.5} distance={1000} decay={0.5} color="#FFF8E7" />
      {/* Increased ambient light to make dark sides of planets visible for observation */}
      <ambientLight intensity={0.4} color="#ccccff" />

      <mesh ref={meshRef}>
        <sphereGeometry args={[7, 64, 64]} />
        
        {/* Safely load texture with fallback */}
        <TextureErrorBoundary fallback={<SunFallbackMaterial />}>
            <Suspense fallback={<SunFallbackMaterial />}>
                <SunTextureMaterial />
            </Suspense>
        </TextureErrorBoundary>
      </mesh>
      
      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial 
          color="#FDB813" 
          transparent 
          opacity={0.15} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};