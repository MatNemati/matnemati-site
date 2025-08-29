
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function NeuronCloud({ count = 3000 }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // spherical-ish distribution
      const r = 1.2 + Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i*3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      arr[i*3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i*3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.05
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial size={0.01} sizeAttenuation depthWrite={false} transparent color="#2dd4bf" />
    </Points>
  )
}

export default function Hero3D() {
  return (
    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-line bg-[#0b0f16]">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4,4,4]} intensity={1.2} />
        <NeuronCloud />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/10 to-bg/60 pointer-events-none" />
    </div>
  )
}
