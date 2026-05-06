// Edition-specific rules constants — update this file when a new edition launches.
// Components and stores should import from here instead of hardcoding rule strings.

export const EDITION = '10th'
export const STARTING_CP = 0

export const PHASES = [
  { id: 'command',  label: 'Command',  icon: '⚜️', short: 'CMD' },
  { id: 'movement', label: 'Movement', icon: '🏃', short: 'MOV' },
  { id: 'shooting', label: 'Shooting', icon: '🎯', short: 'SHT' },
  { id: 'charge',   label: 'Charge',   icon: '⚔️', short: 'CHG' },
  { id: 'fight',    label: 'Fight',    icon: '💀', short: 'FGT' },
]

// Unit keywords that grant phase-specific relevance hints.
// Extend this list in 11th edition if keywords are renamed or added.
export const KEYWORD_PHASE_HINTS = {
  'DEEP STRIKE': { phase: 'movement', hint: 'Deep Strike — deploy from Reserves this phase' },
  'SCOUTS':      { phase: 'movement', hint: 'Scouts — advance move before battle' },
}

// Weapon keyword patterns that grant phase-specific hints.
// Ordered — first match wins within a phase.
export const WEAPON_KEYWORD_PHASE_HINTS = [
  {
    phase: 'shooting',
    test: /^TORRENT$/i,
    hint: (_kw, name) => `${name} auto-hits — great vs blobs`,
  },
  {
    phase: 'fight',
    test: /LETHAL HITS|SUSTAINED HITS/i,
    hint: (kw, _name) => `${kw}`,
  },
]

// Regex for detecting charge-bonus abilities (Ragnar's Battle-lust, etc.)
export const CHARGE_BONUS_PATTERN = /add \d|\+\d|bonus|extra attack/i
