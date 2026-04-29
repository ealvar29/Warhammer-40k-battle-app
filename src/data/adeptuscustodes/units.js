// Adeptus Custodes units — 10th Edition (Wahapedia, April 2026)
// Sources: https://wahapedia.ru/wh40k10ed/factions/adeptus-custodes/

export const adeptusCustodesUnits = {

  // ── EPIC HEROES ────────────────────────────────────────────────────

  trajannValoris: {
    id: 'trajannValoris', name: 'Trajann Valoris', category: 'epicHero',
    points: 140,
    M: '6"', T: 6, Sv: '2+', W: 7, Ld: '5+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Eagle\'s Scream', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 5, AP: -2, D: 3, keywords: ['ASSAULT'] },
      { name: 'Watcher\'s Axe', type: 'melee', A: 6, WS: '2+', S: 10, AP: -2, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Supreme Commander', phase: 'any', description: 'If this model is in your army, it must be your WARLORD.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons equipped by models in this unit have the [SUSTAINED HITS 1] ability; or Rendax Stance — melee weapons equipped by models in this unit have the [LETHAL HITS] ability.' },
      { name: 'Captain-General (Aura)', phase: 'any', description: 'While this model is leading a unit, each time a model in this unit makes an attack, you can ignore any or all modifiers to that attack\'s Ballistic Skill or Weapon Skill characteristics and/or all modifiers to the Hit roll.' },
      { name: 'Moment Shackle', phase: 'fight', description: 'Once per battle, at the start of the Fight phase, you can select one of the following to take effect until the end of the phase: this model\'s Watcher\'s Axe has an Attacks characteristic of 12; or this model has a 2+ invulnerable save.' },
    ],
    isLeader: true,
    leadsUnits: ['custodianGuard', 'custodianWardens'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'TRAJANN VALORIS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  valerian: {
    id: 'valerian', name: 'Valerian', category: 'epicHero',
    points: 110,
    M: '6"', T: 6, Sv: '2+', W: 6, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Gnosis — assault', type: 'ranged', range: '24"', A: 3, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Gnosis', type: 'melee', A: 7, WS: '2+', S: 8, AP: -3, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 6, that wound is not lost.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Golden Laurels', phase: 'any', description: 'While this model is leading a unit, each time a melee attack targets that unit, worsen the Armour Penetration characteristic of that attack by 1.' },
      { name: 'Hero of Lion\'s Gate', phase: 'any', description: 'Once per battle, after making a Hit roll, Wound roll or saving throw for this model, you can change the result of that roll to an unmodified 6.' },
    ],
    isLeader: true,
    leadsUnits: ['custodianGuard', 'custodianWardens'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'SHIELD-CAPTAIN', 'VALERIAN'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  aleya: {
    id: 'aleya', name: 'Aleya', category: 'epicHero',
    points: 65,
    M: '6"', T: 3, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Somnus', type: 'melee', A: 4, WS: '2+', S: 6, AP: -3, D: 3, keywords: ['ANTI-PSYKER 5+', 'DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
      { name: 'Scouts 6"', phase: 'movement', description: 'Before the first turn begins, this unit can make a Normal move of up to 6" (cannot move within Engagement Range of any enemy models).' },
      { name: 'Daughter of the Abyss', phase: 'any', description: 'This model has the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds.' },
      { name: 'Tactical Perception', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Fights First ability.' },
      { name: 'Tenacious Spirit', phase: 'any', description: 'While this model is leading a unit, if that unit is below its Starting Strength, each time a model in that unit makes an attack, add 1 to the Hit roll; if that unit is Below Half-strength, add 1 to the Wound roll as well.' },
    ],
    isLeader: true,
    leadsUnits: ['prosecutors', 'vigilators', 'witchseekers'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'ANATHEMA PSYKANA', 'ALEYA'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  // ── CHARACTERS ─────────────────────────────────────────────────────

  shieldCaptain: {
    id: 'shieldCaptain', name: 'Shield-Captain', category: 'character',
    points: 120,
    M: '6"', T: 6, Sv: '2+', W: 6, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Castellan Axe — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Guardian Spear — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Pyrithite Spear — ranged', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Sentinel Blade — pistol', type: 'ranged', range: '12"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['PISTOL'] },
      { name: 'Castellan Axe', type: 'melee', A: 6, WS: '2+', S: 9, AP: -1, D: 3, keywords: [] },
      { name: 'Guardian Spear', type: 'melee', A: 7, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
      { name: 'Pyrithite Spear', type: 'melee', A: 7, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
      { name: 'Sentinel Blade', type: 'melee', A: 7, WS: '2+', S: 6, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Master of the Stances', phase: 'fight', description: 'Once per battle, when this model\'s unit is selected to fight, it can use this ability. If it does, until that fight is resolved, both Ka\'tah Stances are active for that unit instead of only one.' },
      { name: 'Strategic Mastery', phase: 'any', description: 'Once per battle round, you can select one model from your army with this ability. That model\'s unit can be targeted with a Stratagem, reducing the CP cost of that Stratagem use by 1CP.' },
    ],
    isLeader: true,
    leadsUnits: ['custodianGuard', 'custodianWardens'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'SHIELD-CAPTAIN'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  shieldCaptainAllarusTerminator: {
    id: 'shieldCaptainAllarusTerminator', name: 'Shield-Captain in Allarus Terminator Armour', category: 'character',
    points: 130,
    M: '5"', T: 7, Sv: '2+', W: 7, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Balistus Grenade Launcher', type: 'ranged', range: '18"', A: 'D6', BS: '2+', S: 4, AP: -1, D: 1, keywords: ['BLAST'] },
      { name: 'Castellan Axe — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Guardian Spear — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Castellan Axe', type: 'melee', A: 6, WS: '2+', S: 9, AP: -1, D: 3, keywords: [] },
      { name: 'Guardian Spear', type: 'melee', A: 7, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Auramite and Adamantine', phase: 'any', description: 'Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, each time an attack is allocated to this model, change the Damage characteristic of that attack to 1.' },
      { name: 'Strategic Mastery', phase: 'any', description: 'Once per battle round, you can select one model from your army with this ability. That model\'s unit can be targeted with a Stratagem, reducing the CP cost of that Stratagem use by 1CP.' },
    ],
    isLeader: true,
    leadsUnits: ['allarusCustodians'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'TERMINATOR', 'IMPERIUM', 'SHIELD-CAPTAIN'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  shieldCaptainDawneagleJetbike: {
    id: 'shieldCaptainDawneagleJetbike', name: 'Shield-Captain on Dawneagle Jetbike', category: 'character',
    points: 150,
    M: '12"', T: 7, Sv: '2+', W: 8, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Vertus Hurricane Bolter', type: 'ranged', range: '18"', A: 3, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['RAPID FIRE 3', 'TWIN-LINKED'] },
      { name: 'Salvo Launcher', type: 'ranged', range: '24"', A: 1, BS: '2+', S: 10, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Interceptor Lance', type: 'melee', A: 6, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['LANCE'] },
    ],
    abilities: [
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Sweeping Advance', phase: 'fight', description: 'Once per battle, at the end of the Fight phase, if this model\'s unit has fought this phase: if it is within Engagement Range of one or more enemy units, it can make a Fall Back move; or if it is not within Engagement Range of one or more enemy units, it can make a Normal move.' },
      { name: 'Strategic Mastery', phase: 'any', description: 'Once per battle round, you can select one model from your army with this ability. That model\'s unit can be targeted with a Stratagem, reducing the CP cost of that Stratagem use by 1CP.' },
    ],
    isLeader: true,
    leadsUnits: ['vertusPraetors'],
    eligibleLeaders: [],
    keywords: ['MOUNTED', 'CHARACTER', 'FLY', 'IMPERIUM', 'DAWNEAGLE JETBIKE', 'SHIELD-CAPTAIN'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  bladeChampion: {
    id: 'bladeChampion', name: 'Blade Champion', category: 'character',
    points: 120,
    M: '6"', T: 6, Sv: '2+', W: 6, Ld: '6+', OC: 2, InvSv: '4+',
    models: 1,
    weapons: [
      { name: 'Vaultswords — Behemor', type: 'melee', A: 6, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['PRECISION'] },
      { name: 'Vaultswords — Hurricanus', type: 'melee', A: 9, WS: '2+', S: 5, AP: -1, D: 1, keywords: ['SUSTAINED HITS 1'] },
      { name: 'Vaultswords — Victus', type: 'melee', A: 5, WS: '2+', S: 6, AP: -3, D: 3, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Swift Onslaught', phase: 'charge', description: 'You can re-roll Charge rolls for the unit this model is leading.' },
      { name: 'Martial Inspiration', phase: 'charge', description: 'Once per battle, the unit this model is leading can declare a charge even if it Advanced this turn.' },
    ],
    isLeader: true,
    leadsUnits: ['custodianGuard', 'custodianWardens'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'BLADE CHAMPION'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  knightCentura: {
    id: 'knightCentura', name: 'Knight-Centura', category: 'character',
    points: 55,
    M: '6"', T: 3, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Master-crafted boltgun', type: 'ranged', range: '24"', A: 1, BS: '2+', S: 4, AP: 0, D: 2, keywords: ['RAPID FIRE 1'] },
      { name: 'Witchseeker flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 4, AP: 0, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Close combat weapon', type: 'melee', A: 3, WS: '2+', S: 3, AP: 0, D: 1, keywords: [] },
      { name: 'Executioner Greatblade', type: 'melee', A: 3, WS: '2+', S: 5, AP: -2, D: 2, keywords: ['ANTI-PSYKER 5+', 'DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Scouts 6"', phase: 'movement', description: 'Before the first turn begins, this unit can make a Normal move of up to 6" (cannot move within Engagement Range of any enemy models).' },
      { name: 'Daughter of the Abyss', phase: 'any', description: 'This model has the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds.' },
      { name: 'Seeker\'s Instincts', phase: 'any', description: 'While this model is leading a unit, add 2" to the Move characteristic of models in that unit and add 2 to Advance and Charge rolls made for that unit.' },
      { name: 'Corner the Quarry', phase: 'fight', description: 'Enemy units within Engagement Range of this unit that attempt to Fall Back must take Desperate Escape tests; subtract 1 from the result if that enemy unit is Battle-shocked.' },
    ],
    isLeader: true,
    leadsUnits: ['prosecutors', 'vigilators', 'witchseekers'],
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'ANATHEMA PSYKANA', 'KNIGHT-CENTURA'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  // ── BATTLELINE ─────────────────────────────────────────────────────

  custodianGuard: {
    id: 'custodianGuard', name: 'Custodian Guard', category: 'battleline',
    points: 160,
    M: '6"', T: 6, Sv: '2+', W: 3, Ld: '6+', OC: 2, InvSv: '4+',
    models: 4,
    weapons: [
      { name: 'Guardian Spear — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Sentinel Blade — pistol', type: 'ranged', range: '12"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['PISTOL'] },
      { name: 'Guardian Spear', type: 'melee', A: 5, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
      { name: 'Misericordia', type: 'melee', A: 5, WS: '2+', S: 5, AP: -2, D: 1, keywords: [] },
      { name: 'Sentinel Blade', type: 'melee', A: 5, WS: '2+', S: 6, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Stand Vigil', phase: 'any', description: 'Each time a model in this unit makes an attack, re-roll a Wound roll of 1. While this unit is within range of an objective marker you control, you can re-roll the Wound roll instead.' },
      { name: 'Sentinel Storm', phase: 'shooting', description: 'Once per battle, in your Shooting phase, after this unit has shot, it can shoot again.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['trajannValoris', 'valerian', 'shieldCaptain', 'bladeChampion'],
    keywords: ['INFANTRY', 'BATTLELINE', 'IMPERIUM', 'CUSTODIAN GUARD'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  // ── INFANTRY ───────────────────────────────────────────────────────

  custodianWardens: {
    id: 'custodianWardens', name: 'Custodian Wardens', category: 'infantry',
    points: 210,
    M: '6"', T: 6, Sv: '2+', W: 3, Ld: '6+', OC: 2, InvSv: '4+',
    models: 4,
    weapons: [
      { name: 'Guardian Spear — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Castellan Axe — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Guardian Spear', type: 'melee', A: 5, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
      { name: 'Castellan Axe', type: 'melee', A: 4, WS: '2+', S: 9, AP: -1, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Resolute Will', phase: 'any', description: 'While this unit is led by a CHARACTER, each time an attack targets this unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of this unit, subtract 1 from the Wound roll.' },
      { name: 'Living Fortress', phase: 'any', description: 'Once per battle, at the start of any phase, until the end of that phase, models in this unit have the Feel No Pain 4+ ability.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['trajannValoris', 'valerian', 'shieldCaptain', 'bladeChampion'],
    keywords: ['INFANTRY', 'IMPERIUM', 'CUSTODIAN WARDENS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  allarusCustodians: {
    id: 'allarusCustodians', name: 'Allarus Custodians', category: 'infantry',
    points: 110,
    M: '5"', T: 7, Sv: '2+', W: 4, Ld: '6+', OC: 2, InvSv: '4+',
    models: 2,
    weapons: [
      { name: 'Balistus Grenade Launcher', type: 'ranged', range: '18"', A: 'D6', BS: '2+', S: 4, AP: -1, D: 1, keywords: ['BLAST'] },
      { name: 'Castellan Axe — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Guardian Spear — assault', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['ASSAULT'] },
      { name: 'Castellan Axe', type: 'melee', A: 4, WS: '2+', S: 9, AP: -1, D: 3, keywords: [] },
      { name: 'Guardian Spear', type: 'melee', A: 5, WS: '2+', S: 7, AP: -2, D: 2, keywords: [] },
      { name: 'Misericordia', type: 'melee', A: 5, WS: '2+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Slayers of Tyrants', phase: 'any', description: 'Each time a model in this unit makes an attack that targets a CHARACTER, MONSTER or VEHICLE unit, you can re-roll the Wound roll.' },
      { name: 'From Golden Light', phase: 'movement', description: 'Once per battle, at the end of your opponent\'s turn, if this unit is not within Engagement Range of one or more enemy units, you can remove it from the battlefield and place it into Strategic Reserves.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['shieldCaptainAllarusTerminator'],
    keywords: ['INFANTRY', 'TERMINATOR', 'IMPERIUM', 'ALLARUS CUSTODIANS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  prosecutors: {
    id: 'prosecutors', name: 'Prosecutors', category: 'infantry',
    points: 40,
    M: '6"', T: 3, Sv: '3+', W: 1, Ld: '6+', OC: 2,
    models: 4,
    weapons: [
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 3, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Daughters of the Abyss', phase: 'any', description: 'Models in this unit have the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds.' },
      { name: 'Purity of Execution', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack that targets a PSYKER unit, that attack has the [PRECISION] and [DEVASTATING WOUNDS] abilities.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['aleya', 'knightCentura'],
    keywords: ['INFANTRY', 'IMPERIUM', 'ANATHEMA PSYKANA', 'PROSECUTORS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  vigilators: {
    id: 'vigilators', name: 'Vigilators', category: 'infantry',
    points: 45,
    M: '6"', T: 3, Sv: '3+', W: 1, Ld: '6+', OC: 1,
    models: 4,
    weapons: [
      { name: 'Executioner Greatblade', type: 'melee', A: 2, WS: '3+', S: 5, AP: -2, D: 2, keywords: ['ANTI-PSYKER 5+', 'DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Daughters of the Abyss', phase: 'any', description: 'Models in this unit have the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds.' },
      { name: 'Deft Parry', phase: 'fight', description: 'Each time a melee attack targets this unit, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['aleya', 'knightCentura'],
    keywords: ['INFANTRY', 'IMPERIUM', 'ANATHEMA PSYKANA', 'VIGILATORS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  witchseekers: {
    id: 'witchseekers', name: 'Witchseekers', category: 'infantry',
    points: 45,
    M: '6"', T: 3, Sv: '3+', W: 1, Ld: '6+', OC: 1,
    models: 4,
    weapons: [
      { name: 'Witchseeker flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 4, AP: 0, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Close combat weapon', type: 'melee', A: 2, WS: '3+', S: 3, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Scouts 6"', phase: 'movement', description: 'Before the first turn begins, this unit can make a Normal move of up to 6" (cannot move within Engagement Range of any enemy models).' },
      { name: 'Daughters of the Abyss', phase: 'any', description: 'Models in this unit have the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds.' },
      { name: 'Sanctified Flames', phase: 'shooting', description: 'After this unit has shot, select one enemy unit hit by one or more of those attacks. That enemy unit must take a Battle-shock test.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['aleya', 'knightCentura'],
    keywords: ['INFANTRY', 'IMPERIUM', 'ANATHEMA PSYKANA', 'WITCHSEEKERS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  // ── CAVALRY ────────────────────────────────────────────────────────

  vertusPraetors: {
    id: 'vertusPraetors', name: 'Vertus Praetors', category: 'cavalry',
    points: 150,
    M: '12"', T: 7, Sv: '2+', W: 5, Ld: '6+', OC: 2, InvSv: '4+',
    models: 2,
    weapons: [
      { name: 'Vertus Hurricane Bolter', type: 'ranged', range: '18"', A: 3, BS: '2+', S: 4, AP: -1, D: 2, keywords: ['RAPID FIRE 3', 'TWIN-LINKED'] },
      { name: 'Salvo Launcher', type: 'ranged', range: '24"', A: 1, BS: '2+', S: 10, AP: -3, D: 'D6+1', keywords: ['TWIN-LINKED'] },
      { name: 'Interceptor Lance', type: 'melee', A: 5, WS: '2+', S: 7, AP: -2, D: 2, keywords: ['LANCE'] },
    ],
    abilities: [
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Turbo-boost', phase: 'movement', description: 'When this unit Advances, add 6" to the Move characteristic of models in this unit instead of rolling.' },
      { name: 'Quicksilver Execution', phase: 'movement', description: 'Once per battle, after this unit ends a Normal Move or Advance move, select one enemy unit (excluding MONSTER and VEHICLE units) that it moved over during that move, then roll one D6 for each model in this unit: for each 2+, that enemy unit suffers 2 mortal wounds.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: ['shieldCaptainDawneagleJetbike'],
    keywords: ['MOUNTED', 'FLY', 'IMPERIUM', 'VERTUS PRAETORS'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  // ── VEHICLES ───────────────────────────────────────────────────────

  venerableContemptor: {
    id: 'venerableContemptor', name: 'Venerable Contemptor Dreadnought', category: 'vehicle',
    points: 170,
    M: '6"', T: 9, Sv: '2+', W: 10, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1,
    weapons: [
      { name: 'Combi-bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Kheres-pattern assault cannon', type: 'ranged', range: '24"', A: 6, BS: '2+', S: 7, AP: -1, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '2+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Contemptor combat weapon', type: 'melee', A: 5, WS: '2+', S: 12, AP: -2, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Unyielding Ancient', phase: 'any', description: 'The first time this model is destroyed, do not remove it or resolve its Deadly Demise ability. At the end of the phase, roll one D6: on a 2+, set this model back up on the battlefield with D6 wounds remaining, as close as possible to its previous location and not within Engagement Range of any enemy models.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'IMPERIUM'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  venerableLandRaider: {
    id: 'venerableLandRaider', name: 'Venerable Land Raider', category: 'vehicle',
    points: 220,
    M: '10"', T: 12, Sv: '2+', W: 16, Ld: '6+', OC: 5,
    models: 1,
    weapons: [
      { name: 'Godhammer Lascannon', type: 'ranged', range: '48"', A: 2, BS: '2+', S: 12, AP: -3, D: 'D6+1', keywords: [] },
      { name: 'Hunter-killer missile', type: 'ranged', range: '48"', A: 1, BS: '2+', S: 14, AP: -3, D: 'D6', keywords: ['ONE SHOT'] },
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Twin heavy bolter', type: 'ranged', range: '36"', A: 3, BS: '2+', S: 5, AP: -1, D: 2, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
      { name: 'Armoured tracks', type: 'melee', A: 6, WS: '4+', S: 8, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers mortal wounds equal to the result.' },
      { name: 'Martial Ka\'tah', phase: 'fight', description: 'Each time this unit is selected to fight, select one of the Ka\'tah Stances: Dacatarai Stance — melee weapons have [SUSTAINED HITS 1]; or Rendax Stance — melee weapons have [LETHAL HITS].' },
      { name: 'Assault Ramp', phase: 'movement', description: 'Each time a unit disembarks from this model after it has made a Normal move, that unit is still eligible to declare a charge this turn.' },
      { name: 'Damaged', phase: 'any', description: 'While this model has 1-5 wounds remaining, each time this model makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'SMOKE', 'IMPERIUM', 'VENERABLE LAND RAIDER'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

  anathemaPsykanaRhino: {
    id: 'anathemaPsykanaRhino', name: 'Anathema Psykana Rhino', category: 'vehicle',
    points: 75,
    M: '12"', T: 9, Sv: '3+', W: 10, Ld: '6+', OC: 2,
    models: 1,
    weapons: [
      { name: 'Hunter-killer missile', type: 'ranged', range: '48"', A: 1, BS: '2+', S: 14, AP: -3, D: 'D6', keywords: ['ONE SHOT'] },
      { name: 'Storm bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Armoured tracks', type: 'melee', A: 3, WS: '4+', S: 6, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Firing Deck 2', phase: 'shooting', description: 'Up to 2 models embarked on this transport can shoot from it in your Shooting phase as if they were not embarked. Measure range and visibility from any point on this model.' },
      { name: 'Daughters of the Abyss', phase: 'any', description: 'This model has the Feel No Pain 3+ ability against Psychic Attacks and mortal wounds.' },
      { name: 'Self Repair', phase: 'command', description: 'At the start of your Command phase, this model regains 1 lost wound.' },
    ],
    isLeader: false,
    leadsUnits: [],
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'TRANSPORT', 'DEDICATED TRANSPORT', 'SMOKE', 'IMPERIUM', 'ANATHEMA PSYKANA', 'RHINO'],
    factionKeywords: ['ADEPTUS CUSTODES'],
  },

}

export const adeptusCustodesUnitList = Object.values(adeptusCustodesUnits)

export const adeptusCustodesUnitsByCategory = {
  epicHero:  adeptusCustodesUnitList.filter(u => u.category === 'epicHero'),
  character: adeptusCustodesUnitList.filter(u => u.category === 'character'),
  battleline: adeptusCustodesUnitList.filter(u => u.category === 'battleline'),
  infantry:  adeptusCustodesUnitList.filter(u => u.category === 'infantry'),
  cavalry:   adeptusCustodesUnitList.filter(u => u.category === 'cavalry'),
  monster:   adeptusCustodesUnitList.filter(u => u.category === 'monster'),
  vehicle:   adeptusCustodesUnitList.filter(u => u.category === 'vehicle'),
}
