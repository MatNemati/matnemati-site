'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'

type Info = { title: string; text: string }
const LOBE_INFO: Record<string, Info> = {
  frontal:   { title: 'Frontal Lobe',   text: 'Executive functions, planning, decision-making, voluntary movement.' },
  parietal:  { title: 'Parietal Lobe',  text: 'Somatosensory processing, spatial orientation, body awareness.' },
  temporal:  { title: 'Temporal Lobe',  text: 'Auditory processing, language, memory formation.' },
  occipital: { title: 'Occipital Lobe', text: 'Visual processing and feature integration.' },
  cerebellum:{ title: 'Cerebellum',     text: 'Coordination, precision, motor learning.' },
  brainstem: { title: 'Brainstem',      text: 'Autonomic functions: breathing, heart rate, arousal.' },
}

function BrainMeshes({ color = '#66e0ff' }: { color?: string }) {
  const { scene } = useGLTF('/models/scene.gltf') as any
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const baseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    wireframe: true,
    transparent: true,
    opacity: 0.9,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.5,
  }), [color])

  const hiMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a8d2ff'),
    wireframe: true,
    transparent: true,
    opacity: 1.0,
    emissive: new THREE.Color('#a8d2ff'),
    emissiveIntensity: 1.2,
  }), [])

  // collect meshes
  const meshes = useMemo(() => {
    const arr: THREE.Mesh[] = []
    scene.traverse((o: any) => { if (o.isMesh) arr.push(o) })
    return arr
  }, [scene])

  useEffect(() => {
    meshes.forEach((m) => {
      m.material = baseMat
      m.userData._label = (m.name || '').toLowerCase()
      m.onBeforeRender = () => {
        const name = m.userData._label as string
        const isSel = selected && name.includes(selected)
        const isHover = hovered && name.includes(hovered)
        m.material = (isSel || isHover) ? hiMat : baseMat
      }
    })
  }, [meshes, baseMat, hiMat, hovered, selected])

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.002
  })

  const onPointerOver = (e: any) => {
    e.stopPropagation()
    const name = (e.object?.userData?._label || '').toString()
    const key = Object.keys(LOBE_INFO).find(k => name.includes(k))
    setHovered(key || null)
  }
  const onPointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(null)
  }
  const onPointerDown = (e: any) => {
    e.stopPropagation()
    const name = (e.object?.userData?._label || '').toString()
    const key = Object.keys(LOBE_INFO).find(k => name.includes(k))
    setSelected(key || null)
    if (key) {
      const panel = document.getElementById('brain-info')
      if (panel) {
        panel.innerHTML = `<div class="font-semibold mb-1">${LOBE_INFO[key].title}</div><div>${LOBE_INFO[key].text}</div>`
        panel.classList.remove('hidden')
      }
    }
  }

  return (
    <group ref={group}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerDown={onPointerDown}
    >
      <Center><primitive object={scene} /></Center>
    </group>
  )
}

export default function BrainLabeled() {
  return (
    <div className="fixed top-20 right-4 w-[380px] h-[380px] md:w-[520px] md:h-[520px] -z-0">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} />
        <BrainMeshes />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.8} />
      </Canvas>

      {/* floating info panel */}
      <div id="brain-info"
           className="absolute left-0 top-0 m-2 max-w-[85%] rounded-2xl border border-line bg-card/70 backdrop-blur px-3 py-2 text-xs text-muted pointer-events-none hidden"></div>
    </div>
  )
}

useGLTF.preload('/models/brain.glb')
