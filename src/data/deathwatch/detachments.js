// Deathwatch detachments — 10th Edition (Official Index, December 2024)
// Sources: https://wahapedia.ru/wh40k10ed/factions/space-marines/deathwatch
// Official PDF: eng_wh40k_grotmas_index_deathwatch_7_12_2024

export const deathwatchDetachments = {

  blackSpearTaskForce: {
    id: 'blackSpearTaskForce',
    name: 'Black Spear Task Force',
    subtitle: 'Elite xenos hunters combining discipline and tactical versatility to combat any foe.',
    playstyle: 'Mission Tactics rotation — select one of three army-wide weapon abilities each Command phase (Sustained Hits, Lethal Hits, or Precision on Crits), use Adaptive Tactics to grant personal tactics to individual Kill Teams. Special issue ammo stratagems let any Kill Team burst with Anti-Infantry, armour-piercing, or Ignores Cover fire from the Shooting phase.',
    detachmentRule: {
      name: 'Mission Tactics',
      description: 'Thousands of years of collated strategic data and hard-won combat experience have provided the Deathwatch with the ultimate battlefield tactics to combat almost any foe.\n\nAt the start of your Command phase, you can select one of the Mission Tactics listed below. Until the start of your next Command phase, that Mission Tactic is active and its effects apply to all units from your army with this ability. Each Mission Tactic can only be selected once per battle.\n\n• Furor Tactics: While this Mission Tactic is active, weapons equipped by ADEPTUS ASTARTES units from your army have the [SUSTAINED HITS 1] ability.\n\n• Malleus Tactics: While this Mission Tactic is active, weapons equipped by ADEPTUS ASTARTES units from your army have the [LETHAL HITS] ability.\n\n• Purgatus Tactics: While this Mission Tactic is active, each time an ADEPTUS ASTARTES unit from your army makes an attack, if a Critical Hit is scored, that attack has the [PRECISION] ability.',
    },
    enhancements: [
      {
        name: 'Thief of Secrets',
        cost: 25,
        description: 'ADEPTUS ASTARTES model only. Improve the Strength, Damage and Armour Penetration characteristics of the bearer\'s melee weapons by 1. At the end of the Fight phase, if one or more enemy models were destroyed as a result of a melee attack made by the bearer this phase, until the end of the battle, improve the Strength, Damage and Armour Penetration characteristics of the bearer\'s melee weapons by 2 instead.',
      },
      {
        name: 'Osseus Key',
        cost: 20,
        description: 'WATCH MASTER or TECHMARINE model only. At the start of your opponent\'s Shooting phase, select one enemy VEHICLE unit (excluding TITANIC units) within 12" of and visible to the bearer. That unit must take a Leadership test. If that test is passed, until the end of the phase, each time a model in that unit makes an attack, subtract 1 from the Hit roll; if that test is failed, that unit is not eligible to shoot this phase.',
      },
      {
        name: 'Beacon Angelis',
        cost: 20,
        description: 'ADEPTUS ASTARTES model only. Models in the bearer\'s unit have the Deep Strike ability. In addition, you can target the bearer\'s unit with the Rapid Ingress Stratagem for 0CP.',
      },
      {
        name: 'The Tome of Ectoclades',
        cost: 15,
        description: 'WATCH MASTER or CAPTAIN model only. Once per battle, after you have selected your Oath of Moment target, the bearer can use this Enhancement. If it does, select a second enemy unit to be an Oath of Moment target. Designer\'s Note: This means that each time a model with the Oath of Moment ability makes an attack that targets either of your Oath of Moment targets, you can re-roll the Hit roll.',
      },
    ],
    stratagems: [
      {
        id: 'blackSpearTaskForce_armourOfContempt',
        name: 'Armour of Contempt',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Opponent\'s Shooting phase or the Fight phase — just after an enemy unit has selected its targets',
        trigger: 'reaction',
        cost: 1,
        effect: 'Select one ADEPTUS ASTARTES unit from your army that was selected as the target of one or more of the attacking unit\'s attacks. Until the end of the phase, each time an attack targets your unit, worsen the Armour Penetration characteristic of that attack by 1.',
      },
      {
        id: 'blackSpearTaskForce_adaptiveTactics',
        name: 'Adaptive Tactics',
        source: 'detachment',
        phase: 'command',
        timing: 'Your Command phase',
        trigger: 'active',
        cost: 1,
        effect: 'Target up to two KILL TEAM units from your army, or one other ADEPTUS ASTARTES unit from your army. For each unit targeted, select Furor Tactics, Malleus Tactics or Purgatus Tactics. Until the start of your next Command phase, that Mission Tactic is active for that unit instead of any Mission Tactic that is active for your army.',
      },
      {
        id: 'blackSpearTaskForce_hellfireRounds',
        name: 'Hellfire Rounds',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Your Shooting phase',
        trigger: 'active',
        cost: 1,
        effect: 'Select one KILL TEAM unit from your army that has not been selected to shoot this phase. Until the end of the phase, ranged weapons (excluding Devastating Wounds weapons) equipped by models in your unit have the [ANTI-INFANTRY 2+] and [ANTI-MONSTER 5+] abilities. You cannot select any units that have already been targeted with either the Kraken Rounds or Dragonfire Rounds Stratagems this phase.',
      },
      {
        id: 'blackSpearTaskForce_krakenRounds',
        name: 'Kraken Rounds',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Your Shooting phase',
        trigger: 'active',
        cost: 1,
        effect: 'Select one KILL TEAM unit from your army that has not been selected to shoot this phase. Until the end of the phase, improve the Armour Penetration characteristic of ranged weapons equipped by models in your unit by 1 and improve the Range characteristic of those weapons by 6". You cannot select any units that have already been targeted with either the Dragonfire Rounds or Hellfire Rounds Stratagems this phase.',
      },
      {
        id: 'blackSpearTaskForce_dragonfireRounds',
        name: 'Dragonfire Rounds',
        source: 'detachment',
        phase: 'shooting',
        timing: 'Your Shooting phase',
        trigger: 'active',
        cost: 1,
        effect: 'Select one KILL TEAM unit from your army that has not been selected to shoot this phase. Until the end of the phase, ranged weapons equipped by models in your unit have the [ASSAULT] and [IGNORES COVER] abilities. You cannot select any units that have already been targeted with either the Kraken Rounds or Hellfire Rounds Stratagems this phase.',
      },
      {
        id: 'blackSpearTaskForce_siteToSiteTeleportation',
        name: 'Site-to-Site Teleportation',
        source: 'detachment',
        phase: 'fight',
        timing: 'End of your opponent\'s Fight phase',
        trigger: 'reaction',
        cost: 1,
        effect: 'Select up to two KILL TEAM units from your army, or one other ADEPTUS ASTARTES INFANTRY unit from your army, if those units are not within Engagement Range of one or more enemy units. Remove those units from the battlefield and place them into Strategic Reserves. Until the end of your next Movement phase, models in those units that do not have the Deep Strike ability have the Deep Strike ability.',
      },
    ],
  },

}

export const deathwatchDetachmentList = Object.values(deathwatchDetachments)
