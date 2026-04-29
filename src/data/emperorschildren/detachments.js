// Emperor's Children detachments — 10th Edition (Wahapedia, April 2026)
// Sources: https://wahapedia.ru/wh40k10ed/factions/emperor-s-children/

export const ecDetachments = {

  mercurialHost: {
    id: 'mercurialHost',
    name: 'Mercurial Host',
    subtitle: 'Speed, sensation, and relentless pursuit.',
    playstyle: 'Hyper-mobile raiders using speed and fluid repositioning to overwhelm the enemy from unexpected angles.',
    detachmentRule: {
      name: 'Quicksilver Grace',
      description: 'You can re-roll Advance rolls made for EMPEROR\'S CHILDREN units from your army.',
    },
    enhancements: [
      {
        name: 'Steeped in Suffering',
        cost: 20,
        description: 'Add 1 to Hit rolls for attacks made by the bearer\'s unit that target a unit below its Starting Strength. If the target is below half-strength, also add 1 to Wound rolls.',
      },
      {
        name: 'Intoxicating Musk',
        cost: 20,
        description: 'Each time a model makes an attack that targets the bearer\'s unit, if the Strength characteristic of that attack is greater than the Toughness of a model in the bearer\'s unit, subtract 1 from the Wound roll.',
      },
      {
        name: 'Tactical Perfection',
        cost: 15,
        description: 'After both armies have deployed but before the first battle round begins, you can redeploy up to two EMPEROR\'S CHILDREN units from your army. Each unit can be placed back into Strategic Reserves or redeployed anywhere in your deployment zone.',
      },
      {
        name: 'Loathsome Dexterity',
        cost: 10,
        description: 'The bearer can move through other models and terrain features without restriction. Any Desperate Escape tests taken by the bearer are automatically passed.',
      },
    ],
    stratagems: [
      {
        id: 'violentExcess', name: 'Violent Excess', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before an EMPEROR\'S CHILDREN unit fights',
        effect: 'Until the end of the phase, melee weapons equipped by models in your unit have the [SUSTAINED HITS 1] ability.',
        keywords: ['Fight', 'Buff'],
      },
      {
        id: 'combatStimms', name: 'Combat Stimms', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase — when an enemy unit selects an EMPEROR\'S CHILDREN unit as a target',
        effect: 'Until the end of the phase, subtract 1 from Wound rolls made for attacks that target your unit.',
        keywords: ['Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'honourThePrince', name: 'Honour the Prince', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase — when an EMPEROR\'S CHILDREN unit Advances',
        effect: 'Instead of rolling, add 6" to the Move characteristic of one EMPEROR\'S CHILDREN unit from your army until the end of the phase.',
        keywords: ['Movement', 'Speed'],
      },
      {
        id: 'darkVigour', name: 'Dark Vigour', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Movement phase — after an enemy unit ends a move',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army that is not within Engagement Range of any enemy units and is within 12" of that enemy unit. Your unit can make a Normal move of up to 6".',
        keywords: ['Movement', 'Reaction'],
      },
      {
        id: 'capriciousReactions', name: 'Capricious Reactions', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting phase — after an enemy unit selects targets',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army that was selected as a target. Until the end of the phase, subtract 1 from Hit rolls for attacks that target your unit.',
        keywords: ['Shooting', 'Reaction', 'Defence'],
      },
      {
        id: 'cruelRaiders', name: 'Cruel Raiders', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'End of opponent\'s Fight phase',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army that is not within Engagement Range of any enemy units and is wholly within 9" of any battlefield edge. Remove that unit from the battlefield and place it into Strategic Reserves.',
        keywords: ['Fight', 'Retreat'],
      },
    ],
  },

  peerlessBladesmen: {
    id: 'peerlessBladesmen',
    name: 'Peerless Bladesmen',
    subtitle: 'The blade is perfect. So is its wielder.',
    playstyle: 'Precision melee elite — charge in, select your bonus, and carve through anything with lethal or sustained strikes.',
    detachmentRule: {
      name: 'Exquisite Swordsmanship',
      description: 'Each time an EMPEROR\'S CHILDREN unit from your army is selected to fight, if that unit made a Charge move this turn, until the end of the phase select one of the following for melee weapons equipped by models in that unit: they have the [LETHAL HITS] ability, or they have the [SUSTAINED HITS 1] ability.',
    },
    commandPhaseAction: null,
    enhancements: [
      {
        name: 'Faultless Opportunist',
        cost: 15,
        description: 'Each time a friendly unit is selected for the Heroic Intervention Stratagem while within 3" of the bearer, that Stratagem costs 0CP. This ability can be used multiple times per phase.',
      },
      {
        name: 'Blinding Speed',
        cost: 25,
        description: 'Once per battle, at the start of the Fight phase, the bearer\'s unit gains the Fights First ability until the end of the phase.',
      },
      {
        name: 'Distortion',
        cost: 25,
        description: 'Add 1 to the Attacks characteristic and add 1 to the Damage characteristic of melee weapons equipped by the bearer.',
      },
      {
        name: 'Rise to the Challenge',
        cost: 30,
        description: 'INFANTRY model only. Once per battle, at the end of the Fight phase, if the bearer\'s unit is within Engagement Range of 3 or more enemy units, the bearer\'s unit can fight again.',
      },
    ],
    stratagems: [
      {
        id: 'deftParry', name: 'Deft Parry', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase — when an enemy unit selects an EMPEROR\'S CHILDREN unit as a target',
        effect: 'Until the end of the phase, subtract 1 from Hit rolls made for attacks that target your unit.',
        keywords: ['Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'deathEcstasy', name: 'Death Ecstasy', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase — when an EMPEROR\'S CHILDREN unit is destroyed',
        effect: 'Select one model in the destroyed unit before removing it. That model fights after the attacking unit has finished making its attacks, then is removed.',
        keywords: ['Fight', 'Reaction', 'On Death'],
      },
      {
        id: 'incessantViolence', name: 'Incessant Violence', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before an EMPEROR\'S CHILDREN unit Consolidates',
        effect: 'Models in your unit can Consolidate up to 6" instead of 3", provided they end that move within Engagement Range of one or more enemy units.',
        keywords: ['Fight', 'Movement'],
      },
      {
        id: 'cruelBladesman', name: 'Cruel Bladesman', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before an EMPEROR\'S CHILDREN unit that made a Charge move this turn fights',
        effect: 'Until the end of the phase, improve the AP characteristic of melee weapons equipped by models in your unit by 1.',
        keywords: ['Fight', 'Buff'],
      },
      {
        id: 'terrifyingSpectacle', name: 'Terrifying Spectacle', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one enemy unit within 6" of an EMPEROR\'S CHILDREN unit from your army. That enemy unit must take a Battle-shock test, subtracting 1 from the result.',
        keywords: ['Command', 'Battle-shock'],
      },
      {
        id: 'cutDownTheWeak', name: 'Cut Down the Weak', cost: 2,
        phase: 'movement', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Movement phase — when an enemy unit Falls Back',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army that is within Engagement Range of the unit that is Falling Back. Your unit can declare a charge against that enemy unit after it finishes its Fall Back move.',
        keywords: ['Movement', 'Reaction', 'Charge'],
      },
    ],
  },

  rapidEvisceration: {
    id: 'rapidEvisceration',
    name: 'Rapid Evisceration',
    subtitle: 'Strike fast. Strike from steel.',
    playstyle: 'Mechanised assault — use Chaos Rhinos and Land Raiders to deliver warriors into close range for devastating hit-and-run strikes.',
    detachmentRule: {
      name: 'Mechanised Murder',
      description: 'Each time an EMPEROR\'S CHILDREN model from your army makes an attack, if it is a TRANSPORT model or if it disembarked from a TRANSPORT model this turn, re-roll a Hit roll of 1 and re-roll a Wound roll of 1.',
    },
    commandPhaseAction: null,
    enhancements: [
      {
        name: 'Sublime Prescience',
        cost: 25,
        description: 'INFANTRY model only. Once per turn, you can increase the earliest turn number that one Strategic Reserve unit from your army can arrive by 1, allowing it to arrive from Strategic Reserves one turn earlier than normal.',
      },
      {
        name: 'Spearhead Striker',
        cost: 20,
        description: 'INFANTRY model only. After the bearer\'s unit disembarks from a TRANSPORT model, it can re-roll its Charge roll this turn. Enemy units cannot fire Overwatch against the bearer\'s unit this turn.',
      },
      {
        name: 'Accomplished Tactician',
        cost: 35,
        description: 'INFANTRY model only. Once per turn, after the bearer\'s unit has been selected as the target of ranged attacks and those attacks have been resolved, the bearer\'s unit can embark within a friendly TRANSPORT model within 3" of it.',
      },
      {
        name: 'Heretek Adept',
        cost: 35,
        description: 'INFANTRY model only. Once per battle round, if this model is within 6" of a friendly VEHICLE model, you can change the Damage characteristic of one attack allocated to that VEHICLE model to 0.',
      },
    ],
    stratagems: [
      {
        id: 'ontoTheNext', name: 'Onto the Next', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'End of Fight phase — after an EMPEROR\'S CHILDREN unit destroys an enemy unit',
        effect: 'If a friendly EMPEROR\'S CHILDREN TRANSPORT model is within 6" of your unit and has capacity, your unit can embark within it.',
        keywords: ['Fight', 'Transport'],
      },
      {
        id: 'advanceAndClaim', name: 'Advance and Claim', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase — when an EMPEROR\'S CHILDREN TRANSPORT is within range of an objective',
        effect: 'Select one EMPEROR\'S CHILDREN TRANSPORT from your army that is within range of an objective marker you control. Until the start of your next Command phase, that objective marker remains under your control even if no friendly models are within range.',
        keywords: ['Command', 'Objective'],
      },
      {
        id: 'dynamicBreakthrough', name: 'Dynamic Breakthrough', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase — when an EMPEROR\'S CHILDREN VEHICLE moves',
        effect: 'Select one EMPEROR\'S CHILDREN VEHICLE from your army (excluding MONSTER and VEHICLE units with the TRANSPORT keyword that have models embarked). Until the end of the phase, that model can move through other models (excluding TITANIC models) and terrain features. It cannot end that move within Engagement Range of enemy models.',
        keywords: ['Movement', 'Vehicle'],
      },
      {
        id: 'ceaselessOnslaught', name: 'Ceaseless Onslaught', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Charge phase — after an EMPEROR\'S CHILDREN unit disembarks from a TRANSPORT',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army that disembarked from a TRANSPORT model this turn. That unit is eligible to declare a charge this turn even if it arrived via Strategic Reserves.',
        keywords: ['Charge', 'Transport'],
      },
      {
        id: 'reactiveDisembarkation', name: 'Reactive Disembarkation', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting phase — when an EMPEROR\'S CHILDREN TRANSPORT is selected as a target',
        effect: 'Before any attacks are resolved, select one unit embarked within that TRANSPORT. That unit can disembark, moving up to 6" from the TRANSPORT model.',
        keywords: ['Shooting', 'Reaction', 'Transport'],
      },
      {
        id: 'outflankingStrike', name: 'Outflanking Strike', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'End of opponent\'s Fight phase',
        effect: 'Select one EMPEROR\'S CHILDREN TRANSPORT model from your army that has no models embarked and is not within Engagement Range of any enemy units. Remove it from the battlefield and place it into Strategic Reserves.',
        keywords: ['Fight', 'Transport', 'Retreat'],
      },
    ],
  },

  carnivalOfExcess: {
    id: 'carnivalOfExcess',
    name: 'Carnival of Excess',
    subtitle: 'Where daemon meets warrior, reality dissolves.',
    playstyle: 'Mixed mortal-daemon force — Legions of Excess units fight alongside Emperor\'s Children, granting mutual buffs and chaotic synergies.',
    detachmentRule: {
      name: 'Daemonic Empowerment',
      description: 'Each time an EMPEROR\'S CHILDREN or LEGIONS OF EXCESS unit from your army is selected to fight, if it is within 6" of a unit of the opposite group (EMPEROR\'S CHILDREN near LEGIONS OF EXCESS or vice versa), melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. If that unit already has the [SUSTAINED HITS 1] ability, unmodified Hit rolls of 5+ score Critical Hits instead.',
    },
    commandPhaseAction: null,
    enhancements: [
      {
        name: 'Empyric Suffusion',
        cost: 15,
        description: 'Once per battle round, when a friendly SLAANESH unit within 6" of the bearer would be selected for the Heroic Intervention Stratagem, that Stratagem costs 0CP.',
      },
      {
        name: 'Dark Blessings',
        cost: 10,
        description: 'INFANTRY model only. Once per battle, after an enemy unit selects the bearer\'s unit as a target, the bearer\'s unit gains a 3+ invulnerable save until the end of the phase.',
      },
      {
        name: 'Possessed Blade',
        cost: 25,
        description: 'Add 1 to the Attacks characteristic of one of the bearer\'s melee weapons. Once per battle, at the start of the Fight phase, you can activate the Possessed Blade: until the end of the phase, that weapon has the [DEVASTATING WOUNDS] and [HAZARDOUS] abilities and add 1 to its Damage characteristic.',
      },
      {
        name: 'Warp Walker',
        cost: 30,
        description: 'KEEPER OF SECRETS model only. Add 6" to this model\'s Advance rolls instead of rolling. This model can move through other models and terrain features, and any Desperate Escape tests are automatically passed.',
      },
    ],
    stratagems: [
      {
        id: 'sustainedByAgony', name: 'Sustained by Agony', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — after a LEGIONS OF EXCESS unit destroys an enemy unit',
        effect: 'Select one friendly LEGIONS OF EXCESS unit within 6" of the destroyed unit. That unit either regains 3 lost wounds, or one destroyed DAEMONETTE model is returned to that unit with D3+3 wounds.',
        keywords: ['Fight', 'Heal'],
      },
      {
        id: 'ecstaticSlaughter', name: 'Ecstatic Slaughter', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — after a LEGIONS OF EXCESS unit destroys an enemy unit',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army within 6" of that LEGIONS OF EXCESS unit. If that EMPEROR\'S CHILDREN unit is not within Engagement Range of any enemy units, it can immediately declare and resolve a Charge move.',
        keywords: ['Fight', 'Charge'],
      },
      {
        id: 'violentCrescendo', name: 'Violent Crescendo', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — after a SLAANESH unit from your army has fought',
        effect: 'Models in your unit can Consolidate up to 6" without the normal requirement to end closer to the nearest enemy unit.',
        keywords: ['Fight', 'Movement'],
      },
      {
        id: 'sycophantic_surge', name: 'Sycophantic Surge', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Charge phase — after a LEGIONS OF EXCESS unit ends a Charge move',
        effect: 'If a friendly LEGIONS OF EXCESS unit ends a Charge move within Engagement Range of an enemy unit that is already within Engagement Range of an EMPEROR\'S CHILDREN unit, the LEGIONS OF EXCESS unit is eligible to declare a charge even if it Advanced this turn.',
        keywords: ['Charge', 'Daemon'],
      },
      {
        id: 'uncannyReactions', name: 'Uncanny Reactions', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting phase — when an enemy unit selects a SLAANESH unit as target',
        effect: 'Select one SLAANESH unit from your army that was selected as the target. Until the end of the phase, subtract 1 from Hit rolls for attacks that target your unit.',
        keywords: ['Shooting', 'Reaction', 'Defence'],
      },
      {
        id: 'darkApparitions', name: 'Dark Apparitions', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'End of opponent\'s Fight phase',
        effect: 'Select one DAEMONETTES unit from your army that is not within Engagement Range of any enemy units. Remove it from the battlefield and place it into Strategic Reserves. At the start of your next Movement phase, set it up anywhere on the battlefield that is more than 6" horizontally from all enemy models and within 6" of a friendly EMPEROR\'S CHILDREN unit.',
        keywords: ['Fight', 'Repositioning', 'Daemon'],
      },
    ],
  },

  coterieOfTheConceited: {
    id: 'coterieOfTheConceited',
    name: 'Coterie of the Conceited',
    subtitle: 'Bargain hard. Kill harder. Never fail.',
    playstyle: 'High-risk, high-reward pledge system — declare kill quotas each round to unlock escalating combat bonuses, or suffer the consequences.',
    detachmentRule: {
      name: 'Pledges to the Dark Prince',
      description: 'At the start of each of your Command phases, declare a pledge — announce a number of enemy units you intend to destroy this battle round. If you destroy at least that many, gain 1 Pact point. If you fail, your WARLORD suffers D3 mortal wounds. Pact points provide cumulative bonuses: 1 point — EMPEROR\'S CHILDREN units can re-roll Hit rolls of 1; 3 points — they can also re-roll Wound rolls of 1; 5 points — melee weapons also gain [LETHAL HITS] or [SUSTAINED HITS 1] (choose at start of Fight phase); 7+ points — unmodified Hit rolls of 5+ score Critical Hits.',
    },
    commandPhaseAction: {
      type: 'declare_pledge',
      label: 'Declare Pledge',
      prompt: 'Announce how many enemy units you will destroy this battle round (minimum 1):',
    },
    enhancements: [
      {
        name: 'Pledge of Eternal Servitude',
        cost: 25,
        description: 'The first time the bearer is destroyed, roll one D6 at the end of the phase: on a result equal to or less than the bearer\'s Leadership characteristic, set the bearer back up with D6 wounds remaining as close as possible to where it was destroyed.',
      },
      {
        name: 'Pledge of Dark Glory',
        cost: 25,
        description: 'Improve the Leadership characteristic of the bearer by 1 and improve the Objective Control characteristic of models in the bearer\'s unit by 1.',
      },
      {
        name: 'Pledge of Mortal Pain',
        cost: 15,
        description: 'Once per battle round, select one enemy unit within 12" of the bearer. That unit must take a Battle-shock test, subtracting 2 from the result if it is already Battle-shocked. If that test is failed, that unit suffers 3 mortal wounds.',
      },
      {
        name: 'Pledge of Unholy Fortune',
        cost: 30,
        description: 'Once per turn, if the bearer\'s unit is not Battle-shocked, you can treat one Hit roll, Wound roll, or saving throw made for a model in that unit as an unmodified result of 6.',
      },
    ],
    stratagems: [
      {
        id: 'protectionOfTheDarkPrince', name: 'Protection of the Dark Prince', cost: 1,
        phase: 'any', source: 'detachment', trigger: 'active',
        timing: 'Any phase — when an EMPEROR\'S CHILDREN unit is selected as the target of an attack',
        effect: 'Until the end of the phase, models in your unit have the Feel No Pain 6+ ability. Against mortal wounds, they have the Feel No Pain 4+ ability instead.',
        keywords: ['Defence', 'Feel No Pain'],
      },
      {
        id: 'unshakeableOpponents', name: 'Unshakeable Opponents', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army. Until the start of your next turn, models in that unit can ignore any and all modifiers to their Ballistic Skill, Weapon Skill, Hit rolls, and Wound rolls.',
        keywords: ['Command', 'Buff'],
      },
      {
        id: 'embraceThePain', name: 'Embrace the Pain', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — at the start of the Fight phase',
        effect: 'Select one EMPEROR\'S CHILDREN unit from your army that is within Engagement Range of one or more enemy units. Until the end of the phase, enemy units within Engagement Range of your unit must select your unit as a target if they are able to.',
        keywords: ['Fight', 'Taunt'],
      },
      {
        id: 'martialPerfection', name: 'Martial Perfection', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before an EMPEROR\'S CHILDREN unit fights',
        effect: 'Until the end of the phase, you can re-roll Hit rolls for attacks made by models in your unit.',
        keywords: ['Fight', 'Buff'],
      },
      {
        id: 'unboundArrogance', name: 'Unbound Arrogance', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Shooting or Fight phase — after an EMPEROR\'S CHILDREN unit destroys an enemy unit (once per battle round)',
        effect: 'Increase your current Pact point total by 1. This cannot cause you to exceed the declared pledge threshold.',
        keywords: ['Buff', 'Pact'],
      },
      {
        id: 'armourOfAbhorrence', name: 'Armour of Abhorrence', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting or Fight phase — when an EMPEROR\'S CHILDREN unit is selected as target',
        effect: 'Until the attacks are resolved, improve the AP characteristic of attacks that target your unit by 1 (i.e. AP -1 becomes AP 0, AP -2 becomes AP -1, etc.).',
        keywords: ['Shooting', 'Fight', 'Reaction', 'Defence'],
      },
    ],
  },

  slaaneshsChosen: {
    id: 'slaaneshsChosen',
    name: "Slaanesh's Chosen",
    subtitle: 'Only the greatest champion deserves the Throne of Bliss.',
    playstyle: 'CHARACTER-led rivalry engine — your WARLORD starts as Favoured Champions, and the title passes to whichever CHARACTER destroys an enemy first each turn, granting powerful re-rolls.',
    detachmentRule: {
      name: 'Internal Rivalries',
      description: 'CHARACTER models in EMPEROR\'S CHILDREN units ignore modifiers to their Move and Advance/Charge rolls. At the start of the battle, your WARLORD is the Favoured Champions. The first CHARACTER in your army to destroy an enemy unit each turn becomes the new Favoured Champions until the start of your next turn. Models in the Favoured Champions unit can re-roll Wound rolls.',
    },
    commandPhaseAction: null,
    enhancements: [
      {
        name: 'Eager to Prove',
        cost: 15,
        description: 'You can re-roll Charge rolls made for the bearer\'s unit. If the bearer is currently the Favoured Champions, add 2" to the bearer\'s Move characteristic as well.',
      },
      {
        name: 'Repulsed by Weakness',
        cost: 25,
        description: 'Enemy units must subtract 1 from Desperate Escape tests while within Engagement Range of the bearer\'s unit. If the bearer is currently the Favoured Champions, subtract a further 1.',
      },
      {
        name: 'Proud and Vainglorious',
        cost: 20,
        description: 'You can re-roll Battle-shock and Leadership tests made for the bearer\'s unit. If the bearer is currently the Favoured Champions, add 1 to the Objective Control characteristic of models in the bearer\'s unit.',
      },
      {
        name: 'Slayer of Champions',
        cost: 15,
        description: 'Melee weapons equipped by the bearer have the [PRECISION] ability. Each time the bearer makes a melee attack that targets a CHARACTER unit, add 1 to the Strength and improve the AP characteristic by 1 of that attack.',
      },
    ],
    stratagems: [
      {
        id: 'devotedDuellists', name: 'Devoted Duellists', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before EMPEROR\'S CHILDREN CHARACTER units fight',
        effect: 'Select one enemy unit within Engagement Range of one or more EMPEROR\'S CHILDREN CHARACTER units from your army. Until the end of the phase, melee weapons equipped by models in those CHARACTER units have the [SUSTAINED HITS 1] ability when targeting that enemy unit.',
        keywords: ['Fight', 'Buff'],
      },
      {
        id: 'beautifulDeath', name: 'Beautiful Death', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase — when an EMPEROR\'S CHILDREN CHARACTER unit is destroyed',
        effect: 'Roll one D6, adding 1 if that unit was the Favoured Champions: on a 4+, one model in that unit fights after the attacking unit has finished making its attacks, then is removed.',
        keywords: ['Fight', 'Reaction', 'On Death'],
      },
      {
        id: 'heightenedJealousy', name: 'Heightened Jealousy', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Shooting or Fight phase — when an EMPEROR\'S CHILDREN CHARACTER becomes the Favoured Champions',
        effect: 'Until the end of the phase, add 1 to the Strength characteristic of melee weapons equipped by models in all other EMPEROR\'S CHILDREN CHARACTER units from your army.',
        keywords: ['Buff', 'Character'],
      },
      {
        id: 'diabolicMajesty', name: 'Diabolic Majesty', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Shooting or Fight phase — when an EMPEROR\'S CHILDREN unit becomes the Favoured Champions (once per battle round)',
        effect: 'Each enemy unit within 6" of the newly-crowned Favoured Champions must take a Battle-shock test, subtracting 1 from the result.',
        keywords: ['Battle-shock', 'Morale'],
      },
      {
        id: 'refusalToBeOutdone', name: 'Refusal to Be Outdone', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Charge phase — when an EMPEROR\'S CHILDREN unit declares a charge',
        effect: 'If the target unit is within Engagement Range of one or more friendly EMPEROR\'S CHILDREN units, add 2 to the Charge roll.',
        keywords: ['Charge', 'Buff'],
      },
      {
        id: 'vengefulSurge', name: 'Vengeful Surge', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting phase — when an EMPEROR\'S CHILDREN CHARACTER unit suffers one or more wounds',
        effect: 'Roll one D6, re-rolling the result if the affected unit is not the Favoured Champions: that unit can move up to that many inches toward the nearest enemy unit.',
        keywords: ['Shooting', 'Reaction', 'Movement'],
      },
    ],
  },

  courtOfThePhoenician: {
    id: 'courtOfThePhoenician',
    name: 'Court of the Phoenician',
    subtitle: "Fulgrim's art is slaughter. His audience is eternity.",
    playstyle: 'Fulgrim-themed melee assault — charging units gain enhanced weapon profiles, and DAEMON units interact with terrain and enemy charges in unique ways.',
    detachmentRule: {
      name: 'Sensational Performance',
      description: 'Each time an EMPEROR\'S CHILDREN unit from your army is selected to fight, if that unit made a Charge move this turn, melee weapons equipped by models in that unit gain +1 Strength and improve their AP characteristic by 1 until the end of the phase.',
    },
    commandPhaseAction: null,
    enhancements: [
      {
        name: 'Tears of the Phoenix',
        cost: 25,
        description: 'The bearer can ignore any and all modifiers to its Weapon Skill characteristic and to Hit and Wound rolls for its melee attacks.',
      },
      {
        name: 'Exalted Patron',
        cost: 15,
        description: 'LORD EXULTANT model only. Add 1" to this model\'s Move characteristic. This model can also attach to FLAWLESS BLADES units in addition to its normal eligible units.',
      },
      {
        name: 'Soulstain Made Manifest',
        cost: 15,
        description: 'At the start of the Fight phase, select one enemy unit within Engagement Range of the bearer\'s unit. That unit must take a Battle-shock test, subtracting 1 from the result.',
      },
      {
        name: 'Spiritsliver',
        cost: 20,
        description: 'DAEMON PRINCE model only. Add 1 to the Strength characteristic and add 1 to the Attacks characteristic of melee weapons equipped by the bearer.',
      },
    ],
    stratagems: [
      {
        id: 'contemptousDisregard', name: 'Contemptuous Disregard', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting or Fight phase — when an EMPEROR\'S CHILDREN unit is selected as target',
        effect: 'Until the attacks are resolved, each time an attack targets your unit, if the Strength characteristic of that attack is greater than the Toughness of models in your unit, subtract 1 from the Wound roll.',
        keywords: ['Shooting', 'Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'pridefulSuperiority', name: 'Prideful Superiority', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase — before an EMPEROR\'S CHILDREN unit fights',
        effect: 'Until the end of the phase, you can re-roll Hit rolls and re-roll Wound rolls for attacks made by models in your unit that target CHARACTER units.',
        keywords: ['Fight', 'Buff', 'Character'],
      },
      {
        id: 'sinuousBreach', name: 'Sinuous Breach', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement or Charge phase — when a DAEMON unit moves',
        effect: 'Select one EMPEROR\'S CHILDREN DAEMON unit from your army. Until the end of the phase, that unit can move horizontally through terrain features without restriction.',
        keywords: ['Movement', 'Charge', 'Daemon'],
      },
      {
        id: 'closeQuartersExcruciation', name: 'Close-Quarters Excruciation', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase — before an EMPEROR\'S CHILDREN unit shoots',
        effect: 'Until the end of the phase, add 1 to the Strength characteristic and improve the AP characteristic by 1 of ranged attacks made by models in your unit that target units within 12".',
        keywords: ['Shooting', 'Buff'],
      },
      {
        id: 'euphoricInspiration', name: 'Euphoric Inspiration', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Charge phase — when an EMPEROR\'S CHILDREN DAEMON unit ends a Charge move',
        effect: 'Select one EMPEROR\'S CHILDREN unit (excluding DAEMON units) from your army within 6" of that DAEMON unit. That unit can re-roll its Charge roll this turn.',
        keywords: ['Charge', 'Daemon'],
      },
      {
        id: 'catalyticStimulus', name: 'Catalytic Stimulus', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: 'Opponent\'s Shooting phase — when an EMPEROR\'S CHILDREN unit suffers one or more wounds',
        effect: 'Roll one D6: that unit can immediately move up to that many inches toward the closest enemy unit.',
        keywords: ['Shooting', 'Reaction', 'Movement'],
      },
    ],
  },

}

export const ecDetachmentList = Object.values(ecDetachments)
