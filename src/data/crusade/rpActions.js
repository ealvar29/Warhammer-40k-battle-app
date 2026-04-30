export const rpActions = [
  {
    id: 'rearm-and-resupply',
    name: 'Rearm and Resupply',
    cost: 1,
    description:
      'Use before the battle. One unit in your Crusade force can change its loadout — swap any or all of its weapons or wargear for other legal options from its datasheet — for this battle only.',
    category: 'Unit',
  },
  {
    id: 'repair-and-recuperate',
    name: 'Repair and Recuperate',
    cost: 1,
    description:
      'Use after the battle. Remove one Battle Scar from one unit in your Crusade force. That unit cannot gain any new Battle Honours until the start of your next battle.',
    category: 'Recovery',
  },
  {
    id: 'call-in-favours',
    name: 'Call in Favours',
    cost: 1,
    description:
      'Use before the battle. Add 3 additional Requisition Points to your pool for this battle only; these bonus RP cannot be saved and are lost if unspent.',
    category: 'Roster',
  },
  {
    id: 'veteran-cadre',
    name: 'Veteran Cadre',
    cost: 2,
    description:
      'Use after the battle. Select one unit in your Crusade force that has not yet earned any Battle Honours; that unit immediately gains 1 Battle Honour of your choice from the appropriate table.',
    category: 'Unit',
  },
  {
    id: 'fresh-recruits',
    name: 'Fresh Recruits',
    cost: 1,
    description:
      'Use after the battle. Return one unit that went Out of Action to your Crusade roster at its starting strength, removing any Out of Action markers; the unit retains all existing Battle Honours and Scars.',
    category: 'Recovery',
  },
  {
    id: 'crusade-boon',
    name: 'Crusade Boon',
    cost: 2,
    description:
      'Use after the battle. One unit in your Crusade force that has at least 5 XP immediately gains a Battle Trait or Psychic Fortitude (as appropriate) chosen from its faction-specific or generic table.',
    category: 'Unit',
  },
  {
    id: 'out-of-action-surgery',
    name: 'Out of Action Surgery',
    cost: 1,
    description:
      'Use immediately after an Out of Action test. Re-roll the result of that Out of Action test; the second result must be kept.',
    category: 'Recovery',
  },
  {
    id: 'field-promotion',
    name: 'Field Promotion',
    cost: 1,
    description:
      'Use after the battle. One non-CHARACTER unit in your Crusade force that has at least 6 XP is permanently upgraded to gain the CHARACTER keyword and may be nominated as a Warlord in future battles.',
    category: 'Unit',
  },
];
