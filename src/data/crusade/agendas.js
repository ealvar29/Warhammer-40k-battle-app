export const agendas = [
  {
    id: 'assassinate',
    name: 'Assassinate',
    category: 'Destroy',
    description:
      'Score XP for each enemy CHARACTER unit that is destroyed during the battle. A unit earns XP if it destroys one or more enemy CHARACTER models.',
    xpReward: 1,
    unitReward: 'Units that destroyed one or more enemy CHARACTER models',
  },
  {
    id: 'bring-it-down',
    name: 'Bring it Down',
    category: 'Destroy',
    description:
      'Score XP for each enemy MONSTER or VEHICLE unit destroyed during the battle. A unit earns XP if it destroys one or more such models.',
    xpReward: 1,
    unitReward: 'Units that destroyed one or more enemy MONSTER or VEHICLE models',
  },
  {
    id: 'no-prisoners',
    name: 'No Prisoners',
    category: 'Destroy',
    description:
      'Score XP based on the total number of enemy models destroyed. Each unit that destroys any enemy models earns XP at the end of the battle.',
    xpReward: 1,
    unitReward: 'Units that destroyed one or more enemy models',
  },
  {
    id: 'stranglehold',
    name: 'Stranglehold',
    category: 'Hold',
    description:
      'Score XP for units that control one or more objective markers in your opponents deployment zone at the end of your turn for two or more consecutive turns.',
    xpReward: 1,
    unitReward: 'Units controlling an objective in the enemy deployment zone for 2+ consecutive turns',
  },
  {
    id: 'defend-stronghold',
    name: 'Defend Stronghold',
    category: 'Hold',
    description:
      'Score XP for units that control one or more objective markers in your own deployment zone at the end of the battle.',
    xpReward: 1,
    unitReward: 'Units controlling an objective in your deployment zone at battle end',
  },
  {
    id: 'grind-them-down',
    name: 'Grind Them Down',
    category: 'Destroy',
    description:
      'Score XP for each battle round in which your units destroy more enemy units than the enemy destroys of yours.',
    xpReward: 1,
    unitReward: null,
  },
  {
    id: 'engage-on-all-fronts',
    name: 'Engage on All Fronts',
    category: 'Achieve',
    description:
      'Score XP for units that are wholly within different table quarters at the end of each of your turns; the more quarters covered simultaneously, the more XP earned.',
    xpReward: 1,
    unitReward: 'Units wholly within a table quarter not occupied by any other friendly unit',
  },
  {
    id: 'behind-enemy-lines',
    name: 'Behind Enemy Lines',
    category: 'Recon',
    description:
      'Score XP for units that finish a move wholly within your opponents deployment zone at any point during the battle.',
    xpReward: 1,
    unitReward: 'Units that end a move wholly within the enemy deployment zone',
  },
];
