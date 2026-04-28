// Dark Angels — Inner Circle Task Force detachment (10th Edition Index)

export const daDetachments = {

  innerCircleTaskForce: {
    id: 'innerCircleTaskForce',
    name: 'Inner Circle Task Force',
    subtitle: 'The First Legion hunts its ancient shame with cold, relentless purpose.',
    playstyle: 'Elite resilience — INNER CIRCLE units never break, Deathwing strikes from deep space, Ravenwing outmanoeuvres. Punish armies that rely on Characters and Monsters.',
    detachmentRule: {
      name: 'Inner Circle Secrets',
      description: "DARK ANGELS INFANTRY and MOUNTED units gain the INNER CIRCLE keyword. Each time a DARK ANGELS unit destroys an enemy CHARACTER or MONSTER, until the end of the turn, that DARK ANGELS unit may make a free Normal Move of up to 6\" (even if it has already moved this turn). Additionally, INNER CIRCLE units are never Battle-shocked while within 6\" of a friendly DARK ANGELS CHARACTER.",
    },
    enhancements: [
      { name: 'The Lion Sword', cost: 20, description: "DARK ANGELS CHARACTER model only. Each time the bearer makes a melee attack, on an unmodified wound roll of 6, that attack has the [DEVASTATING WOUNDS] ability." },
      { name: 'Shroud of Heroes', cost: 15, description: "DARK ANGELS CHARACTER model only. Each time an attack is allocated to the bearer, roll one D6: on a 5+, that attack is ignored and the wound is not lost." },
      { name: 'Auspex of Caliban', cost: 20, description: "DARK ANGELS OFFICER model only. Once per battle round, at the start of your Shooting phase, select one enemy unit visible to the bearer. Until the end of the phase, each time a friendly DARK ANGELS unit makes a ranged attack that targets that unit, add 1 to the Wound roll." },
      { name: 'Master of Ambush', cost: 15, description: "DARK ANGELS CHARACTER model only. Once per battle, at the end of your opponent's Movement phase, the bearer's unit can make a Normal Move of up to 6\", even if it is within Engagement Range of enemy models." },
    ],
    stratagems: [
      {
        id: 'weaponsOfTheFirstLegion', name: 'Weapons of the First Legion', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase or Fight phase',
        effect: "Select one DARK ANGELS unit that has not been selected to shoot or fight this phase. Until the end of the phase, improve the Armour Penetration characteristic of attacks made by models in that unit by 1.",
        keywords: ['Shooting', 'Fight'],
      },
      {
        id: 'intractableWill', name: 'Intractable Will', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: "Select one DARK ANGELS INNER CIRCLE unit that has not been selected to fight this phase. Until the end of the phase, each time a model in that unit would lose a wound as a result of a melee attack, roll one D6: on a 5+, that wound is not lost.",
        keywords: ['Fight', 'Defence'],
      },
      {
        id: 'deathwingAssault', name: 'Deathwing Assault', cost: 2,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Start of your Movement phase — before any units have moved',
        effect: "Select one DEATHWING TERMINATOR unit that is in Strategic Reserves. That unit arrives this turn — set it up anywhere on the battlefield that is more than 6\" from all enemy models (instead of the normal 9\").",
        keywords: ['Movement', 'Deep Strike'],
      },
      {
        id: 'ravenwingStrike', name: 'Ravenwing Strike', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase',
        effect: "Select one RAVENWING unit from your army. Until the end of the turn, that unit can Advance and still shoot and charge this turn, and Advance rolls made for it are not rolled — instead add 6\" to its Move characteristic.",
        keywords: ['Movement', 'Ravenwing'],
      },
      {
        id: 'huntTheFallen', name: 'Hunt the Fallen', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: "Select one enemy CHARACTER, MONSTER or VEHICLE unit. Until the end of the turn, each time a friendly DARK ANGELS unit makes an attack that targets that unit, add 1 to the Wound roll.",
        keywords: ['Command', 'Anti-Character'],
      },
      {
        id: 'stoodFirm', name: 'Stood Firm', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: "Fight phase — just after an enemy unit has selected its targets",
        effect: "Select one DARK ANGELS INNER CIRCLE unit that was selected as the target. Until the end of the phase, each time an attack is made against that unit, subtract 1 from the Wound roll.",
        keywords: ['Fight', 'Reaction', 'Defence'],
      },
    ],
  },

}

export const daDetachmentList = Object.values(daDetachments)
