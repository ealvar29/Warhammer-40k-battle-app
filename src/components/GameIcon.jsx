// Centralized SVG icon mapping using game-icons (react-icons/gi).
// Use PhaseIcon for battle phases, NavIcon for bottom nav, GameIcon for misc use.
import React from 'react'
import {
  // Phase icons
  GiScrollUnfurled,    // command — orders
  GiBootStomp,         // movement — marching boots
  GiBullseye,          // shooting — targeting
  GiChargingBull,      // charge — charging into combat
  GiCrossedSwords,     // fight — melee
  // Nav icons
  GiCastle,            // home
  GiWarhammer,         // battle
  GiOpenBook,          // lists
  GiTrophy,            // crusade
  GiSpyglass,          // search / codex lookup
  // Misc icons
  GiWolfHead,          // Space Wolves / faction
  GiShield,            // defense / stratagems
  GiHelmet,            // units / soldiers
  GiChestArmor,        // armor / units alt
  GiBinoculars,        // scouting / oversight
} from 'react-icons/gi'

// ── Phase icon map ────────────────────────────────────────────────────────────
export const PHASE_ICON_MAP = {
  command:  GiScrollUnfurled,
  movement: GiBootStomp,
  shooting: GiBullseye,
  charge:   GiChargingBull,
  fight:    GiCrossedSwords,
}

// ── Bottom nav / sidebar icon map ─────────────────────────────────────────────
export const NAV_ICON_MAP = {
  home:    GiCastle,
  battle:  GiWarhammer,
  lists:   GiOpenBook,
  crusade: GiTrophy,
  search:  GiSpyglass,
}

// ── Semantic icon map (misc use) ─────────────────────────────────────────────
export const ICON_MAP = {
  wolf:       GiWolfHead,
  shield:     GiShield,
  helmet:     GiHelmet,
  armor:      GiChestArmor,
  stratagems: GiShield,
  lightning:  GiShield,       // alias for stratagems tab
  binoculars: GiBinoculars,
}

// ── Components ────────────────────────────────────────────────────────────────

export function PhaseIcon({ phase, size = 18, color, style, className }) {
  const Icon = PHASE_ICON_MAP[phase]
  if (!Icon) return null
  return <Icon size={size} color={color} style={style} className={className} />
}

export function NavIcon({ id, size = 18, color, style, className }) {
  const Icon = NAV_ICON_MAP[id]
  if (!Icon) return null
  return <Icon size={size} color={color} style={style} className={className} />
}

export function GameIcon({ name, size = 18, color, style, className }) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon size={size} color={color} style={style} className={className} />
}
