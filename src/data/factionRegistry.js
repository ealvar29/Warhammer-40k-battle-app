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

export const FACTION_UNITS = {
  spacewolves: [...swUnitList, ...smGenericUnitList],
  tyranids: tyranidUnitList,
  chaosspacemarines: csmUnitList,
  darkangels: daUnitList,
  admech: admechUnitList,
  spacemarines: smUnitList,
}

export const FACTION_META = {
  spacewolves: { name: 'Space Wolves', icon: '🐺', color: '#c8d4e0' },
  tyranids: { name: 'Tyranids', icon: '🦂', color: '#a855f7' },
  chaosspacemarines: { name: 'Chaos Space Marines', icon: '💀', color: '#b91c1c' },
  darkangels: { name: 'Dark Angels', icon: '⚔️', color: '#22c55e' },
  admech: { name: 'Adeptus Mechanicus', icon: '⚙️', color: '#d97706' },
  spacemarines: { name: 'Space Marines', icon: '🛡️', color: '#3b82f6' },
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

export function findDetachment(faction, detachmentId) {
  if (faction === 'spacewolves') {
    return swDetachments[detachmentId]
      || smGenericDetachmentList.find(d => d.id === detachmentId)
      || null
  }
  if (faction === 'tyranids') {
    return tyranidDetachments[detachmentId] || null
  }
  if (faction === 'chaosspacemarines') {
    return csmDetachments[detachmentId] || null
  }
  if (faction === 'darkangels') {
    return daDetachments[detachmentId] || null
  }
  if (faction === 'admech') {
    return admechDetachments[detachmentId] || null
  }
  if (faction === 'spacemarines') {
    return smDetachments[detachmentId] || null
  }
  return null
}
