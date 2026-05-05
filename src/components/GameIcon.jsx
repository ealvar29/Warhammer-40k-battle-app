// Centralized SVG icon mapping using game-icons (react-icons/gi).
// Use PhaseIcon for battle phases, NavIcon for bottom nav, FactionIcon for factions.
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
  // Faction icons
  GiWolfHead,          // Space Wolves
  GiAlienBug,          // Tyranids
  GiSkullCrossedBones, // Chaos Space Marines
  GiWingedSword,       // Dark Angels
  GiGears,             // Adeptus Mechanicus
  GiHelmet,            // Space Marines (generic)
  GiGasMask,           // Death Guard
  GiSpikedArmor,       // Emperor's Children
  GiRayGun,            // T'au
  GiMagicAxe,          // Thousand Sons
  GiCrossedAxes,       // World Eaters
  GiLightSabers,       // Aeldari
  GiDeathSkull,        // Necrons
  GiMeatCleaver,       // Orks
  GiGauntlet,          // Astra Militarum
  GiSteelClaws,        // Blood Angels
  GiGothicCross,       // Black Templars
  GiAngelOutfit,       // Adepta Sororitas
  GiVibratingShield,   // Grey Knights
  GiLaurelCrown,       // Adeptus Custodes
  GiSwordWound,        // Drukhari
  GiAngularSpider,     // Genestealer Cults
  GiWarPick,           // Leagues of Votann
  GiDragonHead,        // Chaos Daemons
  GiBinoculars,        // Deathwatch
  GiMedievalGate,      // Imperial Knights
  GiImplosion,         // Chaos Knights
  // Keyword trait icons
  GiSprint,            // assault — advance and fire
  GiMachineGun,        // heavy — stationary bonus
  GiMachineGunMagazine, // rapid fire — burst at range
  GiGrenade,           // blast — area damage
  GiFlamethrower,      // torrent — auto-hit spray
  GiBurningEmbers,     // melta — heat damage bonus
  GiDoubleShot,        // twin-linked — re-roll wounds
  GiSkullCrack,        // lethal hits — critical auto-wound
  GiSparkles,          // sustained hits — extra hits on 6
  GiSkullBolt,         // devastating wounds — mortal wounds on 6
  GiHazardSign,        // hazardous — self-damage risk
  GiArtilleryShell,    // indirect fire — arc fire
  GiEyeTarget,         // precision — snipe the leader
  GiHammerBreak,       // ignores cover — no cover saves
  GiPistolGun,         // pistol — shoot in melee
  GiArrowScope,        // anti — targeted vs keyword
  GiAmmoBox,           // one shot — limited ammo
  GiKatana,            // lance — bonus after charge
  GiFeatheredWing,     // fly — move over terrain
  GiParachute,         // deep strike — deploy from reserves
  GiRunningNinja,      // scouts — advance move pre-game
  GiHoodedFigure,      // lone operative — hard to snipe
  GiGhost,             // stealth — -1 to hit from range
  GiCrown,             // leader — attaches to unit
  GiHealingShield,     // feel no pain — ignore wounds
  GiMagicSwirl,        // psychic — psychic abilities
  // Misc icons
  GiShield,
  GiChestArmor,
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

// ── Faction icon map ──────────────────────────────────────────────────────────
export const FACTION_ICON_MAP = {
  spacewolves:       GiWolfHead,
  tyranids:          GiAlienBug,
  chaosspacemarines: GiSkullCrossedBones,
  darkangels:        GiWingedSword,
  admech:            GiGears,
  spacemarines:      GiHelmet,
  deathguard:        GiGasMask,
  emperorschildren:  GiSpikedArmor,
  tau:               GiRayGun,
  thousandsons:      GiMagicAxe,
  worldeaters:       GiCrossedAxes,
  aeldari:           GiLightSabers,
  necrons:           GiDeathSkull,
  orks:              GiMeatCleaver,
  astramilitarum:    GiGauntlet,
  bloodangels:       GiSteelClaws,
  blacktemplars:     GiGothicCross,
  adeptasororitas:   GiAngelOutfit,
  greyknights:       GiVibratingShield,
  adeptuscustodes:   GiLaurelCrown,
  drukhari:          GiSwordWound,
  genestealercults:  GiAngularSpider,
  leaguesofvotann:   GiWarPick,
  chaosdaemons:      GiDragonHead,
  deathwatch:        GiBinoculars,
  imperialknights:   GiMedievalGate,
  chaosknights:      GiImplosion,
}

// ── Semantic icon map (misc use) ─────────────────────────────────────────────
export const ICON_MAP = {
  wolf:       GiWolfHead,
  shield:     GiShield,
  helmet:     GiHelmet,
  armor:      GiChestArmor,
  stratagems: GiShield,
  lightning:  GiShield,
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

export function FactionIcon({ id, size = 18, color, style, className }) {
  const Icon = FACTION_ICON_MAP[id]
  if (!Icon) return null
  return <Icon size={size} color={color} style={style} className={className} />
}

export function GameIcon({ name, size = 18, color, style, className }) {
  const Icon = ICON_MAP[name]
  if (!Icon) return null
  return <Icon size={size} color={color} style={style} className={className} />
}

// ── Keyword icon map ──────────────────────────────────────────────────────────
export const KEYWORD_ICON_MAP = {
  // Weapon traits
  'assault':            GiSprint,
  'heavy':              GiMachineGun,
  'rapid fire':         GiMachineGunMagazine,
  'blast':              GiGrenade,
  'torrent':            GiFlamethrower,
  'melta':              GiBurningEmbers,
  'twin-linked':        GiDoubleShot,
  'lethal hits':        GiSkullCrack,
  'sustained hits':     GiSparkles,
  'devastating wounds': GiSkullBolt,
  'hazardous':          GiHazardSign,
  'indirect fire':      GiArtilleryShell,
  'precision':          GiEyeTarget,
  'ignores cover':      GiHammerBreak,
  'pistol':             GiPistolGun,
  'anti':               GiArrowScope,
  'one shot':           GiAmmoBox,
  'lance':              GiKatana,
  // Unit traits
  'fly':                GiFeatheredWing,
  'deep strike':        GiParachute,
  'scouts':             GiRunningNinja,
  'lone operative':     GiHoodedFigure,
  'stealth':            GiGhost,
  'leader':             GiCrown,
  'feel no pain':       GiHealingShield,
  'psychic':            GiMagicSwirl,
}

export function KeywordIcon({ keyword, size = 18, color, style, className }) {
  if (!keyword) return null
  const lower = String(keyword).trim().toLowerCase()
  let Icon = KEYWORD_ICON_MAP[lower]
  if (!Icon) {
    for (const [key, icon] of Object.entries(KEYWORD_ICON_MAP)) {
      if (lower.startsWith(key)) { Icon = icon; break }
    }
  }
  if (!Icon) return null
  return <Icon size={size} color={color} style={style} className={className} />
}
