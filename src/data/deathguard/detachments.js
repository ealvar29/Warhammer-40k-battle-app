// Death Guard detachments — 10th Edition (Wahapedia, April 2026)
// Sources: https://wahapedia.ru/wh40k10ed/factions/death-guard/

export const dgDetachments = {

  virulentVectorium: {
    id: 'virulentVectorium',
    name: 'Virulent Vectorium',
    subtitle: 'Every battlefield left a festering wasteland.',
    playstyle: 'Objective control — hold objectives to spread Nurgle\'s Gift across the board, trigger Deadly Demise without rolling, and reduce incoming damage with Disgustingly Resilient.',
    detachmentRule: {
      name: 'Worldblight',
      description: 'If you control an objective marker at the end of your Command phase and a DEATH GUARD unit from your army (excluding Battle-shocked units) is within range of that objective marker, that objective marker remains under your control until your opponent\'s Level of Control over that objective marker is greater than yours at the end of a phase. In addition, until you lose control of that objective marker, it has the Nurgle\'s Gift ability as if it were a DEATH GUARD model from your army.',
    },
    enhancements: [
      {
        name: 'Daemon Weapon of Nurgle',
        cost: 10,
        description: 'DEATH GUARD model only. Each time the bearer makes a melee attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
      },
      {
        name: 'Furnace of Plagues',
        cost: 25,
        description: 'DEATH GUARD model only. Add 1 to the Strength and Attacks characteristics of melee weapons equipped by the bearer. Melee weapons equipped by the bearer gain the [DEVASTATING WOUNDS] ability.',
      },
      {
        name: 'Arch Contaminator',
        cost: 25,
        description: 'DEATH GUARD model only. While the bearer\'s unit is within range of an objective marker you control, each time a model in the bearer\'s unit makes an attack, you can re-roll the Wound roll.',
      },
      {
        name: 'Revolting Regeneration',
        cost: 20,
        description: 'DEATH GUARD model only. The bearer has the Feel No Pain 5+ ability.',
      },
    ],
    stratagems: [
      {
        id: 'putridDetonation', name: 'Putrid Detonation', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — any phase, when a DEATH GUARD VEHICLE or MONSTER with Deadly Demise is destroyed
        timing: 'Any phase — when a DEATH GUARD VEHICLE or MONSTER model with Deadly Demise is destroyed',
        effect: 'Do not roll the D6 to determine whether mortal wounds are inflicted by that model\'s Deadly Demise ability. Instead, mortal wounds are automatically inflicted. In addition, any enemy units that suffer mortal wounds as a result of this Stratagem are Afflicted until the start of your next turn.',
        keywords: ['On Death', 'Affliction', 'Deadly Demise'],
      },
      {
        id: 'disgustinglyResilient', name: 'Disgustingly Resilient', cost: 2,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        // Battle Tactic — opponent's Shooting or Fight phase, just after an enemy unit selects targets
        timing: 'Opponent\'s Shooting or Fight phase — just after an enemy unit has selected its targets',
        effect: 'Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack.',
        keywords: ['Defence', 'Damage Reduction'],
      },
      {
        id: 'plaguesurge', name: 'Plaguesurge', cost: 2,
        phase: 'command', source: 'detachment', trigger: 'active',
        // Epic Deed — your Command phase
        timing: 'Your Command phase',
        effect: 'Until the start of your next Command phase, add 3" to the Contagion Range of models from your army.',
        keywords: ['Contagion', 'Buff'],
      },
      {
        id: 'leechsporeEruption', name: 'Leechspore Eruption', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        // Epic Deed — your Command phase
        timing: 'Your Command phase',
        effect: 'Select one DEATH GUARD VEHICLE or MONSTER model from your army. Roll a number of D6 equal to the number of wounds that model has lost: for each 5+, that model regains 1 lost wound (to a maximum of 6 lost wounds) and one enemy unit within 6" of that model suffers 1 mortal wound (to a maximum of 6 mortal wounds).',
        keywords: ['Healing', 'Mortal Wounds'],
      },
      {
        id: 'overwhelmingGenerosity', name: 'Overwhelming Generosity', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase — when a DEATH GUARD unit is selected to shoot',
        effect: 'Until the end of the phase, you can re-roll the dice used to determine the number of attacks for weapons equipped by models in that unit that have a random Attacks characteristic.',
        keywords: ['Shooting', 'Re-roll'],
      },
      {
        id: 'creepingBlight', name: 'Creeping Blight', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — when a DEATH GUARD unit is selected to fight',
        effect: 'Until the end of the phase, each time a model in that unit makes a melee attack that targets an Afflicted unit, you can re-roll the Hit roll and re-roll the Wound roll.',
        keywords: ['Fight', 'Re-roll', 'Affliction'],
      },
    ],
  },

  mortarionsHammer: {
    id: 'mortarionsHammer',
    name: "Mortarion's Hammer",
    subtitle: 'The slow grind of pestilent iron.',
    playstyle: 'Armoured gunline — Afflict distant targets at the start of each battle round, with vehicles that push through terrain, punish enemy advances, and hammer Afflicted foes from long range.',
    detachmentRule: {
      name: 'Miasmic Bombardment',
      description: 'At the start of each battle round, select a number of enemy units more than 12" away from every model from your army that is on the battlefield (Incursion: 1 unit; Strike Force: 2 units; Onslaught: 3 units). Until the end of the battle round, those enemy units are Afflicted.',
    },
    enhancements: [
      {
        name: 'Eye of Affliction',
        cost: 20,
        description: 'DEATH GUARD model only. Each time a ranged attack made by the bearer\'s unit targets an Afflicted unit, that attack ignores the effects of the Benefit of Cover.',
      },
      {
        name: 'Bilemaw Blight',
        cost: 10,
        description: 'MALIGNANT PLAGUECASTER model only. At the start of your Shooting phase, add 12" to the Range of the bearer\'s Plague Wind weapon until the end of the phase.',
      },
      {
        name: 'Shriekworm Familiar',
        cost: 15,
        description: 'DEATH GUARD model only. Once per battle round, the bearer\'s unit can use the Fire Overwatch Stratagem for 0CP.',
      },
      {
        name: 'Tendrilous Emissions',
        cost: 30,
        description: 'LORD OF VIRULENCE model only. While the bearer is within 3" of one or more friendly DEATH GUARD VEHICLE units, the bearer has the Lone Operative ability, and each time one of those VEHICLE units makes a ranged attack that targets an enemy unit visible to the bearer, you can re-roll a Wound roll of 1.',
      },
    ],
    stratagems: [
      {
        id: 'blightedLand', name: 'Blighted Land', cost: 2,
        phase: 'movement', source: 'detachment', trigger: 'active',
        // Strategic Ploy — end of your Movement phase
        timing: 'Your Movement phase — end of phase',
        effect: 'Select one DEATH GUARD VEHICLE unit from your army. Choose one terrain feature that is within 24" of and visible to that unit. Until the start of your next turn, enemy units within 3" of that terrain feature are Afflicted.',
        keywords: ['Terrain', 'Affliction', 'Vehicle'],
      },
      {
        id: 'relentlessGrind', name: 'Relentless Grind', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Movement or Charge phase
        timing: 'Your Movement or Charge phase — when a DEATH GUARD VEHICLE unit is selected to move or charge',
        effect: 'Until the end of the phase, each time that unit makes a Normal, Advance or Charge move, it can move horizontally through terrain features.',
        keywords: ['Movement', 'Vehicle', 'Terrain'],
      },
      {
        id: 'drawnToDespair', name: 'Drawn to Despair', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Battle Tactic — your Shooting phase
        timing: 'Your Shooting phase — when a DEATH GUARD unit is selected to shoot',
        effect: 'Until the end of the phase, each time a model in that unit makes an attack that targets a visible enemy unit (excluding AIRCRAFT) within your opponent\'s deployment zone, you can re-roll the Hit roll.',
        keywords: ['Shooting', 'Re-roll'],
      },
      {
        id: 'fontOfFilth', name: 'Font of Filth', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Shooting phase
        timing: 'Your Shooting phase — when a DEATH GUARD VEHICLE unit has not yet been selected to shoot',
        effect: 'Until the end of the phase, ranged weapons equipped by models in that unit gain the [ASSAULT] ability.',
        keywords: ['Shooting', 'Vehicle', 'Assault'],
      },
      {
        id: 'eyestingerStorm', name: 'Eyestinger Storm', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — opponent's Command phase
        timing: 'Opponent\'s Command phase',
        effect: 'Select one DEATH GUARD VEHICLE unit from your army. Choose one objective marker that is visible to your unit. Each Afflicted enemy unit within range of that objective marker must take a Battle-shock test.',
        keywords: ['Command', 'Battle-shock', 'Affliction'],
      },
      {
        id: 'stinkingMire', name: 'Stinking Mire', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — start of opponent's Charge phase
        timing: 'Start of opponent\'s Charge phase',
        effect: 'Select one DEATH GUARD VEHICLE unit from your army. Until the end of the phase, each time an enemy unit selects your unit as the target of a charge, subtract 2 from the Charge roll.',
        keywords: ['Charge', 'Defence', 'Vehicle'],
      },
    ],
  },

  championsOfContagion: {
    id: 'championsOfContagion',
    name: 'Champions of Contagion',
    subtitle: 'Every disease a gift, every wound a blessing.',
    playstyle: 'Adaptive plagues — switch your active Plague each Command phase to debuff whatever the situation demands, with Afflicted enemies taking bonus wound rolls and characters boosting horde and hero synergies.',
    detachmentRule: {
      name: 'Manifold Maladies',
      // Plagues (Nurgle's Gift): Skullsquirm Blight (−1 to Hit rolls), Rattlejoint Ague (worsen Save by 1), Scabrous Soulrot (worsen Move/Ld/OC by 1)
      description: 'At the start of the battle round, you can select one of the Plagues listed in Nurgle\'s Gift. Until the end of the battle, that is your chosen Plague instead of any previously chosen Plague.',
    },
    commandPhaseAction: {
      type: 'pick_one',
      label: 'Active Plague',
      prompt: 'You may change your active Plague at the start of this battle round:',
      options: [
        {
          id: 'skullsquirmBlight',
          label: 'Skullsquirm Blight',
          shortEffect: '−1 to Hit rolls for Afflicted enemies',
          fullEffect: 'Each time a model in this unit (Afflicted enemy) makes an attack, subtract 1 from the Hit roll.',
        },
        {
          id: 'rattlejointAgue',
          label: 'Rattlejoint Ague',
          shortEffect: 'Worsen Save by 1 for Afflicted enemies',
          fullEffect: 'Worsen the Save characteristic of models in this unit (Afflicted enemy) by 1.',
        },
        {
          id: 'scabrousSoulrot',
          label: 'Scabrous Soulrot',
          shortEffect: 'Worsen Move/Ld/OC by 1 for Afflicted enemies',
          fullEffect: 'Worsen the Move, Leadership, and Objective Control characteristics of models in this unit (Afflicted enemy) by 1 (OC minimum 1).',
        },
      ],
    },
    enhancements: [
      {
        name: 'Final Ingredient',
        cost: 20,
        description: 'BIOLOGUS PUTRIFIER model only. Once per battle, after the bearer\'s unit has fought, if one or more CHARACTER models were destroyed as a result of those attacks, select one Plague. Until the end of the battle, while an enemy unit is Afflicted, that unit has the effect of the selected Plague in addition to any other.',
      },
      {
        name: 'Visions of Virulence',
        cost: 15,
        description: 'MALIGNANT PLAGUECASTER model only. While an enemy unit is enfeebled by the bearer\'s Pestilent Fallout ability, that unit is also Afflicted.',
      },
      {
        name: 'Needle of Nurgle',
        cost: 25,
        description: 'PLAGUE SURGEON model only. Each time the bearer uses its Tainted Narthecium ability, you can return up to D3 destroyed models to the bearer\'s unit instead of 1.',
      },
      {
        name: 'Cornucophagus',
        cost: 35,
        description: 'LORD OF POXES model only. In the Declare Battle Formations step, select one Plague. Until the end of the battle, while an enemy unit is within Contagion Range of the bearer, that enemy unit has the effect of that Plague in addition to any other.',
      },
    ],
    stratagems: [
      {
        id: 'blessingsOfFilth', name: 'Blessings of Filth', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'active',
        // Battle Tactic — Shooting or Fight phase
        timing: 'Your Shooting or Fight phase — when an attached unit has not yet shot or fought this phase',
        effect: 'Until the end of the phase, each time a model in your unit makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit.',
        keywords: ['Shooting', 'Fight', 'Critical Hits'],
      },
      {
        id: 'malignanceMagnified', name: 'Malignance Magnified', cost: 2,
        phase: 'any', source: 'detachment', trigger: 'active',
        // Battle Tactic — Shooting or Fight phase
        timing: 'Your Shooting or Fight phase — when an attached unit has not yet shot or fought this phase',
        effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit that is below its Starting Strength, you can re-roll the Hit roll and you can re-roll the Wound roll.',
        keywords: ['Re-roll', 'Weakened Enemies'],
      },
      {
        id: 'grotesqueFortitude', name: 'Grotesque Fortitude', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        // Battle Tactic — opponent's Shooting or Fight phase, after target selected
        timing: 'Opponent\'s Shooting or Fight phase — just after an enemy unit selects targets',
        effect: 'Until the end of the phase, add 2 to the Toughness characteristic of models in your unit.',
        keywords: ['Defence', 'Toughness'],
      },
      {
        id: 'rabidInfusion', name: 'Rabid Infusion', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Strategic Ploy — start of Fight phase, unit must include two CHARACTER models
        timing: 'Start of Fight phase — target one unit that includes two CHARACTER models',
        effect: 'Until the end of the phase, your unit has the Fights First ability.',
        keywords: ['Fight', 'Fights First'],
      },
      {
        id: 'mobileVector', name: 'Mobile Vector', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Movement phase, before Reinforcements step
        timing: 'Your Movement phase — before the Reinforcements step',
        effect: 'Select one unattached DEATH GUARD CHARACTER unit from your army. That unit can attach as a Leader to another eligible friendly unit within 3".',
        keywords: ['Movement', 'Character', 'Attach'],
      },
      {
        id: 'deathsHeadsDG', name: "Death's Heads", cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Wargear — your Shooting phase, BIOLOGUS PUTRIFIER not in Engagement Range and not yet shot
        timing: 'Your Shooting phase — BIOLOGUS PUTRIFIER unit not in Engagement Range and not yet selected to shoot',
        effect: 'Select one enemy unit (excluding VEHICLES) within 8" of and visible to your unit. Until the start of your next turn, that unit has the effect of all Plagues.',
        keywords: ['Shooting', 'Affliction', 'Plagues'],
      },
    ],
  },

  shamblerotVectorium: {
    id: 'shamblerotVectorium',
    name: 'Shamblerot Vectorium',
    subtitle: 'The walking dead in endless waves.',
    playstyle: 'Poxwalker horde — summon additional Poxwalker units during the battle (rounds 2–5), POXWALKERS gain BATTLELINE, and use them as a living shield or shock troops to overwhelm objectives.',
    detachmentRule: {
      name: 'Numberless Horde',
      // Incursion: rounds 2,3 | Strike Force: rounds 2,3,4 | Onslaught: rounds 2,3,4,5
      description: 'In your Command phase in each of the following battle rounds, add a new POXWALKERS unit (Starting Strength 10, in Strategic Reserves) to your army: Incursion — rounds 2 and 3; Strike Force — rounds 2, 3, and 4; Onslaught — rounds 2, 3, 4, and 5. POXWALKERS units in this detachment gain the BATTLELINE keyword.',
    },
    enhancements: [
      {
        name: 'Witherbone Pipes',
        cost: 25,
        description: 'NOXIOUS BLIGHTBRINGER model only. While the bearer is leading a POXWALKERS unit, add 1 to the Objective Control characteristic of models in that unit, and each time that unit takes a Battle-shock or Leadership test, add 1 to that test.',
      },
      {
        name: 'Lord of the Walking Pox',
        cost: 15,
        description: 'DEATH GUARD model only. You can treat the current battle round as the third battle round for the purposes of the Numberless Horde detachment rule.',
      },
      {
        name: 'Sorrowsyphon',
        cost: 10,
        description: 'MALIGNANT PLAGUECASTER model only. While the bearer is leading a POXWALKERS unit, add 1 to the Damage characteristic of the bearer\'s Plague Wind weapon.',
      },
      {
        name: 'Talisman of Burgeoning',
        cost: 25,
        description: 'DEATH GUARD model only. While the bearer is leading a unit, add 1 to the Toughness characteristic of POXWALKERS models in that unit.',
      },
    ],
    stratagems: [
      {
        id: 'gripOfTheWalkingPox', name: 'Grip of the Walking Pox', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — Fight phase, just after an enemy unit has selected targets
        timing: 'Fight phase — just after an enemy unit has selected its targets',
        effect: 'Target one POXWALKERS unit from your army that was selected as the target of one or more of the attacking unit\'s attacks. After the attacking unit has fought, roll one D6 for each model from your unit that was destroyed as a result of those attacks: on a 6, the attacking unit suffers 1 mortal wound.',
        keywords: ['Fight', 'On Death', 'Mortal Wounds'],
      },
      {
        id: 'smearedWithFilth', name: 'Smeared with Filth', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — Fight phase, when a POXWALKERS unit is just destroyed
        timing: 'Fight phase — just after a POXWALKERS unit from your army is destroyed',
        effect: 'Select one enemy unit that made one or more attacks that targeted your unit this phase. Until the end of the battle, that enemy unit is Afflicted.',
        keywords: ['On Death', 'Affliction'],
      },
      {
        id: 'gnawingHunger', name: 'Gnawing Hunger', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        // Battle Tactic — your Command phase
        timing: 'Your Command phase',
        effect: 'Select one POXWALKERS unit from your army. Until the end of the turn, add 1 to the Move characteristic of models in your unit, and add 1 to the Attacks and Strength characteristics of melee weapons equipped by models in your unit.',
        keywords: ['Command', 'Buff'],
      },
      {
        id: 'hiddenAmongstTheDead', name: 'Hidden Amongst the Dead', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        // Strategic Ploy — Reinforcements step of your Movement phase
        timing: 'Your Movement phase — Reinforcements step',
        effect: 'Select one POXWALKERS unit from your army that is in Strategic Reserves and is not an Attached unit. Until the end of the phase, models in that unit have the Deep Strike ability.',
        keywords: ['Movement', 'Reserves', 'Deep Strike'],
      },
      {
        id: 'shockAndHorror', name: 'Shock and Horror', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Charge phase, just after a DEATH GUARD unit ends a Charge move
        timing: 'Your Charge phase — just after a DEATH GUARD unit ends a Charge move',
        effect: 'Each enemy unit within Engagement Range of your unit must take a Battle-shock test, subtracting 1 from that test.',
        keywords: ['Charge', 'Battle-shock'],
      },
      {
        id: 'shamblingWall', name: 'Shambling Wall', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — opponent's Shooting phase, just after an enemy unit selects targets
        timing: 'Opponent\'s Shooting phase — just after an enemy unit has selected its targets',
        effect: 'Target one DEATH GUARD unit from your army that was selected as the target, and one friendly POXWALKERS unit within 3" of your unit. Until the end of the phase, each time you would allocate an attack to a model in your DEATH GUARD unit, if your POXWALKERS unit is visible to the attacking model and is an eligible target for that attack, no saving throw is made for that attack; instead a number of POXWALKERS equal to the Damage characteristic of that attack are destroyed.',
        keywords: ['Defence', 'Bodyguard'],
      },
    ],
  },

  deathLordsChosen: {
    id: 'deathLordsChosen',
    name: "Death Lord's Chosen",
    subtitle: 'The veterans of a thousand plague campaigns.',
    playstyle: 'Terminator elite — keep enemies Afflicted and roll 2D6 against them in the opponent\'s Command phase for automatic mortal wounds, with Terminators getting ASSAULT/HEAVY ranged weapons, Fights First, and deep-striking from Reserves.',
    detachmentRule: {
      name: 'Deadly Vectors',
      description: 'In your opponent\'s Command phase, roll 2D6 for each Afflicted enemy unit, subtracting 1 from the result if that unit is below half-strength. On a result of 6 or less, that unit suffers D3 mortal wounds.',
    },
    enhancements: [
      {
        name: 'Face of Death',
        cost: 10,
        description: 'TERMINATOR model only. At the start of the Fight phase, each enemy unit within Engagement Range of the bearer\'s unit must take a Battle-shock test.',
      },
      {
        name: 'Vile Vigour',
        cost: 15,
        description: 'TERMINATOR model only. While the bearer is leading a unit, add 1" to the Movement characteristic of models in that unit and you can re-roll Advance rolls made for that unit.',
      },
      {
        name: 'Warprot Talisman',
        cost: 30,
        description: 'TERMINATOR model only. Once per battle, at the end of your opponent\'s turn, if the bearer\'s unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.',
      },
      {
        name: 'Helm of the Fly King',
        cost: 20,
        description: 'TERMINATOR model only. While the bearer is leading a unit, models in that unit cannot be targeted by ranged attacks unless the attacking model is within 18" of the target.',
      },
    ],
    stratagems: [
      {
        id: 'bloomingPestilence', name: 'Blooming Pestilence', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'active',
        // Epic Deed — start of any phase
        timing: 'Start of any phase — target one TERMINATOR unit',
        effect: 'Until the end of the phase, add 3" to the Contagion Range of models in your unit.',
        keywords: ['Contagion', 'Buff'],
      },
      {
        id: 'grimReapers', name: 'Grim Reapers', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Battle Tactic — Fight phase
        timing: 'Fight phase — when a TERMINATOR unit has not yet been selected to fight this phase',
        effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit (excluding MONSTERS and VEHICLES), you can re-roll the Hit roll.',
        keywords: ['Fight', 'Re-roll'],
      },
      {
        id: 'undyingSpite', name: 'Undying Spite', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — Fight phase, just after an enemy unit selects targets
        timing: 'Fight phase — just after an enemy unit has selected its targets',
        effect: 'Target one TERMINATOR unit from your army that was selected as the target. Until the end of the phase, each time a model in your unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.',
        keywords: ['Fight', 'On Death'],
      },
      {
        id: 'signalPox', name: 'Signal Pox', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        // Epic Deed — your Command phase, LORD OF VIRULENCE model
        timing: 'Your Command phase — target one LORD OF VIRULENCE model from your army',
        effect: 'Select one objective marker within 30" of and visible to your model. Until the start of your next turn, while an enemy unit is within range of that objective marker, that unit is Afflicted.',
        keywords: ['Command', 'Objective', 'Affliction'],
      },
      {
        id: 'mortarionsTeachings', name: "Mortarion's Teachings", cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Shooting phase, TERMINATOR unit not yet selected to shoot
        timing: 'Your Shooting phase — when a TERMINATOR unit has not yet been selected to shoot this phase',
        effect: 'Until the end of the phase, ranged weapons equipped by models in your unit have the [ASSAULT] and [HEAVY] abilities.',
        keywords: ['Shooting', 'Assault', 'Heavy'],
      },
      {
        id: 'sickeningImpact', name: 'Sickening Impact', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Charge phase, just after a TERMINATOR unit ends a Charge move
        timing: 'Your Charge phase — just after a TERMINATOR unit ends a Charge move',
        effect: 'Select one enemy unit within Engagement Range of your unit, then roll one D6 for each model in your unit that is within Engagement Range of that enemy unit: for each 2+, that enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).',
        keywords: ['Charge', 'Mortal Wounds'],
      },
    ],
  },

  flyblownHost: {
    id: 'flyblownHost',
    name: 'Flyblown Host',
    subtitle: 'A swarm of pestilence descends from the skies.',
    playstyle: 'Aggressive infantry advance — all DEATH GUARD INFANTRY (except Poxwalkers) gain Scouts 5" and Stealth for early pressure, with stratagems that reward close-range shooting, charge impact, and defensive resilience.',
    detachmentRule: {
      name: 'Verminous Haze',
      description: 'DEATH GUARD INFANTRY units (excluding POXWALKERS units) from your army that are not embarked within a TRANSPORT have the Scouts 5" and Stealth abilities.',
    },
    enhancements: [
      {
        name: 'Droning Chorus',
        cost: 15,
        description: 'DEATH GUARD INFANTRY model only. Ranged weapons equipped by models in the bearer\'s unit have the [ASSAULT] ability.',
      },
      {
        name: 'Insectile Murmuration',
        cost: 20,
        description: 'DEATH GUARD INFANTRY model only. Each time a model in the bearer\'s unit makes an attack that targets a unit that is within Contagion Range of one or more DEATH GUARD units from your army, re-roll a Wound roll of 1.',
      },
      {
        name: 'Rejuvenating Swarm',
        cost: 10,
        description: 'DEATH GUARD INFANTRY model only. At the end of each phase, the bearer regains all of its lost wounds.',
      },
      {
        name: 'Plagueveil',
        cost: 25,
        description: 'DEATH GUARD INFANTRY model only. While the bearer\'s unit is within range of one or more objective markers that you control, that unit can only be selected as the target of a ranged attack if the attacking model is within 18".',
      },
    ],
    stratagems: [
      {
        id: 'nauseatingParoxysms', name: 'Nauseating Paroxysms', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Strategic Ploy — start of the Fight phase
        timing: 'Start of the Fight phase — target one DEATH GUARD INFANTRY unit within Engagement Range of enemy units',
        effect: 'Select one enemy unit within Engagement Range of your unit. That unit must take a Battle-shock test, subtracting 1 from the result.',
        keywords: ['Fight', 'Battle-shock'],
      },
      {
        id: 'verminCloud', name: 'Vermin Cloud', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Battle Tactic — Fight phase, when a DEATH GUARD INFANTRY unit has not yet fought
        timing: 'Fight phase — when a DEATH GUARD INFANTRY unit has not been selected to fight this phase',
        effect: 'Until the end of the phase, each time a model in this unit makes a Pile-in or Consolidation move, it can move up to 6" instead of up to 3".',
        keywords: ['Fight', 'Movement'],
      },
      {
        id: 'eyeOfTheSwarm', name: 'Eye of the Swarm', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Shooting phase
        timing: 'Your Shooting phase — when a DEATH GUARD INFANTRY unit has not yet been selected to shoot',
        effect: 'Until the end of the phase, ranged weapons equipped by models in your unit (excluding Blast weapons) have the [PISTOL] ability.',
        keywords: ['Shooting', 'Pistol'],
      },
      {
        id: 'droningHorror', name: 'Droning Horror', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Battle Tactic — your Shooting phase
        timing: 'Your Shooting phase — when a DEATH GUARD INFANTRY unit has not yet been selected to shoot',
        effect: 'Until the end of the phase, each time a model in your unit makes a ranged attack, re-roll a Hit roll of 1. If that attack targets a unit within half range, you can re-roll the Hit roll instead.',
        keywords: ['Shooting', 'Re-roll'],
      },
      {
        id: 'enervatingOnslaught', name: 'Enervating Onslaught', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Charge phase, just after a DEATH GUARD INFANTRY unit makes a Charge move
        timing: 'Your Charge phase — just after a DEATH GUARD INFANTRY unit makes a Charge move',
        effect: 'Select one enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of your unit. Roll one D6 for each model in your unit that is within Engagement Range of that unit, adding 1 to the result if that model is not a CULTIST or POXWALKER model: for each 5+, the selected enemy unit suffers 1 mortal wound (to a maximum of 6 mortal wounds).',
        keywords: ['Charge', 'Mortal Wounds'],
      },
      {
        id: 'myphiticInvigoration', name: 'Myphitic Invigoration', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        // Battle Tactic — opponent's Shooting phase, just after an enemy unit selects targets
        // Requires: target unit is within 6" of one or more friendly MYPHITIC BLIGHT-HAULER units
        timing: 'Opponent\'s Shooting phase — just after an enemy unit has selected its targets',
        effect: 'Target one DEATH GUARD INFANTRY unit from your army within 6" of one or more friendly MYPHITIC BLIGHT-HAULER units that was selected as the target of one or more attacks. Until the end of the phase, each time an attack targets your unit, if the Strength characteristic of that attack is greater than this unit\'s Toughness characteristic, subtract 1 from the Wound roll.',
        keywords: ['Defence', 'Wound Modifier'],
      },
    ],
  },

  tallybandSummoners: {
    id: 'tallybandSummoners',
    name: 'Tallyband Summoners',
    subtitle: 'The Plague Legions answer the call of Nurgle.',
    playstyle: 'Mixed Chaos force — embed Plague Legions daemons alongside Death Guard; daemons gain Nurgle\'s Gift near DG units, DG gains +3" Contagion near daemons, with point limits by game size.',
    detachmentRule: {
      name: 'Reverberant Rancidity',
      description: 'While a PLAGUE LEGIONS unit from your army is within 7" of one or more DEATH GUARD units from your army, that PLAGUE LEGIONS unit has the Nurgle\'s Gift ability. While a DEATH GUARD unit from your army is within 7" of one or more PLAGUE LEGIONS units from your army, add 3" to that DEATH GUARD unit\'s Contagion Range. PLAGUE LEGIONS point limits: Incursion up to 500 pts; Strike Force up to 1000 pts; Onslaught up to 1500 pts. No PLAGUE LEGIONS models can be your WARLORD.',
    },
    enhancements: [
      {
        name: 'Beckoning Blight',
        cost: 20,
        description: 'DEATH GUARD model only. Each time a PLAGUE LEGIONS unit from your army is set up on the battlefield using the Deep Strike ability, if it is set up wholly within 12" of the bearer, it can be set up anywhere that is more than 6" horizontally away from all enemy models, instead of more than 9".',
      },
      {
        name: 'Fell Harvester',
        cost: 10,
        description: 'DEATH GUARD model only. Add 2 to the Attacks characteristic of the bearer\'s melee weapons.',
      },
      {
        name: 'Entropic Knell',
        cost: 15,
        description: 'GREAT UNCLEAN ONE model only. In the Battle-shock step of your opponent\'s Command phase, each enemy unit within 6" of the bearer that is below its Starting Strength must take a Battle-shock test, subtracting 1 from that test.',
      },
      {
        name: 'Tome of Bounteous Blessings',
        cost: 20,
        description: 'MALIGNANT PLAGUECASTER model only. Each time a PLAGUE LEGIONS unit within 12" of the bearer takes a Battle-shock test, add 1 to that test and, if that test is passed, one model in that unit regains up to D3 lost wounds (if that unit is a BATTLELINE unit and that test is passed, up to D3 destroyed models can be returned to that unit instead).',
      },
    ],
    stratagems: [
      {
        id: 'persistentPests', name: 'Persistent Pests', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — any phase, once per battle, when a NURGLINGS unit is destroyed
        timing: 'Any phase — when a NURGLINGS unit from your army is just destroyed (once per battle)',
        effect: 'Add a new unit to your army identical to your destroyed unit, in Strategic Reserves, at its Starting Strength and with its full wounds remaining.',
        keywords: ['On Death', 'Reserves', 'Nurglings'],
      },
      {
        id: 'clutchingCorruption', name: 'Clutching Corruption', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        // Battle Tactic — Fight phase
        timing: 'Fight phase — when a DEATH GUARD unit has not been selected to fight this phase',
        effect: 'Until the end of the phase, each time a model in your unit makes an attack that targets an enemy unit that is within Engagement Range of one or more PLAGUE LEGIONS units from your army, you can re-roll the Hit roll.',
        keywords: ['Fight', 'Re-roll'],
      },
      {
        id: 'allIsRot', name: 'All is Rot', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Shooting phase
        timing: 'Your Shooting phase — target one PLAGUE LEGIONS unit within Engagement Range of enemy units',
        effect: 'Until the end of the phase, enemy units are not considered to be within Engagement Range of your unit for the purposes of selecting targets of ranged weapons. Until the end of the phase, each time an enemy model loses a wound while that model\'s unit is within Engagement Range of your unit, roll one D6: on a 5+, your unit suffers 1 mortal wound after the attacking unit has finished making its attacks.',
        keywords: ['Shooting', 'Engagement Range'],
      },
      {
        id: 'fleshyAvalanche', name: 'Fleshy Avalanche', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Movement or Charge phase
        timing: 'Your Movement or Charge phase — when a PLAGUE LEGIONS MONSTER unit has not yet been selected to move or charge',
        effect: 'Until the end of the phase, each time your unit makes a Normal, Advance or Charge move, it can move horizontally through terrain features.',
        keywords: ['Movement', 'Monster', 'Terrain'],
      },
      {
        id: 'avatarsOfDecay', name: 'Avatars of Decay', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        // Strategic Ploy — your Shooting phase
        timing: 'Your Shooting phase — target one PLAGUE LEGIONS unit from your army',
        effect: 'Until the end of the phase, while an enemy unit is within 6" of your unit, that enemy unit is Afflicted.',
        keywords: ['Affliction', 'Aura'],
      },
      {
        id: 'mireslick', name: 'Mireslick', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'reaction',
        // Strategic Ploy — opponent's Movement phase, when an enemy unit selects Fall Back
        timing: 'Opponent\'s Movement phase — when an enemy unit (excluding MONSTERS and VEHICLES) is selected to Fall Back',
        effect: 'Target one PLAGUE LEGIONS unit from your army that is within Engagement Range of that enemy unit. Until the end of the phase, while an enemy unit is within Engagement Range of your unit, each time that unit is selected to Fall Back, it must take a Leadership test. If that test is failed, that unit must Remain Stationary this phase instead.',
        keywords: ['Movement', 'Fall Back', 'Leadership'],
      },
    ],
  },

}

export const dgDetachmentList = Object.values(dgDetachments)
