export function encodeArmy(faction, detachmentId, unitIds) {
  const payload = JSON.stringify({ v: 1, f: faction, d: detachmentId, u: unitIds })
  return btoa(payload)
}

export function decodeArmy(encoded) {
  try {
    return JSON.parse(atob(encoded))
  } catch {
    return null
  }
}

export function getShareUrl(faction, detachmentId, unitIds) {
  const code = encodeArmy(faction, detachmentId, unitIds)
  const base = window.location.origin + window.location.pathname
  return `${base}#army=${code}`
}

export function parseShareUrl() {
  const hash = window.location.hash || ''
  const match = hash.match(/[#&]army=([^&]+)/)
  if (!match) return null
  return decodeArmy(match[1])
}
