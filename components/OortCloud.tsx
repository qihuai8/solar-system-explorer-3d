import React, { useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { OORT_CLOUD_COUNT, OORT_CLOUD_RADIUS } from '../constants';
import * as THREE from 'three';

export const OortCloud: React.FC = () => {
  const positions = useMemo(() => {
    const pos = new Float32Array(OORT_CLOUD_COUNT * 3);
    for (let i = 0; i < OORT_CLOUD_COUNT; i++) {
      // Random distribution in a spherical shell
      const r = OORT_CLOUD_RADIUS + Math.random() * 100; // Thickness of 100 units
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  return (
    <group>
       <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#88CCFF"
          size={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
      {/* Label for Oort Cloud */}
      {/* We can't easily put text on every point, but we could add a floating label if needed. 
          For now, the visual density indicates the cloud. */}
    </group>
  );
};
