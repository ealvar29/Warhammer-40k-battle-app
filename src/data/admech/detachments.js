// Adeptus Mechanicus — 10th Edition Detachments
// Sourced from Codex: Adeptus Mechanicus (2023)
// Army Rule: Doctrina Imperatives — at the start of each battle round, select one:
//   Protector Imperative: ranged weapons gain HEAVY; ranged attacks in your deployment zone worsen AP by 1
//   Conqueror Imperative: ranged weapons gain ASSAULT; ranged attacks into enemy deployment zone improve AP by 1

export const admechDetachments = {

  skitariiHunterCohort: {
    id: 'skitariiHunterCohort',
    name: 'Skitarii Hunter Cohort',
    subtitle: 'Swift, hidden, and always one step ahead of their quarry.',
    playstyle: 'Stealth and mobility — the whole army benefits from Stealth, Sicarian/Pteraxii/Sydonian units get extra tricks, and highly flexible unit repositioning lets you deny the enemy safe ground.',
    detachmentRule: {
      name: 'Stealth Optimisation',
      description: 'SKITARII INFANTRY, SKITARII MOUNTED and IRONSTRIDER BALLISTARII units from your army have the Stealth ability. Each time a ranged attack targets a SICARIAN unit from your army, unless the attacking model is within 12", the target has the Benefit of Cover against that attack.',
    },
    enhancements: [
      { name: 'Canticthrallnet', cost: 25, description: 'SKITARII MARSHAL model only. At the start of the battle round, you can select one friendly SKITARII unit within 12". Until the start of the next battle round, both the Protector Imperative and the Conqueror Imperative are active for that unit.' },
      { name: 'Clandestine Infiltrator', cost: 20, description: 'SKITARII model only. The bearer, and models in any unit they are leading, have the Infiltrators and Scouts 6" abilities.' },
      { name: 'Veiled Hunter', cost: 20, description: 'SKITARII MARSHAL model only. After both players have deployed and determined first turn, select up to three SKITARII INFANTRY units from your army and redeploy all of those units. Any can be placed into Strategic Reserves.' },
      { name: 'Battle-sphere Uplink', cost: 15, description: 'SKITARII model only. In your Shooting phase, after the bearer\'s unit has shot, if not within Engagement Range of enemy units, that unit can make a Normal move of up to 6". If it does, it cannot charge this turn.' },
    ],
    stratagems: [
      {
        id: 'bionicEndurance', name: 'Bionic Endurance', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase or Fight phase, just after an enemy unit selects its targets",
        effect: 'Select one SICARIAN, PTERAXII or SYDONIAN unit from your army that was selected as the target. Until the end of the phase, models in your unit have the Feel No Pain 5+ ability.',
        keywords: ['Shooting', 'Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'isolateAndDestroy', name: 'Isolate and Destroy', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one SICARIAN, PTERAXII, SYDONIAN, IRONSTRIDER BALLISTARII or SKITARII MOUNTED unit from your army that has not been selected to shoot. Until the end of the phase, each time a model in your unit makes an attack, if there are no other enemy units within 6" of the targeted unit, add 1 to the Wound roll.',
        keywords: ['Shooting', 'Anti-Character'],
      },
      {
        id: 'binharicOffence', name: 'Binharic Offence', cost: 2,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Start of your Shooting phase or start of the Fight phase',
        effect: 'Select two SKITARII units from your army that have not been selected to shoot or fight, and one enemy unit. Until the end of the phase, improve the Armour Penetration of weapons equipped by both of your units by 1. Each model in either unit can only target that enemy unit.',
        keywords: ['Shooting', 'Fight', 'Coordinated'],
      },
      {
        id: 'shroudProtocols', name: 'Shroud Protocols', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase, just after an enemy unit selects its targets",
        effect: 'Select one SKITARII INFANTRY unit from your army that was selected as a target. Until the end of the phase, your unit can only be targeted by a ranged attack if the attacking model is within 12".',
        keywords: ['Shooting', 'Reaction', 'Defence'],
      },
      {
        id: 'expeditedPurgeProtocol', name: 'Expedited Purge Protocol', cost: 1,
        phase: 'charge', source: 'detachment', trigger: 'active',
        timing: 'Your Charge phase',
        effect: 'Select one SKITARII unit from your army. Until the end of the phase, that unit is eligible to declare a charge in a turn in which it Advanced.',
        keywords: ['Charge', 'Movement'],
      },
      {
        id: 'programmedWithdrawal', name: 'Programmed Withdrawal', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'End of your opponent\'s Fight phase',
        effect: 'Select up to two SICARIAN units from your army, or one SKITARII INFANTRY or SKITARII MOUNTED unit. Remove those units from the battlefield and place them into Strategic Reserves. Each unit must be more than 3" from all enemy units.',
        keywords: ['Fight', 'Reaction', 'Movement'],
      },
    ],
  },

  radZoneCorps: {
    id: 'radZoneCorps',
    name: 'Rad-Zone Corps',
    subtitle: 'The forge worlds turn their invisible curse upon their foes.',
    playstyle: 'Radiation bombardment — debilitate the enemy from turn 1 with mortal wounds and Battle-shock, then control objectives through persistent rad fallout each Command phase.',
    detachmentRule: {
      name: 'Rad-Bombardment',
      description: 'Battle Round 1: For each enemy unit in your opponent\'s deployment zone, your opponent chooses to Stand Firm or Take Cover, then roll D6: Stand Firm = D3 mortal wounds on 3+; Take Cover = Battle-shocked until end of battle round and D3 mortal wounds on 5+. Battle Round 2 onwards: At the start of your Command phase, roll D6 for each enemy unit within your opponent\'s deployment zone: on a 3+, it suffers 1 mortal wound and must take a Battle-shock test.',
    },
    enhancements: [
      { name: 'Radial Suffusion', cost: 20, description: 'ADEPTUS MECHANICUS model only. From Battle Round 2, when resolving the Fallout effect, if the bearer is on the battlefield, also roll for enemy units within 6" of your opponent\'s deployment zone.' },
      { name: 'Malphonic Susurrus', cost: 15, description: 'ADEPTUS MECHANICUS model only. While the bearer is leading a unit, models in that unit have the Stealth ability.' },
      { name: 'Peerless Eradicator', cost: 20, description: 'ADEPTUS MECHANICUS model only. While the bearer is leading a unit, ranged weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability.' },
      { name: 'Autoclavic Denunciation', cost: 25, description: 'ADEPTUS MECHANICUS model only. Ranged weapons equipped by the bearer have the [ANTI-INFANTRY 2+] and [ANTI-MONSTER 4+] abilities.' },
    ],
    stratagems: [
      {
        id: 'balefulHalo', name: 'Baleful Halo', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase, just after an enemy unit selects its targets',
        effect: 'Select one ADEPTUS MECHANICUS unit (excluding VEHICLE) that was selected as the target. Until the end of the phase, subtract 1 from Wound rolls targeting one of those units. If BATTLELINE, can also target one nearby SKITARII unit within 6".',
        keywords: ['Fight', 'Reaction', 'Defence'],
      },
      {
        id: 'preCalibratedPurgeSolution', name: 'Pre-calibrated Purge Solution', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS MECHANICUS unit that has not been selected to shoot. Until the end of the phase, each time a model in that unit makes a ranged attack targeting a unit within your opponent\'s deployment zone, you can re-roll the Hit roll.',
        keywords: ['Shooting', 'Offence'],
      },
      {
        id: 'lethalDosage', name: 'Lethal Dosage', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one ADEPTUS MECHANICUS unit that has not been selected to shoot. Until the end of the phase, ranged weapons equipped by models in that unit have the [LETHAL HITS] ability.',
        keywords: ['Shooting', 'Lethal Hits'],
      },
      {
        id: 'extinctionOrder', name: 'Extinction Order', cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one TECH-PRIEST model and one objective marker within 24" of that model. Roll one D6 for each enemy unit within range of that objective marker: on a 4+, that unit suffers 1 mortal wound and must take a Battle-shock test.',
        keywords: ['Command', 'Mortal Wounds'],
      },
      {
        id: 'aggressorImperative', name: 'Aggressor Imperative', cost: 1,
        phase: 'movement', source: 'detachment', trigger: 'active',
        timing: 'Your Movement phase',
        effect: 'Select one SKITARII unit from your army that has not been selected to move. Until the end of the phase, each time one of those units Advances, do not make an Advance roll — instead add 6" to its Move characteristic.',
        keywords: ['Movement', 'Advance'],
      },
      {
        id: 'bulwarkImperative', name: 'Bulwark Imperative', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase, just after an enemy unit selects its targets",
        effect: 'Select one SKITARII unit that was selected as the target. Until the end of the phase, models in those units have a 4+ invulnerable save.',
        keywords: ['Shooting', 'Reaction', 'Defence'],
      },
    ],
  },

  dataPsalmConclave: {
    id: 'dataPsalmConclave',
    name: 'Data-psalm Conclave',
    subtitle: 'The Canticles of the Omnissiah guide every servo and synapse.',
    playstyle: 'Canticle-driven buffs — expand the Canticles of the Omnissiah to multiple options per turn, enabling powerful aura combinations when CULT MECHANICUS units are tightly grouped.',
    detachmentRule: {
      name: 'The Grand Convocation',
      description: 'At the start of your Command phase, you can select one additional Canticle of the Omnissiah (i.e., pick two instead of one this phase) to be active until the start of your next Command phase. Additionally, ADEPTUS MECHANICUS CORE units gain the Doctrina Imperatives ability.',
    },
    enhancements: [
      { name: 'Omnissian Oracle', cost: 20, description: 'TECH-PRIEST model only. At the start of your Command phase, instead of selecting a Canticle for your army, select any two Canticles. Both are active for your army until the start of your next Command phase.' },
      { name: 'Mechanicus Aegis', cost: 15, description: 'TECH-PRIEST model only. While the bearer is leading a unit, models in that unit have a 5+ invulnerable save.' },
      { name: 'Dogmatic Fervour', cost: 20, description: 'TECH-PRIEST model only. While the bearer is on the battlefield, each time a friendly ADEPTUS MECHANICUS unit within 12" would take a Battle-shock test, add 2 to that test.' },
      { name: 'Data-scripture Codex', cost: 15, description: 'TECH-PRIEST model only. The bearer\'s unit gains the Objective Secured ability (OC characteristic counts double while controlling objectives, provided no enemy unit with Objective Secured is also within range).' },
    ],
    stratagems: [
      {
        id: 'psalmsOfDesolation', name: 'Psalms of Desolation', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'active',
        timing: 'Your Shooting phase',
        effect: 'Select one CULT MECHANICUS unit from your army. Until the end of the phase, ranged weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.',
        keywords: ['Shooting', 'Devastating Wounds'],
      },
      {
        id: 'binaricWardance', name: 'Binaric Wardance', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one CULT MECHANICUS unit from your army that has not been selected to fight. Until the end of the phase, melee weapons equipped by models in that unit have the [LETHAL HITS] ability.',
        keywords: ['Fight', 'Lethal Hits'],
      },
      {
        id: 'omnissiahsGrace', name: "Omnissiah's Grace", cost: 1,
        phase: 'command', source: 'detachment', trigger: 'active',
        timing: 'Your Command phase',
        effect: 'Select one friendly ADEPTUS MECHANICUS VEHICLE model. That model regains up to D3 lost wounds.',
        keywords: ['Command', 'Repair'],
      },
      {
        id: 'datasong', name: 'Datasong', cost: 2,
        phase: 'fight', source: 'detachment', trigger: 'active',
        timing: 'Fight phase',
        effect: 'Select one CULT MECHANICUS unit from your army. Until the end of the phase, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.',
        keywords: ['Fight', 'Attacks'],
      },
      {
        id: 'encodedWardShields', name: 'Encoded Ward-Shields', cost: 1,
        phase: 'shooting', source: 'detachment', trigger: 'reaction',
        timing: "Opponent's Shooting phase, just after an enemy unit selects its targets",
        effect: 'Select one CULT MECHANICUS unit from your army that was selected as the target. Until the end of the phase, that unit has a 5+ invulnerable save.',
        keywords: ['Shooting', 'Reaction', 'Defence'],
      },
      {
        id: 'mechadendriteTangle', name: 'Mechadendrite Tangle', cost: 1,
        phase: 'fight', source: 'detachment', trigger: 'reaction',
        timing: 'Fight phase, just after an enemy unit selects its targets',
        effect: 'Select one TECH-PRIEST model from your army that was selected as the target. Until the end of the phase, subtract 1 from the Hit rolls of the attacking unit\'s melee attacks.',
        keywords: ['Fight', 'Reaction', 'Defence'],
      },
    ],
  },

}

export const admechDetachmentList = Object.values(admechDetachments)
