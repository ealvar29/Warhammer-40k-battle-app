// Opponent profile tags the user can select at battle start
export const opponentProfiles = [
  { id: 'shooting', label: 'Shooting Heavy', icon: '🎯', description: 'Lots of guns, staying back' },
  { id: 'melee', label: 'Melee Heavy', icon: '⚔️', description: 'In your face, fast charges' },
  { id: 'vehicles', label: 'Vehicle Heavy', icon: '🚗', description: 'Tanks, walkers, big guns' },
  { id: 'horde', label: 'Horde', icon: '🐜', description: 'Tons of cheap models' },
  { id: 'elite', label: 'Elite', icon: '💎', description: 'Few models, very powerful' },
  { id: 'psychic', label: 'Psychic / Aura Heavy', icon: '🔮', description: 'Buff/debuff focused' },
]

// Suggestion rules: detachment + opponent profile → stratagem IDs to highlight + reason
export const suggestionRules = [
  {
    detachment: 'sagaOfTheGreatWolf',
    opponentTags: ['shooting'],
    stratId: 'encirclingJaws',
    reason: 'Opponent is shooting-heavy — reroll advance/charge rolls to close the gap fast.',
    priority: 'high',
  },
  {
    detachment: 'sagaOfTheGreatWolf',
    opponentTags: ['shooting'],
    stratId: 'rapidIngress',
    reason: 'Deep strike a unit behind their gunline to force them to split fire.',
    priority: 'medium',
  },
  {
    detachment: 'sagaOfTheGreatWolf',
    opponentTags: ['melee'],
    stratId: 'counterCharge',
    reason: 'Opponent will charge you — be ready to counter-charge with a fresh unit.',
    priority: 'high',
  },
  {
    detachment: 'sagaOfTheGreatWolf',
    opponentTags: ['horde'],
    stratId: 'cullTheHerd',
    reason: 'Re-roll hits against a large horde squad to maximise wounds on the charge.',
    priority: 'high',
  },
  {
    detachment: 'sagaOfTheGreatWolf',
    opponentTags: ['vehicles'],
    stratId: 'ironWolves',
    reason: 'Target the vehicle with an Iron Priest nearby to melta/damage reliably.',
    priority: 'medium',
  },
  {
    detachment: 'sagaOfTheGreatWolf',
    opponentTags: ['elite'],
    stratId: 'cunningStalker',
    reason: 'Move through terrain to get flanking angles on elite targets.',
    priority: 'medium',
  },
]

// Given detachment + opponent tags, return sorted suggestions
export function getSuggestions(detachmentId, opponentTags = []) {
  if (!opponentTags.length) return []
  return suggestionRules
    .filter(r => r.detachment === detachmentId && r.opponentTags.some(t => opponentTags.includes(t)))
    .sort((a, b) => (a.priority === 'high' ? -1 : 1))
}
