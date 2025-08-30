'use client'

import React, { useEffect, useRef } from 'react'

type Vec2 = { x: number; y: number }

function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)) }

export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d', { alpha: true })!
    let raf = 0
    let running = true

    // Responsive canvas size
    const setSize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      const w = (canvas.parentElement?.clientWidth || window.innerWidth)
      const h = (canvas.parentElement?.clientHeight || window.innerHeight)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Config (tuned for performance)
    const cfg = {
      nodeCountBase: 120,       // desktop baseline
      nodeCountMobile: 70,      // mobile baseline
      linkRadius: 120,          // px
      stroke: 'rgba(120, 160, 190, 0.55)', // line color
      nodeColor: 'rgba(160, 200, 230, 0.8)',
      bgVignette: true,
      nodeSize: 1.4,
      parallax: 0.06,           // mouse influence
      jitter: 0.12,             // subtle motion
      speed: 0.35               // base speed
    }

    // Runtime state
    let nodes: (Vec2 & { vx: number; vy: number })[] = []
    let pointer: Vec2 = { x: 0.5, y: 0.5 }
    let t = 0

    const isMobile = () => window.innerWidth < 768

    const spawn = () => {
      const W = canvas.clientWidth
      const H = canvas.clientHeight
      const count = isMobile() ? cfg.nodeCountMobile : cfg.nodeCountBase
      nodes = new Array(count).fill(0).map(() => {
        const a = Math.random() * Math.PI * 2
        const r = (Math.random() ** 0.7) * Math.min(W, H) * 0.52
        const cx = W * 0.55
        const cy = H * 0.48
        // Slight brain-like oval layout
        const ovalX = r * Math.cos(a) * 1.25
        const ovalY = r * Math.sin(a) * 0.85
        return {
          x: cx + ovalX,
          y: cy + ovalY,
          vx: (Math.random() - 0.5) * cfg.speed,
          vy: (Math.random() - 0.5) * cfg.speed
        }
      })
    }

    const draw = () => {
      const W = canvas.clientWidth
      const H = canvas.clientHeight

      // Clear with subtle vignette
      ctx.clearRect(0, 0, W, H)
      if (cfg.bgVignette) {
        const g = ctx.createRadialGradient(W*0.55, H*0.5, Math.min(W,H)*0.2, W*0.55, H*0.5, Math.max(W,H)*0.9)
        g.addColorStop(0, 'rgba(10, 15, 22, 0.0)')
        g.addColorStop(1, 'rgba(10, 15, 22, 0.35)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      // Subtle motion and parallax
      t += 0.016
      const px = (pointer.x - 0.5) * cfg.parallax * W
      const py = (pointer.y - 0.5) * cfg.parallax * H

      // Update nodes
      for (let n of nodes) {
        n.x += n.vx + Math.sin(t + n.x * 0.002) * cfg.jitter
        n.y += n.vy + Math.cos(t + n.y * 0.002) * cfg.jitter

        // Soft bounds
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      }

      // Draw links (distance-based alpha)
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = (a.x - b.x)
          const dy = (a.y - b.y)
          const d2 = dx*dx + dy*dy
          const r2 = cfg.linkRadius * cfg.linkRadius
          if (d2 < r2) {
            const alpha = 1 - d2 / r2
            ctx.strokeStyle = cfg.stroke.replace(/[\d.]+\)$/g, (m) => `${(0.25 + alpha * 0.6).toFixed(3)})`)
            ctx.beginPath()
            ctx.moveTo(a.x + px, a.y + py)
            ctx.lineTo(b.x + px, b.y + py)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = cfg.nodeColor
      for (let n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x + px, n.y + py, cfg.nodeSize, 0, Math.PI*2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (!running) return
      draw()
      raf = requestAnimationFrame(loop)
    }

    // Pointer parallax
    const onMove = (e: MouseEvent | TouchEvent) => {
      let x = 0.5, y = 0.5
      if (e instanceof MouseEvent) {
        x = e.clientX / (canvas.clientWidth || 1)
        y = e.clientY / (canvas.clientHeight || 1)
      } else if (e instanceof TouchEvent && e.touches[0]) {
        x = e.touches[0].clientX / (canvas.clientWidth || 1)
        y = e.touches[0].clientY / (canvas.clientHeight || 1)
      }
      pointer = { x: clamp(x,0,1), y: clamp(y,0,1) }
    }

    // Init
    setSize()
    spawn()
    loop()

    // Events
    const ro = new ResizeObserver(() => { setSize(); spawn() })
    ro.observe(canvas.parentElement || document.body)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <canvas ref={ref} className="w-full h-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
    </div>
  )
}
