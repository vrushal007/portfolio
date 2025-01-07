// src/components/three/models/Eye.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface EyeProps {
  position: [number, number, number];
}

export default function Eye({ position }: EyeProps) {
  const eyeRef = useRef<THREE.Group>(null);
  const irisRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (eyeRef.current && irisRef.current) {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Calculate target rotation
        const targetRotationX = y * 0.5;
        const targetRotationY = x * 0.5;
        
        // Smooth eye movement
        eyeRef.current.rotation.x = THREE.MathUtils.lerp(
          eyeRef.current.rotation.x,
          targetRotationX,
          0.1
        );
        eyeRef.current.rotation.y = THREE.MathUtils.lerp(
          eyeRef.current.rotation.y,
          targetRotationY,
          0.1
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <group ref={eyeRef} position={position}>
      {/* Eye White */}
      <Sphere args={[1, 32, 32]}>
        <meshPhongMaterial color="white" />
      </Sphere>

      {/* Iris */}
      <Sphere ref={irisRef} args={[0.5, 32, 32]} position={[0, 0, 0.75]}>
        <MeshDistortMaterial
          color="#7209b7"
          distort={0.3}
          speed={2}
          metalness={0.9}
        />
      </Sphere>

      {/* Pupil */}
      <Sphere args={[0.25, 32, 32]} position={[0, 0, 0.85]}>
        <meshPhongMaterial color="black" />
      </Sphere>
    </group>
  );
}