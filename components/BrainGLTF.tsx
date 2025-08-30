'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function BrainMesh({ color = '#9aa4b2' }: { color?: string }) {
  const { scene } = useGLTF('/models/brain.glb') as any
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(color), wireframe: true, transparent: true, opacity: 0.95 }),
    [color]
  )
  scene.traverse((o: any) => { if (o.isMesh) o.material = mat })
  return (
    <Center disableX disableZ>
      <primitive object={scene} />
    </Center>
  )
}

export default function BrainGLTF() {
  const g = useRef<THREE.Group>(null)
  useFrame(() => { if (g.current) g.current.rotation.y += 0.002 })
  return (
    <div className="fixed top-20 right-4 w-[360px] h-[360px] md:w-[480px] md:h-[480px] -z-0">
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} />
        <group ref={g}>
          <BrainMesh color="#9aa4b2" />
        </group>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.8} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/10 to-bg/60" />
    </div>
  )
}
