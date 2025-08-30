'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

function mixNoise(t: number) {
  return Math.sin(t) * 0.5 + Math.sin(t * 0.73 + 1.3) * 0.3 + Math.sin(t * 1.21 + 2.1) * 0.2
}

function IsoBrain({ color = '#9aa4b2', resolution = 32 }: { color?: string; resolution?: number }) {
  const ref = useRef<MarchingCubes>(null!)

  const params = {
    strength: 0.7 / ((Math.sqrt(2) - 1) / 2),
    balls: 18,
    gap: 0.28,
    scaleX: 1.35,
    scaleY: 0.95,
    scaleZ: 1.65,
  }

  const seeds = useMemo(() => {
    const s: number[] = []
    for (let i = 0; i < params.balls * 2; i++) s.push(Math.random() * 1000 + i * 17.17)
    return s
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const iso = ref.current
    if (!iso) return
    iso.reset()

    for (let i = 0; i < params.balls; i++) {
      const seed = seeds[i]
      const ux = mixNoise(t * 0.35 + seed * 0.01)
      const uy = mixNoise(t * 0.42 + seed * 0.02)
      const uz = mixNoise(t * 0.29 + seed * 0.03)
      const x = -params.gap + (ux * 0.45) * params.scaleX
      const y = (uy * 0.55) * params.scaleY
      const z = (uz * 0.65) * params.scaleZ
      iso.addBall(0.5 + x, 0.5 + y, 0.5 + z, 0.06, params.strength)
    }

    for (let i = 0; i < params.balls; i++) {
      const seed = seeds[params.balls + i]
      const ux = mixNoise(t * 0.33 + seed * 0.01)
      const uy = mixNoise(t * 0.41 + seed * 0.02)
      const uz = mixNoise(t * 0.27 + seed * 0.03)
      const x = +params.gap + (ux * 0.45) * params.scaleX
      const y = (uy * 0.55) * params.scaleY
      const z = (uz * 0.65) * params.scaleZ
      iso.addBall(0.5 + x, 0.5 + y, 0.5 + z, 0.06, params.strength)
    }

    iso.addPlaneX(0.54)

    const mat = iso.material as THREE.MeshStandardMaterial
    mat.color = new THREE.Color(color)
    mat.wireframe = true
    mat.transparent = true
    mat.opacity = 0.95
    iso.isolation = 80
  })

  return (
    <group scale={[1.8, 1.8, 1.8]} position={[0, 0.05, 0]}>
      {/* @ts-ignore */}
      <marchingCubes ref={ref} args={[resolution, new THREE.MeshStandardMaterial(), true, true]} />
    </group>
  )
}

export default function Brain() {
  return (
    <div className="fixed top-20 right-4 w-[360px] h-[360px] md:w-[480px] md:h-[480px] -z-0">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} />
        <IsoBrain color="#9aa4b2" resolution={32} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.8} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/10 to-bg/60" />
    </div>
  )
}
