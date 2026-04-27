// Leader characters — Space Wolves
export const leaders = {
  ragnar: {
    id: 'ragnar',
    name: 'Ragnar Blackmane',
    role: 'Lord of War',
    faction: 'spacewolves',
    keywords: ['INFANTRY', 'CHARACTER', 'LEGENDARY', 'WOLF LORD'],
  },
  wolfGuardPackLeader: {
    id: 'wolfGuardPackLeader',
    name: 'Wolf Guard Pack Leader',
    role: 'Pack Leader',
    faction: 'spacewolves',
    keywords: ['INFANTRY', 'CHARACTER', 'WOLF GUARD'],
  },
  ironPriest: {
    id: 'ironPriest',
    name: 'Iron Priest',
    role: 'Techmarine',
    faction: 'spacewolves',
    keywords: ['INFANTRY', 'CHARACTER', 'IRON PRIEST'],
  },
  bjorn: {
    id: 'bjorn',
    name: 'Bjorn the Fell-Handed',
    role: 'Venerable Dreadnought',
    faction: 'spacewolves',
    keywords: ['VEHICLE', 'CHARACTER', 'WALKER', 'LEGENDARY'],
  },

  // Leader characters — Chaos Space Marines
  abaddon: {
    id: 'abaddon',
    name: 'Abaddon the Despoiler',
    role: 'Warmaster',
    faction: 'chaosspacemarines',
    keywords: ['CHARACTER', 'INFANTRY', 'CHAOS LORD', 'HERETIC ASTARTES', 'ABADDON'],
  },
  daemonPrince: {
    id: 'daemonPrince',
    name: 'Daemon Prince',
    role: 'Daemon Lord',
    faction: 'chaosspacemarines',
    keywords: ['CHARACTER', 'MONSTER', 'DAEMON', 'HERETIC ASTARTES'],
  },
  chaosLord: {
    id: 'chaosLord',
    name: 'Chaos Lord',
    role: 'Warlord',
    faction: 'chaosspacemarines',
    keywords: ['CHARACTER', 'INFANTRY', 'CHAOS LORD', 'HERETIC ASTARTES'],
  },
  darkApostle: {
    id: 'darkApostle',
    name: 'Dark Apostle',
    role: 'Chaos Chaplain',
    faction: 'chaosspacemarines',
    keywords: ['CHARACTER', 'INFANTRY', 'DARK APOSTLE', 'HERETIC ASTARTES'],
  },
  exaltedChampion: {
    id: 'exaltedChampion',
    name: 'Exalted Champion',
    role: 'Elite Fighter',
    faction: 'chaosspacemarines',
    keywords: ['CHARACTER', 'INFANTRY', 'HERETIC ASTARTES'],
  },

  // Leader characters — Tyranids
  hiveTyrant: {
    id: 'hiveTyrant',
    name: 'Hive Tyrant',
    role: 'Warlord Monster',
    faction: 'tyranids',
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'SYNAPSE', 'HIVE TYRANT'],
  },
  wingedHiveTyrant: {
    id: 'wingedHiveTyrant',
    name: 'Winged Hive Tyrant',
    role: 'Warlord Monster',
    faction: 'tyranids',
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'SYNAPSE', 'HIVE TYRANT'],
  },
  neurotyrant: {
    id: 'neurotyrant',
    name: 'Neurotyrant',
    role: 'Synapse Psyker',
    faction: 'tyranids',
    keywords: ['MONSTER', 'CHARACTER', 'FLY', 'SYNAPSE', 'PSYKER'],
  },
  broodlord: {
    id: 'broodlord',
    name: 'Broodlord',
    role: 'Genestealer Alpha',
    faction: 'tyranids',
    keywords: ['INFANTRY', 'CHARACTER', 'GENESTEALER', 'SYNAPSE'],
  },
  tyranidPrime: {
    id: 'tyranidPrime',
    name: 'Tyranid Prime',
    role: 'Warrior Alpha',
    faction: 'tyranids',
    keywords: ['INFANTRY', 'CHARACTER', 'SYNAPSE', 'TYRANID PRIME'],
  },
}

// Abilities unlocked per leader+unit pairing
// Key format: `${leaderId}_${unitId}`
export const leaderAbilities = {
  ragnar_bloodClaws: {
    leaderId: 'ragnar',
    unitId: 'bloodClaws',
    abilities: [
      {
        name: 'War Howl',
        phase: 'fight',
        description:
          'While this model is leading this unit, each time a model in this unit makes a melee attack, you may re-roll the Wound roll.',
        reminder: 'Re-roll wound rolls on all melee attacks this phase.',
      },
    ],
  },

  ragnar_headtakers: {
    leaderId: 'ragnar',
    unitId: 'headtakers',
    abilities: [
      {
        name: 'Savage Charge',
        phase: 'charge',
        description:
          'While this model is leading this unit, this unit can declare a Charge even if it Advanced this turn.',
        reminder: 'This unit can charge even after Advancing.',
      },
    ],
  },

  wolfGuardPackLeader_bloodClaws: {
    leaderId: 'wolfGuardPackLeader',
    unitId: 'bloodClaws',
    abilities: [
      {
        name: 'Veteran Guidance',
        phase: 'shooting',
        description:
          'While this model is leading this unit, each time a model in this unit makes a ranged attack, improve the Ballistic Skill by 1.',
        reminder: '+1 BS on all ranged attacks.',
      },
      {
        name: 'Pack Discipline',
        phase: 'fight',
        description:
          'While this model is leading this unit, add 1 to the Attacks characteristic of models in this unit while they are within range of an objective marker.',
        reminder: '+1 Attack near objectives.',
      },
    ],
  },

  wolfGuardPackLeader_greyHunters: {
    leaderId: 'wolfGuardPackLeader',
    unitId: 'greyHunters',
    abilities: [
      {
        name: 'Hunters Unleashed',
        phase: 'shooting',
        description:
          'While this model is leading this unit, each time a model in this unit makes a ranged attack that targets an enemy unit within half range, that attack has the [LETHAL HITS] ability.',
        reminder: 'Lethal Hits on ranged attacks at half range.',
      },
    ],
  },

  ironPriest_thunderwolfCavalry: {
    leaderId: 'ironPriest',
    unitId: 'thunderwolfCavalry',
    abilities: [
      {
        name: 'Blessing of the Machine',
        phase: 'command',
        description:
          'In your Command phase, this model can attempt to repair one friendly VEHICLE model within 3". If it does, restore up to D3 lost wounds to that model.',
        reminder: 'Repair D3 wounds on a friendly vehicle in range.',
      },
    ],
  },

  // ── TYRANIDS LEADER PAIRINGS ────────────────────────────────────────

  hiveTyrant_tyrantGuard: {
    leaderId: 'hiveTyrant',
    unitId: 'tyrantGuard',
    abilities: [
      {
        name: 'Guardian Organism',
        phase: 'any',
        description:
          'While a CHARACTER model is leading this unit, that model has the Feel No Pain 5+ ability.',
        reminder: '⚠ Your Hive Tyrant has Feel No Pain 5+ while leading Tyrant Guard.',
      },
      {
        name: 'Bodyguard',
        phase: 'any',
        description:
          'While a CHARACTER model is leading this unit, each time an attack targets that CHARACTER, if a model in this unit is within 3" of it, roll one D6: on a 2+, redirect that attack to the Tyrant Guard unit instead.',
        reminder: 'Tyrant Guard intercept attacks on your Hive Tyrant (2+ on D6).',
      },
    ],
  },

  wingedHiveTyrant_tyrantGuard: {
    leaderId: 'wingedHiveTyrant',
    unitId: 'tyrantGuard',
    abilities: [
      {
        name: 'Guardian Organism',
        phase: 'any',
        description:
          'While a CHARACTER model is leading this unit, that model has the Feel No Pain 5+ ability.',
        reminder: '⚠ Your Winged Hive Tyrant has Feel No Pain 5+ while leading Tyrant Guard.',
      },
      {
        name: 'Bodyguard',
        phase: 'any',
        description:
          'While a CHARACTER model is leading this unit, each time an attack targets that CHARACTER, if a model in this unit is within 3" of it, roll one D6: on a 2+, redirect that attack to the Tyrant Guard unit instead.',
        reminder: 'Tyrant Guard intercept attacks on your Winged Hive Tyrant (2+ on D6).',
      },
    ],
  },

  hiveTyrant_tyranidWarriors: {
    leaderId: 'hiveTyrant',
    unitId: 'tyranidWarriors',
    abilities: [
      {
        name: 'Synaptic Nexus',
        phase: 'command',
        description:
          'While this model is leading this unit, at the start of your Command phase, you can select one CORE or SYNAPSE unit within 12". Until the start of your next Command phase, add 1 to the Strength characteristic of melee weapons used by models in that unit.',
        reminder: '+1 Strength on melee weapons for a CORE/SYNAPSE unit within 12".',
      },
    ],
  },

  wingedHiveTyrant_tyranidWarriors: {
    leaderId: 'wingedHiveTyrant',
    unitId: 'tyranidWarriors',
    abilities: [
      {
        name: 'Synaptic Nexus',
        phase: 'command',
        description:
          'While this model is leading this unit, at the start of your Command phase, you can select one CORE or SYNAPSE unit within 12". Until the start of your next Command phase, add 1 to the Strength characteristic of melee weapons used by models in that unit.',
        reminder: '+1 Strength on melee weapons for a CORE/SYNAPSE unit within 12".',
      },
    ],
  },

  neurotyrant_tyranidWarriors: {
    leaderId: 'neurotyrant',
    unitId: 'tyranidWarriors',
    abilities: [
      {
        name: 'Resonance Barb',
        phase: 'command',
        description:
          'While this model is leading this unit, at the start of your Command phase, roll one D6 for each enemy unit within 12" of this unit. On a 4+, that unit suffers 1 mortal wound. On a 6, it suffers D3 mortal wounds instead.',
        reminder: 'Roll D6 per enemy within 12" — 4+ = 1 mortal wound, 6 = D3 mortal wounds.',
      },
    ],
  },

  neurotyrant_neurogaunts: {
    leaderId: 'neurotyrant',
    unitId: 'neurogaunts',
    abilities: [
      {
        name: 'Synaptic Channelling',
        phase: 'any',
        description:
          'While this model is leading this unit, the SYNAPSE range of this unit is increased by 6" and friendly TYRANIDS units within range of this unit\'s Synapse ability automatically pass Battleshock and Desperate Escape tests.',
        reminder: 'Synapse range +6". Units in range auto-pass Battleshock AND Desperate Escape.',
      },
    ],
  },

  broodlord_genestealers: {
    leaderId: 'broodlord',
    unitId: 'genestealers',
    abilities: [
      {
        name: 'Vicious Insight',
        phase: 'fight',
        description:
          'While this model is leading this unit, melee weapons equipped by models in this unit have the [DEVASTATING WOUNDS] ability.',
        reminder: 'All melee weapons in this unit gain DEVASTATING WOUNDS.',
      },
      {
        name: 'Hypnotic Gaze',
        phase: 'fight',
        description:
          'While this model is leading this unit, subtract 1 from Hit rolls made for enemy units while they are within Engagement Range of this unit.',
        reminder: 'Enemies in Engagement Range suffer -1 to Hit rolls.',
      },
    ],
  },

  tyranidPrime_tyranidWarriors: {
    leaderId: 'tyranidPrime',
    unitId: 'tyranidWarriors',
    abilities: [
      {
        name: 'Alpha Warrior',
        phase: 'fight',
        description:
          'While this model is leading this unit, melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.',
        reminder: 'All melee weapons in this unit gain Sustained Hits 1.',
      },
    ],
  },

  // ── CSM LEADER PAIRINGS ─────────────────────────────────────────────────────

  abaddon_chosen: {
    leaderId: 'abaddon',
    unitId: 'chosen',
    abilities: [
      {
        name: 'Eternal Warmaster',
        phase: 'fight',
        description: 'While this model is leading this unit, each time a model in this unit makes a melee attack, re-roll hit rolls of 1 and wound rolls of 1.',
        reminder: 'Re-roll hit and wound rolls of 1 for all melee attacks.',
      },
      {
        name: 'Warmaster of Chaos',
        phase: 'command',
        description: 'Once per battle round, you can use one Stratagem for 0 CP.',
        reminder: '⚡ One free Stratagem per battle round.',
      },
    ],
  },

  abaddon_chaosTerminators: {
    leaderId: 'abaddon',
    unitId: 'chaosTerminators',
    abilities: [
      {
        name: 'Eternal Warmaster',
        phase: 'fight',
        description: 'While this model is leading this unit, each time a model in this unit makes a melee attack, re-roll hit rolls of 1 and wound rolls of 1.',
        reminder: 'Re-roll hit and wound rolls of 1 for all melee attacks.',
      },
      {
        name: 'Warmaster of Chaos',
        phase: 'command',
        description: 'Once per battle round, you can use one Stratagem for 0 CP.',
        reminder: '⚡ One free Stratagem per battle round.',
      },
    ],
  },

  daemonPrince_chaosSpaceMarines: {
    leaderId: 'daemonPrince',
    unitId: 'chaosSpaceMarines',
    abilities: [
      {
        name: 'Dark Empowerment',
        phase: 'fight',
        description: 'While this model is leading this unit, melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.',
        reminder: 'All melee weapons in this unit gain Sustained Hits 1.',
      },
    ],
  },

  daemonPrince_chosen: {
    leaderId: 'daemonPrince',
    unitId: 'chosen',
    abilities: [
      {
        name: 'Dark Empowerment',
        phase: 'fight',
        description: 'While this model is leading this unit, melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability.',
        reminder: 'All melee weapons in this unit gain Sustained Hits 1.',
      },
    ],
  },

  chaosLord_chaosSpaceMarines: {
    leaderId: 'chaosLord',
    unitId: 'chaosSpaceMarines',
    abilities: [
      {
        name: 'Lord of the Long War',
        phase: 'fight',
        description: 'While this model is leading this unit, each time a model in this unit makes a melee attack, you can re-roll the Hit roll.',
        reminder: 'Re-roll all hit rolls on melee attacks.',
      },
    ],
  },

  chaosLord_chosen: {
    leaderId: 'chaosLord',
    unitId: 'chosen',
    abilities: [
      {
        name: 'Lord of the Long War',
        phase: 'fight',
        description: 'While this model is leading this unit, each time a model in this unit makes a melee attack, you can re-roll the Hit roll.',
        reminder: 'Re-roll all hit rolls on melee attacks.',
      },
    ],
  },

  darkApostle_chaosSpaceMarines: {
    leaderId: 'darkApostle',
    unitId: 'chaosSpaceMarines',
    abilities: [
      {
        name: 'Dark Zealotry',
        phase: 'fight',
        description: 'While this model is leading this unit, models in this unit have the Fights First ability.',
        reminder: '⚡ This unit fights first in the Fight phase.',
      },
      {
        name: 'Dark Prayers',
        phase: 'command',
        description: 'At the start of your Command phase, this model can attempt one prayer. On a 3+, one friendly HERETIC ASTARTES unit within 6" receives +1 to Strength on melee attacks until the start of your next Command phase.',
        reminder: '+1 Strength to a HERETIC ASTARTES unit within 6" on a 3+.',
      },
    ],
  },

  exaltedChampion_chaosSpaceMarines: {
    leaderId: 'exaltedChampion',
    unitId: 'chaosSpaceMarines',
    abilities: [
      {
        name: 'Slayer of Warriors',
        phase: 'fight',
        description: 'While this model is leading this unit, each time a model in this unit makes a melee attack, on an unmodified wound roll of 6, the Damage characteristic of that attack is increased by 1.',
        reminder: '+1 Damage on unmodified wound rolls of 6.',
      },
    ],
  },

  exaltedChampion_chosen: {
    leaderId: 'exaltedChampion',
    unitId: 'chosen',
    abilities: [
      {
        name: 'Slayer of Warriors',
        phase: 'fight',
        description: 'While this model is leading this unit, each time a model in this unit makes a melee attack, on an unmodified wound roll of 6, the Damage characteristic of that attack is increased by 1.',
        reminder: '+1 Damage on unmodified wound rolls of 6.',
      },
    ],
  },
}

// Maps each unit to eligible leader IDs (Space Wolves — Tyranids use eligibleLeaders on the unit)
export const unitLeaderMap = {
  bloodClaws: ['ragnar', 'wolfGuardPackLeader'],
  greyHunters: ['wolfGuardPackLeader'],
  thunderwolfCavalry: ['ironPriest'],
  headtakers: ['ragnar'],
  // CSM
  chaosSpaceMarines: ['chaosLord', 'daemonPrince', 'darkApostle', 'exaltedChampion'],
  chosen: ['abaddon', 'chaosLord', 'daemonPrince', 'exaltedChampion'],
  chaosTerminators: ['abaddon'],
}
