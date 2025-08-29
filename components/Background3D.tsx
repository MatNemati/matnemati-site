'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function NeuronCloud({ count = 4000 }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 1.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i*3+0] = r * Math.sin(phi) * Math.cos(theta)
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i*3+2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y += 0.0008
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial size={0.01} sizeAttenuation depthWrite={false} transparent color="#9aa4b2" />
    </Points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4,4,4]} intensity={1.2} />
        <NeuronCloud />
        {/* با درگ یا لمس، بچرخان */}
        <OrbitControls enableZoom={false} rotateSpeed={0.6} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg/70" />
    </div>
  )
}
