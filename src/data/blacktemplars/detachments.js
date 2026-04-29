// Black Templars detachments — 10th Edition (Wahapedia, April 2026)
// Sources: https://wahapedia.ru/wh40k10ed/factions/space-marines/
// Faction pack version 1.1 — Four detachments available.
// Note: BLACK TEMPLARS armies cannot include ADEPTUS ASTARTES PSYKER models.

export const blackTemplarsDetachments = {

  // ── COMPANIONS OF VEHEMENCE ────────────────────────────────────────
  // The core Black Templars detachment — melee aggression and zealous charge.

  companionsOfVehemence: {
    id: 'companionsOfVehemence',
    name: 'Companions of Vehemence',
    subtitle: 'Fanatical warriors who let none stand before their crusade.',
    playstyle: 'Melee aggression — Righteous Fervour rewards charging and fighting, granting attack buffs to units that charged. Stratagems enable fall-back-and-charge, heroic interventions, and reactive melee. Suits a pure close-combat list led by Helbrecht or the Marshal.',
    detachmentRule: {
      name: 'Righteous Fervour',
      description: "Each time a BLACK TEMPLARS unit from your army ends a Charge move, until the end of the turn, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. In addition, each time a model in a BLACK TEMPLARS unit from your army makes a melee attack, if that unit made a Charge move this turn, add 1 to the Strength characteristic of that attack.",
    },
    enhancements: [
      {
        name: 'Sigismund\'s Legacy',
        cost: 25,
        description: "BLACK TEMPLARS model only. Each time the bearer's unit ends a Charge move, until the end of the turn, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.",
      },
      {
        name: 'Crusader\'s Helm',
        cost: 20,
        description: 'BLACK TEMPLARS CHARACTER model only. While the bearer is leading a unit, each time that unit is selected to declare a charge, you can re-roll the Charge roll.',
      },
      {
        name: 'Perdition\'s Edge',
        cost: 15,
        description: "BLACK TEMPLARS model only. Add 1 to the Attacks characteristic of melee weapons equipped by the bearer. Each time the bearer destroys an enemy CHARACTER model, regain 1 Command Point (once per battle).",
      },
      {
        name: 'Armour Inviolate',
        cost: 10,
        description: 'BLACK TEMPLARS INFANTRY model only. The bearer has a 2+ invulnerable save against melee attacks.',
      },
    ],
    stratagems: [
      {
        id: 'companionsOfVehemence_zealousExpulsion',
        name: 'Zealous Expulsion',
        source: 'detachment',
        phase: 'movement',
        timing: 'Your Movement phase — just after a BLACK TEMPLARS unit Falls Back',
        trigger: 'active',
        cost: 1,
        effect: 'Until the end of the turn, that unit is eligible to declare a charge in a turn in which it Fell Back.',
      },
      {
        id: 'companionsOfVehemence_crusadersDevotion',
        name: "Crusader's Devotion",
        source: 'detachment',
        phase: 'charge',
        timing: "Your Charge phase — when a BLACK TEMPLARS unit from your army has not yet declared a charge this phase",
        trigger: 'active',
        cost: 1,
        effect: "Until the end of the phase, models in your unit can move through other models (excluding TITANIC) and terrain features without stopping, provided they end their Charge move in a legal position. Each time a model in this unit makes an attack as part of a charge, re-roll a Hit roll of 1.",
      },
      {
        id: 'companionsOfVehemence_deathBeforeDisgrace',
        name: 'Death Before Disgrace',
        source: 'detachment',
        phase: 'fight',
        timing: "Any Fight phase — just after an enemy unit selects its targets",
        trigger: 'reaction',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army (excluding VEHICLES and MONSTERS) that was selected as a target. Until the end of the phase, each time a model in that unit is destroyed, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.",
      },
      {
        id: 'companionsOfVehemence_hatredMadeManifest',
        name: 'Hatred Made Manifest',
        source: 'detachment',
        phase: 'fight',
        timing: 'Fight phase — when a BLACK TEMPLARS unit from your army has not yet been selected to fight this phase',
        trigger: 'active',
        cost: 1,
        effect: 'Until the end of the phase, each time a model in that unit makes a melee attack, a successful unmodified Hit roll of 6 automatically wounds the target (do not make a Wound roll).',
      },
      {
        id: 'companionsOfVehemence_heroicIntervention',
        name: 'Heroic Intervention',
        source: 'detachment',
        phase: 'charge',
        timing: "Opponent's Charge phase — just after an enemy unit ends a Charge move",
        trigger: 'reaction',
        cost: 1,
        effect: 'Select one BLACK TEMPLARS unit from your army (excluding VEHICLES and MONSTERS) that is within 6" of that enemy unit. Your unit can immediately make a Heroic Intervention move of up to 3" towards the nearest enemy model, ending closer to it. Your unit can then fight immediately after the charging unit.',
      },
      {
        id: 'companionsOfVehemence_ferventAssault',
        name: 'Fervent Assault',
        source: 'detachment',
        phase: 'fight',
        timing: 'Fight phase — when a BLACK TEMPLARS CHARACTER unit from your army that is leading another unit is selected to fight',
        trigger: 'active',
        cost: 2,
        effect: "Until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in that CHARACTER's unit (excluding the CHARACTER itself).",
      },
    ],
  },

  // ── VINDICATION TASK FORCE ─────────────────────────────────────────
  // Objective control and sustained combat pressure.

  vindicationTaskForce: {
    id: 'vindicationTaskForce',
    name: 'Vindication Task Force',
    subtitle: 'Scour the enemy from every corner of the battlefield.',
    playstyle: 'Board control — Purge and Sanctify rewards holding objectives and destroying units near them. Units that cleanse objectives gain sustained attack bonuses. Stratagems deny enemy objective control and let Black Templars units consolidate aggressively.',
    detachmentRule: {
      name: 'Purge and Sanctify',
      description: "Each time a BLACK TEMPLARS unit from your army destroys one or more enemy units while within range of an objective marker, until the start of your next Command phase, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit. In addition, while a BLACK TEMPLARS unit from your army is within range of an objective marker it controls, models in that unit have the Feel No Pain 6+ ability.",
    },
    enhancements: [
      {
        name: 'Icon of Zeal',
        cost: 20,
        description: "BLACK TEMPLARS CHARACTER model only. While the bearer is leading a unit and that unit is within range of an objective marker, improve the Objective Control characteristic of models in that unit by 1.",
      },
      {
        name: 'The Crusade Unending',
        cost: 15,
        description: 'BLACK TEMPLARS model only. At the start of your Command phase, if the bearer\'s unit is within range of an objective marker you control, that objective marker remains under your control until the end of the battle round, regardless of your opponent\'s Level of Control.',
      },
      {
        name: 'Vanquisher\'s Blade',
        cost: 25,
        description: "BLACK TEMPLARS model only. The bearer's melee weapons have the [PRECISION] and [LETHAL HITS] abilities. Each time the bearer makes an attack against a CHARACTER model, add 1 to the Wound roll.",
      },
      {
        name: 'Black Sword Reliquary',
        cost: 10,
        description: "BLACK TEMPLARS INFANTRY model only. Once per battle, in your Command phase, if the bearer's unit is within range of an objective marker, you can select one enemy unit within 6\" of the bearer and roll one D6: on a 3+, that enemy unit is Battle-shocked until the start of your next Command phase.",
      },
    ],
    stratagems: [
      {
        id: 'vindicationTaskForce_holdAtAllCosts',
        name: 'Hold at All Costs',
        source: 'detachment',
        phase: 'command',
        timing: 'Your Command phase',
        trigger: 'active',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army within range of an objective marker you control. That objective marker remains under your control until your opponent's Level of Control over it is greater than yours at the end of a phase.",
      },
      {
        id: 'vindicationTaskForce_purgeTheTainted',
        name: 'Purge the Tainted',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Your Shooting phase — when a BLACK TEMPLARS unit from your army has not yet been selected to shoot this phase',
        trigger: 'active',
        cost: 1,
        effect: "Until the end of the phase, ranged weapons equipped by models in your unit have the [IGNORES COVER] ability. After your unit has finished shooting, if it destroyed one or more enemy units, select one objective marker within 9\" of your unit: that objective marker is now within your army's Purge Zone until the start of your next turn. While within the Purge Zone, enemy units cannot be set up on or within range of that objective marker.",
      },
      {
        id: 'vindicationTaskForce_objectiveCleared',
        name: 'Objective Cleared',
        source: 'detachment',
        phase: 'fight',
        timing: 'Fight phase — just after a BLACK TEMPLARS unit from your army destroys one or more enemy units',
        trigger: 'active',
        cost: 1,
        effect: "Each model in your unit can make a Consolidation move of up to 6\" instead of up to 3\". Models do not need to end closer to the nearest enemy model, but must end within range of an objective marker if possible.",
      },
      {
        id: 'vindicationTaskForce_sacredGround',
        name: 'Sacred Ground',
        source: 'detachment',
        phase: 'any',
        timing: "Opponent's Shooting or Fight phase — just after an enemy unit selects its targets",
        trigger: 'reaction',
        cost: 1,
        effect: 'Select one BLACK TEMPLARS unit from your army within range of an objective marker that was selected as a target. Until the end of the phase, each time an attack is allocated to a model in your unit, subtract 1 from the Damage characteristic of that attack (to a minimum of 1).',
      },
      {
        id: 'vindicationTaskForce_wrathOfThePilgrims',
        name: 'Wrath of the Pilgrims',
        source: 'detachment',
        phase: 'charge',
        timing: 'Your Charge phase',
        trigger: 'active',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army that has not yet declared a charge this phase. Until the end of the phase, each time a model in that unit makes a melee attack as part of that charge, an unmodified Wound roll of 5+ inflicts D3 mortal wounds on the target and the attack sequence ends.",
      },
      {
        id: 'vindicationTaskForce_crusadersRenown',
        name: "Crusader's Renown",
        source: 'detachment',
        phase: 'command',
        timing: 'Your Command phase',
        trigger: 'active',
        cost: 2,
        effect: "Select one BLACK TEMPLARS INFANTRY unit from your army that is within range of an objective marker you control and is below its Starting Strength. Return up to D3 destroyed non-CHARACTER models to that unit.",
      },
    ],
  },

  // ── GODHAMMER ASSAULT FORCE ────────────────────────────────────────
  // Combined arms — vehicles and infantry smashing enemy lines.

  godhammerAssaultForce: {
    id: 'godhammerAssaultForce',
    name: 'Godhammer Assault Force',
    subtitle: 'Steel and faith smashing through the heretic line.',
    playstyle: 'Combined arms — Shock and Awe buffs both VEHICLE and INFANTRY units during the same turn when they act in concert. Land Raiders and Dreadnoughts gain synergistic bonuses with nearby infantry. Best for lists mixing armour with crusader squads.',
    detachmentRule: {
      name: 'Shock and Awe',
      description: "Each time a BLACK TEMPLARS VEHICLE model from your army shoots or fights, if one or more friendly BLACK TEMPLARS INFANTRY units are within 6\" of it, add 1 to the Hit roll for each of its attacks. Each time a BLACK TEMPLARS INFANTRY unit from your army makes an attack while it is within 6\" of one or more friendly BLACK TEMPLARS VEHICLE models, add 1 to the Wound roll of that attack.",
    },
    enhancements: [
      {
        name: 'Warmaster\'s Eye',
        cost: 20,
        description: "BLACK TEMPLARS CHARACTER model only. While the bearer is on the battlefield, once per turn, when a friendly BLACK TEMPLARS VEHICLE model within 12\" of the bearer is selected to shoot, that model can ignore the Damaged ability until the end of that phase.",
      },
      {
        name: 'The Iron Vow',
        cost: 15,
        description: "BLACK TEMPLARS model only. While the bearer's unit is within 6\" of one or more friendly BLACK TEMPLARS VEHICLE models, models in that unit have a 5+ invulnerable save.",
      },
      {
        name: 'Thunder of Conquest',
        cost: 25,
        description: "BLACK TEMPLARS VEHICLE model only. Each time this model makes an attack with an Armoured Tracks or Armoured Hull weapon, add 2 to the Strength and Damage characteristics of that attack.",
      },
      {
        name: 'Standard of the Eternal Crusade',
        cost: 10,
        description: "BLACK TEMPLARS CHARACTER model only. While the bearer is leading a unit and that unit is within 6\" of one or more friendly BLACK TEMPLARS VEHICLE models, models in that unit have the Feel No Pain 5+ ability.",
      },
    ],
    stratagems: [
      {
        id: 'godhammerAssaultForce_breakTheLines',
        name: 'Break the Lines',
        source: 'detachment',
        phase: 'movement',
        timing: 'Your Movement phase',
        trigger: 'active',
        cost: 1,
        effect: "Select one BLACK TEMPLARS VEHICLE model from your army. Until the end of the turn, that model can move through INFANTRY models and terrain features without restriction (it cannot end its move on top of other models). Each time it moves through one or more enemy INFANTRY units, each of those units suffers D3 mortal wounds.",
      },
      {
        id: 'godhammerAssaultForce_ironWall',
        name: 'Iron Wall',
        source: 'detachment',
        phase: 'any',
        timing: "Opponent's Shooting or Fight phase — just after an enemy unit selects its targets",
        trigger: 'reaction',
        cost: 1,
        effect: 'Select one BLACK TEMPLARS VEHICLE unit from your army that was selected as a target. Until the end of the phase, worsen the Armour Penetration characteristic of attacks targeting that model by 1.',
      },
      {
        id: 'godhammerAssaultForce_disembarkUnderFire',
        name: 'Disembark Under Fire',
        source: 'detachment',
        phase: 'movement',
        timing: 'Your Movement phase — just after a unit disembarks from a BLACK TEMPLARS TRANSPORT model',
        trigger: 'active',
        cost: 1,
        effect: 'That disembarking unit is still eligible to shoot and declare a charge this turn, even if the transport made a Normal move.',
      },
      {
        id: 'godhammerAssaultForce_landRaiderVanguard',
        name: 'Land Raider Vanguard',
        source: 'detachment',
        phase: 'fight',
        timing: "Opponent's Charge phase — just after an enemy unit ends a Charge move within 3\" of a BLACK TEMPLARS TRANSPORT model",
        trigger: 'reaction',
        cost: 1,
        effect: 'Select one BLACK TEMPLARS unit embarked within that transport. That unit can immediately disembark (even though the transport did not move) and consolidate up to 3" toward the nearest enemy model. It can fight this turn.',
      },
      {
        id: 'godhammerAssaultForce_heavyBombardment',
        name: 'Heavy Bombardment',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Your Shooting phase — when a BLACK TEMPLARS VEHICLE unit from your army has not yet been selected to shoot this phase',
        trigger: 'active',
        cost: 2,
        effect: "Until the end of the phase, ranged weapons equipped by that VEHICLE model have the [ASSAULT] ability. After that VEHICLE model has shot, if it destroyed one or more enemy units, each BLACK TEMPLARS INFANTRY unit within 6\" of the destroyed unit's location is immediately eligible to shoot (they must still select valid targets).",
      },
      {
        id: 'godhammerAssaultForce_armouredSpearhead',
        name: 'Armoured Spearhead',
        source: 'detachment',
        phase: 'movement',
        timing: 'Your Movement phase — just after a BLACK TEMPLARS VEHICLE unit Falls Back',
        trigger: 'active',
        cost: 1,
        effect: 'Until the end of the turn, that VEHICLE unit is eligible to shoot and declare a charge in a turn in which it Fell Back.',
      },
    ],
  },

  // ── WRATHFUL PROCESSION ────────────────────────────────────────────
  // Litany-fuelled advance — Chaplain/Execrator driven Crusader synergy.

  wrathfulProcession: {
    id: 'wrathfulProcession',
    name: 'Wrathful Procession',
    subtitle: 'Chaplains carry the crusade\'s wrath into the enemy\'s heart.',
    playstyle: 'Chaplain-led litanies — Zealous Litanies rotates powerful buffs each Command phase, giving your BLACK TEMPLARS units stacking bonuses for advance, charge, and fight. Works best with multiple Chaplain/Execrator leaders spread across key units.',
    detachmentRule: {
      name: 'Zealous Litanies',
      description: "In your Command phase, you can select one of the following Zealous Litanies to take effect until the start of your next Command phase. Each litany can be selected once per battle.\n\n• Litany of Righteous Charge: Each time a BLACK TEMPLARS unit from your army declares a charge, add 2\" to its Charge roll.\n• Litany of Merciless Slaughter: Each time a model in a BLACK TEMPLARS unit from your army makes a melee attack, re-roll a Wound roll of 1. If the target is within range of an objective marker, re-roll the Wound roll instead.\n• Litany of Contemptuous Defiance: Models in BLACK TEMPLARS units from your army have the Feel No Pain 5+ ability against Psychic Attacks and mortal wounds. In addition, each time a Battle-shock test is taken for a BLACK TEMPLARS unit, add 1 to the result.",
    },
    enhancements: [
      {
        name: 'Voice of the Crusade',
        cost: 25,
        description: 'CHAPLAIN or EXECRATOR model only. This model can select two Zealous Litanies instead of one each Command phase (each litany can still only be selected once per battle). The second litany only applies to this model\'s unit.',
      },
      {
        name: 'Martyr\'s Shroud',
        cost: 15,
        description: "BLACK TEMPLARS model only. While the bearer is leading a unit, models in that unit have the Feel No Pain 4+ ability against wounds suffered during the Fight phase.",
      },
      {
        name: 'Zealot\'s Skull',
        cost: 20,
        description: "BLACK TEMPLARS CHARACTER model only. While the bearer is on the battlefield, friendly BLACK TEMPLARS units within 9\" of the bearer that are not Battle-shocked are not affected by any abilities that would reduce their Move characteristic or prevent them from charging.",
      },
      {
        name: 'Relic Blade of the Ancients',
        cost: 10,
        description: "BLACK TEMPLARS model only. One melee weapon equipped by the bearer gains the [ANTI-CHARACTER 4+], [PRECISION], and [DEVASTATING WOUNDS] abilities.",
      },
    ],
    stratagems: [
      {
        id: 'wrathfulProcession_litanyEchoes',
        name: 'Litany Echoes',
        source: 'detachment',
        phase: 'command',
        timing: 'Your Command phase',
        trigger: 'active',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army that is within 6\" of a friendly CHAPLAIN or EXECRATOR model. That unit benefits from the active Zealous Litany this turn, even if a different litany would normally apply to it.",
      },
      {
        id: 'wrathfulProcession_zealousCharge',
        name: 'Zealous Charge',
        source: 'detachment',
        phase: 'charge',
        timing: 'Your Charge phase',
        trigger: 'active',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army that has not yet declared a charge this phase and is within 6\" of a friendly CHAPLAIN or EXECRATOR model. Until the end of the phase, that unit is eligible to declare a charge even if it Advanced this turn, and you can re-roll its Charge roll.",
      },
      {
        id: 'wrathfulProcession_divineWrathChaplain',
        name: 'Divine Wrath',
        source: 'detachment',
        phase: 'fight',
        timing: 'Fight phase — when a BLACK TEMPLARS CHAPLAIN or EXECRATOR unit from your army is selected to fight',
        trigger: 'active',
        cost: 1,
        effect: 'Until the end of the phase, each time the CHAPLAIN or EXECRATOR model makes an attack, an unmodified Hit roll of 5+ scores a Critical Hit. In addition, add 1 to the Damage characteristic of melee weapons equipped by this model for each enemy CHARACTER within Engagement Range (to a maximum of +3).',
      },
      {
        id: 'wrathfulProcession_wordOfZeal',
        name: 'Word of Zeal',
        source: 'detachment',
        phase: 'any',
        timing: 'Start of any phase',
        trigger: 'active',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army that is currently Battle-shocked and is within 6\" of a friendly CHAPLAIN or EXECRATOR model. That unit immediately ceases to be Battle-shocked.",
      },
      {
        id: 'wrathfulProcession_unyieldingFaith',
        name: 'Unyielding Faith',
        source: 'detachment',
        phase: 'any',
        timing: "Opponent's Shooting or Fight phase — just after an enemy unit selects its targets",
        trigger: 'reaction',
        cost: 1,
        effect: "Select one BLACK TEMPLARS unit from your army within 6\" of a friendly CHAPLAIN or EXECRATOR model that was selected as a target. Until the end of the phase, that unit has the Feel No Pain 4+ ability.",
      },
      {
        id: 'wrathfulProcession_hymnsOfHate',
        name: 'Hymns of Hate',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Your Shooting phase or Fight phase — when a BLACK TEMPLARS unit from your army within 6" of a CHAPLAIN or EXECRATOR model has not yet been selected to act this phase',
        trigger: 'active',
        cost: 2,
        effect: "Until the end of the phase, each time a model in your unit makes an attack, add 1 to the Hit roll and add 1 to the Wound roll. This bonus does not apply to the CHAPLAIN or EXECRATOR model itself.",
      },
    ],
  },

}

export const blackTemplarsDetachmentList = Object.values(blackTemplarsDetachments)
