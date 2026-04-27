export function woundThreshold(S, T) {
  if (S >= T * 2) return 2
  if (S > T) return 3
  if (S === T) return 4
  if (S * 2 > T) return 5
  return 6
}

export function avgDice(val) {
  if (typeof val === 'number') return val
  const s = String(val).toUpperCase().trim()
  if (s === 'D6') return 3.5
  if (s === 'D3') return 2
  if (s === '2D6') return 7
  if (s.startsWith('D6+')) return 3.5 + Number(s.slice(3))
  if (s.startsWith('D3+')) return 2 + Number(s.slice(3))
  return Number(s) || 1
}

export function pAtLeast(n) {
  if (n <= 1) return 1
  if (n > 6) return 0
  return (7 - n) / 6
}

export function calcMath({ A, hitOn, S, AP, D, T, Sv, invuln, fnp,
  rerollHitsAll, rerollHits1, rerollWoundsAll, rerollWounds1,
  sustainedHits, lethalHits, devastatingWounds, torrent, twinLinked }) {

  const avgA = avgDice(A)
  const avgD = avgDice(D)
  const pCrit = 1 / 6

  let pHit = torrent ? 1 : pAtLeast(hitOn)
  if (!torrent && rerollHitsAll) pHit = pHit + (1 - pHit) * pHit
  else if (!torrent && rerollHits1) pHit = pHit + pCrit * pAtLeast(hitOn)

  const sustainedExtra = sustainedHits > 0 ? pCrit * sustainedHits : 0
  const expectedHits = avgA * (pHit + sustainedExtra)

  let expectedLethalWounds = 0
  let hitsForWound = avgA * pHit
  if (lethalHits) {
    expectedLethalWounds = avgA * pCrit
    hitsForWound = avgA * Math.max(0, pHit - pCrit)
  }

  const woundOn = woundThreshold(S, T)
  let pWound = pAtLeast(woundOn)
  if (twinLinked || rerollWoundsAll) pWound = pWound + (1 - pWound) * pWound
  else if (rerollWounds1) pWound = pWound + pCrit * pAtLeast(woundOn)

  let expectedDevWounds = 0
  let expectedNormalWounds = hitsForWound * pWound
  if (devastatingWounds) {
    expectedDevWounds = hitsForWound * pCrit
    expectedNormalWounds = hitsForWound * Math.max(0, pWound - pCrit)
  }
  const expectedWounds = expectedNormalWounds + expectedLethalWounds + expectedDevWounds

  const modSv = Sv - AP
  const effectiveSv = invuln ? Math.min(modSv, invuln) : modSv
  const pSave = effectiveSv <= 6 ? pAtLeast(effectiveSv) : 0
  const unsavedNormal = (expectedNormalWounds + expectedLethalWounds) * (1 - pSave)
  const expectedUnsaved = unsavedNormal + expectedDevWounds

  const finalUnsaved = (fnp && fnp <= 6) ? expectedUnsaved * (1 - pAtLeast(fnp)) : expectedUnsaved

  return {
    expectedHits: +expectedHits.toFixed(2),
    woundOn,
    expectedWounds: +expectedWounds.toFixed(2),
    effectiveSv: effectiveSv > 6 ? null : effectiveSv,
    expectedUnsaved: +finalUnsaved.toFixed(2),
    expectedDamage: +(finalUnsaved * avgD).toFixed(2),
  }
}

// Convert a weapon profile + target unit into calcMath params
export function weaponToParams(weapon, targetUnit) {
  const parsePlus = v => typeof v === 'number' ? v : parseInt(String(v).replace('+', '')) || 4
  const parseAp = v => typeof v === 'number' ? v : parseInt(String(v)) || 0
  const hasKw = kw => weapon.abilities?.some(a => String(a).toUpperCase().includes(kw)) ?? false
  const getSustained = () => {
    const a = weapon.abilities?.find(a => String(a).toUpperCase().includes('SUSTAINED HITS'))
    if (!a) return 0
    const m = String(a).match(/(\d+)$/)
    return m ? parseInt(m[1]) : 1
  }
  return {
    A: weapon.A || 1,
    hitOn: parsePlus(weapon.WS || weapon.BS),
    S: weapon.S || 4,
    AP: parseAp(weapon.AP),
    D: weapon.D || 1,
    T: targetUnit.T || 4,
    Sv: parsePlus(targetUnit.Sv),
    invuln: targetUnit.InvSv ? parsePlus(targetUnit.InvSv) : null,
    fnp: null,
    torrent: hasKw('TORRENT'),
    lethalHits: hasKw('LETHAL HITS'),
    devastatingWounds: hasKw('DEVASTATING WOUNDS'),
    twinLinked: hasKw('TWIN-LINKED'),
    sustainedHits: getSustained(),
    rerollHitsAll: false, rerollHits1: false,
    rerollWoundsAll: false, rerollWounds1: false,
  }
}
