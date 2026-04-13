"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Text, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function MallZone({ position, size, color, label, isPulse = false }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} ref={meshRef}>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.1} 
          emissive={isPulse ? color : "black"}
          emissiveIntensity={isPulse ? 0.5 : 0}
          transparent
          opacity={0.8}
        />
        <Text
          position={[0, size[1] / 2 + 0.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spectral/v13/yNoZcmlZfXvcpU7N_A.woff" // Stylized font
        >
          {label}
        </Text>
      </mesh>
    </Float>
  );
}

function MallBase() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.2} transparent opacity={0.4} />
    </mesh>
  );
}

export default function DubaiMallMap() {
  const zones = [
    { id: 1, pos: [-4, 0.5, -2], size: [6, 1.5, 4], color: "#D4AF37", label: "Fashion Avenue", isPulse: true },
    { id: 2, pos: [4, 1, 0], size: [5, 2.5, 5], color: "#8B732A", label: "Grand Atrium" },
    { id: 3, pos: [-2, 0.2, 4], size: [4, 1, 3], color: "#D4AF37", label: "Dino Zone" },
    { id: 4, pos: [5, 0.5, 6], size: [3, 1.5, 4], color: "#1a1a1a", label: "The Fountains" },
    { id: 5, pos: [0, 0.1, -6], size: [8, 0.8, 3], color: "#D4AF37", label: "Gold Souk" },
  ];

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={35} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} color="white" />

        <MallBase />
        {zones.map(zone => (
          <MallZone 
            key={zone.id} 
            position={zone.pos} 
            size={zone.size} 
            color={zone.color} 
            label={zone.label} 
            isPulse={zone.isPulse}
          />
        ))}

        <gridHelper args={[20, 20, "#D4AF37", "#111"]} position={[0, -0.9, 0]} />
      </Canvas>
    </div>
  );
}