import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { themes } from './themes/index'
import HomeScreen from './screens/HomeScreen'
import ArmyBuilderScreen from './screens/ArmyBuilderScreen'
import BattleDemo from './components/BattleDemo'
import DeployScreen from './screens/DeployScreen'
import CrusadeScreen from './screens/CrusadeScreen'
import ListBuilderScreen from './screens/ListBuilderScreen'
import UnitLookupOverlay from './components/UnitLookupOverlay'
import { useBattleStore } from './store/battleStore'
import { parseShareUrl } from './utils/armyShare'
import { buildUnitsFromIds, findDetachment, FACTION_META } from './data/factionRegistry'

const theme = themes.spacewolves

const NAV_TABS = [
  { id: 'home',    label: 'Home',    icon: '🏠' },
  { id: 'battle',  label: 'Battle',  icon: '⚔️' },
  { id: 'lists',   label: 'Lists',   icon: '📋' },
  { id: 'crusade', label: 'Crusade', icon: '📜' },
  { id: 'search',  label: 'Search',  icon: '🔍', isOverlay: true },
]

const TAB_ORDER = ['home', 'battle', 'lists', 'crusade', 'armyBuilder', 'deploy']
function slideDir(from, to) {
  const fi = TAB_ORDER.indexOf(from)
  const ti = TAB_ORDER.indexOf(to)
  return ti > fi ? 1 : -1
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [prevScreen, setPrevScreen] = useState('home')
  const [pendingImport, setPendingImport] = useState(null)
  const [showLookup, setShowLookup] = useState(false) // decoded army payload
  const battleActive = useBattleStore(s => s.battleActive)
  const setOpponentArmy = useBattleStore(s => s.setOpponentArmy)

  useEffect(() => {
    const payload = parseShareUrl()
    if (!payload?.f || !payload?.u?.length) return
    // Clear hash without triggering navigation
    history.replaceState(null, '', window.location.pathname)
    const units = buildUnitsFromIds(payload.f, payload.u)
    const detachment = findDetachment(payload.f, payload.d)
    setPendingImport({ faction: payload.f, detachmentId: payload.d, units, detachment })
  }, [])

  const handleImport = () => {
    if (!pendingImport) return
    setOpponentArmy(pendingImport)
    setPendingImport(null)
  }

  const navigate = (to) => {
    setPrevScreen(screen)
    setScreen(to)
  }

  const dir = slideDir(prevScreen, screen)

  const renderScreen = () => {
    switch (screen) {
      case 'home':         return <HomeScreen theme={theme} onNavigate={navigate} />
      case 'armyBuilder':  return <ArmyBuilderScreen theme={theme} onNavigate={navigate} />
      case 'deploy':       return <DeployScreen theme={theme} onNavigate={navigate} />
      case 'battle':       return <BattleDemo theme={theme} onNavigate={navigate} />
      case 'lists':        return <ListBuilderScreen theme={theme} />
      case 'crusade':      return <CrusadeScreen theme={theme} />
      default:             return <HomeScreen theme={theme} onNavigate={navigate} />
    }
  }

  const showBottomNav = screen !== 'armyBuilder'
  const activeTabId = screen === 'armyBuilder' || screen === 'calc' ? 'battle' : screen
  const navTabsDesktop = NAV_TABS.filter(t => !t.isOverlay)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: theme.bg }}>

      {/* ── Import opponent army modal ── */}
      <AnimatePresence>
        {pendingImport && (() => {
          const meta = FACTION_META[pendingImport.faction] || { name: pendingImport.faction, icon: '⚔️', color: '#c9a84c' }
          const det = pendingImport.detachment
          return (
            <motion.div
              className="fixed inset-0 z-[60] flex items-end justify-center"
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
              exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            >
              <motion.div
                className="w-full max-w-sm rounded-t-3xl p-5 pb-8"
                style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              >
                <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: theme.border }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}44` }}>
                    {meta.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
                      Opponent Army Link
                    </p>
                    <p className="font-black text-base" style={{ color: theme.textPrimary }}>{meta.name}</p>
                    {det && <p className="text-xs" style={{ color: theme.textSecondary }}>{det.name}</p>}
                  </div>
                </div>
                <div className="rounded-xl border p-3 mb-4" style={{ background: theme.surfaceHigh, borderColor: theme.border }}>
                  <p className="text-xs font-bold mb-1" style={{ color: theme.textSecondary }}>
                    {pendingImport.units.length} units
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: theme.textPrimary }}>
                    {pendingImport.units.slice(0, 6).map(u => u.name).join(', ')}
                    {pendingImport.units.length > 6 ? ` +${pendingImport.units.length - 6} more` : ''}
                  </p>
                </div>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleImport}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm mb-2"
                  style={{ background: theme.secondary, color: theme.bg }}>
                  Load as Opponent Army
                </motion.button>
                <button onClick={() => setPendingImport(null)}
                  className="w-full py-2 text-xs font-medium"
                  style={{ color: theme.textSecondary }}>
                  Dismiss
                </button>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* ── Unit Lookup Overlay ── */}
      <AnimatePresence>
        {showLookup && (
          <motion.div
            className="fixed inset-0 md:left-56 z-[70] flex flex-col"
            style={{ background: theme.bg }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <UnitLookupOverlay theme={theme} onClose={() => setShowLookup(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 border-r"
        style={{ background: theme.navBg, borderColor: theme.border }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b" style={{ borderColor: theme.border }}>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color: theme.secondary }}>
            W40K
          </p>
          <p className="font-black text-sm mt-0.5 leading-tight" style={{ color: theme.textPrimary }}>
            Battle Companion
          </p>
          <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>10th Edition</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-0.5">
          {navTabsDesktop.map(tab => {
            const isActive = activeTabId === tab.id
            const hasBadge = tab.id === 'battle' && battleActive
            return (
              <motion.button
                key={tab.id}
                onClick={() => tab.id === 'battle'
                  ? navigate(battleActive ? 'battle' : 'armyBuilder')
                  : navigate(tab.id)
                }
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl relative text-left"
                style={{
                  background: isActive ? theme.surfaceHigh : 'transparent',
                  borderLeft: isActive ? `3px solid ${theme.secondary}` : '3px solid transparent',
                }}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span className="text-sm font-bold" style={{ color: isActive ? theme.textPrimary : theme.textSecondary }}>
                  {tab.label}
                </span>
                {hasBadge && (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    className="ml-auto w-2 h-2 rounded-full shrink-0"
                    style={{ background: theme.hpFull }}
                  />
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* Search button */}
        <div className="px-2 pb-2">
          <motion.button
            onClick={() => setShowLookup(true)}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'transparent', border: `1px solid ${theme.border}` }}>
            <span className="text-base leading-none">🔍</span>
            <span className="text-sm font-bold" style={{ color: theme.textSecondary }}>Unit Lookup</span>
          </motion.button>
        </div>

        {/* Footer note */}
        <div className="px-4 py-4 border-t" style={{ borderColor: theme.border }}>
          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary, opacity: 0.6 }}>
            Unofficial fan app. Not affiliated with Games Workshop.
          </p>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={screen}
              className="absolute inset-0"
              initial={{ opacity: 0, x: dir * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile bottom nav ── */}
        {showBottomNav && (
          <div
            className="md:hidden grid border-t shrink-0"
            style={{
              gridTemplateColumns: `repeat(${NAV_TABS.length}, 1fr)`,
              background: theme.navBg,
              borderColor: theme.border,
            }}
          >
            {NAV_TABS.map(tab => {
              const isActive = !tab.isOverlay && activeTabId === tab.id
              const hasBadge = tab.id === 'battle' && battleActive
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => {
                    if (tab.isOverlay) { setShowLookup(true); return }
                    tab.id === 'battle'
                      ? navigate(battleActive ? 'battle' : 'armyBuilder')
                      : navigate(tab.id)
                  }}
                  whileTap={{ scale: 0.88 }}
                  className="flex flex-col items-center justify-center py-2.5 gap-0.5 relative"
                  style={{
                    background: isActive ? theme.surfaceHigh : 'transparent',
                    borderTop: isActive ? `2px solid ${theme.secondary}` : '2px solid transparent',
                  }}
                >
                  <motion.span
                    className="text-base leading-none"
                    animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tab.icon}
                  </motion.span>
                  <span className="text-xs font-bold tracking-wide"
                    style={{ color: isActive ? theme.textPrimary : theme.textSecondary }}>
                    {tab.label === 'MathHammer' ? 'Calc' : tab.label}
                  </span>
                  {hasBadge && (
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute top-2 right-1/4 w-2 h-2 rounded-full"
                      style={{ background: theme.hpFull }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
