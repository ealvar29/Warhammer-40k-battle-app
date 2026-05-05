// Step-by-step player guidance per phase
export const PHASE_STEPS = {
  command: [
    {
      label: 'Gain Command Points',
      detail: 'You automatically gain 1 CP. Some characters grant additional CP — check the Active Abilities panel for any bonus CP from your units this phase.',
    },
    {
      label: 'Use Command Abilities',
      detail: 'Activate any Command Phase abilities your units have. These trigger now — before the rest of your turn begins.',
    },
    {
      label: 'Pick your Detachment Action',
      detail: 'Many detachments have a Command Phase action (such as choosing an adaptation or designating a target). Do it now before moving to Movement.',
    },
    {
      label: 'Spend CP on Stratagems',
      detail: 'Use any Command Phase stratagems now. Check the Stratagems tab for what\'s available. Unused CP carries over — don\'t spend carelessly.',
    },
  ],
  movement: [
    {
      label: 'Move your units',
      detail: 'Move each unit up to its M (Movement) characteristic in inches. You can always move less — but never more unless Advancing. Units that don\'t move can shoot Heavy weapons without penalty.',
    },
    {
      label: 'Advance (optional)',
      detail: 'Declare an Advance before moving. Roll D6 and add it to the unit\'s move distance. Units that Advance cannot shoot (except Pistols) or charge this turn.',
    },
    {
      label: 'Fall Back (optional)',
      detail: 'Units locked in Engagement Range can Fall Back to escape combat — move them as normal but they cannot shoot or charge afterward this turn.',
    },
    {
      label: 'Reinforcements arrive',
      detail: 'Units held in Strategic Reserves may arrive now. Deploy them anywhere on the battlefield edge, or more than 9" from all enemies if using Deep Strike.',
    },
  ],
  shooting: [
    {
      label: 'Select a unit to shoot with',
      detail: 'Pick a unit that has not Fallen Back or Advanced this turn (unless a special rule allows it). Units in Engagement Range cannot shoot — except Pistols.',
    },
    {
      label: 'Declare all targets before rolling',
      detail: 'Each weapon in the unit must have line of sight to its target and be within range. Declare every target before rolling any dice. Heavy weapons suffer -1 to hit if the unit moved this turn.',
    },
    {
      label: 'Roll to Hit',
      detail: 'Roll a number of dice equal to the weapon\'s Attacks (A). Roll equal to or higher than the weapon\'s Ballistic Skill (BS) to score a hit. A natural 6 is always a Critical Hit — some weapons trigger bonus effects on a Critical Hit.',
    },
    {
      label: 'Roll to Wound',
      detail: 'For each hit, compare weapon Strength (S) to target Toughness (T):\n  S ≥ 2×T → 2+   |   S > T → 3+   |   S = T → 4+\n  S < T → 5+   |   S ≤ ½T → 6+\nA natural 6 is a Critical Wound.',
    },
    {
      label: 'Opponent rolls Saves',
      detail: 'For each wound, the opponent rolls their Save (Sv). Subtract the weapon\'s AP from the dice roll needed (e.g. AP -1 means a 3+ save becomes a 4+). They may instead use their Invulnerable Save (INV) — this is never modified by AP.',
    },
    {
      label: 'Apply Damage',
      detail: 'Each failed save deals D (Damage) wounds to the target. When total wounds reach or exceed the model\'s W characteristic, it is destroyed and removed. Excess damage is lost unless a rule says otherwise.',
    },
  ],
  charge: [
    {
      label: 'Declare a Charge',
      detail: 'Pick a unit that has not Fallen Back or Advanced. Select one or more enemy targets — all must be within 12". If charging multiple units, declare all charges before rolling any dice.',
    },
    {
      label: 'Roll Charge Distance (2D6)',
      detail: 'Roll 2D6. The charging unit must end its move within 1" of every target it declared a charge against, and not within 1" of any other enemy unit (unless also charging them). If impossible, the charge fails and the unit stays put.',
    },
    {
      label: 'Heroic Interventions',
      detail: 'After all charges are resolved, enemy CHARACTER units within 3" of a charging unit may Heroic Intervene — moving up to 3" toward the nearest charging model to enter Engagement Range.',
    },
  ],
  fight: [
    {
      label: 'Charging units fight first',
      detail: 'Units that completed a charge this turn fight before everyone else. Within this group, you choose the order. Then non-charging units on both sides alternate.',
    },
    {
      label: 'Pile In before attacking',
      detail: 'Before attacking, move each model in the fighting unit up to 3". Every model must end closer to the nearest enemy model. Use this to bring more models into Engagement Range (within 1" of an enemy).',
    },
    {
      label: 'Select weapons and fight',
      detail: 'Choose which melee weapons to fight with. Roll to hit using WS (Weapon Skill), then roll to wound using the same S vs T table as shooting, then the opponent rolls their saves. Apply damage.',
    },
    {
      label: 'Alternate — opponent fights back',
      detail: 'After you fight with a unit, your opponent fights with one of their eligible units (in Engagement Range). Keep alternating until all eligible units on both sides have fought.',
    },
    {
      label: 'Units stay locked in combat',
      detail: 'At the end of the Fight phase, all units still in Engagement Range remain locked — they cannot Fall Back until their next Movement phase.',
    },
  ],
}

// Rules explainers shown in the collapsible "How does this phase work?" section
// Items are either a plain string or { text, keywords[] } for keyword chip callouts
export const PHASE_RULES_PRIMER = {
  command: [
    'You gain 1 CP at the start of your Command Phase — this happens automatically every turn.',
    'CP (Command Points) are spent to activate Stratagems — powerful one-time effects that can swing a phase.',
    'Stratagems with "Your Command Phase" timing must be used before you move to Movement Phase.',
    'Some characters grant bonus CP (e.g. Bjorn the Fell-Handed grants +1 CP per Command Phase he is on the table).',
  ],
  movement: [
    'Every unit moves up to its M value in inches — you choose how far, but never over the limit (without Advancing).',
    'Advancing adds D6" to movement but prevents shooting Regular or Heavy weapons and prevents charging.',
    'Falling Back escapes combat but the unit cannot shoot or charge afterward this turn.',
    { text: 'Units with the Scouts ability make a free move before the first battle round — this is resolved during pre-battle, not here.', keywords: ['SCOUTS'] },
    'Transports carry embarked units — the embarked units move for free with the transport and do not count as having moved.',
  ],
  shooting: [
    { text: 'Critical Hit (natural 6 to hit): triggers bonus effects. Lethal Hits = automatic wound (skip wound roll). Sustained Hits = extra hits added.', keywords: ['LETHAL HITS', 'SUSTAINED HITS'] },
    { text: 'Critical Wound (natural 6 to wound): triggers Devastating Wounds — instead of a normal save, each wound becomes a mortal wound.', keywords: ['DEVASTATING WOUNDS'] },
    { text: 'Feel No Pain (e.g. 5+): AFTER a failed save, roll — on the stated value or higher the wound is ignored entirely.', keywords: ['FEEL NO PAIN'] },
    { text: 'Twin-linked weapons re-roll all wound rolls — extremely effective against high-Toughness targets.', keywords: ['TWIN-LINKED'] },
    'Heavy weapons: -1 to hit if the unit moved this turn. Assault weapons: no penalty even after Advancing.',
    'Torrent weapons auto-hit — no hit roll needed. Great for clearing light infantry regardless of cover.',
  ],
  charge: [
    'You must be within 12" to declare a charge — measure before declaring, not after.',
    'Charge rolls are 2D6. You need to beat the distance to the closest model in the target unit (not the centre of the unit).',
    { text: 'Overwatch (1 CP): when you declare a charge, the target can spend 1 CP to shoot at your charging unit — but only on rolls of 6 to hit.', keywords: ['OVERWATCH'] },
    'A failed charge? The unit stays exactly where it was — no partial movement.',
    'You can declare charges against multiple targets as long as all are within 12". You must reach at least one of them.',
  ],
  fight: [
    'Engagement Range is 1" horizontally and 5" vertically. Models must be within this range to be eligible to fight.',
    { text: 'Feel No Pain still applies to wounds from melee attacks — same roll, same timing as in the Shooting phase.', keywords: ['FEEL NO PAIN'] },
    { text: 'Fights First abilities let a unit fight before the normal order — even before charging units. Fights Last forces a unit to the very end.', keywords: ['FIGHTS FIRST', 'FIGHTS LAST'] },
    'Pile In: models move up to 3" before attacking. Every model must end closer to the nearest enemy — use this to maximise models in range.',
    'After both sides have fought once, the phase ends — units do not fight twice in one Fight phase unless a rule specifically says so.',
  ],
}
