// Generate a BattleScribe-compatible plain-text army list.
// This is the community standard format used on Reddit, Discord, and Goonhammer.

import { FACTION_META } from '../data/factionRegistry'

const CATEGORY_ORDER = ['epicHero', 'character', 'battleline', 'infantry', 'cavalry', 'monster', 'vehicle']

const CATEGORY_LABEL = {
  epicHero:   'Legendary Units',
  character:  'Characters',
  battleline: 'Battleline',
  infantry:   'Infantry',
  cavalry:    'Cavalry',
  monster:    'Monsters',
  vehicle:    'Vehicles',
}

// selectedUnits: array of unit objects from battleStore (may have duplicate base IDs for multiple squads)
export function generateArmyListText({ factionId, detachmentName, selectedUnits }) {
  const meta = FACTION_META[factionId] || { name: factionId }
  const detName = detachmentName || 'Custom Detachment'

  // Group units by category, counting multiples
  const byCategory = {}
  const counted = {}

  for (const unit of selectedUnits) {
    const baseId = unit.id
    const cat = unit.category || 'infantry'
    if (!byCategory[cat]) byCategory[cat] = []
    if (!counted[baseId]) {
      counted[baseId] = true
      byCategory[cat].push({
        name:   unit.name,
        points: unit.points || 0,
        models: unit.models || 1,
        minModels: unit.minModels,
        maxModels: unit.maxModels,
        count: 1,
      })
    } else {
      const entry = byCategory[cat].find(e => e.name === unit.name)
      if (entry) entry.count++
    }
  }

  const totalPts = selectedUnits.reduce((sum, u) => sum + (u.points || 0), 0)

  const lines = []
  lines.push(`++ ${detName} (${meta.name}) [${totalPts}pts] ++`)
  lines.push('')

  for (const cat of CATEGORY_ORDER) {
    const units = byCategory[cat]
    if (!units?.length) continue

    lines.push(`+ ${CATEGORY_LABEL[cat] || cat} +`)
    lines.push('')

    for (const u of units) {
      const totalUnitPts = u.points * u.count
      const countPrefix = u.count > 1 ? `${u.count}x ` : ''
      const modelsNote = u.minModels && u.maxModels
        ? `: ${u.minModels}–${u.maxModels} models`
        : u.models > 1 ? `: ${u.models} models` : ''
      lines.push(`${countPrefix}${u.name} [${totalUnitPts}pts]${modelsNote}`)
    }

    lines.push('')
  }

  lines.push(`++ Total: [${totalPts}pts] ++`)
  return lines.join('\n')
}

// Copy text to clipboard, returns a promise that resolves true on success
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers / non-HTTPS contexts
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  }
}
