export const tyranidDetachments = {
  invasionFleet: {
    id: 'invasionFleet',
    name: 'Invasion Fleet',
    subtitle: 'Consume. Adapt. Evolve.',
    playstyle: 'Balanced all-comers — pick a Hyper-Adaptation each round to match the threat.',
    detachmentRule: {
      name: 'Hyper-Adaptations',
      description: 'At the start of each battle round, select one of the three Hyper-Adaptations below for your army. The selected adaptation applies to all friendly TYRANIDS units until the end of that battle round.',
    },
    commandPhaseAction: {
      type: 'pick_one',
      perRound: true,
      confirmLabel: 'Select this Adaptation →',
      label: 'Hyper-Adaptation',
      prompt: 'Select one Hyper-Adaptation for this battle round:',
      options: [
        {
          id: 'swarmingInstincts',
          label: 'Swarming Instincts',
          icon: '🐛',
          shortEffect: 'Sustained Hits 1 vs Infantry/Swarm',
          fullEffect: 'Each time a model in a friendly TYRANIDS unit makes a melee attack that targets an INFANTRY or SWARM unit, that attack has the [SUSTAINED HITS 1] ability.',
          mathBonus: { sustainedHits: 1 },
          mathBonusLabel: 'Sustained Hits 1 (vs INFANTRY/SWARM)',
          unitEffects: {
            phases: ['fight'],
            factionKeywords: ['TYRANIDS'],
            badge: 'Sustained Hits 1',
            badgeColor: '#34d399',
            why: 'vs INFANTRY/SWARM — melee attacks score an extra hit on a 5+',
          },
        },
        {
          id: 'hyperAggression',
          label: 'Hyper-aggression',
          icon: '💥',
          shortEffect: 'Lethal Hits vs Monsters/Vehicles',
          fullEffect: 'Each time a model in a friendly TYRANIDS unit makes a melee attack that targets a MONSTER or VEHICLE unit, that attack has the [LETHAL HITS] ability.',
          mathBonus: { lethalHits: true },
          mathBonusLabel: 'Lethal Hits (vs MONSTER/VEHICLE)',
          unitEffects: {
            phases: ['fight'],
            factionKeywords: ['TYRANIDS'],
            badge: 'Lethal Hits',
            badgeColor: '#f87171',
            why: 'vs MONSTER/VEHICLE — wound rolls of 6 auto-wound, no save',
          },
        },
        {
          id: 'hivePredators',
          label: 'Hive Predators',
          icon: '🎯',
          shortEffect: 'Precision vs Characters',
          fullEffect: 'Each time a model in a friendly TYRANIDS unit makes a melee attack that targets a CHARACTER unit, that attack has the [PRECISION] ability.',
          mathBonus: null,
          mathBonusLabel: 'Precision (vs CHARACTER — no MathHammer effect)',
          unitEffects: {
            phases: ['fight'],
            factionKeywords: ['TYRANIDS'],
            badge: 'Precision',
            badgeColor: '#c084fc',
            why: 'vs CHARACTER — attacks can snipe the leader through the bodyguard',
          },
        },
      ],
    },
    enhancements: [
      {
        name: 'Alien Cunning',
        cost: 20,
        description: 'Once per battle, after both armies have deployed but before the first battle round begins, select up to 2 friendly TYRANIDS units and redeploy them anywhere in your deployment zone.',
      },
      {
        name: 'Perfectly Adapted',
        cost: 15,
        description: 'The bearer has the Feel No Pain 4+ ability against ranged attacks.',
      },
      {
        name: 'Synaptic Linchpin',
        cost: 25,
        description: "The Synapse aura range of the bearer's unit is increased by 6\". While the bearer is on the battlefield, friendly TYRANIDS units within 12\" of the bearer can re-roll Battleshock tests.",
      },
      {
        name: 'Adaptive Biology',
        cost: 30,
        description: 'The bearer has the Feel No Pain 5+ ability. At the start of each of your Command phases, the bearer regains 1 lost wound.',
      },
    ],
    stratagems: [
      {
        id: 'rapidRegeneration', name: 'Rapid Regeneration', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before a TYRANIDS unit fights',
        effect: 'Until the end of the phase, models in your unit have the Feel No Pain 6+ ability. If your unit is within Synapse Range of a friendly TYRANIDS unit, models in your unit have the Feel No Pain 5+ ability instead.',
        keywords: ['Fight', 'Defence'],
      },
      {
        id: 'deathFrenzy_t', name: 'Death Frenzy', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before a TYRANIDS unit fights',
        effect: 'Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play. That model fights next, then it is removed.',
        keywords: ['Fight', 'On Death'],
      },
      {
        id: 'adrenalSurge', name: 'Adrenal Surge', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before a TYRANIDS unit fights',
        effect: 'Until the end of the phase, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
        keywords: ['Fight', 'Buff'],
      },
      {
        id: 'overrun', name: 'Overrun', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — after a TYRANIDS unit has fought',
        effect: 'Until the end of the phase, each time your unit Consolidates, models in it can move an additional 3" as long as your unit can end that move within Engagement Range of one or more enemy units.',
        keywords: ['Fight', 'Movement'],
      },
      {
        id: 'predatoryImperative', name: 'Predatory Imperative', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'active',
        timing: 'Any phase — when a Hyper-Adaptation is active',
        effect: 'Select one Hyper-adaptation. Until the start of your next Command phase, that Hyper-adaptation is active for your selected units in addition to any other that may be active for your army.',
        keywords: ['Buff'],
      },
    ],
  },

  crusherStampede: {
    id: 'crusherStampede',
    name: 'Crusher Stampede',
    subtitle: 'The earth shakes. Bones shatter.',
    playstyle: 'Monster-heavy shock assault — every Charge move triggers D3 mortal wounds on anything nearby. Stack as many Monsters as possible, charge into multiple enemies at once, and watch the mortals cascade. Enhancements make your Monsters nearly unkillable or devastatingly lethal on the charge.',
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
        description: "TYRANIDS model only. The bearer's unit is never affected by the Look Out, Sir rule. In addition, add 1 to Hit rolls for attacks made by models in the bearer's unit against CHARACTER units.",
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
        effect: 'Select one TYRANIDS unit from your army. Until the end of the phase, each time a model in that unit makes a melee attack, an unmodified Wound roll of 6 inflicts 1 additional mortal wound on the target.',
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
