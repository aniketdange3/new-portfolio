"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ─── Cursor-reactive lighting ──────────────────────────────────────
function CursorLight() {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    if (!light.current) return;
    light.current.position.x = (mouse.x * viewport.width)  / 2;
    light.current.position.y = (mouse.y * viewport.height) / 2;
  });

  return (
    <pointLight
      ref={light}
      intensity={4}
      distance={12}
      color="#7B5EFF"
      position={[0, 0, 4]}
    />
  );
}

// ─── Floating glass orb ───────────────────────────────────────────
function GlassOrb({
  position,
  scale = 1,
  color = "#7B5EFF",
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0}
          metalness={0.1}
          transparent
          opacity={0.18}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

// ─── Neural connection lines ───────────────────────────────────────
function NeuralLines() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 40; i++) {
    points.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 2,
      )
    );
  }

  const segments: number[] = [];
  points.forEach((p, i) => {
    points.forEach((q, j) => {
      if (i < j && p.distanceTo(q) < 3.5) {
        segments.push(p.x, p.y, p.z, q.x, q.y, q.z);
      }
    });
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(segments, 3)
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={geometry}>
        <lineBasicMaterial
          color="#7B5EFF"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
      {points.slice(0, 20).map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#7B5EFF" : i % 3 === 1 ? "#00D9FF" : "#FF5E8A"} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Particle field ───────────────────────────────────────────────
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const NUM = 3000;

  const positions = new Float32Array(NUM * 3);
  const colors = new Float32Array(NUM * 3);

  const palette = [
    [0.48, 0.37, 1.0],  // violet
    [0.0, 0.85, 1.0],   // cyan
    [1.0, 0.37, 0.54],  // rose
  ];

  for (let i = 0; i < NUM; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 3;

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Main scene ───────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Ambient + directional */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#9B7EFF" />
      <directionalLight position={[-5, -3, 3]} intensity={0.3} color="#00D9FF" />

      {/* Cursor-reactive point light */}
      <CursorLight />

      {/* Stars */}
      <Stars radius={60} depth={40} count={2000} factor={2} saturation={0} fade speed={0.5} />

      {/* Neural mesh */}
      <NeuralLines />

      {/* Particle field */}
      <ParticleField />

      {/* Floating glass orbs */}
      <GlassOrb position={[-4, 2, -2]}  scale={1.4}  color="#7B5EFF" speed={1.2} />
      <GlassOrb position={[4.5, -1, -3]} scale={1.0}  color="#00D9FF" speed={0.9} />
      <GlassOrb position={[0, -3, -4]}  scale={1.8}  color="#FF5E8A" speed={0.7} />
      <GlassOrb position={[-2, -2, -5]} scale={0.7}  color="#FFB547" speed={1.4} />
      <GlassOrb position={[3, 3, -6]}   scale={2.2}  color="#7B5EFF" speed={0.5} />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
