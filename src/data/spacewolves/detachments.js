// Space Wolves chapter-specific detachments (10th edition, Faction Pack 1.2, December 2025)
// All SW chapter detachments enforce the Sons of Russ restriction:
// your army cannot include ADEPTUS ASTARTES units from any Chapter other than Space Wolves.

export const swDetachments = {

  sagaOfTheHunter: {
    id: 'sagaOfTheHunter',
    name: 'Saga of the Hunter',
    subtitle: 'Singling out the weak, overwhelming the strong.',
    playstyle: "Pack tactics — melee attacks get +1 Hit when you outnumber or flank the enemy. Saga completion adds +1 Wound.",
    chapterRestriction: true,
    detachmentRule: {
      name: "Pack's Quarry",
      description: "Each time a model in a SPACE WOLVES unit makes a melee attack that targets an enemy unit, if that enemy unit is within Engagement Range of one or more other ADEPTUS ASTARTES units from your army, OR if the attacking unit contains more models than that enemy unit: add 1 to the Hit roll. If your Saga is completed, add 1 to the Wound roll as well.",
    },
    commandPhaseAction: {
      type: 'designate_target',
      label: "Pack's Quarry",
      prompt: "Name your Pack's Quarry for this battle round:",
      placeholder: 'e.g. Chaos Terminators',
      effect: "Melee attacks vs the Quarry: +1 to Hit rolls if your attacking unit outnumbers the Quarry OR if another ADEPTUS ASTARTES unit is within Engagement Range of it.",
    },
    enhancements: [
      { name: 'Swift Hunter', cost: 20, description: "SPACE WOLVES model only. Models in the bearer's unit have the Scouts 7\" ability." },
      { name: 'Fenrisian Grit', cost: 15, description: 'ADEPTUS ASTARTES model only. The bearer has the Feel No Pain 4+ ability.' },
      { name: 'Wolf Master', cost: 5, description: "SPACE WOLVES model only. In your Command phase, select one friendly SPACE WOLVES unit within 9\" of the bearer. Until the start of your next Command phase, teeth and claws and Tyrnak and Fenrir weapons equipped by models in that unit have the [LETHAL HITS] ability." },
      { name: 'Feral Rage', cost: 10, description: "ADEPTUS ASTARTES model only. Add 1 to the Attacks characteristic of melee weapons equipped by the bearer. Each time the bearer ends a Charge move, until the end of the turn, add an additional 1 to the Attacks characteristic of those weapons." },
    ],
    stratagems: [
      {
        id: 'huntersTrail', name: "Hunters' Trail", cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: "Select one SPACE WOLVES unit (excluding MONSTERS and VEHICLES) that has not been selected to fight this phase. Until the end of the phase, each time a model makes a Pile-in or Consolidation move, it can move up to 6\" instead of 3\". It does not need to end closer to the nearest enemy model, provided it ends as close as possible to the closest enemy unit.",
        keywords: ['Fight'],
      },
      {
        id: 'territorialAdvantage', name: 'Territorial Advantage', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — just after an enemy unit is destroyed by an ADEPTUS ASTARTES unit from your army',
        effect: "Select one objective marker you control that your unit is within range of. That objective marker remains under your control until your opponent's Level of Control over it is greater than yours at the end of a phase.",
        keywords: ['Fight', 'Objective'],
      },
      {
        id: 'overwhelmingOnslaught', name: 'Overwhelming Onslaught', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase — just after an enemy unit has selected its targets',
        effect: "Select two ADEPTUS ASTARTES units from your army within Engagement Range of that enemy unit, or one SPACE WOLVES BEASTS unit within Engagement Range of it. Until the end of the phase, each time a model in that enemy unit makes an attack, subtract 1 from the Hit roll.",
        keywords: ['Fight', 'Reaction'],
      },
      {
        id: 'chosenPrey', name: 'Chosen Prey', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase — just after a SPACE WOLVES unit from your army Falls Back',
        effect: 'Until the end of the turn, that SPACE WOLVES unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
        keywords: ['Movement', 'Fall Back'],
      },
      {
        id: 'boundingAdvance', name: 'Bounding Advance', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase or Charge phase',
        effect: "Select one SPACE WOLVES INFANTRY or SPACE WOLVES BEASTS unit that has not been selected to move or declared a charge this phase. Until the end of the phase, models can move through other models (excluding TITANIC) and terrain features. They can move within Engagement Range of enemy models, but cannot end a Normal, Advance or Fall Back move within Engagement Range.",
        keywords: ['Movement', 'Charge'],
      },
      {
        id: 'markedForDestruction', name: 'Marked for Destruction', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: "Select two ADEPTUS ASTARTES units (excluding BEASTS) that have not been selected to shoot this phase. Select one enemy unit visible to both. Until the end of the phase, models in your units can only target that enemy unit, and each time a model makes an attack, re-roll a Wound roll of 1.",
        keywords: ['Shooting'],
      },
    ],
  },

  sagaOfTheBold: {
    id: 'sagaOfTheBold',
    name: 'Saga of the Bold',
    subtitle: 'Every son of Russ forges his own tale of heroism and glory.',
    playstyle: "CHARACTER-driven — heroes gain attack re-rolls, and unlock stronger bonuses as they achieve heroic Boasts.",
    chapterRestriction: true,
    detachmentRule: {
      name: 'Heroes All',
      description: "Each time an ADEPTUS ASTARTES unit from your army is selected to shoot or fight: if your Saga is completed, you can re-roll one Hit roll, one Wound roll and one Damage roll; otherwise, if that unit is a SPACE WOLVES CHARACTER unit, you can re-roll one Hit roll, one Wound roll or one Damage roll.",
    },
    enhancements: [
      { name: "Braggart's Steel", cost: 20, description: "SPACE WOLVES model only. Add 2 to the Strength characteristic of melee weapons equipped by the bearer. If the bearer's unit has achieved one or more Boasts, add 1 to the Damage characteristic of those weapons as well." },
      { name: 'Skjald', cost: 15, description: "ADEPTUS ASTARTES model only. Each time a SPACE WOLVES CHARACTER unit from your army achieves a Boast, if the bearer is on the battlefield, you gain 1CP." },
      { name: 'Hordeslayer', cost: 15, description: "SPACE WOLVES model only. At the start of the Fight phase, if there are more enemy models than friendly models wholly within 6\" of the bearer, add 2 to the Attacks characteristic of the bearer's melee weapons (or add 3 instead if the bearer's unit has achieved one or more Boasts)." },
      { name: "Thunderwolf's Fortitude", cost: 25, description: "ADEPTUS ASTARTES model only. The first time the bearer is destroyed, at the end of the phase roll one D6: on a 2+, set the bearer back up as close as possible to where it was destroyed and not within Engagement Range of any enemy units, with 3 wounds remaining." },
    ],
    stratagems: [
      {
        id: 'inspiringPresence', name: 'Inspiring Presence', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one ADEPTUS ASTARTES CHARACTER unit that has not been selected to fight this phase. Until the end of the phase, melee weapons equipped by models in your unit have the [LETHAL HITS] ability.',
        keywords: ['Fight', 'Character'],
      },
      {
        id: 'championsGuidance', name: "Champion's Guidance", cost: 1,
        phase: 'any', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase or Fight phase',
        effect: 'Select one SPACE WOLVES CHARACTER unit that has not been selected to shoot or fight this phase. Until the end of the phase, each time a model in your unit makes an attack, you can re-roll the Hit roll.',
        keywords: ['Shooting', 'Fight', 'Character'],
      },
      {
        id: 'birthOfASaga', name: 'Birth of a Saga', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one Wolf Guard Headtaker or Wolf Guard Terminator Pack Leader model from your army. Until the start of your next Command phase, that model has the CHARACTER keyword.',
        keywords: ['Command'],
      },
      {
        id: 'alphaStrikeBold', name: 'Alpha Strike', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Your Charge phase',
        effect: 'Select one ADEPTUS ASTARTES CHARACTER unit. Until the end of the phase, your unit is eligible to declare a charge in a turn in which it Advanced.',
        keywords: ['Charge'],
      },
      {
        id: 'heroicResolve', name: 'Heroic Resolve', cost: 2,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — just after an enemy unit has selected its targets",
        effect: "Select one SPACE WOLVES CHARACTER unit that was selected as the target. Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.",
        keywords: ['Defence', 'Character'],
      },
      {
        id: 'countercharge', name: 'Countercharge', cost: 2,
        phase: 'charge', source: 'detachment', trigger: 'reaction',
        timing: "End of your opponent's Charge phase",
        effect: "Select one ADEPTUS ASTARTES CHARACTER unit that is within 6\" of one or more enemy units and would be eligible to declare a charge against one or more of those units. Your unit declares a charge targeting only those enemy units and you resolve it as if it were your Charge phase. If successful, your unit does not receive any Charge bonus.",
        keywords: ['Charge', 'Reaction'],
      },
    ],
  },

  sagaOfTheBeastslayer: {
    id: 'sagaOfTheBeastslayer',
    name: 'Saga of the Beastslayer',
    subtitle: 'Hunt down the mightiest prey and bring them low.',
    playstyle: "Monster hunters — [LETHAL HITS] against CHARACTERs, MONSTERs and VEHICLEs on every attack.",
    chapterRestriction: true,
    detachmentRule: {
      name: 'Legendary Slayers',
      description: "Each time an ADEPTUS ASTARTES model from your army makes an attack, if that attack targets a CHARACTER, MONSTER or VEHICLE unit — or if your Saga is completed — that attack has the [LETHAL HITS] ability.",
    },
    enhancements: [
      { name: 'Wolf-touched', cost: 15, description: "SPACE WOLVES model only. Add 2\" to the Move characteristic of the bearer. In the Declare Battle Formations step, the bearer can be attached to a WULFEN INFANTRY unit." },
      { name: "Hunter's Guile", cost: 20, description: "ADEPTUS ASTARTES model only. After both players have deployed their armies, select up to three THUNDERWOLF CAVALRY, WULFEN and/or BLOOD CLAWS units from your army and redeploy them. You can set those units up in Strategic Reserves regardless of how many units are already in Strategic Reserves." },
      { name: "Elder's Guidance", cost: 20, description: "SPACE WOLVES model only. Once per battle, at the start of the Fight phase, if the bearer is leading a BLOOD CLAWS unit, improve the Armour Penetration characteristic of melee weapons equipped by models in that unit by 1 until the end of the phase." },
      { name: 'Helm of the Beastslayer', cost: 15, description: "ADEPTUS ASTARTES model only. Each time an attack made by a CHARACTER, MONSTER or VEHICLE model targets the bearer's unit, reduce the Armour Penetration characteristic of that attack by 1." },
    ],
    stratagems: [
      {
        id: 'unbridledFerocity', name: 'Unbridled Ferocity', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one SPACE WOLVES unit that has not been selected to fight this phase. Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Wound roll.',
        keywords: ['Fight'],
      },
      {
        id: 'shockCavalry', name: 'Shock Cavalry', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase or Charge phase',
        effect: "Select one THUNDERWOLF CAVALRY unit that has not been selected to move or declared a charge this phase. Until the end of the phase, models can move through other models (excluding TITANIC) and terrain features up to 4\" in height. They can move within Engagement Range of enemy models but cannot end a Normal, Advance or Fall Back move within Engagement Range.",
        keywords: ['Movement', 'Charge', 'Cavalry'],
      },
      {
        id: 'pinningFire', name: 'Pinning Fire', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: "Select one ADEPTUS ASTARTES unit that has not been selected to shoot this phase. After your unit has shot, select one enemy CHARACTER, MONSTER, or VEHICLE unit hit by one or more of those attacks. Until the start of your next Shooting phase, that unit is pinned (subtract 2\" from Move characteristic and subtract 2 from Charge rolls).",
        keywords: ['Shooting', 'Anti-tank'],
      },
      {
        id: 'thunderousPursuit', name: 'Thunderous Pursuit', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Movement phase — just after an enemy unit ends a Normal, Advance or Fall Back move",
        effect: "Select one ADEPTUS ASTARTES unit within 9\" of that enemy unit and not within Engagement Range of enemies. Your unit can make a Normal move of up to D6\" (or up to 6\" if it has the SPACE WOLVES INFANTRY or THUNDERWOLF CAVALRY keywords).",
        keywords: ['Movement', 'Reaction'],
      },
      {
        id: 'impetuosity', name: 'Impetuosity', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — just after an enemy unit has selected its targets",
        effect: "Select one WULFEN INFANTRY or BLOOD CLAWS unit that was selected as the target. After that enemy unit has shot, if one or more models in your unit were destroyed, your unit can make an Impetuous move: roll one D6 and move up to that many inches, ending as close as possible to the nearest enemy unit.",
        keywords: ['Defence', 'Reaction'],
      },
      {
        id: 'coordinatedStrike', name: 'Coordinated Strike', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: "End of your opponent's Fight phase",
        effect: "Select one SPACE WOLVES unit that is wholly within 9\" of one or more battlefield edges and not within Engagement Range of any enemy units. Remove your unit from the battlefield and place it into Strategic Reserves.",
        keywords: ['Movement'],
      },
    ],
  },

  championsOfFenris: {
    id: 'championsOfFenris',
    name: 'Champions of Fenris',
    subtitle: "The hand-picked warriors of the Great Wolf, fighting as though Logan Grimnar watches.",
    playstyle: "Counter-charge specialists — INFANTRY and WALKERs strike back at the end of your opponent's Charge phase. TERMINATORs hold objectives.",
    chapterRestriction: true,
    detachmentRule: {
      name: 'The Great Wolf Watches',
      description: "At the end of your opponent's Charge phase, each ADEPTUS ASTARTES INFANTRY and ADEPTUS ASTARTES WALKER unit from your army that is within 3\" of one or more enemy units and would be eligible to declare a charge against those units can declare a charge against them, resolved as if it were your Charge phase. If successful, your unit does not receive any Charge bonus this turn.\nWhile ADEPTUS ASTARTES TERMINATOR units from your army are not Battle-shocked, add 1 to the Objective Control characteristic of models in those units.\nRestriction: Your army cannot include ADEPTUS ASTARTES units from any Chapter other than Space Wolves.",
    },
    enhancements: [
      { name: "Wolves' Wisdom", cost: 30, description: "ADEPTUS ASTARTES INFANTRY model only. The bearer's unit can declare a charge against one or more units within 6\" (instead of within 3\") when using The Great Wolf Watches rule." },
      { name: "Foes' Fate", cost: 15, description: "ADEPTUS ASTARTES TERMINATOR model only. Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of the bearer's unit Falls Back, all models in that enemy unit must take Desperate Escape tests. Subtract 1 from each test if that unit is Battle-shocked." },
      { name: 'Fangrune Pendant', cost: 15, description: "ADEPTUS ASTARTES TERMINATOR model only. The bearer's unit is eligible to shoot and declare a charge in a turn in which it Fell Back." },
      { name: 'Longstrider', cost: 20, description: "ADEPTUS ASTARTES model only. You can re-roll Charge rolls made for the bearer's unit." },
    ],
    stratagems: [
      {
        id: 'preytakersEye', name: "Preytaker's Eye", cost: 1,
        phase: 'any', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase or Fight phase',
        effect: 'Select one ADEPTUS ASTARTES INFANTRY unit that has not been selected to shoot or fight this phase. Select either [LETHAL HITS] or [SUSTAINED HITS 1]. Until the end of the phase, weapons equipped by models in your unit have that ability.',
        keywords: ['Shooting', 'Fight'],
      },
      {
        id: 'armourOfContemptCoF', name: 'Armour of Contempt', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase or Fight phase — just after an enemy unit has selected its targets",
        effect: 'Select one ADEPTUS ASTARTES unit that was selected as the target. Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
        keywords: ['Defence'],
      },
      {
        id: 'runesOfClaiming', name: 'Runes of Claiming', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'End of your Command phase',
        effect: "Select one ADEPTUS ASTARTES INFANTRY or ADEPTUS ASTARTES WALKER unit. Select one objective marker you control that your unit is within range of. That objective marker remains under your control until your opponent's Level of Control is greater than yours at the end of a phase.",
        keywords: ['Command', 'Objective'],
      },
      {
        id: 'chillingHowl', name: 'Chilling Howl', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: "Your opponent's Command phase",
        effect: "Select one ADEPTUS ASTARTES TERMINATOR unit. Each enemy unit within 6\" of your unit must take a Battle-shock test, subtracting 1 from that test if that unit is Below Half-strength.",
        keywords: ['Morale'],
      },
      {
        id: 'stalkingWolves', name: 'Stalking Wolves', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — just after an enemy unit has selected its targets",
        effect: 'Select one ADEPTUS ASTARTES INFANTRY unit that was selected as the target. Until the end of the phase, models in your unit have the Stealth ability.',
        keywords: ['Defence'],
      },
      {
        id: 'onrushingStorm', name: 'Onrushing Storm', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: "End of your opponent's Fight phase",
        effect: 'Select one ADEPTUS ASTARTES TERMINATOR unit that is not within Engagement Range of any enemy units. Remove your unit from the battlefield and place it into Strategic Reserves.',
        keywords: ['Movement'],
      },
    ],
  },

  sagaOfTheGreatWolf: {
    id: 'sagaOfTheGreatWolf',
    name: 'Saga of the Great Wolf',
    subtitle: 'Where Grimnar leads, the hunting packs fight at peak efficiency.',
    playstyle: "Hunting Pack buffs — pick one army-wide bonus per Command phase: advance+charge re-rolls, +1 ranged hit, or lethal/sustained hits in melee.",
    chapterRestriction: true,
    detachmentRule: {
      name: 'Master of Wolves',
      description: "At the start of your Command phase, select one Hunting Pack (each can only be selected once per battle). Until your next Command phase, it is active for all ADEPTUS ASTARTES units:\n• Encircling Jaws: Re-roll Advance rolls and Charge rolls.\n• Hunter's Eye: Each time a model makes a ranged attack, add 1 to the Hit roll.\n• Ferocious Strike: When selected to fight, choose [LETHAL HITS] or [SUSTAINED HITS 1] — weapons have the selected ability until end of phase.\n\nHowling Onslaught: Once per battle, if LOGAN GRIMNAR is on the battlefield when you select a Hunting Pack, you may select one already chosen this battle.\n\nRestriction: Your army cannot include ADEPTUS ASTARTES units from any Chapter other than Space Wolves.",
    },
    commandPhaseAction: {
      type: 'pick_one',
      label: 'Hunting Pack',
      prompt: 'Select one Hunting Pack for this battle round:',
      options: [
        {
          id: 'encirclingJaws',
          label: 'Encircling Jaws',
          icon: '🐾',
          shortEffect: 'Re-roll Advance & Charge',
          fullEffect: 'Re-roll Advance rolls and Charge rolls for all ADEPTUS ASTARTES units this battle round.',
        },
        {
          id: 'huntersEye',
          label: "Hunter's Eye",
          icon: '🎯',
          shortEffect: '+1 Hit (ranged)',
          fullEffect: 'Each time a model in an ADEPTUS ASTARTES unit makes a ranged attack, add 1 to the Hit roll.',
        },
        {
          id: 'ferocityStrike',
          label: 'Ferocious Strike',
          icon: '⚔️',
          shortEffect: 'Lethal/Sustained (melee)',
          fullEffect: 'When selected to fight, choose LETHAL HITS or SUSTAINED HITS 1 — melee weapons have that ability until end of phase.',
        },
      ],
      onceBuff: {
        id: 'howlingOnslaught',
        label: 'Howling Onslaught',
        description: 'Once per battle (requires LOGAN GRIMNAR on field): re-select a Hunting Pack that was already used this battle.',
      },
    },
    enhancements: [
      { name: "Grimnar's Mark", cost: 20, description: "ADEPTUS ASTARTES TERMINATOR CAPTAIN model only. Once per battle round, from round 2 onwards, you can target the bearer's unit with Rapid Ingress or Heroic Intervention for 0CP, even if you already used that Stratagem on a different unit this turn. In Declare Battle Formations, the bearer can be attached to a WOLF GUARD TERMINATORS unit." },
      { name: 'Howlmaw', cost: 15, description: "WOLF PRIEST model only. At the start of the Fight phase, select one enemy unit within 6\" of the bearer. That unit must take a Battle-shock test, subtracting 1 from the result." },
      { name: 'Chariots of the Storm', cost: 25, description: "ADEPTUS ASTARTES model only. After deployment, select up to three ADEPTUS ASTARTES units from your army and redeploy them. You can place them into Strategic Reserves regardless of how many units are already there." },
      { name: "Skjald's Foretelling", cost: 25, description: "WOLF GUARD BATTLE LEADER model only. While the bearer is leading a unit, weapons equipped by models in that unit have the [LANCE] ability." },
    ],
    stratagems: [
      {
        id: 'theFoeForeseen', name: 'The Foe Foreseen', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase or Fight phase — just after an enemy unit has selected its targets",
        effect: 'Select one ADEPTUS ASTARTES unit that was selected as the target. Until the attacking unit has finished making its attacks, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
        keywords: ['Defence'],
      },
      {
        id: 'grimnarCommand', name: "Grimnar's Command", cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: "Select one ADEPTUS ASTARTES unit and one Hunting Pack from the Master of Wolves rule. Until the start of your next Command phase, that Hunting Pack is active for your unit instead of the army-wide Hunting Pack, even if you have already selected that Hunting Pack this battle.",
        keywords: ['Command'],
      },
      {
        id: 'fenrisianFerocity', name: 'Fenrisian Ferocity', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase or Charge phase',
        effect: "Select one ADEPTUS ASTARTES MOUNTED or ADEPTUS ASTARTES WALKER unit that has not been selected to move or charge this phase. Until the end of the phase, models can move horizontally through other models (excluding TITANIC) and terrain features. They can move within Engagement Range of enemies but cannot end a Normal, Advance or Fall Back move within Engagement Range.",
        keywords: ['Movement', 'Charge'],
      },
      {
        id: 'unrelentingHunters', name: 'Unrelenting Hunters', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase',
        effect: "Select one ADEPTUS ASTARTES unit that has not been selected to move this phase. Until the end of the turn, your unit is eligible to declare a charge in a turn in which it Fell Back. If it is a SPACE WOLVES unit, it is eligible to declare a charge in a turn in which it Advanced or Fell Back.",
        keywords: ['Movement', 'Charge'],
      },
      {
        id: 'eyeOfThePack', name: 'Eye of the Pack', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS ASTARTES unit that has not been selected to shoot this phase. Until the end of the phase, each time a model in your unit makes an attack, you can add 1 to the Wound roll.',
        keywords: ['Shooting'],
      },
      {
        id: 'battleInstincts', name: 'Battle Instincts', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase — just after an enemy unit has shot",
        effect: "Select one SPACE WOLVES unit that was targeted by one or more of those attacks. Your unit can make a Normal move of up to D6\".",
        keywords: ['Defence', 'Movement'],
      },
    ],
  },

}

export const swDetachmentList = Object.values(swDetachments)
