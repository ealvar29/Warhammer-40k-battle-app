export const tyranidDetachments = {
  invasionFleet: {
    id: 'invasionFleet',
    name: 'Invasion Fleet',
    subtitle: 'Consume. Adapt. Evolve.',
    playstyle: 'Balanced all-comers with synapse-buffed hordes.',
    detachmentRule: {
      name: 'Synaptic Nexus',
      description: 'Friendly TYRANIDS CORE units within 6" of a SYNAPSE model can re-roll Battleshock tests. In addition, once per turn, when a friendly SYNAPSE model within range would be destroyed, roll one D6: on a 5+, it is not destroyed and instead suffers D3 mortal wounds.',
    },
    enhancements: [
      {
        name: 'Perfectly Adapted',
        cost: 15,
        description: 'The bearer has the Feel No Pain 4+ ability when targeted by ranged attacks.',
      },
      {
        name: 'Alien Cunning',
        cost: 20,
        description: 'Once per battle, you can redeploy up to 3 friendly TYRANIDS units before the first battle round begins.',
      },
    ],
    stratagems: [
      {
        id: 'adaptivePhysiology_t', name: 'Adaptive Physiology', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Command phase',
        effect: 'Select one TYRANIDS MONSTER or INFANTRY unit from your army. Until the end of the battle round, that unit has the Feel No Pain 5+ ability.',
        keywords: ['Command', 'FNP'],
      },
      {
        id: 'lurkerInTheDeep', name: 'Lurker in the Deep', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Movement phase',
        effect: 'Select one TYRANIDS INFANTRY unit from your army. Until the end of the phase, that unit can move through terrain as if it were not there and gains the Stealth ability.',
        keywords: ['Movement', 'Stealth'],
      },
      {
        id: 'feedingFrenzy', name: 'Feeding Frenzy', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one TYRANIDS unit from your army. Until the end of the phase, each time a model in that unit makes a melee attack, a Wound roll of 6 inflicts 1 additional mortal wound on the target.',
        keywords: ['Fight', 'Mortal Wounds'],
      },
      {
        id: 'synapticBarrier_t', name: 'Synaptic Barrier', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — when targeting a SYNAPSE unit",
        effect: 'Select one TYRANIDS SYNAPSE unit from your army that is being targeted. Until the end of the phase, subtract 1 from Hit rolls made against that unit.',
        keywords: ['Shooting', 'Reaction', 'SYNAPSE'],
      },
      {
        id: 'spawnMoreGaunts', name: 'Endless Waves', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Command phase',
        effect: 'Select one destroyed TERMAGANTS or HORMAGAUNTS unit. Set it up anywhere more than 9" from all enemy models at half its starting model count.',
        keywords: ['Command', 'Respawn'],
      },
      {
        id: 'toxicSpines', name: 'Toxic Miasma', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Fight phase — when an enemy unit attacks one of your MONSTER units",
        effect: 'The attacking enemy unit suffers D3 mortal wounds at the end of the Fight phase.',
        keywords: ['Fight', 'Reaction', 'Monster'],
      },
    ],
  },

  crusherStampede: {
    id: 'crusherStampede',
    name: 'Crusher Stampede',
    subtitle: 'The earth shakes. Bones shatter.',
    playstyle: 'Monster-heavy shock assault.',
    detachmentRule: {
      name: 'Stampede',
      description: 'Each time a MONSTER unit from your army ends a Charge move, roll one D6 for each enemy unit within Engagement Range: on a 2+, that unit suffers D3 mortal wounds.',
    },
    enhancements: [
      {
        name: 'Biomorphic Carapace',
        cost: 20,
        description: "TYRANIDS MONSTER model only. Improve the bearer's Save characteristic by 1 (to a minimum of 2+). Each time an attack with a Damage characteristic of 1 is allocated to the bearer, that attack has no effect.",
      },
      {
        name: 'Engorged Sacs',
        cost: 15,
        description: "TYRANIDS MONSTER model only. Add 1 to the Attacks characteristic of the bearer's melee weapons. Each time the bearer makes a Charge move, add 2 to those Attacks characteristics (instead of 1) until the end of the turn.",
      },
      {
        name: 'Adaptive Onslaught',
        cost: 10,
        description: 'TYRANIDS MONSTER model only. Each time the bearer is selected to fight, if it made a Charge move this turn, its melee weapons have the [DEVASTATING WOUNDS] ability until the end of the phase.',
      },
    ],
    stratagems: [
      {
        id: 'crushingWeight', name: 'Crushing Weight', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one TYRANIDS MONSTER unit from your army. Until the end of the phase, each time that model makes a melee attack, add 1 to the Wound roll.',
        keywords: ['Fight', 'Monster'],
      },
      {
        id: 'chitinousHide', name: 'Chitinous Hide', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — when targeting a MONSTER",
        effect: 'Select one TYRANIDS MONSTER from your army that is being targeted. Until the end of the phase, that model has a 4+ invulnerable save.',
        keywords: ['Shooting', 'Reaction', 'Monster'],
      },
    ],
  },

  vanguardOnslaught: {
    id: 'vanguardOnslaught',
    name: 'Vanguard Onslaught',
    subtitle: 'Strike from the shadows. Kill before they can react.',
    playstyle: 'Infiltration and alpha-strike — deploy aggressively, kill early, swarm the backline.',
    detachmentRule: {
      name: 'Predatory Instincts',
      description: "Each TYRANIDS unit from your army (excluding MONSTERS) can be given the Scouts 6\" ability during deployment. In addition, each time a model in a TYRANIDS unit (excluding MONSTERS) makes an attack against a unit that has not yet been selected to shoot or fight this battle round, add 1 to the Wound roll.",
    },
    enhancements: [
      {
        name: 'Pheromone Trail',
        cost: 15,
        description: "TYRANIDS model only. Once per battle, at the end of your Movement phase, select one friendly TYRANIDS unit in Reserves. That unit can arrive this phase even if it is not the turn it is normally eligible to do so, and can be set up anywhere more than 6\" from all enemy models.",
      },
      {
        name: 'Hyper-reactive Neuroglia',
        cost: 20,
        description: "TYRANIDS model only. The bearer's unit is never affected by the Look Out, Sir rule (enemy characters cannot redirect attacks to this unit). In addition, add 1 to Hit rolls for attacks made by models in the bearer's unit against CHARACTER units.",
      },
      {
        name: 'Tenacious Survivor',
        cost: 10,
        description: "TYRANIDS INFANTRY model only. The bearer has the Feel No Pain 5+ ability. The first time the bearer is destroyed, roll one D6: on a 4+, set the bearer back up with 1 wound remaining.",
      },
    ],
    stratagems: [
      {
        id: 'hiddenStrike', name: 'Hidden Strike', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase',
        effect: "Select one TYRANIDS INFANTRY unit from your army that has the Infiltrators or Scouts ability. Until the end of the turn, that unit can declare a charge even if it Advanced this phase. Add 2 to Charge rolls made for it this turn.",
        keywords: ['Movement', 'Charge', 'Infiltrate'],
      },
      {
        id: 'venomousBite', name: 'Venomous Bite', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one TYRANIDS unit from your army. Until the end of the phase, each time a model in that unit makes a melee attack, an unmodified Wound roll of 6 inflicts 1 additional mortal wound on the target (in addition to the normal damage).',
        keywords: ['Fight', 'Mortal Wounds'],
      },
      {
        id: 'overwatchScreen', name: 'Overwatch Screen', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Charge phase — just after an enemy unit declares a charge",
        effect: "Select one TYRANIDS INFANTRY unit from your army that is within 12\" of the charging enemy unit. Your unit can shoot that enemy unit as if it were your Shooting phase.",
        keywords: ['Reaction', 'Shooting', 'Overwatch'],
      },
      {
        id: 'meltIntoShadows', name: 'Melt into Shadows', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Fight phase — just after an enemy unit finishes its attacks",
        effect: "Select one TYRANIDS INFANTRY unit from your army that was targeted by those attacks, if it is not within Engagement Range of any enemy units. Remove your unit from the battlefield and place it into Strategic Reserves.",
        keywords: ['Reaction', 'Retreat'],
      },
      {
        id: 'swarmingInstinct', name: 'Swarming Instinct', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase',
        effect: "Select up to two TYRANIDS INFANTRY units from your army that are within 6\" of each other and have not been selected to move this phase. Both units can make a Normal Move of up to 6\". They can move within Engagement Range of enemy models but cannot end within Engagement Range.",
        keywords: ['Movement', 'Swarm'],
      },
      {
        id: 'chitinArmour', name: 'Chitin Armour', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — just after an enemy unit has selected its targets",
        effect: "Select one TYRANIDS INFANTRY unit from your army that was selected as the target. Until the end of the phase, improve the Save characteristic of models in that unit by 1.",
        keywords: ['Defence'],
      },
    ],
  },
}

export const tyranidDetachmentList = Object.values(tyranidDetachments)
