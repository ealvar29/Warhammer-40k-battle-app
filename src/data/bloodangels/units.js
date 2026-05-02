// Blood Angels (Adeptus Astartes) — 10th Edition
// Stats sourced from Wahapedia / BSData (Imperium - Blood Angels.cat), April 2026
// https://wahapedia.ru/wh40k10ed/factions/blood-angels/
// Army Rule: Oath of Moment — at the start of your Command phase, select one enemy unit.
// Until your next Command phase, that unit is your Oath of Moment target.
// Each time a model with this ability makes an attack targeting the Oath of Moment unit, re-roll the Hit roll.
// Faction Rule: The Red Thirst — each time a BLOOD ANGELS unit ends a Charge move, until the end of the turn,
// melee weapons equipped by models in that unit gain the [LANCE] ability.

export const bloodAngelsUnits = {

  // ── EPIC HEROES ────────────────────────────────────────────────────

  commanderDante: {
    id: 'commanderDante', name: 'Commander Dante', category: 'epicHero',
    points: 120,
    M: '12"', T: 4, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Perdition', type: 'ranged', range: '6"', A: 1, BS: '2+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2', 'PISTOL', 'SUSTAINED HITS D3'] },
      { name: 'The Axe Mortalis', type: 'melee', A: 8, WS: '2+', S: 8, AP: -3, D: 2, keywords: ['LETHAL HITS'] },
    ],
    abilities: [
      { name: 'Death Mask of Sanguinius', phase: 'fight', description: 'At the start of the Fight phase, each enemy unit within 6" of this model must take a Battle-shock test, subtracting 1 from the result.' },
      { name: 'Lord Regent of the Imperium Nihilus', phase: 'any', description: 'While this model is leading a unit, add 1 to Advance and Charge rolls made for that unit and each time a model in that unit makes an attack, add 1 to the Hit roll.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorsWithJumpPacks', 'sanguinaryGuard', 'vanguardVeteransWithJumpPacks', 'assaultSquadWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'TACTICUS', 'CHAPTER MASTER', 'COMMANDER DANTE'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  mephiston: {
    id: 'mephiston', name: 'Chief Librarian Mephiston', category: 'epicHero',
    points: 120,
    M: '7"', T: 5, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Fury of the Ancients — witchfire', type: 'ranged', range: '18"', A: 3, BS: '2+', S: 4, AP: -1, D: 'D3', keywords: ['PISTOL', 'PSYCHIC', 'SUSTAINED HITS 1'] },
      { name: 'Fury of the Ancients — focused witchfire', type: 'ranged', range: '18"', A: 3, BS: '2+', S: 5, AP: -2, D: 'D3', keywords: ['HAZARDOUS', 'PISTOL', 'PSYCHIC', 'SUSTAINED HITS 3'] },
      { name: 'Vitarus', type: 'melee', A: 6, WS: '2+', S: 9, AP: -3, D: 'D3', keywords: ['LETHAL HITS', 'PSYCHIC'] },
    ],
    abilities: [
      { name: 'The Quickening (Psychic)', phase: 'movement', description: 'This model is eligible to declare a charge in a turn in which it Advanced.' },
      { name: 'Transfixing Gaze (Aura, Psychic)', phase: 'movement', description: 'While an enemy unit is within 6" of this model, each time that unit is selected to Fall Back, it must take a Leadership test. If that test is failed, that unit must Remain Stationary this phase instead.' },
      { name: 'Lone Operative', phase: 'any', description: 'Unless this model is your WARLORD, it cannot be targeted by ranged attacks unless the attacking model is within 12".' },
      { name: 'Fights First', phase: 'fight', description: 'This model fights before other models that do not have this ability.' },
      { name: 'Feel No Pain 4+', phase: 'any', description: 'Each time a wound would be allocated to this model, roll one D6: on a 4+, that wound is not lost.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'PSYKER', 'IMPERIUM', 'TACTICUS', 'CHIEF LIBRARIAN MEPHISTON'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  theSanguinor: {
    id: 'theSanguinor', name: 'The Sanguinor', category: 'epicHero',
    points: 150,
    M: '12"', T: 5, Sv: '2+', W: 7, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Encarmine broadsword', type: 'melee', A: 7, WS: '2+', S: 6, AP: -4, D: 2, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Aura of Fervour (Aura)', phase: 'any', description: 'While a friendly BLOOD ANGELS unit is within 6" of this model, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.' },
      { name: 'Miraculous Saviour', phase: 'any', description: 'Once per battle, at the end of any phase, you can select one friendly BLOOD ANGELS CHARACTER model that was destroyed this phase. Set that model back up anywhere on the battlefield within 3" of this model and more than 3" from all enemy models, with D3+3 wounds remaining.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Lone Operative', phase: 'any', description: 'Unless this model is your WARLORD, it cannot be targeted by ranged attacks unless the attacking model is within 12".' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'FLY', 'JUMP PACK', 'IMPERIUM', 'THE SANGUINOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  lemartes: {
    id: 'lemartes', name: 'Lemartes', category: 'epicHero',
    points: 75,
    M: '12"', T: 4, Sv: '3+', W: 5, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'The Blood Crozius', type: 'melee', A: 5, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Black Rage', phase: 'any', description: 'Models in this unit have the Fights First and Feel No Pain 6+ abilities. Each time a model in this unit makes a melee attack, add 1 to the Hit roll.' },
      { name: 'Guardian of the Lost', phase: 'any', description: 'While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6: on a 3+, do not remove it from play; that model can fight after the attacking model\'s unit has finished making its attacks, and is then removed from play.' },
      { name: 'High Chaplain of the Death Company', phase: 'any', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, re-roll a Wound roll of 1.' },
    ],
    isLeader: true,
    leadsUnits: ['deathCompanyMarinesWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'CHAPLAIN', 'LEMARTES'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  astorath: {
    id: 'astorath', name: 'Astorath', category: 'epicHero',
    points: 85,
    M: '12"', T: 4, Sv: '2+', W: 5, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'The Executioner\'s Axe', type: 'melee', A: 6, WS: '2+', S: 7, AP: -3, D: 2, keywords: ['DEVASTATING WOUNDS', 'PRECISION'] },
    ],
    abilities: [
      { name: 'Redeemer of the Lost', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6: on a 4+, do not remove it from play; that destroyed model can fight after the attacking model\'s unit has finished making its attacks, and is then removed from play.' },
      { name: 'Mass of Doom', phase: 'charge', description: 'Each time this model\'s unit makes a Charge move, until the end of the turn, melee weapons equipped by models in that unit have the [DEVASTATING WOUNDS] ability.' },
    ],
    isLeader: true,
    leadsUnits: ['deathCompanyMarinesWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'CHAPLAIN', 'ASTORATH'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  brotherCorbulo: {
    id: 'brotherCorbulo', name: 'Brother Corbulo', category: 'epicHero',
    points: 75,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Heaven\'s Teeth', type: 'melee', A: 6, WS: '2+', S: 5, AP: -1, D: 1, keywords: ['SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'Sanguinary Priest', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability.' },
      { name: 'The Red Grail', phase: 'fight', description: 'While this model is leading a unit, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'assaultSquadWithJumpPacks', 'sternguardVeteranSquad', 'devastatorSquad', 'tacticalSquad', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'SANGUINARY PRIEST', 'BROTHER CORBULO'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  gabrielSeth: {
    id: 'gabrielSeth', name: 'Gabriel Seth', category: 'epicHero',
    points: 90,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '5+', OC: 1, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Bloodfeeder', type: 'melee', A: 'D6+4', WS: '2+', S: 8, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Chapter Master of the Flesh Tearers', phase: 'any', description: 'Once per battle round, one FLESH TEARERS unit from your army can be targeted with a Stratagem for 0CP, even if another unit has already been targeted with that Stratagem this phase.' },
      { name: 'Whirlwind of Gore', phase: 'fight', description: 'Each time this model fights, after this model has made its attacks, it can make D3 additional attacks with its Bloodfeeder against a different eligible target.' },
      { name: 'Ferocious Charge', phase: 'any', description: 'While this model is leading a unit, each time a model in that unit makes a charge attack, add 1 to the Wound roll.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CAPTAIN', 'GABRIEL SETH'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  sanguinaryPriestWithJumpPack: {
    id: 'sanguinaryPriestWithJumpPack', name: 'Sanguinary Priest with Jump Pack', category: 'epicHero',
    points: 80,
    M: '12"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Narthecium', phase: 'command', description: 'While this model is leading a unit, in your Command phase you can return 1 destroyed non-CHARACTER model to that unit. That unit also has the Feel No Pain 5+ ability.' },
      { name: 'Blood Chalice', phase: 'fight', description: 'While this model is leading a unit, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorsWithJumpPacks', 'sanguinaryGuard', 'assaultSquadWithJumpPacks', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'SANGUINARY PRIEST'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  // ── CHARACTERS ─────────────────────────────────────────────────────

  captain: {
    id: 'captain', name: 'Captain', category: 'character',
    points: 80,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Master-crafted bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: [] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 6, WS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Rites of Battle', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP, even if another unit has already been targeted with that Stratagem this phase.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'bladeguardVeteranSquad', 'sternguardVeteranSquad', 'intercessorSquad', 'tacticalSquad'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CAPTAIN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  captainWithJumpPack: {
    id: 'captainWithJumpPack', name: 'Captain with Jump Pack', category: 'character',
    points: 95,
    M: '12"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 2, BS: '2+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 6, WS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Rites of Battle', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP, even if another unit has already been targeted with that Stratagem this phase.' },
      { name: "Angel's Wrath", phase: 'fight', description: 'While this model is leading a unit, each time that unit ends a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by models in that unit.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorsWithJumpPacks', 'sanguinaryGuard', 'assaultSquadWithJumpPacks', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'TACTICUS', 'CAPTAIN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  librarian: {
    id: 'librarian', name: 'Librarian', category: 'character',
    points: 75,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Smite — witchfire', type: 'ranged', range: '24"', A: 'D6', BS: '3+', S: 5, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Smite — focused witchfire', type: 'ranged', range: '24"', A: 'D6', BS: '3+', S: 6, AP: -2, D: 'D3', keywords: ['DEVASTATING WOUNDS', 'HAZARDOUS', 'PSYCHIC'] },
      { name: 'Force weapon', type: 'melee', A: 4, WS: '2+', S: 6, AP: -2, D: 'D3', keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Psychic Hood', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.' },
      { name: 'Mental Fortress (Psychic)', phase: 'any', description: 'While this model is leading a unit, models in that unit have a 4+ invulnerable save.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad', 'devastatorSquad'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'PSYKER', 'IMPERIUM', 'TACTICUS', 'LIBRARIAN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  librarianWithJumpPack: {
    id: 'librarianWithJumpPack', name: 'Librarian with Jump Pack', category: 'character',
    points: 90,
    M: '12"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Smite — witchfire', type: 'ranged', range: '24"', A: 'D6', BS: '3+', S: 5, AP: -1, D: 'D3', keywords: ['PSYCHIC'] },
      { name: 'Smite — focused witchfire', type: 'ranged', range: '24"', A: 'D6', BS: '3+', S: 6, AP: -2, D: 'D3', keywords: ['DEVASTATING WOUNDS', 'HAZARDOUS', 'PSYCHIC'] },
      { name: 'Force weapon', type: 'melee', A: 4, WS: '2+', S: 6, AP: -2, D: 'D3', keywords: ['PSYCHIC'] },
    ],
    abilities: [
      { name: 'Psychic Hood', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.' },
      { name: 'Unleash Rage (Psychic)', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, on an unmodified Wound roll of 6, that attack has the [DEVASTATING WOUNDS] ability.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorsWithJumpPacks', 'sanguinaryGuard', 'assaultSquadWithJumpPacks', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'FLY', 'JUMP PACK', 'PSYKER', 'IMPERIUM', 'LIBRARIAN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  chaplain: {
    id: 'chaplain', name: 'Chaplain', category: 'character',
    points: 75,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Absolver bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '2+', S: 5, AP: -1, D: 2, keywords: ['PISTOL'] },
      { name: 'Crozius arcanum', type: 'melee', A: 4, WS: '2+', S: 6, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Litany of Hate', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll.' },
      { name: 'Spiritual Leader', phase: 'command', description: 'Once per battle, at the start of any phase, select one friendly ADEPTUS ASTARTES unit that is Battle-shocked and within 12". That unit is no longer Battle-shocked.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'bladeguardVeteranSquad', 'sternguardVeteranSquad', 'intercessorSquad', 'tacticalSquad'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CHAPLAIN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  chaplainWithJumpPack: {
    id: 'chaplainWithJumpPack', name: 'Chaplain with Jump Pack', category: 'character',
    points: 90,
    M: '12"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Absolver bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '2+', S: 5, AP: -1, D: 2, keywords: ['PISTOL'] },
      { name: 'Crozius arcanum', type: 'melee', A: 4, WS: '2+', S: 6, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Litany of Hate', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll.' },
      { name: 'Shock and Awe', phase: 'charge', description: 'While this model is leading a unit, each time that unit ends a Charge move, select one enemy unit within Engagement Range of it. That enemy unit must take a Battle-shock test.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorsWithJumpPacks', 'assaultSquadWithJumpPacks', 'deathCompanyMarinesWithJumpPacks', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'CHAPLAIN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  lieutenant: {
    id: 'lieutenant', name: 'Lieutenant', category: 'character',
    points: 65,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Master-crafted bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: [] },
      { name: 'Close combat weapon', type: 'melee', A: 5, WS: '2+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Tactical Precision', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Target Priority', phase: 'movement', description: 'This model\'s unit is eligible to shoot and declare a charge in a turn in which it Fell Back.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'bladeguardVeteranSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'LIEUTENANT'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  techmarine: {
    id: 'techmarine', name: 'Techmarine', category: 'character',
    points: 45,
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1,
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Forge bolter', type: 'ranged', range: '24"', A: 3, BS: '2+', S: 5, AP: -1, D: 2, keywords: [] },
      { name: 'Grav-pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 3, AP: -1, D: 0, keywords: ['ANTI-VEHICLE 2+', 'PISTOL'] },
      { name: 'Omnissian power axe', type: 'melee', A: 3, WS: '2+', S: 6, AP: -2, D: 2, keywords: [] },
      { name: 'Servo-arm', type: 'melee', A: 1, WS: '3+', S: 8, AP: -2, D: 2, keywords: ['EXTRA ATTACKS'] },
    ],
    abilities: [
      { name: 'Lone Operative', phase: 'any', description: 'While this model is within 3" of one or more friendly ADEPTUS ASTARTES VEHICLE units, this model has the Lone Operative ability.' },
      { name: 'Blessing of the Omnissiah', phase: 'command', description: 'In your Command phase, select one friendly ADEPTUS ASTARTES VEHICLE model within 3". It regains up to D3 lost wounds.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'intercessorSquad', 'devastatorSquad', 'tacticalSquad'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'TECHMARINE'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  sanguinaryPriest: {
    id: 'sanguinaryPriest', name: 'Sanguinary Priest', category: 'character',
    points: 60,
    M: '6"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1,
    models: 1,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Narthecium', phase: 'command', description: 'While this model is leading a unit, in your Command phase you can return 1 destroyed non-CHARACTER model to that unit.' },
      { name: 'Blood Chalice', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability. In addition, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.' },
    ],
    isLeader: true,
    leadsUnits: ['assaultIntercessorSquad', 'assaultSquadWithJumpPacks', 'sternguardVeteranSquad', 'tacticalSquad', 'devastatorSquad', 'vanguardVeteransWithJumpPacks'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'SANGUINARY PRIEST'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  // ── BATTLELINE ─────────────────────────────────────────────────────

  intercessorSquad: {
    id: 'intercessorSquad', name: 'Intercessor Squad', category: 'battleline',
    points: 80,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Bolt rifle', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['ASSAULT'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['captain', 'librarian', 'chaplain', 'lieutenant', 'techmarine'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'INTERCESSORS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  assaultIntercessorSquad: {
    id: 'assaultIntercessorSquad', name: 'Assault Intercessor Squad', category: 'battleline',
    points: 75,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['captain', 'chaplain', 'lieutenant', 'librarian', 'brotherCorbulo', 'gabrielSeth', 'sanguinaryPriest', 'techmarine'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'ASSAULT INTERCESSORS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  tacticalSquad: {
    id: 'tacticalSquad', name: 'Tactical Squad', category: 'battleline',
    points: 90,
    M: '6"', T: 4, Sv: '3+', W: 1, Ld: '6+', OC: 2,
    models: 10,
    weapons: [
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Close combat weapon', type: 'melee', A: 1, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
      { name: 'Combat Squads', phase: 'deployment', description: 'Before the battle, this unit can be divided into two units of 5 models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['captain', 'chaplain', 'lieutenant', 'librarian', 'brotherCorbulo', 'gabrielSeth', 'sanguinaryPriest', 'techmarine'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  // ── INFANTRY ───────────────────────────────────────────────────────

  deathCompanyMarines: {
    id: 'deathCompanyMarines', name: 'Death Company Marines', category: 'infantry',
    points: 105,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Astartes chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 2, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Black Rage', phase: 'any', description: 'Models in this unit have the Fights First and Feel No Pain 6+ abilities. Each time a model in this unit makes a melee attack, add 1 to the Hit roll.' },
      { name: 'Visions of Heresy', phase: 'any', description: 'Each time a model in this unit would fail a Battle-shock test, that test is considered to be passed instead.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'DEATH COMPANY'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  deathCompanyMarinesWithJumpPacks: {
    id: 'deathCompanyMarinesWithJumpPacks', name: 'Death Company Marines with Jump Packs', category: 'infantry',
    points: 130,
    M: '12"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 2, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Black Rage', phase: 'any', description: 'Models in this unit have the Fights First and Feel No Pain 6+ abilities. Each time a model in this unit makes a melee attack, add 1 to the Hit roll.' },
      { name: 'Visions of Heresy', phase: 'any', description: 'Each time a model in this unit would fail a Battle-shock test, that test is considered to be passed instead.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['astorath', 'lemartes', 'chaplainWithJumpPack'],
    keywords: ['INFANTRY', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'DEATH COMPANY'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  sanguinaryGuard: {
    id: 'sanguinaryGuard', name: 'Sanguinary Guard', category: 'infantry',
    points: 155,
    M: '12"', T: 4, Sv: '2+', W: 2, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Angelus boltgun', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT', 'PISTOL'] },
      { name: 'Encarmine blade', type: 'melee', A: 3, WS: '3+', S: 5, AP: -3, D: 1, keywords: [] },
      { name: 'Encarmine sword', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'Chapter Banner', phase: 'any', description: 'While a friendly BLOOD ANGELS unit is within 6" of this unit\'s banner model, models in that unit have the Objective Secured ability. If they already have it, each model counts as 2 models for the purposes of that ability.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['commanderDante', 'captainWithJumpPack', 'librarianWithJumpPack', 'sanguinaryPriestWithJumpPack'],
    keywords: ['INFANTRY', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'SANGUINARY GUARD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  assaultSquadWithJumpPacks: {
    id: 'assaultSquadWithJumpPacks', name: 'Assault Squad with Jump Packs', category: 'infantry',
    points: 95,
    M: '12"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Bolt pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['commanderDante', 'captainWithJumpPack', 'chaplainWithJumpPack', 'librarianWithJumpPack', 'brotherCorbulo', 'sanguinaryPriest', 'sanguinaryPriestWithJumpPack'],
    keywords: ['INFANTRY', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'TACTICUS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  assaultIntercessorsWithJumpPacks: {
    id: 'assaultIntercessorsWithJumpPacks', name: 'Assault Intercessors with Jump Packs', category: 'infantry',
    points: 100,
    M: '12"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Astartes chainsword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['commanderDante', 'captainWithJumpPack', 'chaplainWithJumpPack', 'librarianWithJumpPack', 'sanguinaryPriestWithJumpPack'],
    keywords: ['INFANTRY', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'TACTICUS', 'ASSAULT INTERCESSORS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  vanguardVeteransWithJumpPacks: {
    id: 'vanguardVeteransWithJumpPacks', name: 'Vanguard Veteran Squad with Jump Packs', category: 'infantry',
    points: 125,
    M: '12"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 1,
    models: 5,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Lightning claw', type: 'melee', A: 3, WS: '3+', S: 4, AP: -2, D: 1, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Power fist', type: 'melee', A: 2, WS: '4+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Heroic Assault', phase: 'charge', description: 'Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it. That enemy unit must take a Battle-shock test. If that test is failed, until the end of the turn, subtract 1 from the Attacks characteristic (minimum 1) of models in that unit.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['commanderDante', 'captainWithJumpPack', 'chaplainWithJumpPack', 'librarianWithJumpPack', 'brotherCorbulo', 'gabrielSeth', 'sanguinaryPriest', 'sanguinaryPriestWithJumpPack'],
    keywords: ['INFANTRY', 'GRENADES', 'FLY', 'JUMP PACK', 'IMPERIUM', 'TACTICUS', 'VANGUARD VETERANS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  bladeguardVeteranSquad: {
    id: 'bladeguardVeteranSquad', name: 'Bladeguard Veteran Squad', category: 'infantry',
    points: 100,
    M: '6"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 3,
    weapons: [
      { name: 'Heavy bolt pistol', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Master-crafted power sword', type: 'melee', A: 4, WS: '3+', S: 5, AP: -3, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Righteous Hatred', phase: 'fight', description: 'Each time a model in this unit makes a melee attack, on an unmodified Wound roll of 6, improve the Armour Penetration of that attack by 1.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['captain', 'chaplain', 'lieutenant'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'BLADEGUARD VETERANS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  sternguardVeteranSquad: {
    id: 'sternguardVeteranSquad', name: 'Sternguard Veteran Squad', category: 'infantry',
    points: 95,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Special issue bolt rifle', type: 'ranged', range: '30"', A: 2, BS: '3+', S: 4, AP: -2, D: 2, keywords: ['ASSAULT'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Legendary Marksmen', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack, if the target is within half range, that attack has the [PRECISION] ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['captain', 'chaplain', 'lieutenant', 'librarian', 'brotherCorbulo', 'gabrielSeth', 'sanguinaryPriest', 'techmarine'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'STERNGUARD VETERANS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  scoutSquad: {
    id: 'scoutSquad', name: 'Scout Squad', category: 'infantry',
    points: 65,
    M: '6"', T: 4, Sv: '4+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Scout sniper rifle', type: 'ranged', range: '36"', A: 1, BS: '3+', S: 5, AP: -2, D: 2, keywords: ['HEAVY', 'PRECISION'] },
      { name: 'Combat knife', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Scouts 6"', phase: 'deployment', description: 'After deployment, this unit can make a Normal Move of up to 6" before the first battle round begins.' },
      { name: 'Concealed Positions', phase: 'deployment', description: 'During deployment, this unit can be set up anywhere on the battlefield that is more than 9" from the enemy deployment zone and all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'SCOUT SQUAD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  terminatorSquad: {
    id: 'terminatorSquad', name: 'Terminator Squad', category: 'infantry',
    points: 195,
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Power fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power weapon', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Teleport Homer', phase: 'movement', description: 'If this unit is within 6" of a friendly ADEPTUS ASTARTES INFANTRY unit when it arrives from Deep Strike, it can be set up more than 6" away from all enemy models instead of 9".' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'IMPERIUM', 'TERMINATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  terminatorAssaultSquad: {
    id: 'terminatorAssaultSquad', name: 'Terminator Assault Squad', category: 'infantry',
    points: 195,
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5,
    weapons: [
      { name: 'Twin lightning claws', type: 'melee', A: 4, WS: '3+', S: 4, AP: -2, D: 1, keywords: ['TWIN-LINKED'] },
      { name: 'Thunder hammer', type: 'melee', A: 3, WS: '4+', S: 8, AP: -2, D: 3, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Storm shield', type: 'melee', A: 2, WS: '3+', S: 4, AP: 0, D: 1, keywords: ['EXTRA ATTACKS'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'IMPERIUM', 'TERMINATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  devastatorSquad: {
    id: 'devastatorSquad', name: 'Devastator Squad', category: 'infantry',
    points: 95,
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 5,
    weapons: [
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Missile launcher — frag', type: 'ranged', range: '48"', A: 'D6', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['BLAST', 'HEAVY'] },
      { name: 'Missile launcher — krak', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 9, AP: -2, D: 'D6', keywords: ['HEAVY'] },
      { name: 'Lascannon', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['HEAVY'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Close combat weapon', type: 'melee', A: 1, WS: '4+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Signum', phase: 'shooting', description: 'Each time this unit is selected to shoot, until the end of the phase, select one model in this unit. Ranged weapons equipped by that model have the [PRECISION] ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['chaplain', 'librarian', 'techmarine', 'sanguinaryPriest'],
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'DEVASTATORS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  // ── VEHICLES ───────────────────────────────────────────────────────

  baalPredator: {
    id: 'baalPredator', name: 'Baal Predator', category: 'vehicle',
    points: 125,
    M: '12"', T: 10, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Baal flamestorm cannon', type: 'ranged', range: '18"', A: 'D6+3', BS: 'N/A', S: 6, AP: -2, D: 2, keywords: ['ASSAULT', 'IGNORES COVER', 'TORRENT'] },
      { name: 'Twin assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['ASSAULT', 'DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Heavy bolter (sponson)', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Heavy flamer (sponson)', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['ASSAULT', 'IGNORES COVER', 'TORRENT'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Overcharged Engines', phase: 'movement', description: 'You can re-roll Advance rolls made for this model.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'BAAL PREDATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  predatorAnnihilator: {
    id: 'predatorAnnihilator', name: 'Predator Annihilator', category: 'vehicle',
    points: 130,
    M: '10"', T: 11, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Predator twin lascannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Lascannon (sponson)', type: 'ranged', range: '48"', A: 1, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['HEAVY'] },
      { name: 'Heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Deadly Hunter', phase: 'shooting', description: 'Each time this model makes a ranged attack targeting a MONSTER or VEHICLE, add 1 to the Hit roll.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'PREDATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  predatorDestructor: {
    id: 'predatorDestructor', name: 'Predator Destructor', category: 'vehicle',
    points: 110,
    M: '10"', T: 11, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Predator autocannon', type: 'ranged', range: '48"', A: '2D3', BS: '3+', S: 9, AP: -2, D: 3, keywords: ['HEAVY'] },
      { name: 'Heavy bolter (sponson x2)', type: 'ranged', range: '36"', A: 6, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'PREDATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  rhino: {
    id: 'rhino', name: 'Rhino', category: 'vehicle',
    points: 75,
    M: '12"', T: 9, Sv: '3+', W: 10, Ld: '6+', OC: 2,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Smoke', phase: 'movement', description: 'Once per battle, when this model is selected to move, it can use its smoke launchers. Until the start of your next Movement phase, ranged weapons that target this model have a -1 penalty to their Ballistic Skill characteristic.' },
      { name: 'Transport (12)', phase: 'any', description: 'This model has a transport capacity of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, GRAVIS, TERMINATOR, or CENTURION models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'DEDICATED TRANSPORT', 'SMOKE', 'IMPERIUM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  razorback: {
    id: 'razorback', name: 'Razorback', category: 'vehicle',
    points: 105,
    M: '12"', T: 9, Sv: '3+', W: 10, Ld: '6+', OC: 2,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Twin heavy bolter', type: 'ranged', range: '36"', A: 6, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Twin assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Transport (6)', phase: 'any', description: 'This model has a transport capacity of 6 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, GRAVIS, TERMINATOR, or CENTURION models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'DEDICATED TRANSPORT', 'SMOKE', 'IMPERIUM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  dropPod: {
    id: 'dropPod', name: 'Drop Pod', category: 'vehicle',
    points: 65,
    M: '0"', T: 7, Sv: '3+', W: 8, Ld: '6+', OC: 0,
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
    ],
    abilities: [
      { name: 'Drop Pod Assault', phase: 'movement', description: 'During the Declare Battle Formations step, set this model up in Reserves. At the start of the first battle round, before the first turn begins, set this model up anywhere on the battlefield more than 9" from all enemy models. Disembark any units before any other unit moves.' },
      { name: 'Immobile', phase: 'movement', description: 'This model cannot move for any reason, and it cannot be placed into Reserves, transported within a TRANSPORT model, or Embark on a TRANSPORT model. Enemy models can move within Engagement Range of this model.' },
      { name: 'Transport (10)', phase: 'any', description: 'This model has a transport capacity of 10 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, GRAVIS, TERMINATOR, CENTURION, or MOUNTED models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'IMPERIUM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  dreadnought: {
    id: 'dreadnought', name: 'Dreadnought', category: 'vehicle',
    points: 100,
    M: '6"', T: 9, Sv: '2+', W: 8, Ld: '6+', OC: 3,
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Twin lascannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Dreadnought combat weapon', type: 'melee', A: 4, WS: '3+', S: 12, AP: -3, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Damaged: 1-3 wounds', phase: 'any', description: 'While this model has 1-3 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'IMPERIUM', 'DREADNOUGHT'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  furiousoDreadnought: {
    id: 'furiousoDreadnought', name: 'Furioso Dreadnought', category: 'vehicle',
    points: 130,
    M: '7"', T: 10, Sv: '2+', W: 9, Ld: '6+', OC: 3,
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Frag cannon', type: 'ranged', range: '18"', A: 'D6+3', BS: 'N/A', S: 6, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Heavy flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Furioso fist', type: 'melee', A: 5, WS: '2+', S: 14, AP: -3, D: 'D6', keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Blood talons', type: 'melee', A: 8, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['SUSTAINED HITS 2'] },
    ],
    abilities: [
      { name: 'Savage Assault', phase: 'fight', description: 'Each time this model is selected to fight, if it made a Charge move this turn, until the end of the phase, add 2" to the Pile-in and Consolidation moves of this model.' },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time a wound would be allocated to this model, roll one D6: on a 6, that wound is not lost.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged: 1-3 wounds', phase: 'any', description: 'While this model has 1-3 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'IMPERIUM', 'DREADNOUGHT', 'FURIOSO DREADNOUGHT'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  librarianDreadnought: {
    id: 'librarianDreadnought', name: 'Librarian Dreadnought', category: 'vehicle',
    points: 150,
    M: '7"', T: 10, Sv: '2+', W: 9, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1, weaponRole: 'mixed',
    weapons: [
      { name: 'Force halberd', type: 'melee', A: 5, WS: '2+', S: 12, AP: -3, D: 3, keywords: ['PSYCHIC'] },
      { name: 'Furioso fist', type: 'melee', A: 5, WS: '2+', S: 14, AP: -3, D: 'D6', keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Meltagun', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
    ],
    abilities: [
      { name: 'Psychic Fortress (Psychic)', phase: 'any', description: 'While a friendly BLOOD ANGELS unit is within 6" of this model, that unit has a 5+ invulnerable save.' },
      { name: 'Might of Heroes (Psychic)', phase: 'fight', description: 'Each time this model is selected to fight, it can activate its Might of Heroes. If it does, until the end of the phase, melee weapons equipped by this model have the [LETHAL HITS] ability.' },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time a wound would be allocated to this model, roll one D6: on a 6, that wound is not lost.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged: 1-3 wounds', phase: 'any', description: 'While this model has 1-3 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'PSYKER', 'IMPERIUM', 'DREADNOUGHT', 'LIBRARIAN DREADNOUGHT'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  landRaider: {
    id: 'landRaider', name: 'Land Raider', category: 'vehicle',
    points: 265,
    M: '10"', T: 13, Sv: '2+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: '2× Twin lascannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Twin heavy bolter', type: 'ranged', range: '36"', A: 6, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Armoured tracks', type: 'melee', A: 6, WS: '4+', S: 8, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Transport (12)', phase: 'any', description: 'Transport capacity: 12 TERMINATOR models or 12 other INFANTRY models (cannot transport JUMP PACK or GRAVIS models).' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'IMPERIUM', 'LAND RAIDER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  landRaiderCrusader: {
    id: 'landRaiderCrusader', name: 'Land Raider Crusader', category: 'vehicle',
    points: 275,
    M: '10"', T: 13, Sv: '2+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Twin assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Hurricane bolter', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT', 'RAPID FIRE 6'] },
      { name: 'Multi-melta (pintle)', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Armoured tracks', type: 'melee', A: 6, WS: '4+', S: 8, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Transport (16)', phase: 'any', description: 'Transport capacity: 16 ADEPTUS ASTARTES INFANTRY models (cannot transport JUMP PACK, GRAVIS, TERMINATOR, or CENTURION models).' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'IMPERIUM', 'LAND RAIDER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  landRaiderRedeemer: {
    id: 'landRaiderRedeemer', name: 'Land Raider Redeemer', category: 'vehicle',
    points: 275,
    M: '10"', T: 13, Sv: '2+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Flamestorm cannon', type: 'ranged', range: '12"', A: 'D6+3', BS: 'N/A', S: 6, AP: -2, D: 2, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Twin assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Multi-melta (pintle)', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Armoured tracks', type: 'melee', A: 6, WS: '4+', S: 8, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Transport (12)', phase: 'any', description: 'Transport capacity: 12 ADEPTUS ASTARTES INFANTRY models (cannot transport JUMP PACK, GRAVIS, TERMINATOR, or CENTURION models).' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'IMPERIUM', 'LAND RAIDER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  stormravenGunship: {
    id: 'stormravenGunship', name: 'Stormraven Gunship', category: 'vehicle',
    points: 280,
    M: '20"+', T: 10, Sv: '3+', W: 14, Ld: '6+', OC: 0, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Twin assault cannon', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Twin multi-melta', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2', 'TWIN-LINKED'] },
      { name: 'Hurricane bolter', type: 'ranged', range: '24"', A: 6, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT', 'RAPID FIRE 6'] },
      { name: 'Stormstrike missile launcher', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 10, AP: -3, D: 'D6+2', keywords: ['HEAVY'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Airborne', phase: 'movement', description: 'This model cannot be within Engagement Range of enemy models. This model cannot Advance. Each time this model makes a Normal move, it can fly over terrain features and other models without restriction.' },
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Transport (12)', phase: 'any', description: 'Transport capacity: 12 ADEPTUS ASTARTES INFANTRY models (includes TERMINATOR, JUMP PACK, and DREADNOUGHT models). Cannot transport PRIMARCH, VEHICLE, or MOUNTED models.' },
      { name: 'Hard to Hit', phase: 'shooting', description: 'Each time a ranged attack is made against this model, subtract 1 from the Hit roll.' },
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'AIRCRAFT', 'FLY', 'IMPERIUM', 'STORMRAVEN GUNSHIP'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  repulsor: {
    id: 'repulsor', name: 'Repulsor', category: 'vehicle',
    points: 210,
    M: '10"', T: 12, Sv: '3+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Repulsor field', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 4, AP: 0, D: 1, keywords: ['TORRENT'] },
      { name: 'Twin lascannon', type: 'ranged', range: '48"', A: 2, BS: '3+', S: 12, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Transport (12)', phase: 'any', description: 'Transport capacity: 12 TACTICUS INFANTRY or PHOBOS INFANTRY models (cannot transport JUMP PACK, GRAVIS, or CENTURION models).' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'IMPERIUM', 'REPULSOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  impulsor: {
    id: 'impulsor', name: 'Impulsor', category: 'vehicle',
    points: 100,
    M: '12"', T: 9, Sv: '3+', W: 11, Ld: '6+', OC: 2, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Fragstorm grenade launcher (x2)', type: 'ranged', range: '18"', A: 'D6', BS: '3+', S: 4, AP: 0, D: 1, keywords: ['BLAST'] },
      { name: 'Bellicatus missile array', type: 'ranged', range: '48"', A: 'D3', BS: '3+', S: 8, AP: -2, D: 3, keywords: [] },
      { name: 'Ironhail heavy stubber', type: 'ranged', range: '36"', A: 4, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 4'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Transport (6)', phase: 'any', description: 'Transport capacity: 6 PHOBOS INFANTRY or TACTICUS INFANTRY models (cannot transport JUMP PACK, GRAVIS, TERMINATOR, or CENTURION models).' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'DEDICATED TRANSPORT', 'IMPERIUM'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  gladiatorLancer: {
    id: 'gladiatorLancer', name: 'Gladiator Lancer', category: 'vehicle',
    points: 160,
    M: '10"', T: 11, Sv: '3+', W: 12, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Lancer laser destroyer', type: 'ranged', range: '60"', A: 2, BS: '3+', S: 14, AP: -4, D: 'D6+2', keywords: ['ASSAULT', 'HEAVY'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Aquila Lander', phase: 'shooting', description: 'Each time this model makes a ranged attack targeting a MONSTER or VEHICLE, add 1 to the Hit roll.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'GLADIATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  gladiatorReaper: {
    id: 'gladiatorReaper', name: 'Gladiator Reaper', category: 'vehicle',
    points: 155,
    M: '10"', T: 11, Sv: '3+', W: 12, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Twin heavy onslaught gatling cannon', type: 'ranged', range: '30"', A: 20, BS: '3+', S: 6, AP: -1, D: 1, keywords: ['DEVASTATING WOUNDS', 'TWIN-LINKED'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Grinding Advance', phase: 'shooting', description: 'Each time this model makes a ranged attack with its twin heavy onslaught gatling cannon, if this model did not move during the previous Movement phase, that attack has the [SUSTAINED HITS 1] ability.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'GLADIATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

  gladiatorValiant: {
    id: 'gladiatorValiant', name: 'Gladiator Valiant', category: 'vehicle',
    points: 160,
    M: '10"', T: 11, Sv: '3+', W: 12, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1, weaponRole: 'ranged',
    weapons: [
      { name: 'Twin las-talon', type: 'ranged', range: '36"', A: 2, BS: '3+', S: 16, AP: -4, D: 'D6+2', keywords: ['TWIN-LINKED'] },
      { name: 'Multi-melta (x2)', type: 'ranged', range: '18"', A: 2, BS: '3+', S: 9, AP: -4, D: 'D6', keywords: ['HEAVY', 'MELTA 2'] },
      { name: 'Armoured hull', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Ferocious Assault', phase: 'shooting', description: 'Each time this model makes a ranged attack targeting a MONSTER or VEHICLE, improve the Armour Penetration characteristic of that attack by 1.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'GLADIATOR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  },

}

export const bloodAngelsUnitList = Object.values(bloodAngelsUnits)

export const bloodAngelsUnitsByCategory = {
  epicHero:  bloodAngelsUnitList.filter(u => u.category === 'epicHero'),
  character: bloodAngelsUnitList.filter(u => u.category === 'character'),
  battleline: bloodAngelsUnitList.filter(u => u.category === 'battleline'),
  infantry:  bloodAngelsUnitList.filter(u => u.category === 'infantry'),
  vehicle:   bloodAngelsUnitList.filter(u => u.category === 'vehicle'),
}
