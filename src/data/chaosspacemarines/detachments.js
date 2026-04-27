// Chaos Space Marines — Slaves to Darkness detachment (10th Edition Index)

export const csmDetachments = {

  slavesToDarkness: {
    id: 'slavesToDarkness',
    name: 'Slaves to Darkness',
    subtitle: 'The Long War never ends — the traitors fight with hateful purpose.',
    playstyle: "Sustained aggression — auto-wound on hit rolls of 6. Stratagems reward attacking relentlessly and punish enemies who charge in.",
    detachmentRule: {
      name: 'Veterans of the Long War',
      description: "Each time a HERETIC ASTARTES unit from your army makes an attack, on an unmodified Hit roll of 6, that attack automatically wounds the target (do not make a Wound roll). In addition, at the start of the battle, you can give every HERETIC ASTARTES unit in your army one of the following Marks of Chaos: KHORNE (+1 Attack to melee weapons), NURGLE (Feel No Pain 6+), SLAANESH (+1 to Advance and Charge rolls), or TZEENTCH (+1 to Invulnerable saves, min 4+).",
    },
    enhancements: [
      { name: 'Arch-Despoiler', cost: 25, description: "HERETIC ASTARTES CHARACTER model only. Once per battle, at the start of your Command phase, select one objective marker within 6\" of the bearer. Until the end of the battle, that objective is under your control unless your opponent's Level of Control exceeds yours at the end of a phase." },
      { name: 'Trophies of Slaughter', cost: 15, description: "HERETIC ASTARTES model only. Each time the bearer's unit destroys an enemy unit, until the end of the battle, add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer's unit (max +3)." },
      { name: 'Dark Blessing', cost: 15, description: "HERETIC ASTARTES model only. The bearer has the Feel No Pain 4+ ability." },
      { name: 'Malefic Tome', cost: 20, description: "PSYKER HERETIC ASTARTES model only. Once per battle round, you can use one Stratagem that targets the bearer's unit for 0 CP." },
    ],
    stratagems: [
      {
        id: 'deathToTheFalseEmperor', name: 'Death to the False Emperor', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: "Select one HERETIC ASTARTES unit that has not been selected to fight this phase. Until the end of the phase, each time a model in your unit makes an attack that targets an IMPERIUM unit, you can re-roll the Hit roll.",
        keywords: ['Fight', 'Anti-Imperium'],
      },
      {
        id: 'hatefulAssault', name: 'Hateful Assault', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: "Select one HERETIC ASTARTES INFANTRY or HERETIC ASTARTES CHAOS LORD unit that has not been selected to fight this phase. Until the end of the phase, add 1 to the Attacks characteristic of all melee weapons equipped by models in your unit.",
        keywords: ['Fight'],
      },
      {
        id: 'warpTouchedMunitions', name: 'Warp-Touched Munitions', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: "Select one HERETIC ASTARTES unit that has not been selected to shoot this phase. Until the end of the phase, each time a model in your unit makes a ranged attack, improve the Armour Penetration characteristic of that attack by 1.",
        keywords: ['Shooting'],
      },
      {
        id: 'endlessCacophony', name: 'Endless Cacophony', cost: 2,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase — just after a HERETIC ASTARTES unit finishes shooting',
        effect: "Select one HERETIC ASTARTES unit (excluding MONSTERS and VEHICLES with the TITANIC keyword) that just finished shooting and did not Advance this turn. That unit can shoot again, but its ranged weapons have the [HALF RANGE] ability for this second shooting sequence.",
        keywords: ['Shooting'],
      },
      {
        id: 'noMercyNoRespite', name: 'No Mercy, No Respite', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: "Fight phase — just after an enemy unit has selected its targets",
        effect: "Select one HERETIC ASTARTES unit that was selected as the target. Until the end of the phase, each time a model in your unit is destroyed by a melee attack, if that model has not yet fought this phase, roll one D6: on a 4+, that model can fight before it is removed.",
        keywords: ['Fight', 'Reaction'],
      },
      {
        id: 'darkPact', name: 'Dark Pact', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: "Select one HERETIC ASTARTES INFANTRY or HERETIC ASTARTES CHARACTER unit from your army. Until the start of your next Command phase, that unit has the Feel No Pain 5+ ability. However, at the start of your next Command phase, that unit suffers D3 mortal wounds.",
        keywords: ['Command', 'Defence'],
      },
    ],
  },

}

export const csmDetachmentList = Object.values(csmDetachments)
