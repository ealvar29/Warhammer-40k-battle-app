// Units that have mechanical effects during specific battle phases.
// Used by BattleDemo to surface contextual reminders when these units
// are in the active army list.
//
// type:
//   'cpGain'        — guaranteed CP at start/end of phase, show apply button
//   'cpConditional' — conditional CP (roll, test, resource), show reminder only
//   'cpKill'        — CP awarded for destroying an enemy unit in this phase
//   'cpFree'        — lets you use a stratagem for free / reduced cost
//   'reminder'      — notable mechanic worth calling out, no CP component

export const PHASE_EFFECTS = [
  // ── COMMAND PHASE ──────────────────────────────────────────────────────────

  // Guaranteed +1 CP
  {
    unitId: 'bjorn',
    unitName: 'Bjorn the Fell-Handed',
    abilityName: 'Ancient Tactician',
    phase: 'command',
    type: 'cpGain',
    amount: 1,
    note: 'if this model is on the battlefield',
  },
  {
    unitId: 'azrael',
    unitName: 'Azrael',
    abilityName: 'Masterful Tactician',
    phase: 'command',
    type: 'cpGain',
    amount: 1,
    note: 'if this model is on the battlefield',
  },
  {
    unitId: 'swarmlord',
    unitName: 'The Swarmlord',
    abilityName: 'Hive Commander',
    phase: 'command',
    type: 'cpGain',
    amount: 1,
    note: 'if this model is on the battlefield',
  },
  {
    unitId: 'lordSolarLeontus',
    unitName: 'Lord Solar Leontus',
    abilityName: 'The Lord Solar',
    phase: 'command',
    type: 'cpGain',
    amount: 1,
    note: 'if this model is on the battlefield',
  },
  {
    unitId: 'imotekhTheStormlord',
    unitName: 'Imotekh the Stormlord',
    abilityName: 'Grand Strategist',
    phase: 'command',
    type: 'cpGain',
    amount: 1,
    note: 'if this model is on the battlefield',
  },

  // Conditional CP (roll / test / resource required)
  {
    unitId: 'gretchin',
    unitName: 'Gretchin',
    abilityName: "Thievin' Scavengers",
    phase: 'command',
    type: 'cpConditional',
    note: 'Roll D6 per objective you control with this unit — on 4+, gain 1CP',
  },
  {
    unitId: 'epidemius',
    unitName: 'Epidemius',
    abilityName: 'Tally of Pestilence',
    phase: 'command',
    type: 'cpConditional',
    note: 'If the Tally of Pestilence is 7+, gain 1CP and reset the Tally',
  },
  {
    unitId: 'rotigus',
    unitName: 'Rotigus',
    abilityName: 'One Head Looks Forward',
    phase: 'command',
    type: 'cpConditional',
    note: 'End of Command phase: take a Leadership test — if passed, gain 1CP',
  },
  {
    unitId: 'junithEruita',
    unitName: 'Junith Eruita',
    abilityName: 'Fiery Conviction',
    phase: 'command',
    type: 'cpConditional',
    note: 'Discard 1 Miracle dice to gain 1CP, or take a Leadership test — if passed, gain 1CP',
  },
  {
    unitId: 'memnyrStrategist',
    unitName: 'Memnyr Strategist',
    abilityName: 'Computational Mastermind',
    phase: 'command',
    type: 'cpConditional',
    note: 'End of Command phase: for each objective controlled, spend 1YP to gain 1CP',
  },

  // Free / reduced cost stratagems
  {
    unitId: 'ursulaCreeD',
    unitName: 'Ursula Creed',
    abilityName: 'Tactical Genius',
    phase: 'command',
    type: 'cpFree',
    note: 'Once per battle round, one friendly REGIMENT unit within 12" can use a 1CP Stratagem for 0CP',
  },

  // ── FIGHT PHASE ────────────────────────────────────────────────────────────

  {
    unitId: 'asmodai',
    unitName: 'Asmodai',
    abilityName: 'Feared Interrogator',
    phase: 'fight',
    type: 'cpKill',
    note: 'Each time this unit destroys an enemy CHARACTER unit in melee, gain 1CP',
  },
  {
    unitId: 'oldOneEye',
    unitName: 'Old One Eye',
    abilityName: 'Feeder Tendrils',
    phase: 'fight',
    type: 'cpKill',
    note: 'Each time this model destroys an enemy CHARACTER model, gain 1CP',
  },
  {
    unitId: 'brotherhoodChaplain',
    unitName: 'Brotherhood Chaplain',
    abilityName: 'Inspiring Exemplar',
    phase: 'fight',
    type: 'cpKill',
    note: 'Each time this model destroys an enemy CHARACTER model, gain 1CP',
  },
  {
    unitId: 'archon',
    unitName: 'Archon',
    abilityName: 'Bloody Spectacle',
    phase: 'fight',
    type: 'cpKill',
    note: 'Each time this unit destroys a CHARACTER model, gain 1CP',
  },
  {
    unitId: 'skulltaker',
    unitName: 'Skulltaker',
    abilityName: 'Skulls for Khorne',
    phase: 'fight',
    type: 'cpKill',
    note: 'Each time this unit destroys an enemy CHARACTER unit, gain 1CP',
  },
]
