'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'

type Props = {
  color?: string      // رنگ خطوط وایرفریم
  autoRotate?: boolean
}

function BrainMesh({ color = '#86a8c8' }: { color?: string }) {
  // فایل مدل: public/models/brain.glb
  const { scene } = useGLTF('/models/brain.glb') as any

  // همه‌ی مش‌ها را به متریال وایرفریم یک‌دست تبدیل کن
  const wire = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    })
    return m
  }, [color])

  useEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.material = wire
        obj.castShadow = false
        obj.receiveShadow = false
      }
    })
  }, [scene, wire])

  return (
    // Center مدل را در مبدأ قرار می‌دهد و یک scale مناسب می‌دهد
    <Center disableX disableY={false} disableZ>
      <primitive object={scene} />
    </Center>
  )
}

export default function BrainGLTF({ color = '#86a8c8', autoRotate = true }: Props) {
  const groupRef = useRef<THREE.Group>(null)

  // چرخش بسیار آرام
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.002
  })

  return (
    <div className="fixed top-20 right-4 w-[360px] h-[360px] md:w-[480px] md:h-[480px] -z-0">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} />
        <group ref={groupRef}>
          <BrainMesh color={color} />
        </group>
        <OrbitControls
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.6}
          rotateSpeed={0.8}
        />
      </Canvas>
      {/* گرادیان خیلی ملایم برای عمق بصری */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/10 to-bg/60" />
    </div>
  )
}

// پیش‌لود مدل برای بارگذاری سریع‌تر
useGLTF.preload('/models/brain.glb')
