'use client'

import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { useRef } from 'react'

// --- Shader: کمی برآمدگی و بافت برای حس چین‌خوردگی مغز ---
const BrainMaterial = shaderMaterial(
  // uniforms
  { uTime: 0, uColor: new THREE.Color('#86a8c8') },
  // vertex shader
  /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;
  // نویز ساده (value noise) برای موج‌دار کردن
  float hash(vec3 p){ p = fract(p*0.3183099 + vec3(0.1,0.2,0.3)); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float noise(vec3 p){
    vec3 i = floor(p);
    vec3 f = fract(p);
    float n = mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
    return n;
  }
  void main(){
    vNormal = normal;
    vPos = position;
    // کمی تغییر شکل شبه‌ژیراسیون برای حس چین‌خوردگی
    float n = noise(normal*2.5 + uTime*0.2) * 0.12;
    vec3 pos = position + normal * n;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // fragment shader
  /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main(){
    // وایرفریم با خط‌های روشن روی بک‌گراند تیره
    // چون از material وایرفریم استفاده می‌کنیم، اینجا فقط رنگ پایه می‌دهیم
    gl_FragColor = vec4(uColor, 0.95);
  }
  `
)
extend({ BrainMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      brainMaterial: any
    }
  }
}

function Hemisphere({ x = 0.6 }: { x?: number }) {
  const matRef = useRef<any>(null)
  useFrame((state) => {
    if (matRef.current) matRef.current.uTime = state.clock.getElapsedTime()
  })
  return (
    <mesh position={[x, 0, 0]}>
      <icosahedronGeometry args={[1, 5]} />
      {/* متریال شیدری با وایرفریم */}
      <brainMaterial ref={matRef} />
      <meshStandardMaterial wireframe transparent opacity={0.9} color={'#86a8c8'} />
    </mesh>
  )
}

export default function Brain() {
  // کانتینر ثابت بالا-راست
  return (
    <div className="fixed top-20 right-4 w-[360px] h-[360px] md:w-[460px] md:h-[460px] -z-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4,4,4]} intensity={1.2} />
        {/* دو نیم‌کره با کمی هم‌پوشانی برای حس مغز */}
        <group rotation={[0.15, 0.1, 0]}>
          <Hemisphere x={-0.58} />
          <Hemisphere x={+0.58} />
        </group>
        {/* چرخش خودکار + چرخش با موس/تاچ */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} rotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}
