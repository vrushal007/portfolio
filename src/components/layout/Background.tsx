// src/components/layout/Background.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector2, ShaderMaterial } from 'three';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader for the animated background
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Create animated gradient
    float noise = sin(uv.x * 10.0 + uTime) * sin(uv.y * 10.0 + uTime) * 0.5;
    vec3 color1 = vec3(0.1, 0.1, 0.2); // Dark blue
    vec3 color2 = vec3(0.3, 0.0, 0.4); // Purple
    
    // Mix colors based on scroll position and noise
    vec3 finalColor = mix(color1, color2, noise + uScroll * 0.5);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function BackgroundPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const scroll = useScroll();
  const { size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uScroll.value = scroll.offset;
      materialRef.current.uniforms.uResolution.value = new Vector2(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uResolution: { value: new Vector2() },
        }}
      />
    </mesh>
  );
}

export default function Background() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh', 
      zIndex: -1 
    }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <BackgroundPlane />
      </Canvas>
    </div>
  );
}