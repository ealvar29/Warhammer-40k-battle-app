import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ── Lightning bolt generator ────────────────────────────────────────────────

function jag(x1, y1, x2, y2, segments = 7, spread = 80) {
  const pts = [[x1, y1]]
  for (let i = 1; i < segments; i++) {
    const t = i / segments
    const baseX = x1 + (x2 - x1) * t
    const baseY = y1 + (y2 - y1) * t
    const jitter = spread * (1 - t * 0.5) // less jitter near the end
    pts.push([baseX + (Math.random() - 0.5) * jitter, baseY + (Math.random() - 0.3) * (jitter * 0.4)])
  }
  pts.push([x2, y2])
  return pts
}

function ptsToPath(pts) {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
}

function LightningBolt({ bolt }) {
  const { sx, sy, ex, ey } = bolt
  const mainPts = jag(sx, sy, ex, ey, 8, 90)
  const mainPath = ptsToPath(mainPts)

  // branch from ~40% down
  const branchIdx = Math.floor(mainPts.length * 0.4)
  const [bx, by] = mainPts[branchIdx]
  const branchEnd = [bx + (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 80), by + 80 + Math.random() * 60]
  const branchPts = jag(bx, by, branchEnd[0], branchEnd[1], 4, 30)
  const branchPath = ptsToPath(branchPts)

  return (
    <motion.svg
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 999, pointerEvents: 'none', overflow: 'visible' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0.7, 0] }}
      transition={{ duration: 0.45, times: [0, 0.04, 0.15, 0.35, 1], ease: 'easeOut' }}
    >
      <defs>
        <filter id="bolt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="bolt-core-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
        </filter>
      </defs>

      {/* outer aura */}
      <path d={mainPath} stroke="#7ec8f0" strokeWidth="12" fill="none" opacity="0.18" strokeLinecap="round" />
      {/* mid glow */}
      <path d={mainPath} stroke="#b8e8ff" strokeWidth="5" fill="none" opacity="0.5" filter="url(#bolt-glow)" strokeLinecap="round" />
      {/* core */}
      <path d={mainPath} stroke="#eef8ff" strokeWidth="2" fill="none" opacity="0.95" strokeLinecap="round" />
      {/* bright core flash */}
      <path d={mainPath} stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8" strokeLinecap="round" />

      {/* branch glow */}
      <path d={branchPath} stroke="#a0d8ff" strokeWidth="3" fill="none" opacity="0.35" filter="url(#bolt-glow)" strokeLinecap="round" />
      {/* branch core */}
      <path d={branchPath} stroke="#d8f0ff" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
    </motion.svg>
  )
}

// ── Space Wolves lightning FX ───────────────────────────────────────────────

function SpaceWolvesLightning() {
  const [bolt, setBolt] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    function fire() {
      const w = window.innerWidth
      const h = window.innerHeight
      const sx = w * 0.15 + Math.random() * w * 0.7
      const ex = sx + (Math.random() - 0.5) * 320
      const ey = h * 0.25 + Math.random() * h * 0.35
      setBolt({ sx, sy: -10, ex, ey, id: Date.now() })
      setTimeout(() => setBolt(null), 700)
    }

    function schedule() {
      const delay = 18000 + Math.random() * 35000  // 18–53 s between strikes
      timerRef.current = setTimeout(() => { fire(); schedule() }, delay)
    }

    // first strike after 6–12 s so the player sees it reasonably soon
    const firstDelay = 6000 + Math.random() * 6000
    timerRef.current = setTimeout(() => { fire(); schedule() }, firstDelay)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <AnimatePresence>
      {bolt && (
        <React.Fragment key={bolt.id}>
          {/* ambient flash */}
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 998, pointerEvents: 'none', background: 'rgba(180,220,255,0.07)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.35, times: [0, 0.08, 1] }}
          />
          <LightningBolt bolt={bolt} />
        </React.Fragment>
      )}
    </AnimatePresence>
  )
}

// ── Tyranid bioluminescent pulse ────────────────────────────────────────────

function TyranidPulse() {
  const [pulse, setPulse] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    function schedule() {
      timerRef.current = setTimeout(() => {
        setPulse(true)
        setTimeout(() => setPulse(false), 1200)
        schedule()
      }, 12000 + Math.random() * 20000)
    }
    schedule()
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <AnimatePresence>
      {pulse && (
        <motion.div key="tyranid-pulse"
          style={{
            position: 'fixed', inset: 0, zIndex: 998, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 60%, rgba(168,85,247,0.12) 0%, rgba(16,185,129,0.06) 50%, transparent 75%)',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: [0, 1, 0.6, 0] }}
          transition={{ duration: 1.2, times: [0, 0.15, 0.5, 1] }}
        />
      )}
    </AnimatePresence>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function FactionFX({ factionId }) {
  if (factionId === 'spacewolves') return <SpaceWolvesLightning />
  if (factionId === 'tyranids')    return <TyranidPulse />
  return null
}
