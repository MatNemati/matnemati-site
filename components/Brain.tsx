'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
// MarchingCubes از مثال‌های سه‌جس
// (نیازی به پکیج جدید نیست)
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'

// نویز خیلی ساده برای حرکت نرم
function snoise(t: number) {
  return Math.sin(t) * 0.5 + Math.sin(t * 0.73 + 1.3) * 0.3 + Math.sin(t * 1.21 + 2.1) * 0.2
}

function BrainIsosurface({
  color = '#86a8c8', // اگر خاکستری‌تر می‌خوای: '#9aa4b2'
  resolution = 32,   // کیفیت شبکه (۲۴–۴۰ مناسب است)
}: { color?: string; resolution?: number }) {
  const ref = useRef<MarchingCubes>(null!)

  // پارامترهای شکل
  const strength = 0.7 / ((Math.sqrt(2) - 1) / 2) // نرمالایز داخلی کلاس
  const numBalls = 18 // تعداد متابال‌ها در هر نیم‌کره (جمعاً ~36)
  const gap = 0.28    // فاصله‌ی دو نیم‌کره از هم (برای حس شیار میانی)
  const scaleX = 1.35, scaleY = 0.95, scaleZ = 1.65 // تناسب کلی فرم (نه بیضی ساده)

  // بذرهای اولیه‌ی مسیر متابال‌ها (برای ثابت‌بودن شکل)
  const seeds = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < numBalls * 2; i++) arr.push(Math.random() * 1000 + i * 17.17)
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const iso = ref.current
    if (!iso) return

    iso.reset()

    // --- نیم‌کره چپ ---
    for (let i = 0; i < numBalls; i++) {
      const s = seeds[i]
      // مسیرهای نرم و متفاوت
      const ux = snoise(t * 0.35 + s * 0.01)
      const uy = snoise(t * 0.42 + s * 0.02)
      const uz = snoise(t * 0.29 + s * 0.03)
      // جای‌گذاری داخل «حجم» با نسبت‌های اختصاصی
      const x = -gap + (ux * 0.45) * scaleX
      const y = (uy * 0.55) * scaleY
      const z = (uz * 0.65) * scaleZ
      iso.addBall(0.5 + x, 0.5 + y, 0.5 + z, 0.06, strength) // (x,y,z,r,strength)
    }

    // --- نیم‌کره راست ---
    for (let i = 0; i < numBalls; i++) {
      const s = seeds[numBalls + i]
      const ux = snoise(t * 0.33 + s * 0.01)
      const uy = snoise(t * 0.41 + s * 0.02)
      const uz = snoise(t * 0.27 + s * 0.03)
      const x = +gap + (ux * 0.45) * scaleX
      const y = (uy * 0.55) * scaleY
      const z = (uz * 0.65) * scaleZ
      iso.addBall(0.5 + x, 0.5 + y, 0.5 + z, 0.06, strength)
    }

    // --- شیار میانی: یک plane با تاثیر منفی برای خالی‌کردن حوالی x=0 ---
    // نرمالِ صفحه تقریباً محور X است تا در میانه بُرش بدهد.
    iso.addPlane(0.5, 0.5, 0.5,  -1, 0, 0, 0.52) // (px,py,pz,nx,ny,nz,offset)

    // رنگ و وایرفریم
    ;(iso.material as THREE.MeshStandardMaterial).color = new THREE.Color(color)
    ;(iso.material as THREE.MeshStandardMaterial).wireframe = true
    ;(iso.material as THREE.MeshStandardMaterial).transparent = true
    ;(iso.material as THREE.MeshStandardMaterial).opacity = 0.95
    iso.isolation = 80 // آستانه‌ی ایزو‌سطح (با این مقدار فرم جمع‌وجورتر می‌شود)
  })

  return (
    // MarchingCubes واحدش 0..1 است؛ با scale بزرگش می‌کنیم
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
        <BrainIsosurface color="#86a8c8" resolution={32} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.8} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/10 to-bg/60" />
    </div>
  )
}
