// Adeptus Astartes (Space Marines) — 10th Edition Codex
// Stats and rules sourced from Codex: Space Marines (2023)
// Army Rule: Oath of Moment — at the start of your Command phase, select one enemy unit.
// Until your next Command phase, that unit is your Oath of Moment target.
// Each time a model with this ability makes an attack targeting your Oath of Moment target, re-roll the Hit roll.

// ── Epic Heroes ───────────────────────────────────────────────────────────────
const epicHeroes = [
  {
    id: 'marneusCalgar',
    name: 'Marneus Calgar',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['intercessorSquad', 'bladeguardVeteranSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    unitKey: 'marneusCalgar',
    M: '6"', T: 5, Sv: '2+', W: 9, Ld: '6+', OC: 1, InvSv: '4+',
    points: 175, models: 1,
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CAPTAIN', 'CHAPTER MASTER', 'ULTRAMARINES'],
    abilities: [
      { name: 'Chapter Master', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP, even if another unit has already been targeted with that Stratagem this phase.' },
      { name: 'Honoured by the Chapter', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability.' },
      { name: 'Gauntlets of Ultramar', phase: 'fight', description: 'Each time this model makes a melee attack with its Gauntlets of Ultramar, on an unmodified Wound roll of 6, the target suffers 2 additional mortal wounds.' },
    ],
    weapons: [
      { name: 'Gauntlets of Ultramar', range: '12"', BS: '2+', A: 6, S: 6, AP: -1, D: 2, abilities: ['PISTOL', 'TWIN-LINKED'] },
      { name: 'Gauntlets of Ultramar (melee)', WS: '2+', A: 6, S: 8, AP: -2, D: 3, abilities: [] },
    ],
  },
  {
    id: 'chiefLibrarianTigurius',
    name: 'Chief Librarian Tigurius',
    category: 'epicHero',
    isLeader: true,
    eligibleUnits: ['intercessorSquad', 'tacticalSquad', 'hellblasterSquad'],
    unitKey: 'chiefLibrarianTigurius',
    M: '6"', T: 4, Sv: '3+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    points: 110, models: 1, weaponRole: 'mixed',
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'PSYKER', 'IMPERIUM', 'TACTICUS', 'LIBRARIAN', 'ULTRAMARINES'],
    abilities: [
      { name: 'Psychic Hood', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.' },
      { name: 'Mental Fortress (Psychic)', phase: 'any', description: 'While this model is leading a unit, models in that unit have a 4+ invulnerable save.' },
      { name: 'Omen of Eternity (Psychic)', phase: 'any', description: 'Once per battle round, at the start of any phase, select one friendly ADEPTUS ASTARTES unit within 12". Until the end of the phase, that unit has the Feel No Pain 4+ ability.' },
    ],
    weapons: [
      { name: 'Smite — witchfire', range: '24"', BS: '3+', A: 'D6', S: 5, AP: -1, D: 'D3', abilities: ['PSYCHIC'] },
      { name: 'Smite — focused witchfire', range: '24"', BS: '3+', A: 'D6', S: 6, AP: -2, D: 'D3', abilities: ['DEVASTATING WOUNDS', 'HAZARDOUS', 'PSYCHIC'] },
      { name: 'Force weapon', WS: '2+', A: 5, S: 6, AP: -2, D: 'D3', abilities: ['PSYCHIC'] },
    ],
  },
]

// ── Characters ────────────────────────────────────────────────────────────────
const characters = [
  {
    id: 'captain',
    name: 'Captain',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorSquad', 'bladeguardVeteranSquad', 'hellblasterSquad', 'infernusSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    unitKey: 'captain',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    points: 80, models: 1, weaponRole: 'mixed',
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CAPTAIN'],
    abilities: [
      { name: 'Rites of Battle', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP, even if another unit has already been targeted with that Stratagem this phase.' },
    ],
    weapons: [
      { name: 'Master-crafted bolter', range: '24"', BS: '2+', A: 2, S: 4, AP: -1, D: 2, abilities: [] },
      { name: 'Master-crafted power weapon', WS: '2+', A: 6, S: 5, AP: -2, D: 2, abilities: [] },
      { name: 'Power fist', WS: '3+', A: 4, S: 8, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'captainInGravisArmour',
    name: 'Captain in Gravis Armour',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['aggressorSquad', 'eradicatorSquad', 'heavyIntercessorSquad'],
    unitKey: 'captainInGravisArmour',
    M: '5"', T: 6, Sv: '3+', W: 6, Ld: '6+', OC: 1,
    points: 110, models: 1, weaponRole: 'mixed',
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'GRAVIS', 'CAPTAIN'],
    abilities: [
      { name: 'Rites of Battle', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP, even if another unit has already been targeted with that Stratagem this phase.' },
      { name: 'Refuse to Yield', phase: 'any', description: 'Each time an attack is allocated to this model, halve the Damage characteristic of that attack.' },
    ],
    weapons: [
      { name: 'Master-crafted heavy bolt rifle', range: '36"', BS: '2+', A: 2, S: 5, AP: -1, D: 2, abilities: ['HEAVY'] },
      { name: 'Master-crafted power weapon', WS: '2+', A: 6, S: 5, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'captainInTerminatorArmour',
    name: 'Captain in Terminator Armour',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['terminatorAssaultSquad', 'terminatorSquad'],
    unitKey: 'captainInTerminatorArmour',
    M: '5"', T: 5, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    points: 110, models: 1, weaponRole: 'mixed',
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'TERMINATOR', 'CAPTAIN'],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During deployment, you can set up this unit in Strategic Reserves. At the start of the second or subsequent battle round, it can arrive anywhere on the battlefield more than 9" from all enemy models.' },
      { name: 'Rites of Battle', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP.' },
      { name: 'Unstoppable Valour', phase: 'charge', description: 'You can re-roll Charge rolls made for this model\'s unit.' },
    ],
    weapons: [
      { name: 'Storm bolter', range: '24"', BS: '2+', A: 2, S: 4, AP: 0, D: 1, abilities: ['RAPID FIRE 2'] },
      { name: 'Relic weapon', WS: '2+', A: 6, S: 5, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'captainWithJumpPack',
    name: 'Captain with Jump Pack',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorsWithJumpPacks', 'vanguardVeteranSquadWithJumpPacks'],
    unitKey: 'captainWithJumpPack',
    M: '12"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    points: 95, models: 1,
    keywords: ['INFANTRY', 'CHARACTER', 'JUMP PACK', 'FLY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CAPTAIN'],
    abilities: [
      { name: 'Rites of Battle', phase: 'any', description: 'Once per battle round, one unit from your army with this ability can be targeted with a Stratagem for 0CP.' },
      { name: "Angel's Wrath", phase: 'fight', description: 'While this model is leading a unit, each time that unit ends a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by models in that unit.' },
    ],
    weapons: [
      { name: 'Heavy bolt pistol', range: '18"', BS: '2+', A: 2, S: 4, AP: -1, D: 1, abilities: ['PISTOL'] },
      { name: 'Astartes chainsword', WS: '2+', A: 5, S: 4, AP: -1, D: 1, abilities: [] },
      { name: 'Master-crafted power weapon', WS: '2+', A: 5, S: 5, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'lieutenant',
    name: 'Lieutenant',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorSquad', 'bladeguardVeteranSquad', 'hellblasterSquad', 'infernusSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    unitKey: 'lieutenant',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1,
    points: 65, models: 1, weaponRole: 'ranged',
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'LIEUTENANT'],
    abilities: [
      { name: 'Tactical Precision', phase: 'any', description: 'While this model is leading a unit, weapons equipped by models in that unit have the [LETHAL HITS] ability.' },
      { name: 'Target Priority', phase: 'any', description: 'This model\'s unit is eligible to shoot and declare a charge in a turn in which it Fell Back.' },
    ],
    weapons: [
      { name: 'Bolt pistol', range: '12"', BS: '2+', A: 1, S: 4, AP: 0, D: 1, abilities: ['PISTOL'] },
      { name: 'Master-crafted bolter', range: '24"', BS: '2+', A: 2, S: 4, AP: -1, D: 2, abilities: [] },
      { name: 'Close combat weapon', WS: '2+', A: 5, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'librarian',
    name: 'Librarian',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorSquad', 'desolationSquad', 'devastatorSquad', 'hellblasterSquad', 'infernusSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    unitKey: 'librarian',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '5+',
    points: 75, models: 1, weaponRole: 'mixed',
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'PSYKER', 'IMPERIUM', 'TACTICUS', 'LIBRARIAN'],
    abilities: [
      { name: 'Psychic Hood', phase: 'any', description: 'While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks.' },
      { name: 'Mental Fortress (Psychic)', phase: 'any', description: 'While this model is leading a unit, models in that unit have a 4+ invulnerable save.' },
    ],
    weapons: [
      { name: 'Bolt pistol', range: '12"', BS: '2+', A: 1, S: 4, AP: 0, D: 1, abilities: ['PISTOL'] },
      { name: 'Smite — witchfire', range: '24"', BS: '3+', A: 'D6', S: 5, AP: -1, D: 'D3', abilities: ['PSYCHIC'] },
      { name: 'Smite — focused witchfire', range: '24"', BS: '3+', A: 'D6', S: 6, AP: -2, D: 'D3', abilities: ['DEVASTATING WOUNDS', 'HAZARDOUS', 'PSYCHIC'] },
      { name: 'Force weapon', WS: '2+', A: 4, S: 6, AP: -2, D: 'D3', abilities: ['PSYCHIC'] },
    ],
  },
  {
    id: 'chaplain',
    name: 'Chaplain',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorSquad', 'bladeguardVeteranSquad', 'hellblasterSquad', 'infernusSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    unitKey: 'chaplain',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    points: 75, models: 1,
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'CHAPLAIN'],
    abilities: [
      { name: 'Litany of Hate', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll.' },
      { name: 'Spiritual Leader', phase: 'command', description: 'Once per battle, at the start of any phase, select one friendly ADEPTUS ASTARTES unit that is Battle-shocked and within 12". That unit is no longer Battle-shocked.' },
    ],
    weapons: [
      { name: 'Absolver bolt pistol', range: '18"', BS: '2+', A: 1, S: 5, AP: -1, D: 2, abilities: ['PISTOL'] },
      { name: 'Crozius arcanum', WS: '2+', A: 4, S: 6, AP: -2, D: 2, abilities: [] },
    ],
  },
  {
    id: 'techmarine',
    name: 'Techmarine',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorSquad', 'desolationSquad', 'devastatorSquad', 'intercessorSquad', 'tacticalSquad'],
    unitKey: 'techmarine',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1,
    points: 45, models: 1, weaponRole: 'mixed',
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'TECHMARINE'],
    abilities: [
      { name: 'Lone Operative', phase: 'any', description: 'While this model is within 3" of one or more friendly ADEPTUS ASTARTES VEHICLE units, this model has the Lone Operative ability.' },
      { name: "Blessing of the Omnissiah", phase: 'command', description: 'In your Command phase, select one friendly ADEPTUS ASTARTES VEHICLE model within 3". It regains up to D3 lost wounds and, until your next Command phase, add 1 to its Hit rolls when it makes attacks.' },
    ],
    weapons: [
      { name: 'Forge bolter', range: '24"', BS: '2+', A: 3, S: 5, AP: -1, D: 2, abilities: [] },
      { name: 'Grav-pistol', range: '12"', BS: '2+', A: 1, S: 3, AP: -1, D: 0, abilities: ['ANTI-VEHICLE 2+', 'PISTOL'] },
      { name: 'Omnissian power axe', WS: '2+', A: 3, S: 6, AP: -2, D: 2, abilities: [] },
      { name: 'Servo-arm', WS: '3+', A: 1, S: 8, AP: -2, D: 2, abilities: ['EXTRA ATTACKS'] },
    ],
  },
  {
    id: 'apothecary',
    name: 'Apothecary',
    category: 'character',
    isLeader: true,
    eligibleUnits: ['assaultIntercessorSquad', 'desolationSquad', 'devastatorSquad', 'hellblasterSquad', 'infernusSquad', 'intercessorSquad', 'sternguardVeteranSquad', 'tacticalSquad'],
    unitKey: 'apothecary',
    M: '6"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1,
    points: 55, models: 1,
    keywords: ['INFANTRY', 'CHARACTER', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'APOTHECARY'],
    abilities: [
      { name: 'Narthecium', phase: 'command', description: 'While this model is leading a unit, in your Command phase you can return 1 destroyed model (excluding CHARACTER) to that unit.' },
      { name: 'Gene-seed Recovery', phase: 'any', description: "When this model's Bodyguard unit is destroyed, roll one D6: on a 2+, you gain 1CP." },
    ],
    weapons: [
      { name: 'Absolver bolt pistol', range: '18"', BS: '2+', A: 1, S: 5, AP: -1, D: 2, abilities: ['PISTOL'] },
      { name: 'Reductor pistol', range: '3"', BS: '2+', A: 1, S: 4, AP: -4, D: 2, abilities: ['PISTOL'] },
      { name: 'Close combat weapon', WS: '3+', A: 3, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Battleline ────────────────────────────────────────────────────────────────
const battleline = [
  {
    id: 'intercessorSquad',
    name: 'Intercessor Squad',
    category: 'battleline',
    isLeader: false,
    unitKey: 'intercessorSquad',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 80, models: 5,
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'INTERCESSORS'],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
    ],
    weapons: [
      { name: 'Bolt rifle', range: '30"', BS: '3+', A: 2, S: 4, AP: -1, D: 1, abilities: ['ASSAULT'] },
      { name: 'Close combat weapon', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'assaultIntercessorSquad',
    name: 'Assault Intercessor Squad',
    category: 'battleline',
    isLeader: false,
    unitKey: 'assaultIntercessorSquad',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 75, models: 5,
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'ASSAULT INTERCESSORS'],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
    ],
    weapons: [
      { name: 'Heavy bolt pistol', range: '18"', BS: '3+', A: 2, S: 4, AP: -1, D: 1, abilities: ['PISTOL'] },
      { name: 'Astartes chainsword', WS: '3+', A: 3, S: 4, AP: -1, D: 1, abilities: [] },
    ],
  },
  {
    id: 'tacticalSquad',
    name: 'Tactical Squad',
    category: 'battleline',
    isLeader: false,
    unitKey: 'tacticalSquad',
    M: '6"', T: 4, Sv: '3+', W: 1, Ld: '6+', OC: 2,
    points: 90, models: 10,
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS'],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
      { name: 'Combat Squads', phase: 'deployment', description: 'Before the battle, this unit can be divided into two units of 5 models.' },
    ],
    weapons: [
      { name: 'Boltgun', range: '24"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: ['RAPID FIRE 1'] },
      { name: 'Close combat weapon', WS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Infantry ──────────────────────────────────────────────────────────────────
const infantry = [
  {
    id: 'terminatorSquad',
    name: 'Terminator Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'terminatorSquad',
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    points: 195, models: 5,
    keywords: ['INFANTRY', 'IMPERIUM', 'TERMINATOR'],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During deployment, you can set up this unit in Strategic Reserves. At the start of the second or subsequent battle round, it can arrive anywhere on the battlefield more than 9" from all enemy models.' },
      { name: 'Teleport Homer', phase: 'movement', description: 'If this unit is within 6" of a friendly ADEPTUS ASTARTES INFANTRY unit, its Deep Strike distance is reduced to 6" instead of 9".' },
    ],
    weapons: [
      { name: 'Storm bolter', range: '24"', BS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: ['RAPID FIRE 2'] },
      { name: 'Power fist', WS: '3+', A: 3, S: 8, AP: -2, D: 2, abilities: [] },
      { name: 'Power weapon', WS: '3+', A: 3, S: 5, AP: -2, D: 1, abilities: [] },
    ],
  },
  {
    id: 'terminatorAssaultSquad',
    name: 'Terminator Assault Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'terminatorAssaultSquad',
    M: '5"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    points: 195, models: 5,
    keywords: ['INFANTRY', 'IMPERIUM', 'TERMINATOR'],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During deployment, you can set up this unit in Strategic Reserves. At the start of the second or subsequent battle round, it can arrive anywhere on the battlefield more than 9" from all enemy models.' },
    ],
    weapons: [
      { name: 'Twin lightning claws', WS: '3+', A: 4, S: 4, AP: -2, D: 1, abilities: ['TWIN-LINKED'] },
      { name: 'Thunder hammer', WS: '4+', A: 3, S: 8, AP: -2, D: 3, abilities: ['DEVASTATING WOUNDS'] },
      { name: 'Storm shield', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: ['EXTRA ATTACKS'] },
    ],
  },
  {
    id: 'heavyIntercessorSquad',
    name: 'Heavy Intercessor Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'heavyIntercessorSquad',
    M: '5"', T: 6, Sv: '3+', W: 3, Ld: '6+', OC: 2,
    points: 110, models: 5,
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'GRAVIS', 'HEAVY INTERCESSORS'],
    abilities: [
      { name: 'Objective Secured', phase: 'any', description: 'While this unit is within range of an objective marker, it is treated as controlling it even if an enemy unit is also within range, unless the enemy unit has more models with this ability.' },
    ],
    weapons: [
      { name: 'Hellstorm bolt rifle', range: '30"', BS: '3+', A: 3, S: 4, AP: -1, D: 1, abilities: ['HEAVY', 'SUSTAINED HITS 1'] },
      { name: 'Close combat weapon', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'scoutSquad',
    name: 'Scout Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'scoutSquad',
    M: '6"', T: 4, Sv: '4+', W: 2, Ld: '6+', OC: 2,
    points: 65, models: 5,
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'SCOUT SQUAD'],
    abilities: [
      { name: 'Scouts 6"', phase: 'deployment', description: 'After deployment, this unit can make a Normal Move of up to 6" before the first battle round begins.' },
      { name: 'Concealed Positions', phase: 'deployment', description: 'During deployment, this unit can be set up anywhere on the battlefield that is more than 9" from the enemy deployment zone and all enemy models.' },
    ],
    weapons: [
      { name: 'Scout sniper rifle', range: '36"', BS: '3+', A: 1, S: 5, AP: -2, D: 2, abilities: ['HEAVY', 'PRECISION'] },
      { name: 'Combat knife', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'bladeguardVeteranSquad',
    name: 'Bladeguard Veteran Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'bladeguardVeteranSquad',
    M: '6"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    points: 100, models: 3,
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'BLADEGUARD VETERANS'],
    abilities: [
      { name: 'Righteous Hatred', phase: 'fight', description: 'Each time a model in this unit makes a melee attack, on an unmodified Wound roll of 6, improve the Armour Penetration of that attack by 1.' },
    ],
    weapons: [
      { name: 'Heavy bolt pistol', range: '18"', BS: '3+', A: 2, S: 4, AP: -1, D: 1, abilities: ['PISTOL'] },
      { name: 'Master-crafted power sword', WS: '3+', A: 4, S: 5, AP: -3, D: 2, abilities: [] },
    ],
  },
  {
    id: 'hellblasterSquad',
    name: 'Hellblaster Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'hellblasterSquad',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 100, models: 5,
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'HELLBLASTERS'],
    abilities: [
      { name: 'Rapid Fire', phase: 'shooting', description: 'This unit is eligible to shoot in a turn in which it Fell Back.' },
    ],
    weapons: [
      { name: 'Plasma incinerator — standard', range: '30"', BS: '3+', A: 2, S: 7, AP: -2, D: 2, abilities: [] },
      { name: 'Plasma incinerator — supercharge', range: '30"', BS: '3+', A: 2, S: 8, AP: -3, D: 3, abilities: ['HAZARDOUS'] },
      { name: 'Bolt pistol', range: '12"', BS: '3+', A: 1, S: 4, AP: 0, D: 1, abilities: ['PISTOL'] },
      { name: 'Close combat weapon', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'aggressorSquad',
    name: 'Aggressor Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'aggressorSquad',
    M: '5"', T: 6, Sv: '3+', W: 4, Ld: '6+', OC: 2,
    points: 105, models: 3,
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'GRAVIS', 'AGGRESSORS'],
    abilities: [
      { name: 'Relentless Advance', phase: 'movement', description: 'Each time this unit Advances, each model in this unit can still shoot in the Shooting phase, but must target the closest eligible enemy unit.' },
    ],
    weapons: [
      { name: 'Flamestorm gauntlets', range: '12"', BS: 'N/A', A: 'D6', S: 4, AP: -1, D: 1, abilities: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Flamestorm gauntlets (melee)', WS: '3+', A: 3, S: 6, AP: -1, D: 2, abilities: [] },
      { name: 'Boltstorm gauntlet', range: '18"', BS: '3+', A: 6, S: 4, AP: 0, D: 1, abilities: ['PISTOL'] },
    ],
  },
  {
    id: 'eradicatorSquad',
    name: 'Eradicator Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'eradicatorSquad',
    M: '5"', T: 6, Sv: '3+', W: 3, Ld: '6+', OC: 2,
    points: 95, models: 3,
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'GRAVIS', 'ERADICATORS'],
    abilities: [
      { name: 'Melta Destruction', phase: 'shooting', description: 'Each time a model in this unit makes a ranged attack that targets a VEHICLE or MONSTER, that attack has the [MELTA 2] ability.' },
    ],
    weapons: [
      { name: 'Multi-melta', range: '18"', BS: '3+', A: 2, S: 9, AP: -4, D: 'D6', abilities: ['HEAVY', 'MELTA 2'] },
      { name: 'Close combat weapon', WS: '3+', A: 3, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'sternguardVeteranSquad',
    name: 'Sternguard Veteran Squad',
    category: 'infantry',
    isLeader: false,
    unitKey: 'sternguardVeteranSquad',
    M: '6"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 95, models: 5,
    keywords: ['INFANTRY', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'STERNGUARD VETERANS'],
    abilities: [
      { name: 'Combat Doctrines', phase: 'any', description: 'This unit has the Combat Doctrines ability from the Gladius Strike Force detachment.' },
    ],
    weapons: [
      { name: 'Special issue bolt rifle', range: '30"', BS: '3+', A: 2, S: 4, AP: -2, D: 2, abilities: ['ASSAULT'] },
      { name: 'Close combat weapon', WS: '3+', A: 2, S: 4, AP: 0, D: 1, abilities: [] },
    ],
  },
]

// ── Cavalry ───────────────────────────────────────────────────────────────────
const cavalry = [
  {
    id: 'outriderSquad',
    name: 'Outrider Squad',
    category: 'cavalry',
    isLeader: false,
    unitKey: 'outriderSquad',
    M: '14"', T: 5, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    points: 75, models: 3,
    keywords: ['MOUNTED', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'OUTRIDERS'],
    abilities: [
      { name: 'Turbo-boost', phase: 'movement', description: 'Each time this unit makes an Advance move, do not make an Advance roll — instead add 6" to the Move characteristic of each model in this unit.' },
    ],
    weapons: [
      { name: 'Twin bolt rifle', range: '30"', BS: '3+', A: 4, S: 4, AP: -1, D: 1, abilities: ['ASSAULT', 'TWIN-LINKED'] },
      { name: 'Astartes chainsword', WS: '3+', A: 3, S: 4, AP: -1, D: 1, abilities: [] },
    ],
  },
]

// ── Vehicles ──────────────────────────────────────────────────────────────────
const vehicles = [
  {
    id: 'redemptorDreadnought',
    name: 'Redemptor Dreadnought',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'redemptorDreadnought',
    M: '8"', T: 10, Sv: '2+', W: 12, Ld: '6+', OC: 3, InvSv: '4+',
    points: 210, models: 1, weaponRole: 'mixed',
    keywords: ['VEHICLE', 'WALKER', 'SMOKE', 'IMPERIUM', 'DREADNOUGHT'],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    weapons: [
      { name: 'Macro plasma incinerator — standard', range: '36"', BS: '3+', A: 3, S: 8, AP: -3, D: 2, abilities: [] },
      { name: 'Macro plasma incinerator — supercharge', range: '36"', BS: '3+', A: 3, S: 9, AP: -4, D: 3, abilities: ['HAZARDOUS'] },
      { name: 'Redemptor fist', WS: '3+', A: 5, S: 12, AP: -3, D: 3, abilities: [] },
      { name: 'Fragstorm grenade launcher', range: '18"', BS: '3+', A: 4, S: 4, AP: 0, D: 1, abilities: [] },
      { name: 'Onslaught gatling cannon', range: '30"', BS: '3+', A: 12, S: 6, AP: -1, D: 1, abilities: [] },
    ],
  },
  {
    id: 'predatorAnnihilator',
    name: 'Predator Annihilator',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'predatorAnnihilator',
    M: '10"', T: 11, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    points: 130, models: 1,
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'PREDATOR'],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Deadly Hunter', phase: 'shooting', description: 'Each time this model makes a ranged attack targeting a MONSTER or VEHICLE, add 1 to the Hit roll.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    weapons: [
      { name: 'Twin lascannon', range: '48"', BS: '3+', A: 2, S: 12, AP: -3, D: 'D6+1', abilities: ['TWIN-LINKED'] },
      { name: 'Lascannon (sponson)', range: '48"', BS: '3+', A: 1, S: 12, AP: -3, D: 'D6+1', abilities: ['HEAVY'] },
      { name: 'Heavy bolter', range: '36"', BS: '3+', A: 3, S: 5, AP: -1, D: 2, abilities: ['SUSTAINED HITS 1'] },
    ],
  },
  {
    id: 'predatorDestructor',
    name: 'Predator Destructor',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'predatorDestructor',
    M: '10"', T: 11, Sv: '3+', W: 11, Ld: '6+', OC: 3,
    points: 110, models: 1,
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'PREDATOR'],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    weapons: [
      { name: 'Predator autocannon', range: '48"', BS: '3+', A: '2D3', S: 9, AP: -2, D: 3, abilities: ['HEAVY'] },
      { name: 'Heavy bolter (sponson x2)', range: '36"', BS: '3+', A: 6, S: 5, AP: -1, D: 2, abilities: ['SUSTAINED HITS 1'] },
    ],
  },
  {
    id: 'gladiatorLancer',
    name: 'Gladiator Lancer',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'gladiatorLancer',
    M: '10"', T: 11, Sv: '3+', W: 12, Ld: '6+', OC: 3, InvSv: '5+',
    points: 160, models: 1, weaponRole: 'ranged',
    keywords: ['VEHICLE', 'SMOKE', 'IMPERIUM', 'GLADIATOR'],
    abilities: [
      { name: 'Deadly Demise D3', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D3 mortal wounds.' },
      { name: 'Aquila Lander', phase: 'shooting', description: 'Each time this model makes a ranged attack targeting a MONSTER or VEHICLE, add 1 to the Hit roll.' },
      { name: 'Damaged: 1-4 wounds', phase: 'any', description: 'While this model has 1-4 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    weapons: [
      { name: 'Lancer laser destroyer', range: '60"', BS: '3+', A: 2, S: 14, AP: -4, D: 'D6+2', abilities: ['ASSAULT', 'HEAVY'] },
      { name: 'Multi-melta', range: '18"', BS: '3+', A: 2, S: 9, AP: -4, D: 'D6', abilities: ['HEAVY', 'MELTA 2'] },
      { name: 'Armoured hull', WS: '4+', A: 3, S: 6, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'repulsor',
    name: 'Repulsor',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'repulsor',
    M: '10"', T: 12, Sv: '3+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    points: 210, models: 1, weaponRole: 'ranged',
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'IMPERIUM', 'REPULSOR'],
    abilities: [
      { name: 'Deadly Demise D6', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 2+, each unit within 6" suffers D6 mortal wounds.' },
      { name: 'Transport', phase: 'any', description: 'Transport capacity: 12 TACTICUS INFANTRY or PHOBOS INFANTRY models. Cannot transport JUMP PACK, GRAVIS or CENTURION models.' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    weapons: [
      { name: 'Repulsor field', range: '12"', BS: 'N/A', A: 'D6', S: 4, AP: 0, D: 1, abilities: ['TORRENT'] },
      { name: 'Twin lascannon', range: '48"', BS: '3+', A: 2, S: 12, AP: -3, D: 'D6+1', abilities: ['TWIN-LINKED'] },
      { name: 'Armoured hull', WS: '4+', A: 3, S: 6, AP: 0, D: 1, abilities: [] },
    ],
  },
  {
    id: 'landRaider',
    name: 'Land Raider',
    category: 'vehicle',
    isLeader: false,
    unitKey: 'landRaider',
    M: '10"', T: 13, Sv: '2+', W: 16, Ld: '6+', OC: 5, InvSv: '5+',
    points: 265, models: 1,
    keywords: ['VEHICLE', 'SMOKE', 'TRANSPORT', 'IMPERIUM', 'LAND RAIDER'],
    abilities: [
      { name: 'Assault Vehicle', phase: 'movement', description: 'Units that disembark from this Transport can charge the same turn, even if this Transport has moved.' },
      { name: 'Transport', phase: 'any', description: 'Transport capacity: 12 TERMINATOR models or 12 other INFANTRY models.' },
      { name: 'Damaged: 1-5 wounds', phase: 'any', description: 'While this model has 1-5 wounds remaining, subtract 1 from Hit rolls.' },
    ],
    weapons: [
      { name: '2× Twin lascannon', range: '48"', BS: '3+', A: 2, S: 12, AP: -3, D: 'D6+1', abilities: ['TWIN-LINKED'] },
      { name: 'Twin heavy bolter', range: '36"', BS: '3+', A: 6, S: 5, AP: -1, D: 2, abilities: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
    ],
  },
]

const smUnits = [...epicHeroes, ...characters, ...battleline, ...infantry, ...cavalry, ...vehicles]

export const smUnitList = smUnits

export const smUnitsByCategory = {
  epicHero:  smUnits.filter(u => u.category === 'epicHero'),
  character: smUnits.filter(u => u.category === 'character'),
  battleline: smUnits.filter(u => u.category === 'battleline'),
  infantry:  smUnits.filter(u => u.category === 'infantry'),
  cavalry:   smUnits.filter(u => u.category === 'cavalry'),
  vehicle:   smUnits.filter(u => u.category === 'vehicle'),
}
