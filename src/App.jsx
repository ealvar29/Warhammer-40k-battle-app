import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { themes } from './themes/index'
import { NavIcon, PhaseIcon, FactionIcon } from './components/GameIcon'
import { GiLightningTrio } from 'react-icons/gi'
import HomeScreen from './screens/HomeScreen'
import ArmyBuilderScreen from './screens/ArmyBuilderScreen'
import BattleDemo from './components/BattleDemo'
import DeployScreen from './screens/DeployScreen'
import MissionSetupScreen from './screens/MissionSetupScreen'
import CrusadeScreen from './screens/CrusadeScreen'
import ListBuilderScreen from './screens/ListBuilderScreen'
import PortraitManagerScreen from './screens/PortraitManagerScreen'
import UnitLookupOverlay from './components/UnitLookupOverlay'
import FactionAmbience from './components/FactionAmbience'
import FactionFX from './components/FactionFX'
import { useBattleStore } from './store/battleStore'
import { useListStore } from './store/listStore'
import { useBattleSync } from './hooks/useBattleSync'
import { parseShareUrl } from './utils/armyShare'
import { buildUnitsFromIds, findDetachment, FACTION_META } from './data/factionRegistry'

const FACTION_THEME_MAP = {
  // Imperium
  spacewolves:       'spacewolves',
  spacemarines:      'ultramarines',
  darkangels:        'darkangels',
  admech:            'imperialGold',
  // Chaos
  chaosspacemarines: 'grimdark',
  deathguard:        'grimdark',
  worldeaters:       'grimdark',
  thousandsons:      'grimdark',
  emperorschildren:  'grimdark',
  // Xenos
  tyranids:          'hivemind',
  aeldari:           'aeldari',
  necrons:           'necrons',
  tau:               'tau',
}

const NAV_TABS = [
  { id: 'home',    label: 'Home'    },
  { id: 'battle',  label: 'Battle'  },
  { id: 'lists',   label: 'Lists'   },
  { id: 'crusade', label: 'Crusade' },
  { id: 'search',  label: 'Search',  isOverlay: true },
]

const TAB_ORDER = ['home', 'battle', 'lists', 'crusade', 'armyBuilder', 'missionSetup', 'deploy', 'portraits']
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
  const battleActive    = useBattleStore(s => s.battleActive)
  const faction         = useBattleStore(s => s.faction)
  const cp              = useBattleStore(s => s.cp)
  const setOpponentArmy = useBattleStore(s => s.setOpponentArmy)
  const listFaction     = useListStore(s => s.selectedFaction)

  const activeFaction = faction || listFaction
  const theme = themes[FACTION_THEME_MAP[activeFaction]] || themes.grimdark

  // ── SignalR multiplayer sync ─────────────────────────────────────────────
  const { isInRoom, syncCp, syncPhase, syncStratagem, stratagemAlert, chargeAlert, clearStratagemAlert, clearChargeAlert } = useBattleSync()
  const prevCpRef = useRef(cp)
  useEffect(() => {
    if (isInRoom && cp !== prevCpRef.current) {
      syncCp(cp)
    }
    prevCpRef.current = cp
  }, [cp, isInRoom, syncCp])

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
    setShowLookup(false)
  }

  const dir = slideDir(prevScreen, screen)

  const renderScreen = () => {
    switch (screen) {
      case 'home':         return <HomeScreen theme={theme} onNavigate={navigate} />
      case 'armyBuilder':  return <ArmyBuilderScreen theme={theme} onNavigate={navigate} />
      case 'missionSetup': return <MissionSetupScreen theme={theme} onNavigate={navigate} />
      case 'deploy':       return <DeployScreen theme={theme} onNavigate={navigate} />
      case 'battle':       return <BattleDemo theme={theme} onNavigate={navigate}
                             onPhaseChange={isInRoom ? syncPhase : undefined}
                             onStratagemUse={isInRoom ? syncStratagem : undefined} />
      case 'lists':        return <ListBuilderScreen theme={theme} />
      case 'crusade':      return <CrusadeScreen theme={theme} />
      case 'portraits':    return <PortraitManagerScreen theme={theme} onNavigate={navigate} />
      default:             return <HomeScreen theme={theme} onNavigate={navigate} />
    }
  }

  const showBottomNav = screen !== 'armyBuilder' && screen !== 'missionSetup' && screen !== 'portraits'
  const activeTabId = screen === 'armyBuilder' || screen === 'missionSetup' || screen === 'calc' ? 'battle' : screen
  const navTabsDesktop = NAV_TABS.filter(t => !t.isOverlay)

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: theme.bg }}>

      {/* ── Faction ambient particles ── */}
      <FactionAmbience factionId={activeFaction} />

      {/* ── Faction dramatic FX — only fires during active battle on the battle screen ── */}
      <FactionFX factionId={battleActive && screen === 'battle' ? activeFaction : null} />

      {/* ── Stratagem alert toast (opponent used a stratagem) ── */}
      <AnimatePresence>
        {stratagemAlert && (
          <motion.div
            key="strat-alert"
            className="fixed top-4 left-1/2 z-[80] w-[92vw] max-w-sm -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            style={{ border: `1px solid #ef444455`, background: '#1a0a0a' }}
          >
            <div className="px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
                  style={{ background: '#ef444420', border: '1px solid #ef444440' }}>
                  ⚠️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black tracking-widest uppercase mb-0.5" style={{ color: '#ef4444' }}>
                    Opponent Used a Stratagem
                  </p>
                  <p className="text-sm font-black leading-tight" style={{ color: '#fff' }}>
                    {stratagemAlert.stratagemName}
                    <span className="font-normal text-xs ml-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      -{stratagemAlert.cost}CP
                    </span>
                  </p>
                  {stratagemAlert.effect && (
                    <p className="text-xs mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {stratagemAlert.effect}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {stratagemAlert.phase && (
                      <span className="flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{ background: '#ef444420', color: '#ef4444', fontSize: 8 }}>
                        <PhaseIcon phase={stratagemAlert.phase} size={9} color="#ef4444" />
                        {stratagemAlert.phase?.toUpperCase()}
                      </span>
                    )}
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Opponent CP left: {stratagemAlert.opponentCpRemaining ?? '—'}
                    </span>
                  </div>
                </div>
                <button onClick={clearStratagemAlert}
                  className="text-xs w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Charge alert toast (opponent declared a charge) ── */}
      <AnimatePresence>
        {chargeAlert && (
          <motion.div
            key="charge-alert"
            className="fixed top-4 left-1/2 z-[79] w-[92vw] max-w-sm -translate-x-1/2 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            style={{ border: '1px solid #f59e0b55', background: '#1a1200' }}
          >
            <div className="px-4 py-3 flex items-center gap-3">
              <GiLightningTrio size={22} color="#f59e0b" className="shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-black tracking-widest uppercase mb-0.5" style={{ color: '#f59e0b' }}>
                  Charge Declared
                </p>
                <p className="text-sm font-bold" style={{ color: '#fff' }}>
                  {chargeAlert} is charging — overwatch opportunity
                </p>
              </div>
              <button onClick={clearChargeAlert}
                className="text-xs w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}44` }}>
                    <FactionIcon id={pendingImport.faction} size={26} color={meta.color} />
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
                <NavIcon id={tab.id} size={18}
                  color={isActive ? theme.secondary : theme.textSecondary} />
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
            <NavIcon id="search" size={17} color={theme.textSecondary} />
            <span className="text-sm font-bold" style={{ color: theme.textSecondary }}>Unit Lookup</span>
          </motion.button>
        </div>

        {/* Footer note */}
        <div className="px-4 py-4 border-t" style={{ borderColor: theme.border }}>
          <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary, opacity: 0.6 }}>
            Unofficial fan app. Not affiliated with Games Workshop.
          </p>
          <p className="text-xs mt-1 font-mono" style={{ color: theme.textSecondary, opacity: 0.35 }}>
            v{__APP_VERSION__} · {__BUILD_DATE__}
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
          <div className="md:hidden shrink-0">
          <div
            className="grid border-t"
            style={{
              gridTemplateColumns: `repeat(${NAV_TABS.length}, 1fr)`,
              background: theme.navBg,
              borderColor: theme.border,
              position: 'relative',
              zIndex: 80,
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
                    className="leading-none flex items-center justify-center"
                    animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NavIcon id={tab.id} size={20}
                      color={isActive ? theme.secondary : theme.textSecondary} />
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
          <div className="text-center pb-1" style={{ background: theme.navBg }}>
            <span className="font-mono" style={{ color: theme.textSecondary, opacity: 0.3, fontSize: 9 }}>
              v{__APP_VERSION__} · {__BUILD_DATE__}
            </span>
          </div>
          </div>
        )}
      </div>
    </div>
  )
}
