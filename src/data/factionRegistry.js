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
  spacewolves:      { name: 'Space Wolves',        icon: '🐺', color: '#c8d4e0',
    artUrl: 'https://assets.warhammer-community.com/40k_swfaction-image1_wide-vm6wntdxde.jpg',
    gradient: 'linear-gradient(160deg,#0c1628 0%,#1a3a5c 55%,#3d6080 100%)' },
  tyranids:         { name: 'Tyranids',            icon: '🦂', color: '#a855f7',
    artUrl: 'https://assets.warhammer-community.com/warhammerart17-jan23-pic2-fbd908kx6y.jpg',
    gradient: 'linear-gradient(160deg,#0a0015 0%,#3b0d6b 55%,#4a7c10 100%)' },
  chaosspacemarines:{ name: 'Chaos Space Marines', icon: '💀', color: '#b91c1c',
    artUrl: 'https://assets.warhammer-community.com/art3_csm-oct17-pic1-syq2nmveg8.jpg',
    gradient: 'linear-gradient(160deg,#180404 0%,#5c1515 55%,#b91c1c 100%)' },
  darkangels:       { name: 'Dark Angels',         icon: '⚔️', color: '#22c55e',
    artUrl: 'https://assets.warhammer-community.com/articles/3b37ae8f-f556-41ec-8c96-c7d10e71d258/4oengsvkxkcw2yqn.jpg',
    gradient: 'linear-gradient(160deg,#050f05 0%,#0d2a0d 55%,#166534 100%)' },
  admech:           { name: 'Adeptus Mechanicus',  icon: '⚙️', color: '#d97706',
    artUrl: 'https://assets.warhammer-community.com/art10_admech-dec05-pic5-tdhi4rh6re.jpg',
    gradient: 'linear-gradient(160deg,#1a1005 0%,#4a2a05 55%,#b45309 100%)' },
  spacemarines:     { name: 'Space Marines',       icon: '🛡️', color: '#3b82f6',
    artUrl: 'https://assets.warhammer-community.com/articles/95a64685-4812-4a19-bab3-a9dcbbca1ce0/5jm5kklgkuynukda.jpg',
    gradient: 'linear-gradient(160deg,#060c1f 0%,#0f2456 55%,#1d4ed8 100%)' },
  deathguard:       { name: 'Death Guard',         icon: '☣️', color: '#4a7c3f',
    artUrl: 'https://assets.warhammer-community.com/articles/31117745-c57e-4186-8457-268a7d102aea/pa2j7w9ke3agn3tw.jpg',
    gradient: 'linear-gradient(160deg,#060d06 0%,#162016 55%,#3a6030 100%)' },
  emperorschildren: { name: "Emperor's Children",  icon: '💜', color: '#9333ea',
    artUrl: 'https://assets.warhammer-community.com/art15_empschildren-jan09-art7-s0efyfsdt4.jpg',
    gradient: 'linear-gradient(160deg,#0a0515 0%,#2a0d40 55%,#7e22ce 100%)' },
  tau:              { name: "T'au Empire",         icon: '🔵', color: '#00b4d8',
    artUrl: 'https://assets.warhammer-community.com/art8_tau-nov21-pic15-mar7umkupy.jpg',
    gradient: 'linear-gradient(160deg,#050a10 0%,#0a2030 55%,#0369a1 100%)' },
  thousandsons:     { name: 'Thousand Sons',       icon: '🔮', color: '#3b82f6',
    artUrl: 'https://assets.warhammer-community.com/40k_tsfaction-masthead-qtp7x9d05j.jpg',
    gradient: 'linear-gradient(160deg,#050a1a 0%,#0f1f4d 55%,#1e40af 100%)' },
  worldeaters:      { name: 'World Eaters',        icon: '🩸', color: '#dc2626',
    artUrl: 'https://assets.warhammer-community.com/art12_worldeaters-dec19-7-dg12wed0fr.jpg',
    gradient: 'linear-gradient(160deg,#180404 0%,#500000 55%,#b91c1c 100%)' },
  aeldari:          { name: 'Aeldari',             icon: '🌙', color: '#8b5cf6',
    artUrl: 'https://assets.warhammer-community.com/art2_aeldari-oct10-pic11-uvlkkudneq.jpg',
    gradient: 'linear-gradient(160deg,#060010 0%,#1e0a45 55%,#6d28d9 100%)' },
  necrons:          { name: 'Necrons',             icon: '💚', color: '#10b981',
    artUrl: 'https://assets.warhammer-community.com/art111_necrons-dec12-pic7-ieguj0twon.jpg',
    gradient: 'linear-gradient(160deg,#020a02 0%,#052005 55%,#047857 100%)' },
  orks:             { name: 'Orks',                icon: '💪', color: '#65a30d',
    artUrl: 'https://assets.warhammer-community.com/articles/1a80823b-b3b8-4172-a9c0-41b77462cb43/6zdsaf8m64vm1v7k.jpg',
    gradient: 'linear-gradient(160deg,#051005 0%,#1a3805 55%,#4d7c0f 100%)' },
  astramilitarum:   { name: 'Astra Militarum',     icon: '🎖️', color: '#78716c',
    artUrl: 'https://assets.warhammer-community.com/art4_am-oct24-pic6-yxo8lkkah2.jpg',
    gradient: 'linear-gradient(160deg,#150e05 0%,#352205 55%,#57534e 100%)' },
  bloodangels:      { name: 'Blood Angels',        icon: '🩸', color: '#dc2626',
    artUrl: 'https://assets.warhammer-community.com/articles/42aa6779-53ca-476b-b242-bfb445aa2bc2/dj9hczojqjuukwse.jpg',
    gradient: 'linear-gradient(160deg,#180404 0%,#5c0000 55%,#9b1c1c 100%)' },
  blacktemplars:    { name: 'Black Templars',      icon: '✝️', color: '#a8a29e',
    artUrl: 'https://assets.warhammer-community.com/articles/d5f0852d-6ae4-49c6-a998-b64a7cf25fe4/plyzr5opgzjhddqe.jpg',
    gradient: 'linear-gradient(160deg,#080808 0%,#1c1c1c 55%,#3f3f46 100%)' },
  adeptasororitas:  { name: 'Adepta Sororitas',    icon: '⚜️', color: '#e11d48',
    artUrl: 'https://assets.warhammer-community.com/art7_adeptasororitas-nov14-2-z8ibgdg5wv.jpg',
    gradient: 'linear-gradient(160deg,#1a0510 0%,#4d1020 55%,#be123c 100%)' },
  greyknights:      { name: 'Grey Knights',        icon: '🔱', color: '#94a3b8',
    artUrl: 'https://assets.warhammer-community.com/articles/287c340d-3e87-4d16-8600-bd3e151d5b27/wxr3vouidfwwuhur.jpg',
    gradient: 'linear-gradient(160deg,#050810 0%,#152035 55%,#475569 100%)' },
  adeptuscustodes:  { name: 'Adeptus Custodes',    icon: '👑', color: '#ca8a04',
    artUrl: 'https://assets.warhammer-community.com/articles/4cbf7056-d283-4539-9a9c-24122af9ff67/wnid7vsaqdxw0shl.jpg',
    gradient: 'linear-gradient(160deg,#1a0f00 0%,#4d2f00 55%,#a16207 100%)' },
  drukhari:         { name: 'Drukhari',            icon: '🗡️', color: '#7c3aed',
    artUrl: 'https://assets.warhammer-community.com/art14_drukhari-jan02-art3-zsy8sutstx.jpg',
    gradient: 'linear-gradient(160deg,#050005 0%,#150030 55%,#5b21b6 100%)' },
  genestealercults: { name: 'Genestealer Cults',   icon: '🧬', color: '#be185d',
    artUrl: 'https://assets.warhammer-community.com/whart19_gsc-feb06-pic9-uij8zhbril.jpg',
    gradient: 'linear-gradient(160deg,#0d0510 0%,#2d0d28 55%,#9d174d 100%)' },
  leaguesofvotann:  { name: 'Leagues of Votann',   icon: '⚒️', color: '#92400e',
    artUrl: 'https://assets.warhammer-community.com/whart_21-lov-feb20-pic4-2547rgxiwl.jpg',
    gradient: 'linear-gradient(160deg,#100a05 0%,#2d1c08 55%,#78350f 100%)' },
  chaosdaemons:     { name: 'Chaos Daemons',       icon: '😈', color: '#9f1239',
    artUrl: 'https://assets.warhammer-community.com/articles/07aae003-3e1f-4f0e-8bdc-230156fa1a0e/8ssv3tzfx5pftqwo.jpg',
    gradient: 'linear-gradient(160deg,#10050a 0%,#300d1a 55%,#881337 100%)' },
  deathwatch:       { name: 'Deathwatch',          icon: '🎯', color: '#64748b',
    artUrl: 'https://assets.warhammer-community.com/articles/058f57bd-ed01-42e0-bde6-736e40ad664b/wi7zq26vaoo3od8k.jpg',
    gradient: 'linear-gradient(160deg,#050810 0%,#0a1020 55%,#1e293b 100%)' },
  imperialknights:  { name: 'Imperial Knights',    icon: '🏰', color: '#b45309',
    artUrl: 'https://assets.warhammer-community.com/whart_20-imperialknights-feb13-pic8-m8gkvsg8yz.jpg',
    gradient: 'linear-gradient(160deg,#100a05 0%,#3d2505 55%,#92400e 100%)' },
  chaosknights:     { name: 'Chaos Knights',       icon: '🔥', color: '#ef4444',
    artUrl: 'https://assets.warhammer-community.com/whart18_chaosknights-jan30-pic1-safi4taxuk.jpg',
    gradient: 'linear-gradient(160deg,#100505 0%,#250a0a 55%,#7f1d1d 100%)' },
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
