// Space Wolves units — 10th Edition (Wahapedia-verified, April 2026)
// Sources: https://wahapedia.ru/wh40k10ed/factions/space-marines/

export const swUnits = {

  // ── EPIC HEROES ────────────────────────────────────────────────────

  ragnar: {
    id: 'ragnar', name: 'Ragnar Blackmane', category: 'epicHero',
    points: 100,
    M: '7"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, artUrl: 'https://assets.warhammer-community.com/articles/521ce86b-b8b1-4599-bfe8-38167ea01f65/idaz7xmwcxfwoehr.jpg', artPosition: 'center top',
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Frostfang', type: 'melee', A: 8, WS: '2+', S: 6, AP: -3, D: 2, keywords: ['SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'War Howl', phase: 'fight', description: 'While this model is leading a unit, melee weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability. Each time this model\'s unit makes a Charge move, until the end of the turn, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit.' },
      { name: 'Battle-lust', phase: 'fight', description: 'After this model finishes a Charge move, until the end of the turn, add 2 to the Attacks characteristic of this model\'s Frostfang.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'GRENADES', 'TACTICUS', 'CAPTAIN', 'RAGNAR BLACKMANE'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  loganGrimnar: {
    id: 'loganGrimnar', name: 'Logan Grimnar', category: 'epicHero',
    points: 110,
    M: '6"', T: 5, Sv: '2+', W: 8, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, weaponRole: 'mixed', artUrl: 'https://assets.warhammer-community.com/grotmas10-dec10-image1_wide-opfvgxejgg.jpg', artPosition: 'center center',
    weapons: [
      { name: 'Storm Bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Axe Morkai — Strike', type: 'melee', A: 6, WS: '2+', S: 8, AP: -2, D: 3, keywords: [] },
      { name: 'Axe Morkai — Sweep', type: 'melee', A: 10, WS: '2+', S: 6, AP: -2, D: 1, keywords: [] },
      { name: 'Tyrnak and Fenrir', type: 'melee', A: 6, WS: '2+', S: 5, AP: -1, D: 1, keywords: ['EXTRA ATTACKS'] },
    ],
    abilities: [
      { name: 'High King of Fenris', phase: 'movement', description: 'Once per battle round, in your Movement phase, you can select one friendly SPACE WOLVES unit that is in Reserves. If you do, until the end of the phase, for the purpose of setting up that unit on the battlefield, treat the current battle round number as being one higher than it actually is.' },
      { name: 'Guile of the Wolf (Aura)', phase: 'any', description: 'Each time your opponent targets a unit from their army with a Stratagem, if that unit is within 12" of this model, increase the cost of that usage of that Stratagem by 1CP (this is not cumulative with any other rules that increase the CP cost of that Stratagem).' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuardTerminators'],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'TERMINATOR', 'CHAPTER MASTER', 'LOGAN GRIMNAR'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  bjorn: {
    id: 'bjorn', name: 'Bjorn the Fell-Handed', category: 'epicHero',
    points: 160,
    M: '9"', T: 9, Sv: '2+', W: 8, Ld: '6+', OC: 3, InvSv: '5+',
    models: 1, weaponRole: 'mixed', artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101116_BornFellhanded01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Assault Cannon', type: 'ranged', range: '24"', A: 6, BS: '2+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Heavy Flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Helfrost Cannon — Dispersed', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 6, AP: -1, D: 2, keywords: ['TORRENT'] },
      { name: 'Helfrost Cannon — Focused', type: 'ranged', range: '36"', A: 1, BS: '2+', S: 10, AP: -3, D: 5, keywords: [] },
      { name: 'Multi-melta', type: 'ranged', range: '18"', A: 2, BS: '2+', S: 9, AP: -4, D: 'D6', keywords: ['MELTA 2'] },
      { name: 'Trueclaw', type: 'melee', A: 6, WS: '2+', S: 12, AP: -2, D: 3, keywords: ['LETHAL HITS'] },
    ],
    abilities: [
      { name: 'Legendary Tenacity', phase: 'any', description: 'Each time an attack targets this model, if the Strength characteristic of that attack is greater than this model\'s Toughness characteristic, subtract 1 from the Wound roll.' },
      { name: 'Ancient Tactician', phase: 'command', description: 'At the start of your Command phase, if this model is on the battlefield, you gain 1CP.' },
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Feel No Pain 5+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 5+, that wound is not lost.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['VEHICLE', 'WALKER', 'CHARACTER', 'EPIC HERO', 'SMOKE', 'IMPERIUM', 'DREADNOUGHT', 'BJORN THE FELL-HANDED'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  njal: {
    id: 'njal', name: 'Njal Stormcaller', category: 'epicHero',
    points: 85,
    M: '7"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, weaponRole: 'mixed', artUrl: 'https://assets.warhammer-community.com/image4-3n0gwxrfgi.jpg', artPosition: 'center center',
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Living Lightning — Witchfire', type: 'ranged', range: '24"', A: 'D6', BS: '3+', S: 7, AP: -1, D: 1, keywords: ['PSYCHIC', 'SUSTAINED HITS 2'] },
      { name: 'Living Lightning — Focused Witchfire', type: 'ranged', range: '24"', A: '2D6', BS: '3+', S: 7, AP: -1, D: 1, keywords: ['HAZARDOUS', 'PSYCHIC', 'SUSTAINED HITS 2'] },
      { name: 'Staff of the Stormcaller', type: 'melee', A: 4, WS: '3+', S: 7, AP: -1, D: 'D3', keywords: ['PSYCHIC', 'SUSTAINED HITS 2'] },
    ],
    abilities: [
      { name: 'Wind Walker (Psychic)', phase: 'movement', description: 'While this model is leading a unit, ranged weapons equipped by models in that unit have the [ASSAULT] ability and each time that unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6" to the Move characteristic of models in this unit.' },
      { name: "Tempest's Wrath (Psychic)", phase: 'shooting', description: "In your Shooting phase, after this model's unit has shot, select one enemy unit (excluding MONSTERS and VEHICLES) hit by one or more of those attacks made with this model's Living Lightning weapon. Until the start of your next turn, that enemy unit is stormwracked. While a unit is stormwracked, subtract 6\" from the Range characteristic of ranged weapons equipped by models in that unit (to a minimum of 12\")." },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'PSYKER', 'IMPERIUM', 'TACTICUS', 'NJAL STORMCALLER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  murderfang: {
    id: 'murderfang', name: 'Murderfang', category: 'epicHero',
    points: 150,
    M: '9"', T: 9, Sv: '2+', W: 8, Ld: '6+', OC: 0,
    models: 1, weaponRole: 'mixed', artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101116_Murderfang01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Heavy Flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Storm Bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Murderclaws', type: 'melee', A: 8, WS: '3+', S: 14, AP: -2, D: 3, keywords: ['SUSTAINED HITS 1', 'TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Murder-maker (Aura)', phase: 'fight', description: 'In the Fight phase, each time an attack targets a friendly WULFEN unit within 6" of this model, if a model in that unit is destroyed as a result of that attack, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play; it can fight after the attacking unit has finished making its attacks, and is then removed from play.' },
      { name: 'Bestial Fury', phase: 'movement', description: 'You can re-roll Advance and Charge rolls made for this model.' },
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 6+, that wound is not lost.' },
    ],
    isLeader: false,
    leadsUnits: [],
    keywords: ['VEHICLE', 'WALKER', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'DREADNOUGHT', 'WULFEN', 'MURDERFANG'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  arjacRockfist: {
    id: 'arjacRockfist', name: 'Arjac Rockfist', category: 'epicHero',
    points: 105,
    M: '6"', T: 5, Sv: '2+', W: 6, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, weaponRole: 'mixed', artUrl: 'https://assets.warhammer-community.com/image3-y0qrj3lwst.jpg', artPosition: 'center center',
    weapons: [
      { name: 'Foehammer (ranged)', type: 'ranged', range: '6"', A: 1, BS: '2+', S: 8, AP: -2, D: 3, keywords: ['ANTI-MONSTER 3+', 'ANTI-VEHICLE 3+', 'ASSAULT'] },
      { name: 'Foehammer (melee)', type: 'melee', A: 5, WS: '2+', S: 8, AP: -2, D: 3, keywords: ['ANTI-MONSTER 3+', 'ANTI-VEHICLE 3+', 'PRECISION'] },
    ],
    abilities: [
      { name: 'Anvil of Endurance', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit is destroyed by a melee attack, if that model has not fought this phase, roll one D6: on a 4+, do not remove the destroyed model from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.' },
      { name: 'Champion of the Kingsguard', phase: 'fight', description: 'Each time this model makes a melee attack that targets a CHARACTER unit, you can re-roll the Hit roll and you can re-roll the Wound roll.' },
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this model in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this model up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
    ],
    isLeader: true,
    leadsUnits: ['wolfGuardTerminators'],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'IMPERIUM', 'TERMINATOR', 'ARJAC ROCKFIST'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  ulrik: {
    id: 'ulrik', name: 'Ulrik the Slayer', category: 'epicHero',
    points: 70,
    M: '7"', T: 4, Sv: '3+', W: 4, Ld: '5+', OC: 1, InvSv: '4+',
    models: 1, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99070101019_UlrikTheSlayer01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Plasma Pistol (standard)', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma Pistol (supercharge)', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Artificer Crozius Arcanum', type: 'melee', A: 5, WS: '2+', S: 6, AP: -2, D: 2, keywords: ['ANTI-MONSTER 4+', 'ANTI-VEHICLE 4+'] },
    ],
    abilities: [
      { name: "Slayer's Oath", phase: 'any', description: "At the start of the battle, select one keyword: CHARACTER, MONSTER, or VEHICLE. Each time this model's unit destroys a unit with that keyword, for the rest of the battle, this model's unit gains the benefits as if it had completed a Saga detachment rule." },
      { name: 'Oathbound', phase: 'fight', description: "While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Hit roll. Each time a model in that unit makes a melee attack that targets a unit with the keyword chosen for Slayer's Oath, also add 1 to the Wound roll." },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 6+, that wound is not lost.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'EPIC HERO', 'GRENADES', 'IMPERIUM', 'WOLF PRIEST', 'ULRIK THE SLAYER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  // ── CHARACTERS ─────────────────────────────────────────────────────

  ironPriest: {
    id: 'ironPriest', name: 'Iron Priest', category: 'character',
    points: 55,
    M: '7"', T: 4, Sv: '2+', W: 4, Ld: '6+', OC: 1,
    models: 1, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99070101018_SpaceWolvesIronPriest01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Helfrost Pistol — Dispersed', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 4, AP: -1, D: 1, keywords: ['PISTOL', 'TORRENT'] },
      { name: 'Helfrost Pistol — Focused', type: 'ranged', range: '12"', A: 1, BS: '2+', S: 6, AP: -3, D: 3, keywords: ['PISTOL'] },
      { name: 'Tempest Hammer and Servo-arm', type: 'melee', A: 4, WS: '4+', S: 8, AP: -2, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Iron Priest', phase: 'any', description: 'While this model is within 3" of one or more friendly ADEPTUS ASTARTES VEHICLE units, this model has the Lone Operative ability.' },
      { name: 'Gift of the Iron Wolf', phase: 'command', description: 'In your Command phase, you can select one friendly ADEPTUS ASTARTES VEHICLE model within 3" of this model. That model regains up to D3 lost wounds and, until the start of your next Command phase, select one ranged weapon equipped by that model to have the [RAPID FIRE 1] ability.' },
      { name: 'Judgement of the Omnissiah', phase: 'fight', description: 'Each time this model makes an attack that targets an enemy unit within Engagement Range of one or more friendly ADEPTUS ASTARTES VEHICLE units, you can re-roll the Wound roll.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'TECHMARINE', 'IRON PRIEST'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  wolfGuardBattleLeader: {
    id: 'wolfGuardBattleLeader', name: 'Wolf Guard Battle Leader', category: 'character',
    points: 65,
    M: '7"', T: 4, Sv: '3+', W: 5, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, weaponRole: 'mixed', artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101436_SpaceWolvesWolfGuardBattleLeader1.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Master-crafted bolt carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 2, keywords: [] },
      { name: 'Master-crafted heavy bolt pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 2, keywords: ['PISTOL'] },
      { name: 'Plasma pistol (standard)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma pistol (supercharge)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 7, WS: '2+', S: 5, AP: -2, D: 2, keywords: [] },
      { name: 'Thunder hammer', type: 'melee', A: 5, WS: '3+', S: 8, AP: -2, D: 2, keywords: ['DEVASTATING WOUNDS'] },
    ],
    abilities: [
      { name: 'Tempered Ferocity', phase: 'fight', description: "While this model is leading a unit, weapons equipped by models in that unit have the [SUSTAINED HITS 1] ability and, each time a model in that unit makes an attack that targets an enemy unit within 6\", re-roll a Hit roll of 1." },
      { name: 'Heroic Last Stand', phase: 'fight', description: 'If this model is destroyed by a melee attack, if it has not fought this phase, roll one D6: on a 2+, do not remove it from play. The destroyed model can fight after the attacking unit has finished making its attacks, and is then removed from play.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'TACTICUS', 'WOLF GUARD', 'BATTLE LEADER'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  wolfPriest: {
    id: 'wolfPriest', name: 'Wolf Priest', category: 'character',
    points: 70,
    M: '7"', T: 4, Sv: '3+', W: 4, Ld: '6+', OC: 1, InvSv: '4+',
    models: 1, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101435_SpaceWolvesWolfPriest1.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Absolvor Bolt Pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 5, AP: -1, D: 2, keywords: ['PISTOL'] },
      { name: 'Crozius Arcanum', type: 'melee', A: 5, WS: '2+', S: 6, AP: -1, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Healing Balms', phase: 'command', description: 'While this model is leading a unit, in your Command phase, you can return 1 destroyed model (excluding CHARACTER models) to that unit.' },
      { name: 'Litany of Hate', phase: 'fight', description: 'While this model is leading a unit, each time a model in that unit makes a melee attack, add 1 to the Wound roll.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters', 'wolfGuardHeadtakers'],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'TACTICUS', 'WOLF PRIEST'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  wolfGuardPackLeader: {
    id: 'wolfGuardPackLeader', name: 'Wolf Guard Pack Leader', category: 'character',
    points: 55,
    M: '6"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1,
    models: 1,
    legends: true,
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Power Sword', type: 'melee', A: 3, WS: '3+', S: 4, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Saga of Majesty', phase: 'command', description: 'While this model is leading a unit, add 1 to the Objective Control characteristic of models in that unit.' },
    ],
    isLeader: true,
    leadsUnits: ['bloodClaws', 'greyHunters'],
    keywords: ['INFANTRY', 'CHARACTER', 'IMPERIUM', 'WOLF GUARD'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  // ── BATTLELINE ─────────────────────────────────────────────────────

  bloodClaws: {
    id: 'bloodClaws', name: 'Blood Claws', category: 'battleline',
    points: 135,
    M: '7"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 2,
    models: 10, minModels: 10, maxModels: 20, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101434_SpaceWolvesBloodClaws1.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma Pistol (standard)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma Pistol (supercharge)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Astartes Chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Power Weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Berserk Charge', phase: 'charge', description: 'This unit is eligible to declare a charge in a turn in which it Advanced.' },
    ],
    isLeader: false,
    eligibleLeaders: ['ragnar', 'njal', 'ulrik', 'wolfGuardBattleLeader', 'wolfPriest', 'ironPriest', 'wolfGuardPackLeader'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'BLOOD CLAWS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  greyHunters: {
    id: 'greyHunters', name: 'Grey Hunters', category: 'battleline',
    points: 165,
    M: '7"', T: 4, Sv: '3+', W: 2, Ld: '6+', OC: 3,
    models: 10, minModels: 10, maxModels: 10, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101433_SpaceWolvesGreyHuntersSquad1.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Bolt Carbine', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 1'] },
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma Pistol (standard)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma Pistol (supercharge)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Astartes Chainsword', type: 'melee', A: 4, WS: '3+', S: 4, AP: -1, D: 1, keywords: [] },
      { name: 'Power Fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Power Weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Cunning Hunters', phase: 'fight', description: 'Each time a model in this unit makes an attack, re-roll a Wound roll of 1. If the target is within range of an objective marker, you can re-roll the Wound roll instead.' },
    ],
    isLeader: false,
    eligibleLeaders: ['njal', 'ulrik', 'wolfGuardBattleLeader', 'wolfPriest', 'ironPriest', 'wolfGuardPackLeader'],
    keywords: ['INFANTRY', 'BATTLELINE', 'GRENADES', 'IMPERIUM', 'TACTICUS', 'GREY HUNTERS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  // ── OTHER INFANTRY ──────────────────────────────────────────────────

  wolfGuardHeadtakers: {
    id: 'wolfGuardHeadtakers', name: 'Wolf Guard Headtakers', category: 'infantry',
    points: 85,
    M: '7"', T: 4, Sv: '3+', W: 3, Ld: '6+', OC: 1,
    models: 3, minModels: 3, maxModels: 6, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101437_SpaceWolvesWolfGuardHeadtakers1.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Heavy Bolt Pistol', type: 'ranged', range: '18"', A: 1, BS: '3+', S: 4, AP: -1, D: 1, keywords: ['PISTOL'] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
      { name: 'Paired master-crafted power weapons', type: 'melee', A: 6, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Let Loose the Wolves', phase: 'movement', description: 'At the start of the Declare Battle Formations step, split this unit into two units, one containing all of its HEADTAKERS models and one containing all of its HUNTING WOLVES models.' },
      { name: 'Headhunters', phase: 'fight', description: "At the start of the battle, select one unit from your opponent's army to be this unit's quarry. Weapons equipped by HEADTAKERS models in this unit have the [DEVASTATING WOUNDS] and [PRECISION] abilities while targeting its quarry." },
      { name: 'Hunting Hounds', phase: 'any', description: "While this unit is within 6\" of one or more friendly SPACE WOLVES CHARACTER models (excluding WULFEN models), if this unit is not Battle-shocked, HUNTING WOLVES models in it have an Objective Control characteristic of 1." },
    ],
    isLeader: false,
    eligibleLeaders: ['ragnar', 'njal', 'ulrik', 'wolfGuardBattleLeader', 'wolfPriest', 'ironPriest'],
    keywords: ['INFANTRY', 'IMPERIUM', 'TACTICUS', 'WOLF GUARD', 'HEADTAKERS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  wulfen: {
    id: 'wulfen', name: 'Wulfen', category: 'infantry',
    points: 85,
    M: '9"', T: 6, Sv: '4+', W: 2, Ld: '7+', OC: 0,
    models: 5, minModels: 5, maxModels: 10, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101140_SpaceWolvesWulfen01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Stormfrag auto-launcher', type: 'ranged', range: '12"', A: 'D3', BS: '4+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT', 'BLAST'] },
      { name: 'Wulfen weapons', type: 'melee', A: 3, WS: '3+', S: 5, AP: -2, D: 2, keywords: ['SUSTAINED HITS 1'] },
    ],
    abilities: [
      { name: 'Death Totem (Wargear)', phase: 'fight', description: 'Each time the bearer makes a melee attack, re-roll a Hit roll of 1.' },
      { name: 'Savage Frenzy', phase: 'fight', description: 'Each time an enemy unit (excluding MONSTERS and VEHICLES) within Engagement Range of this unit Falls Back, all models in that enemy unit must take a Desperate Escape test. When doing so, if that enemy unit is Battle-shocked, subtract 1 from each of those tests.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'IMPERIUM', 'WULFEN'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  wulfenWithStormShields: {
    id: 'wulfenWithStormShields', name: 'Wulfen with Storm Shields', category: 'infantry',
    points: 100,
    M: '9"', T: 6, Sv: '4+', W: 2, Ld: '7+', OC: 0, InvSv: '4+',
    models: 5, minModels: 5, maxModels: 10, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101140_SpaceWolvesWulfen01.jpg?fm=webp&w=892&h=920', artPosition: 'center top',
    weapons: [
      { name: 'Stormfrag auto-launcher', type: 'ranged', range: '12"', A: 'D3', BS: '4+', S: 4, AP: 0, D: 1, keywords: ['ASSAULT', 'BLAST'] },
      { name: 'Thunder hammer', type: 'melee', A: 2, WS: '3+', S: 5, AP: -2, D: 3, keywords: ['ANTI-MONSTER 3+', 'ANTI-VEHICLE 3+'] },
    ],
    abilities: [
      { name: 'Death Totem (Wargear)', phase: 'fight', description: 'Each time the bearer makes a melee attack, re-roll a Hit roll of 1.' },
      { name: 'Hammer Blow', phase: 'fight', description: 'In the Fight phase, after this unit has fought, select one enemy MONSTER or VEHICLE unit hit by one or more of those attacks. Until the end of the next turn, that enemy unit is suppressed. While a unit is suppressed, each time a model in that unit makes an attack, subtract 1 from the Hit roll.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['INFANTRY', 'IMPERIUM', 'WULFEN', 'WULFEN WITH STORM SHIELDS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  wolfGuardTerminators: {
    id: 'wolfGuardTerminators', name: 'Wolf Guard Terminators', category: 'infantry',
    points: 170,
    M: '6"', T: 5, Sv: '2+', W: 3, Ld: '6+', OC: 1, InvSv: '4+',
    models: 5, minModels: 5, maxModels: 10, artUrl: 'https://assets.warhammer-community.com/carousel1-21drmyig74.png', artPosition: 'center center',
    weapons: [
      { name: 'Assault Cannon', type: 'ranged', range: '24"', A: 6, BS: '2+', S: 6, AP: 0, D: 1, keywords: ['DEVASTATING WOUNDS'] },
      { name: 'Storm Bolter', type: 'ranged', range: '24"', A: 2, BS: '2+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Master-crafted power weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
      { name: 'Power Fist', type: 'melee', A: 3, WS: '3+', S: 8, AP: -2, D: 2, keywords: [] },
      { name: 'Relic Greataxe', type: 'melee', A: 3, WS: '3+', S: 7, AP: -2, D: 3, keywords: [] },
      { name: 'Twin Lightning Claws', type: 'melee', A: 6, WS: '3+', S: 5, AP: -2, D: 1, keywords: ['TWIN-LINKED'] },
    ],
    abilities: [
      { name: 'Deep Strike', phase: 'movement', description: 'During the Declare Battle Formations step, you can set up this unit in Reserves instead of on the battlefield. If you do, at the start of one of your Movement phases, you can set this unit up anywhere on the battlefield that is more than 9" horizontally away from all enemy models.' },
      { name: 'Rugged Resilience', phase: 'any', description: "Each time an attack targets this unit, if the Strength characteristic of that attack is greater than the Toughness characteristic of this unit, subtract 1 from the Wound roll." },
    ],
    isLeader: false,
    eligibleLeaders: ['loganGrimnar', 'arjacRockfist'],
    keywords: ['INFANTRY', 'IMPERIUM', 'TERMINATOR', 'WOLF GUARD', 'WOLF GUARD TERMINATORS'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  // ── VEHICLES ────────────────────────────────────────────────────────

  wulfenDreadnought: {
    id: 'wulfenDreadnought', name: 'Wulfen Dreadnought', category: 'vehicle',
    points: 145,
    M: '9"', T: 9, Sv: '2+', W: 8, Ld: '6+', OC: 0,
    models: 1, weaponRole: 'mixed', artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101116_Murderfang01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Heavy Flamer', type: 'ranged', range: '12"', A: 'D6', BS: 'N/A', S: 5, AP: -1, D: 1, keywords: ['IGNORES COVER', 'TORRENT'] },
      { name: 'Storm Bolter', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['RAPID FIRE 2'] },
      { name: 'Fenrisian Greataxe — Strike', type: 'melee', A: 6, WS: '3+', S: 10, AP: -2, D: 'D6+1', keywords: [] },
      { name: 'Fenrisian Greataxe — Sweep', type: 'melee', A: 12, WS: '3+', S: 6, AP: -2, D: 1, keywords: [] },
      { name: 'Great Wolf Claw', type: 'melee', A: 6, WS: '3+', S: 10, AP: -3, D: 3, keywords: [] },
    ],
    abilities: [
      { name: 'Bestial Rage', phase: 'shooting', description: "After an enemy unit shoots, if this model lost one or more wounds, roll one D6 and add 2; move this model up to that distance towards the closest non-AIRCRAFT enemy unit. This move can take this model within Engagement Range of enemy units." },
      { name: 'Violent Fury', phase: 'fight', description: 'If this model is equipped with two melee weapons, those weapon profiles gain the [TWIN-LINKED] ability.' },
      { name: 'Deadly Demise 1', phase: 'any', description: 'When this model is destroyed, roll one D6: on a 6, each unit within 6" suffers 1 mortal wound.' },
      { name: 'Feel No Pain 6+', phase: 'any', description: 'Each time this model would lose a wound, roll one D6: on a 6+, that wound is not lost.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['VEHICLE', 'WALKER', 'IMPERIUM', 'WULFEN', 'DREADNOUGHT'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  // ── CAVALRY ─────────────────────────────────────────────────────────

  thunderwolfCavalry: {
    id: 'thunderwolfCavalry', name: 'Thunderwolf Cavalry', category: 'cavalry',
    points: 115,
    M: '12"', T: 6, Sv: '3+', W: 4, Ld: '6+', OC: 2,
    models: 3, minModels: 3, maxModels: 6, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101091_ThunderwolfCavalryNEW01.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Bolt Pistol', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 4, AP: 0, D: 1, keywords: ['PISTOL'] },
      { name: 'Boltgun', type: 'ranged', range: '24"', A: 2, BS: '3+', S: 4, AP: 0, D: 1, keywords: [] },
      { name: 'Plasma Pistol (standard)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 7, AP: -2, D: 1, keywords: ['PISTOL'] },
      { name: 'Plasma Pistol (supercharge)', type: 'ranged', range: '12"', A: 1, BS: '3+', S: 8, AP: -3, D: 2, keywords: ['HAZARDOUS', 'PISTOL'] },
      { name: 'Teeth and Claws', type: 'melee', A: 3, WS: '4+', S: 5, AP: -1, D: 1, keywords: [] },
      { name: 'Wolf Guard Weapon', type: 'melee', A: 4, WS: '3+', S: 5, AP: -2, D: 2, keywords: [] },
    ],
    abilities: [
      { name: 'Thunderous Charge', phase: 'fight', description: 'Each time a model in this unit makes a melee attack with its Wolf Guard weapon, if it made a Charge move this turn, add 1 to the Damage characteristic of that attack.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['MOUNTED', 'GRENADES', 'IMPERIUM', 'THUNDERWOLF CAVALRY'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

  fenrisianWolves: {
    id: 'fenrisianWolves', name: 'Fenrisian Wolves', category: 'cavalry',
    points: 40,
    M: '10"', T: 4, Sv: '6+', W: 1, Ld: '8+', OC: 0,
    models: 5, minModels: 5, maxModels: 10, artUrl: 'https://www.warhammer.com/app/resources/catalog/product/920x950/99120101252_FenrisianWolvesLead.jpg?fm=webp&w=892&h=920', artPosition: 'center center',
    weapons: [
      { name: 'Teeth and Claws', type: 'melee', A: 3, WS: '4+', S: 4, AP: 0, D: 1, keywords: [] },
    ],
    abilities: [
      { name: 'Predatory Instinct', phase: 'movement', description: 'Once per turn, when an enemy unit ends a Normal, Advance or Fall Back move within 9" of this unit, it can make a Normal move of up to D6".' },
      { name: 'Hunting Hounds', phase: 'any', description: 'While this unit is within 6" of one or more friendly SPACE WOLVES CHARACTER models (excluding WULFEN models), if this unit is not Battle-shocked, models in it have an Objective Control characteristic of 1.' },
    ],
    isLeader: false,
    eligibleLeaders: [],
    keywords: ['BEASTS', 'IMPERIUM', 'FENRISIAN WOLVES'],
    factionKeywords: ['ADEPTUS ASTARTES', 'SPACE WOLVES'],
  },

}

export const swUnitList = Object.values(swUnits)

export const swUnitsByCategory = {
  epicHero:  swUnitList.filter(u => u.category === 'epicHero'),
  character: swUnitList.filter(u => u.category === 'character'),
  battleline: swUnitList.filter(u => u.category === 'battleline'),
  infantry:  swUnitList.filter(u => u.category === 'infantry'),
  cavalry:   swUnitList.filter(u => u.category === 'cavalry'),
  vehicle:   swUnitList.filter(u => u.category === 'vehicle'),
}
