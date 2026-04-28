// Parses army list text in the New Recruit / BattleScribe export format
// into a structure compatible with the battle store and unit registry.

import { FACTION_UNITS, FACTION_META } from '../data/factionRegistry'
import { swDetachments } from '../data/spacewolves/detachments'
import { smGenericDetachmentList } from '../data/spacewolves/genericDetachments'
import { tyranidDetachments } from '../data/tyranids/detachments'
import { csmDetachments } from '../data/chaosspacemarines/detachments'
import { daDetachments } from '../data/darkangels/detachments'

// ── Name normalisation ────────────────────────────────────────────────────────

function normName(s) {
  return s
    .toLowerCase()
    .replace(/with\s+[\w\s,]+$/i, '')   // strip "with X" load-out suffix
    .replace(/\s*\(.*?\)\s*/g, '')       // strip parentheticals
    .replace(/[-'']/g, ' ')              // hyphens / apostrophes → space
    .replace(/\bthe\b/g, '')             // remove leading "the"
    .replace(/\s+/g, ' ')
    .trim()
}

// Simple word-overlap score [0..1]
function wordOverlap(a, b) {
  const wa = new Set(a.split(' ').filter(Boolean))
  const wb = new Set(b.split(' ').filter(Boolean))
  const hits = [...wa].filter(w => wb.has(w)).length
  return hits / Math.max(wa.size, wb.size)
}

// ── Faction detection ─────────────────────────────────────────────────────────

const FACTION_SIGNALS = [
  { keys: ['tyranid', 'xenos - tyranid'],                                faction: 'tyranids' },
  { keys: ['space wolf', 'space wolves'],                                 faction: 'spacewolves' },
  { keys: ['heretic astartes', 'chaos space marine'],                     faction: 'chaosspacemarines' },
  { keys: ['dark angels', 'adeptus astartes - dark angels', 'darkangel'], faction: 'darkangels' },
]

export function detectFaction(headerText) {
  const lower = headerText.toLowerCase()
  for (const { keys, faction } of FACTION_SIGNALS) {
    if (keys.some(k => lower.includes(k))) return faction
  }
  return null
}

// ── Detachment matching ───────────────────────────────────────────────────────

function getAllDetachments(faction) {
  if (faction === 'spacewolves')
    return [...Object.values(swDetachments), ...smGenericDetachmentList]
  if (faction === 'tyranids')
    return Object.values(tyranidDetachments)
  if (faction === 'chaosspacemarines')
    return Object.values(csmDetachments)
  if (faction === 'darkangels')
    return Object.values(daDetachments)
  return []
}

function findDetachmentByName(faction, rawName) {
  if (!rawName || !faction) return null
  const norm = normName(rawName)
  const all = getAllDetachments(faction)
  // exact or contains match
  return all.find(d => {
    const dn = normName(d.name)
    return dn === norm || norm.includes(dn) || dn.includes(norm)
  }) || null
}

// ── Unit name → registry match ────────────────────────────────────────────────

export function matchUnitByName(rawName, factionKey) {
  const units = FACTION_UNITS[factionKey] || []
  const norm = normName(rawName)

  let best = null
  let bestScore = 0

  for (const unit of units) {
    const un = normName(unit.name)

    if (un === norm) return { unit, confidence: 'exact' }

    // prefix / contains
    const containsScore = (norm.startsWith(un) || un.startsWith(norm))
      ? Math.min(norm.length, un.length) / Math.max(norm.length, un.length)
      : 0

    const overlapScore = wordOverlap(norm, un)
    const score = Math.max(containsScore, overlapScore)

    if (score > bestScore) { bestScore = score; best = unit }
  }

  if (!best || bestScore < 0.4) return null
  return { unit: best, confidence: bestScore >= 0.8 ? 'high' : 'partial' }
}

// ── Text parser ───────────────────────────────────────────────────────────────

function parseUnitLine(line) {
  // Strip optional "Char#:" prefix
  const stripped = line.replace(/^Char\d+:\s*/i, '')
  // Match: Nx Unit Name (N pts)[: rest]
  const m = stripped.match(/^(\d+)x\s+(.+?)\s+\((\d+)\s+pts\)/i)
  if (!m) return null
  return {
    count: parseInt(m[1], 10),
    name: m[2].trim(),
    points: parseInt(m[3], 10),
  }
}

export function parseImportedList(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

  // Split header vs unit body on the +++ delimiters
  const headerLines = []
  const bodyLines = []
  let inHeader = false
  let pastHeader = false

  for (const line of lines) {
    if (line.startsWith('+++')) {
      if (!inHeader && !pastHeader) { inHeader = true; continue }
      if (inHeader) { inHeader = false; pastHeader = true; continue }
    }
    if (inHeader) headerLines.push(line)
    else if (pastHeader && !line.startsWith('•')) bodyLines.push(line)
    // bullet sub-unit lines (•) are skipped — parent line carries the data
  }

  const headerText = headerLines.join('\n')
  const faction = detectFaction(headerText)

  const detachmentMatch = headerText.match(/DETACHMENT:\s*(.+)/i)
  const detachmentRaw = detachmentMatch ? detachmentMatch[1].trim() : null
  const detachment = findDetachmentByName(faction, detachmentRaw)

  const pointsMatch = headerText.match(/TOTAL ARMY POINTS:\s*(\d+)/i)
  const totalPoints = pointsMatch ? parseInt(pointsMatch[1], 10) : 0

  // Parse each unit line
  const parsedUnits = bodyLines
    .map(line => parseUnitLine(line))
    .filter(Boolean)

  return { faction, detachmentRaw, detachment, totalPoints, parsedUnits }
}

// ── Build resolved unit list ───────────────────────────────────────────────────

// Returns the array of unit objects ready for the battle store, plus a
// matchReport array for display in the import preview UI.
export function resolveImportedUnits(parsedUnits, factionKey) {
  return parsedUnits.map(parsed => {
    const match = matchUnitByName(parsed.name, factionKey)
    const u = match?.unit

    if (u) {
      const totalW = u.models > 1 ? u.W * u.models : u.W
      return {
        resolved: {
          ...u,
          type: u.type || u.category,
          maxWounds: u.maxWounds ?? totalW,
          currentWounds: u.maxWounds ?? totalW,
          unitKey: u.unitKey || u.id,
          importedPoints: parsed.points,
          importedCount: parsed.count,
        },
        parsedName: parsed.name,
        points: parsed.points,
        confidence: match.confidence, // 'exact' | 'high' | 'partial'
      }
    }

    // Stub for units not in our registry
    const stubId = `stub_${parsed.name.toLowerCase().replace(/\W+/g, '_')}`
    return {
      resolved: {
        id: stubId,
        name: parsed.name,
        category: 'infantry',
        type: 'infantry',
        isLeader: false,
        M: '?', T: 4, Sv: '3+', W: parsed.count > 1 ? 1 : 3, OC: 1,
        models: parsed.count,
        maxWounds: parsed.count > 1 ? parsed.count : 3,
        currentWounds: parsed.count > 1 ? parsed.count : 3,
        points: parsed.points,
        keywords: [],
        abilities: [],
        weapons: [],
        unitKey: stubId,
        importedPoints: parsed.points,
        importedCount: parsed.count,
        isStub: true,
      },
      parsedName: parsed.name,
      points: parsed.points,
      confidence: 'none',
    }
  })
}
