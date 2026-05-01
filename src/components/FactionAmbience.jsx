import React, { useEffect, useState, useCallback } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { FACTION_PARTICLES } from '../data/factionParticles'

let engineReady = false
let enginePromise = null

function ensureEngine() {
  if (engineReady) return Promise.resolve()
  if (!enginePromise) {
    enginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => { engineReady = true })
  }
  return enginePromise
}

export default function FactionAmbience({ factionId }) {
  const [ready, setReady] = useState(engineReady)

  useEffect(() => {
    if (!factionId || !FACTION_PARTICLES[factionId]) return
    ensureEngine().then(() => setReady(true))
  }, [factionId])

  const particlesLoaded = useCallback(() => {}, [])

  if (!ready || !factionId || !FACTION_PARTICLES[factionId]) return null

  return (
    <Particles
      key={factionId}
      id={`faction-ambience-${factionId}`}
      options={FACTION_PARTICLES[factionId]}
      particlesLoaded={particlesLoaded}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  )
}
