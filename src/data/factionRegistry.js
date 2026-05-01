import { swUnitList } from './spacewolves/units'
import { smGenericUnitList } from './spacewolves/generics'
import { swDetachments } from './spacewolves/detachments'
import { smGenericDetachmentList } from './spacewolves/genericDetachments'
import { tyranidUnitList } from './tyranids/units'
import { tyranidDetachments } from './tyranids/detachments'
import { csmUnitList } from './chaosspacemarines/units'
import { csmDetachments } from './chaosspacemarines/detachments'
import { daUnitList } from './darkangels/units'
import { daDetachments } from './darkangels/detachments'
import { admechUnitList } from './admech/units'
import { admechDetachments } from './admech/detachments'
import { smUnitList } from './spacemarines/units'
import { smDetachments } from './spacemarines/detachments'
import { dgUnitList } from './deathguard/units'
import { dgDetachments } from './deathguard/detachments'
import { ecUnitList } from './emperorschildren/units'
import { ecDetachments } from './emperorschildren/detachments'
import { tauUnitList } from './tau/units'
import { tauDetachments } from './tau/detachments'
import { thousandSonsUnitList } from './thousandsons/units'
import { thousandSonsDetachments } from './thousandsons/detachments'
import { worldEatersUnitList } from './worldeaters/units'
import { worldEatersDetachments } from './worldeaters/detachments'
import { aeldariUnitList } from './aeldari/units'
import { aeldariDetachments } from './aeldari/detachments'
import { necronsUnitList } from './necrons/units'
import { necronsDetachments } from './necrons/detachments'
import { orksUnitList } from './orks/units'
import { orksDetachments } from './orks/detachments'
import { astraMilitarumUnitList } from './astramilitarum/units'
import { astraMilitarumDetachments } from './astramilitarum/detachments'
import { bloodAngelsUnitList } from './bloodangels/units'
import { bloodAngelsDetachments } from './bloodangels/detachments'
import { blackTemplarsUnitList } from './blacktemplars/units'
import { blackTemplarsDetachments } from './blacktemplars/detachments'
import { adeptaSororitasUnitList } from './adeptasororitas/units'
import { adeptaSororitasDetachments } from './adeptasororitas/detachments'
import { greyKnightsUnitList } from './greyknights/units'
import { greyKnightsDetachments } from './greyknights/detachments'
import { adeptusCustodesUnitList } from './adeptuscustodes/units'
import { adeptusCustodesDetachments } from './adeptuscustodes/detachments'
import { drukhariUnitList } from './drukhari/units'
import { drukhariDetachments } from './drukhari/detachments'
import { genestealerCultsUnitList } from './genestealercults/units'
import { genestealerCultsDetachments } from './genestealercults/detachments'
import { leaguesOfVotannUnitList } from './leaguesofvotann/units'
import { leaguesOfVotannDetachments } from './leaguesofvotann/detachments'
import { chaosDaemonsUnitList } from './chaosdaemons/units'
import { chaosDaemonsDetachments } from './chaosdaemons/detachments'
import { deathwatchUnitList } from './deathwatch/units'
import { deathwatchDetachments } from './deathwatch/detachments'
import { imperialKnightsUnitList } from './imperialknights/units'
import { imperialKnightsDetachments } from './imperialknights/detachments'
import { chaosKnightsUnitList } from './chaosknights/units'
import { chaosKnightsDetachments } from './chaosknights/detachments'

export const FACTION_UNITS = {
  spacewolves: [...swUnitList, ...smGenericUnitList],
  tyranids: tyranidUnitList,
  chaosspacemarines: csmUnitList,
  darkangels: daUnitList,
  admech: admechUnitList,
  spacemarines: smUnitList,
  deathguard: dgUnitList,
  emperorschildren: ecUnitList,
  tau: tauUnitList,
  thousandsons: thousandSonsUnitList,
  worldeaters: worldEatersUnitList,
  aeldari: aeldariUnitList,
  necrons: necronsUnitList,
  orks: orksUnitList,
  astramilitarum: astraMilitarumUnitList,
  bloodangels: bloodAngelsUnitList,
  blacktemplars: blackTemplarsUnitList,
  adeptasororitas: adeptaSororitasUnitList,
  greyknights: greyKnightsUnitList,
  adeptuscustodes: adeptusCustodesUnitList,
  drukhari: drukhariUnitList,
  genestealercults: genestealerCultsUnitList,
  leaguesofvotann: leaguesOfVotannUnitList,
  chaosdaemons: chaosDaemonsUnitList,
  deathwatch: deathwatchUnitList,
  imperialknights: imperialKnightsUnitList,
  chaosknights: chaosKnightsUnitList,
}

// Detachment maps keyed by detachment id — used by findDetachment and army builder
export const FACTION_DETACHMENTS = {
  spacewolves: swDetachments,
  tyranids: tyranidDetachments,
  chaosspacemarines: csmDetachments,
  darkangels: daDetachments,
  admech: admechDetachments,
  spacemarines: smDetachments,
  deathguard: dgDetachments,
  emperorschildren: ecDetachments,
  tau: tauDetachments,
  thousandsons: thousandSonsDetachments,
  worldeaters: worldEatersDetachments,
  aeldari: aeldariDetachments,
  necrons: necronsDetachments,
  orks: orksDetachments,
  astramilitarum: astraMilitarumDetachments,
  bloodangels: bloodAngelsDetachments,
  blacktemplars: blackTemplarsDetachments,
  adeptasororitas: adeptaSororitasDetachments,
  greyknights: greyKnightsDetachments,
  adeptuscustodes: adeptusCustodesDetachments,
  drukhari: drukhariDetachments,
  genestealercults: genestealerCultsDetachments,
  leaguesofvotann: leaguesOfVotannDetachments,
  chaosdaemons: chaosDaemonsDetachments,
  deathwatch: deathwatchDetachments,
  imperialknights: imperialKnightsDetachments,
  chaosknights: chaosKnightsDetachments,
}

export const FACTION_META = {
  spacewolves: { name: 'Space Wolves', icon: '🐺', color: '#c8d4e0' },
  tyranids: { name: 'Tyranids', icon: '🦂', color: '#a855f7' },
  chaosspacemarines: { name: 'Chaos Space Marines', icon: '💀', color: '#b91c1c' },
  darkangels: { name: 'Dark Angels', icon: '⚔️', color: '#22c55e' },
  admech: { name: 'Adeptus Mechanicus', icon: '⚙️', color: '#d97706' },
  spacemarines: { name: 'Space Marines', icon: '🛡️', color: '#3b82f6' },
  deathguard: { name: 'Death Guard', icon: '☣️', color: '#4a7c3f' },
  emperorschildren: { name: "Emperor's Children", icon: '💜', color: '#9333ea' },
  tau: { name: "T'au Empire", icon: '🔵', color: '#00b4d8' },
  thousandsons: { name: 'Thousand Sons', icon: '🔮', color: '#3b82f6' },
  worldeaters: { name: 'World Eaters', icon: '🩸', color: '#dc2626' },
  aeldari: { name: 'Aeldari', icon: '🌙', color: '#8b5cf6' },
  necrons: { name: 'Necrons', icon: '💚', color: '#10b981' },
  orks: { name: 'Orks', icon: '💪', color: '#65a30d' },
  astramilitarum: { name: 'Astra Militarum', icon: '🎖️', color: '#78716c' },
  bloodangels: { name: 'Blood Angels', icon: '🩸', color: '#dc2626' },
  blacktemplars: { name: 'Black Templars', icon: '✝️', color: '#1c1917' },
  adeptasororitas: { name: 'Adepta Sororitas', icon: '⚜️', color: '#e11d48' },
  greyknights: { name: 'Grey Knights', icon: '🔱', color: '#94a3b8' },
  adeptuscustodes: { name: 'Adeptus Custodes', icon: '👑', color: '#ca8a04' },
  drukhari: { name: 'Drukhari', icon: '🗡️', color: '#7c3aed' },
  genestealercults: { name: 'Genestealer Cults', icon: '🧬', color: '#be185d' },
  leaguesofvotann: { name: 'Leagues of Votann', icon: '⚒️', color: '#92400e' },
  chaosdaemons: { name: 'Chaos Daemons', icon: '😈', color: '#9f1239' },
  deathwatch: { name: 'Deathwatch', icon: '🎯', color: '#1e293b' },
  imperialknights: { name: 'Imperial Knights', icon: '🏰', color: '#b45309' },
  chaosknights: { name: 'Chaos Knights', icon: '🔥', color: '#7f1d1d' },
}

export function buildUnitsFromIds(faction, unitIds) {
  const allUnits = FACTION_UNITS[faction] || []
  return unitIds
    .map(id => allUnits.find(u => u.id === id))
    .filter(Boolean)
    .map(u => ({
      ...u,
      type: u.type || u.category,
      maxWounds: u.maxWounds ?? (u.models > 1 ? u.W * u.models : u.W),
      unitKey: u.unitKey || u.id,
    }))
}

// Returns a leader unit's abilities straight from units.js — single source of truth.
// Replaces the leaderAbilities map in leaderData.js which was a manual duplicate prone to drift.
export function getLeaderAbilities(leaderId) {
  for (const unitList of Object.values(FACTION_UNITS)) {
    const unit = unitList.find(u => u.id === leaderId)
    if (unit) return unit.abilities || []
  }
  return []
}

export function findDetachment(faction, detachmentId) {
  if (faction === 'spacewolves') {
    return swDetachments[detachmentId]
      || smGenericDetachmentList.find(d => d.id === detachmentId)
      || null
  }
  const map = FACTION_DETACHMENTS[faction]
  return map ? (map[detachmentId] || null) : null
}
