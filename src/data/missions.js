// ── Chapter Approved 2025-26 Mission Data ────────────────────────────────────

export const PRIMARY_MISSIONS = {
  takeAndHold: {
    id: 'takeAndHold',
    name: 'Take and Hold',
    icon: '🏴',
    summary: 'Control objective markers to score VP each turn.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '5VP per objective marker you control', max: '15VP/round' },
    ],
    notes: 'Contested objectives score for neither player.',
    maxVP: 50,
  },
  linchpin: {
    id: 'linchpin',
    name: 'Linchpin',
    icon: '🔗',
    summary: 'Score extra VP for controlling objectives outside your deployment zone.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '3VP per objective you control. If you control all objectives in your own zone: +5VP per objective outside it', max: '15VP/round' },
    ],
    notes: 'Holding your home objectives while threatening the centre is key.',
    maxVP: 50,
  },
  purgeTheFoe: {
    id: 'purgeTheFoe',
    name: 'Purge the Foe',
    icon: '💀',
    summary: 'Destroy enemy units and control objectives to score VP.',
    scoring: [
      { when: 'End of each battle round (from turn 2)', vp: '4VP if opponent lost ≥1 unit · 4VP if opponent lost more units than you · 4VP if you control ≥1 objective · 4VP if you control more objectives than opponent', max: '16VP/round' },
    ],
    notes: 'Up to 4 separate conditions each worth 4VP — aggression pays.',
    maxVP: 50,
  },
  scorchedEarth: {
    id: 'scorchedEarth',
    name: 'Scorched Earth',
    icon: '🔥',
    summary: 'Burn objectives to deny them — or hold them for steady VP.',
    scoring: [
      { when: 'After completing Burn Objective action (any turn)', vp: '5VP if objective is in No Man\'s Land · 10VP if in opponent\'s zone' },
      { when: 'End of each Command phase (from turn 2)', vp: '5VP per objective you control (max 2 objectives counted)', max: '10VP/round' },
    ],
    notes: 'Burn an objective you can\'t hold rather than let your opponent score it.',
    maxVP: 50,
  },
  hiddenSupplies: {
    id: 'hiddenSupplies',
    name: 'Hidden Supplies',
    icon: '📦',
    summary: 'An extra hidden objective rewards controlling multiple markers.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '5VP if you control ≥1 objective outside your zone · +5VP if you control ≥2 · +5VP if you control more than opponent', max: '15VP/round' },
    ],
    notes: 'Stacking all three conditions (15VP/round) requires aggressive objective play.',
    maxVP: 50,
  },
  supplyDrop: {
    id: 'supplyDrop',
    name: 'Supply Drop',
    icon: '🪂',
    summary: 'Alpha and Omega objectives appear mid-field and are worth increasing VP as the game progresses.',
    scoring: [
      { when: 'End of Command phase turns 2–3', vp: '5VP per No Man\'s Land objective you control' },
      { when: 'End of Command phase turn 4', vp: '8VP per No Man\'s Land objective (Alpha removed after)' },
      { when: 'End of Command phase turn 5', vp: '15VP for Omega objective if you control it' },
    ],
    notes: 'Omega is worth a massive 15VP on the last turn — contest it at all costs.',
    maxVP: 50,
  },
  terraform: {
    id: 'terraform',
    name: 'Terraform',
    icon: '🌍',
    summary: 'Perform Terraform actions on objectives to score bonus VP.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '4VP per objective you control · +1VP per terraformed objective you control', max: '12VP/round base + bonus' },
    ],
    notes: 'Terraform action: unit must remain stationary on objective for a full round.',
    maxVP: 50,
  },
  burdenOfTrust: {
    id: 'burdenOfTrust',
    name: 'Burden of Trust',
    icon: '⚖️',
    summary: 'Guard objectives you control — but opponent scores VP for their units near yours.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '4VP per objective you control outside your deployment zone' },
      { when: 'End of each turn (opponent\'s scoring)', vp: 'Opponent scores 2VP per non-Battleshocked unit guarding your controlled objectives' },
    ],
    notes: 'Guard your objectives wisely — enemy units near them score for the opponent.',
    maxVP: 50,
  },
  theRitual: {
    id: 'theRitual',
    name: 'The Ritual',
    icon: '🔮',
    summary: 'Perform ritual actions to create new objectives in No Man\'s Land.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '5VP per No Man\'s Land objective you control', max: '15VP/round' },
    ],
    notes: 'Ritual action: unit performs it on an objective, creating a new marker in No Man\'s Land.',
    maxVP: 50,
  },
  unexplodedOrdnance: {
    id: 'unexplodedOrdnance',
    name: 'Unexploded Ordnance',
    icon: '💣',
    summary: 'Move Hazard objectives into the opponent\'s zone for increasing VP.',
    scoring: [
      { when: 'End of each Command phase (from turn 2)', vp: '8VP if Hazard objective is in opponent\'s zone · 5VP if within 6" of it · 2VP if within 12"' },
    ],
    notes: 'Only one bracket scores per Hazard objective each turn.',
    maxVP: 50,
  },
}

// ── Secondary Missions ────────────────────────────────────────────────────────

export const SECONDARY_MISSIONS = [
  {
    id: 'assassination',
    name: 'Assassination',
    icon: '🗡️',
    canBeFixed: true,
    fixedVP: 'Each turn: 4VP per enemy CHARACTER with 4+ Wounds destroyed · 3VP per CHARACTER with <4 Wounds (max 20VP total)',
    tacticalVP: '5VP if any enemy CHARACTER was destroyed this turn',
    summary: 'Kill enemy characters.',
    hint: 'Tag your opponent\'s leaders early — every dead character is points.',
  },
  {
    id: 'bringItDown',
    name: 'Bring It Down',
    icon: '🎯',
    canBeFixed: true,
    fixedVP: 'Each turn: 2VP per MONSTER or VEHICLE destroyed · +2VP if it had 15+ Wounds · +2VP if it had 20+ Wounds (max 20VP)',
    tacticalVP: '4VP if any enemy MONSTER or VEHICLE was destroyed this turn (skip if no M/V exist)',
    summary: 'Destroy enemy monsters and vehicles.',
    hint: 'Prioritise the biggest targets — a 20W model is worth 6VP.',
  },
  {
    id: 'cullTheHorde',
    name: 'Cull the Horde',
    icon: '🐛',
    canBeFixed: true,
    fixedVP: '5VP per enemy INFANTRY unit with Starting Strength 13+ destroyed (max 20VP)',
    tacticalVP: '5VP if one or more such units were destroyed this turn (skip card if no qualifying enemy units exist)',
    summary: 'Destroy large enemy infantry units.',
    hint: 'Great against Tyranids, Orks, Astra Militarum — units of 10+ models.',
  },
  {
    id: 'noPrisoners',
    name: 'No Prisoners',
    icon: '⚔️',
    canBeFixed: false,
    fixedVP: null,
    tacticalVP: '2VP per enemy unit destroyed this turn (up to 5VP)',
    summary: 'Destroy as many enemy units as possible.',
    hint: 'Cannot be chosen as a Fixed Mission. Best against armies with many small units.',
  },
  {
    id: 'engageOnAllFronts',
    name: 'Engage on All Fronts',
    icon: '🗺️',
    canBeFixed: true,
    fixedVP: 'Each turn: 1VP for units in 2 table quarters · 2VP for 3 quarters · 4VP for all 4 (non-Aircraft, non-Battleshocked, >6" from centre)',
    tacticalVP: '4VP if you have units wholly within all 4 table quarters',
    summary: 'Have units spread across all four table quarters.',
    hint: 'Fast, mobile armies score this easily. Keep cheap units on the flanks.',
  },
  {
    id: 'behindEnemyLines',
    name: 'Behind Enemy Lines',
    icon: '🏃',
    canBeFixed: true,
    fixedVP: 'Each turn: 3VP for 1 unit wholly in opponent\'s zone · 4VP for 2+ units',
    tacticalVP: '4VP if 2+ of your units are wholly within the opponent\'s deployment zone (skip first round)',
    summary: 'Get units into the enemy deployment zone.',
    hint: 'Infiltrators, Deep Strike, and fast units get this early and reliably.',
  },
  {
    id: 'stormHostileObjective',
    name: 'Storm Hostile Objective',
    icon: '🏴‍☠️',
    canBeFixed: true,
    fixedVP: 'Each turn: 4VP for controlling an objective the opponent controlled at the start of your turn · +4VP if opponent controls no objectives',
    tacticalVP: '4VP if you captured an objective the opponent previously held (skip first round)',
    summary: 'Steal objectives from your opponent.',
    hint: 'The swing card — take their objectives for double VP impact.',
  },
  {
    id: 'establishLocus',
    name: 'Establish Locus',
    icon: '📍',
    canBeFixed: true,
    fixedVP: 'Each turn: 2VP if action completed near battlefield centre · 4VP if completed in opponent\'s deployment zone',
    tacticalVP: 'Perform the Establish Locus action, score VP as above',
    summary: 'Perform actions at key locations on the battlefield.',
    hint: 'Your unit must perform the action — it cannot move, shoot, or charge that turn.',
  },
  {
    id: 'cleanse',
    name: 'Cleanse',
    icon: '✨',
    canBeFixed: true,
    fixedVP: 'Each turn: 2VP per objective cleansed outside your zone · up to 5VP per turn',
    tacticalVP: '4VP if 2+ objectives outside your zone are cleansed this turn',
    summary: 'Perform Cleanse actions on objectives outside your deployment zone.',
    hint: 'Units performing the action cannot shoot or charge — plan the timing carefully.',
  },
  {
    id: 'defendStronghold',
    name: 'Defend Stronghold',
    icon: '🛡️',
    canBeFixed: true,
    fixedVP: 'Each turn: 3VP for controlling ≥1 objective in your deployment zone',
    tacticalVP: '3VP for controlling an objective in your own deployment zone at end of turn (skip first round)',
    summary: 'Hold objectives in your own deployment zone.',
    hint: 'Easy passive scoring — keep a cheap unit back to sit on your home objective.',
  },
  {
    id: 'markedForDeath',
    name: 'Marked for Death',
    icon: '🎯',
    canBeFixed: true,
    fixedVP: 'Opponent selects 3 Alpha Target units, you select 1 Gamma Target. Each turn: 5VP if an Alpha is destroyed · 2VP if Gamma is destroyed instead',
    tacticalVP: 'Same target selection. 5VP if any Alpha Target is destroyed this turn, or 2VP for Gamma',
    summary: 'Hunt down specific enemy units designated as priority targets.',
    hint: 'Pick the Alpha targets you can realistically kill — opponent will try to protect them.',
  },
  {
    id: 'secureNoManSLand',
    name: "Secure No Man's Land",
    icon: '🏗️',
    canBeFixed: true,
    fixedVP: "Each turn: 2VP for controlling 1 No Man's Land objective · 5VP for controlling 2+",
    tacticalVP: "5VP if you control 2+ No Man's Land objectives at end of turn",
    summary: "Control the mid-field objectives.",
    hint: 'Mid-board control is everything — these objectives are usually contested.',
  },
  {
    id: 'sabotage',
    name: 'Sabotage',
    icon: '💥',
    canBeFixed: true,
    fixedVP: 'Perform Sabotage action in terrain feature outside your deployment zone. 3VP if outside opponent\'s zone · 6VP if inside opponent\'s zone',
    tacticalVP: 'Same action. Score as above when action completed.',
    summary: 'Perform Sabotage actions in terrain outside your deployment zone.',
    hint: 'Your unit must NOT be in its own deployment zone to start the action.',
  },
  {
    id: 'areaDenial',
    name: 'Area Denial',
    icon: '🚫',
    canBeFixed: true,
    fixedVP: 'Each turn: 2VP if your units are within 3" of battlefield centre with no enemy units within 3" · 5VP if no enemy units within 6"',
    tacticalVP: '5VP if your units are within 3" of centre and no enemy within 6" at end of turn',
    summary: 'Control the centre of the battlefield.',
    hint: 'The full 5VP requires total domination of the mid-board. Strong with tough, mobile units.',
  },
  {
    id: 'recoverAssets',
    name: 'Recover Assets',
    icon: '📋',
    canBeFixed: true,
    fixedVP: 'Perform action with 2+ units in different zones. 3VP for two units · 5VP for three+ units',
    tacticalVP: 'Same. Score as above when completed (skip if Incursion or fewer than 3 friendly units on table)',
    summary: 'Perform actions with units across multiple board zones.',
    hint: 'Spread your activations — one unit in your zone, one in NML, one in theirs.',
  },
  {
    id: 'aTemptingTarget',
    name: 'A Tempting Target',
    icon: '🏆',
    canBeFixed: true,
    fixedVP: "Opponent selects one No Man's Land objective as the target. Each turn: 5VP if you control it",
    tacticalVP: "Opponent selects the target. 5VP if you control it at end of turn",
    summary: "Control an objective your opponent designates as the target.",
    hint: 'Opponent will try to defend their chosen objective — be ready to fight for it.',
  },
  {
    id: 'extendBattleLines',
    name: 'Extend Battle Lines',
    icon: '↔️',
    canBeFixed: true,
    fixedVP: "Each turn: 4VP if you control objectives in your zone AND No Man's Land · 2VP if you control only No Man's Land objectives",
    tacticalVP: "4VP if you control objectives in both your zone and No Man's Land",
    summary: "Control objectives in your deployment zone and No Man's Land simultaneously.",
    hint: 'Rewards conservative play with forward presence — strong for balanced lists.',
  },
  {
    id: 'overwhelmingForce',
    name: 'Overwhelming Force',
    icon: '⚡',
    canBeFixed: true,
    fixedVP: 'Each turn: 3VP per enemy unit destroyed that started the turn within range of an objective (max 5VP). Leader and Bodyguard count separately.',
    tacticalVP: 'Same scoring for units destroyed near objectives this turn',
    summary: 'Destroy enemy units that are holding objectives.',
    hint: 'Force your opponent off objectives and score for it — punishes turtling.',
  },
  {
    id: 'displayOfMight',
    name: 'Display of Might',
    icon: '💪',
    canBeFixed: true,
    fixedVP: 'Each turn: 4VP if you have more units wholly within No Man\'s Land than your opponent',
    tacticalVP: '4VP if you have more units wholly within No Man\'s Land at end of turn (skip first round)',
    summary: "Dominate No Man's Land with more units than your opponent.",
    hint: 'Flood the mid-board early. Small cheap units count just as much as big ones.',
  },
]

// ── Deployment Zones ──────────────────────────────────────────────────────────

export const DEPLOYMENTS = {
  tippingPoint: {
    id: 'tippingPoint',
    name: 'Tipping Point',
    icon: '⚖️',
    description: 'Attacker and Defender deploy in opposite corners of the board with a diagonal dividing line. Objectives cluster near the centre with one at each corner edge.',
    zones: 'Triangular diagonal deployment zones, ~12" deep at the flanks',
  },
  hammerAndAnvil: {
    id: 'hammerAndAnvil',
    name: 'Hammer and Anvil',
    icon: '🔨',
    description: 'Both players deploy on the short edges. Long approach favours ranged armies. Objectives spread across the centre corridor.',
    zones: '12" deep on the short edges of the 44"×60" board',
  },
  searchAndDestroy: {
    id: 'searchAndDestroy',
    name: 'Search and Destroy',
    icon: '🔍',
    description: 'Attacker deploys on the long edge, Defender on the short edge. Asymmetric board creates interesting objective races.',
    zones: 'Attacker: 9" from long edge · Defender: 12" from short edge',
  },
  crucibleOfBattle: {
    id: 'crucibleOfBattle',
    name: 'Crucible of Battle',
    icon: '⚔️',
    description: 'Both players deploy symmetrically on the long edges. Classic face-to-face battle with objectives spread evenly.',
    zones: '9" deep on each long edge',
  },
  sweepingEngagement: {
    id: 'sweepingEngagement',
    name: 'Sweeping Engagement',
    icon: '🌊',
    description: 'Diagonal deployment in opposite corners, larger zones than Tipping Point. More room to manoeuvre before engagement.',
    zones: 'Larger diagonal corner zones, ~18" deep',
  },
  dawnOfWar: {
    id: 'dawnOfWar',
    name: 'Dawn of War',
    icon: '🌅',
    description: 'Both players deploy on the short edges with very deep zones — almost half the board each. Objectives are far from home, requiring significant advances.',
    zones: '20" deep on the short edges',
  },
}

// ── Terrain Layouts ───────────────────────────────────────────────────────────

export const TERRAIN_LAYOUTS = {
  1: {
    id: 1,
    name: 'Layout 1',
    description: 'Asymmetric scatter with large ruins anchoring the left flank. Angled barriers cross the centre creating diagonal movement lanes. Open right flank. Two objectives mid-field with line-of-sight breaks on each side.',
    density: 'Medium',
    favours: 'Balanced armies — cover available without choking movement',
  },
  2: {
    id: 2,
    name: 'Layout 2',
    description: 'Two large angled ruins cross the centre diagonally, flanked by smaller ruins on each side. Creates a central X-pattern of cover with open corridors at each corner.',
    density: 'Medium-High',
    favours: 'Melee armies that can use cover to advance',
  },
  3: {
    id: 3,
    name: 'Layout 3',
    description: 'Heavy terrain clusters in the left-centre and right-flanks with open deployment zones. Mid-field has a dense cluster of interconnected ruins creating a central fortress.',
    density: 'High',
    favours: 'Armies that can hold terrain and fire out',
  },
  4: {
    id: 4,
    name: 'Layout 4',
    description: 'Clear flanking corridors on both sides of the board, dense ruin cluster in the centre blocking direct approach. Rewards flanking manoeuvres.',
    density: 'Medium',
    favours: 'Fast armies that can exploit open flanks',
  },
  5: {
    id: 5,
    name: 'Layout 5',
    description: 'Wide open centre with terrain pushed to the flanks and corners. Long sightlines across most of the mid-board. Objectives are exposed.',
    density: 'Low-Medium',
    favours: 'Ranged armies with long threat ranges',
  },
  6: {
    id: 6,
    name: 'Layout 6',
    description: 'Distributed medium ruins spread across the whole board creating many line-of-sight breaks everywhere. Few completely open corridors.',
    density: 'High',
    favours: 'Balanced lists — neither pure gunline nor pure melee',
  },
  7: {
    id: 7,
    name: 'Layout 7',
    description: 'Tight rectangular terrain blocks forming urban-style corridors. Very structured movement lanes running parallel to the board edges. Limited diagonal movement.',
    density: 'High',
    favours: 'Infantry armies that can navigate tight corridors',
  },
  8: {
    id: 8,
    name: 'Layout 8',
    description: 'Terrain pieces angled 45° creating dynamic diagonal movement lanes. Mix of large and small pieces with clear sight to the centre.',
    density: 'Medium',
    favours: 'Aggressive armies that want controlled approach lanes',
  },
}

// ── The 20-Mission Pool (A–T) ─────────────────────────────────────────────────

export const MISSION_POOL = [
  { id: 'A', primaryId: 'takeAndHold',  deploymentId: 'tippingPoint',        terrainLayouts: [1,2,4,6,7,8] },
  { id: 'B', primaryId: 'supplyDrop',   deploymentId: 'tippingPoint',        terrainLayouts: [1,2,4,6,7,8] },
  { id: 'C', primaryId: 'linchpin',     deploymentId: 'tippingPoint',        terrainLayouts: [1,2,4,6,7,8] },
  { id: 'D', primaryId: 'scorchedEarth',deploymentId: 'tippingPoint',        terrainLayouts: [1,2,4,6,7,8] },
  { id: 'E', primaryId: 'takeAndHold',  deploymentId: 'hammerAndAnvil',      terrainLayouts: [1,7,8] },
  { id: 'F', primaryId: 'hiddenSupplies',deploymentId: 'hammerAndAnvil',     terrainLayouts: [1,7,8] },
  { id: 'G', primaryId: 'purgeTheFoe',  deploymentId: 'hammerAndAnvil',      terrainLayouts: [1,7,8] },
  { id: 'H', primaryId: 'supplyDrop',   deploymentId: 'hammerAndAnvil',      terrainLayouts: [1,7,8] },
  { id: 'I', primaryId: 'hiddenSupplies',deploymentId: 'searchAndDestroy',   terrainLayouts: [1,2,3,4,6] },
  { id: 'J', primaryId: 'linchpin',     deploymentId: 'searchAndDestroy',    terrainLayouts: [1,2,3,4,6] },
  { id: 'K', primaryId: 'scorchedEarth',deploymentId: 'searchAndDestroy',    terrainLayouts: [1,2,3,4,6] },
  { id: 'L', primaryId: 'takeAndHold',  deploymentId: 'searchAndDestroy',    terrainLayouts: [1,2,3,4,6] },
  { id: 'M', primaryId: 'purgeTheFoe',  deploymentId: 'crucibleOfBattle',    terrainLayouts: [1,2,4,6,8] },
  { id: 'N', primaryId: 'hiddenSupplies',deploymentId: 'crucibleOfBattle',   terrainLayouts: [1,2,4,6,8] },
  { id: 'O', primaryId: 'terraform',    deploymentId: 'crucibleOfBattle',    terrainLayouts: [1,2,4,6,8] },
  { id: 'P', primaryId: 'scorchedEarth',deploymentId: 'crucibleOfBattle',    terrainLayouts: [1,2,4,6,8] },
  { id: 'Q', primaryId: 'supplyDrop',   deploymentId: 'sweepingEngagement',  terrainLayouts: [3,5] },
  { id: 'R', primaryId: 'terraform',    deploymentId: 'sweepingEngagement',  terrainLayouts: [3,5] },
  { id: 'S', primaryId: 'linchpin',     deploymentId: 'dawnOfWar',           terrainLayouts: [5] },
  { id: 'T', primaryId: 'purgeTheFoe',  deploymentId: 'dawnOfWar',           terrainLayouts: [5] },
]

// ── VP Caps ───────────────────────────────────────────────────────────────────

export const VP_CAPS = {
  primary: 50,
  secondary: 40,
  secondaryFixedPerCard: 20,
  battleReady: 10,
  total: 100,
}

// ── Helper: roll a random mission ────────────────────────────────────────────

export function rollMission() {
  return MISSION_POOL[Math.floor(Math.random() * MISSION_POOL.length)]
}

// ── Helper: get a shuffled secondary deck ────────────────────────────────────

export function shuffleSecondaries(excludeIds = []) {
  const pool = SECONDARY_MISSIONS.filter(s => !excludeIds.includes(s.id))
  return [...pool].sort(() => Math.random() - 0.5)
}

export function drawSecondaries(count = 2, excludeIds = []) {
  return shuffleSecondaries(excludeIds).slice(0, count)
}
