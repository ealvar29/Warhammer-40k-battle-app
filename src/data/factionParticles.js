// Ambient particle configs per faction — all tuned for subtlety (low count, low opacity)

const cfg = (particles, extra = {}) => ({
  fpsLimit: 30,
  detectRetina: true,
  interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
  particles,
  ...extra,
})

const falling = (color, opts = {}) => cfg({
  number: { value: opts.count ?? 35 },
  color: { value: color },
  shape: { type: opts.shape ?? 'circle' },
  opacity: { value: { min: opts.opMin ?? 0.2, max: opts.opMax ?? 0.45 } },
  size: { value: { min: opts.sMin ?? 1.5, max: opts.sMax ?? 3.5 } },
  move: {
    enable: true,
    direction: 'bottom',
    speed: { min: opts.speedMin ?? 0.4, max: opts.speedMax ?? 1.0 },
    straight: false,
    random: true,
    outModes: { default: 'out' },
    warp: false,
  },
})

const rising = (color, opts = {}) => cfg({
  number: { value: opts.count ?? 25 },
  color: { value: color },
  shape: { type: opts.shape ?? 'circle' },
  opacity: { value: { min: opts.opMin ?? 0.2, max: opts.opMax ?? 0.5 } },
  size: { value: { min: opts.sMin ?? 1, max: opts.sMax ?? 3 } },
  move: {
    enable: true,
    direction: 'top',
    speed: { min: opts.speedMin ?? 0.2, max: opts.speedMax ?? 0.7 },
    straight: false,
    random: true,
    outModes: { default: 'out' },
  },
})

const drifting = (color, opts = {}) => cfg({
  number: { value: opts.count ?? 25 },
  color: { value: color },
  shape: { type: opts.shape ?? 'circle' },
  opacity: { value: { min: opts.opMin ?? 0.15, max: opts.opMax ?? 0.35 } },
  size: { value: { min: opts.sMin ?? 1, max: opts.sMax ?? 3 } },
  move: {
    enable: true,
    direction: opts.dir ?? 'none',
    speed: { min: opts.speedMin ?? 0.2, max: opts.speedMax ?? 0.6 },
    straight: false,
    random: true,
    outModes: { default: 'out' },
    angle: { offset: 0, value: opts.angle ?? 90 },
  },
})

// ── IMPERIUM ─────────────────────────────────────────────────────────────────

export const FACTION_PARTICLES = {

  // Space Wolves — snowflakes + ice crystals
  spacewolves: falling(['#e8f4fd', '#b8d9f0', '#dce8f7', '#a0c4e8'], {
    count: 45, shape: 'circle',
    sMin: 1.5, sMax: 4, opMin: 0.25, opMax: 0.55,
    speedMin: 0.3, speedMax: 1.0,
  }),

  // Ultramarines — gold + ultramarine sparks rising like embers
  spacemarines: rising(['#c9a84c', '#e8c96a', '#003087', '#4169e1'], {
    count: 28, shape: 'star',
    sMin: 1, sMax: 2.5, opMin: 0.2, opMax: 0.5,
    speedMin: 0.2, speedMax: 0.6,
  }),

  // Blood Angels — deep crimson motes drifting down
  bloodangels: falling(['#8b0000', '#c41e1e', '#dc143c', '#6b0000'], {
    count: 30, shape: 'circle',
    sMin: 1.5, sMax: 3.5, opMin: 0.2, opMax: 0.45,
    speedMin: 0.4, speedMax: 0.9,
  }),

  // Dark Angels — dark forest green wisps + shadow shapes
  darkangels: drifting(['#1a3d1a', '#2d5a27', '#1b4332', '#0f2e0f'], {
    count: 20, shape: 'square', dir: 'bottom-right',
    sMin: 2, sMax: 5, opMin: 0.1, opMax: 0.3,
    speedMin: 0.15, speedMax: 0.5,
  }),

  // Black Templars — grey/white ash flakes falling
  blacktemplars: falling(['#aaaaaa', '#cccccc', '#888888', '#e0e0e0'], {
    count: 38, shape: 'circle',
    sMin: 1, sMax: 2.5, opMin: 0.15, opMax: 0.35,
    speedMin: 0.3, speedMax: 0.8,
  }),

  // Grey Knights — silver arcane sparks, slow random drift
  greyknights: cfg({
    number: { value: 35 },
    color: { value: ['#c0c0c0', '#e8e8e8', '#a0b8d0', '#d4e8ff'] },
    shape: { type: 'star' },
    opacity: { value: { min: 0.25, max: 0.6 } },
    size: { value: { min: 1, max: 2.5 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.2, max: 0.8 }, outModes: { default: 'out' },
    },
  }),

  // Adeptus Custodes — warm gold light motes rising like embers
  adeptuscustodes: rising(['#ffd700', '#ffcc00', '#e8b800', '#fff3a0'], {
    count: 30, shape: 'circle',
    sMin: 1.5, sMax: 4, opMin: 0.25, opMax: 0.55,
    speedMin: 0.15, speedMax: 0.5,
  }),

  // Adepta Sororitas — white + gold ascending holy sparks
  adeptasororitas: rising(['#ffffff', '#fff8dc', '#ffd700', '#ffe4b5'], {
    count: 28, shape: 'star',
    sMin: 1, sMax: 2.5, opMin: 0.2, opMax: 0.5,
    speedMin: 0.2, speedMax: 0.7,
  }),

  // Adeptus Mechanicus — muted red + dark grey slow floating polygons
  admech: drifting(['#cc2200', '#8b1500', '#555555', '#993300'], {
    count: 18, shape: 'polygon', dir: 'none',
    sMin: 2, sMax: 5, opMin: 0.12, opMax: 0.28,
    speedMin: 0.1, speedMax: 0.35,
  }),

  // Astra Militarum — sandy dust drifting sideways
  astramilitarum: drifting(['#c4a97d', '#a08050', '#b89060', '#d4b890'], {
    count: 40, shape: 'circle', dir: 'right',
    sMin: 1, sMax: 2.5, opMin: 0.1, opMax: 0.25,
    speedMin: 0.2, speedMax: 0.6,
  }),

  // Imperial Knights — heavy gold sparks + slow falling debris
  imperialknights: falling(['#c9a84c', '#e8c96a', '#8b6914', '#b8902a'], {
    count: 22, shape: 'square',
    sMin: 1.5, sMax: 4, opMin: 0.2, opMax: 0.4,
    speedMin: 0.2, speedMax: 0.6,
  }),

  // Deathwatch — silver + dark particles, sparse
  deathwatch: drifting(['#888888', '#aaaaaa', '#555555', '#c0c0c0'], {
    count: 18, shape: 'circle', dir: 'none',
    sMin: 1, sMax: 2.5, opMin: 0.1, opMax: 0.25,
    speedMin: 0.1, speedMax: 0.4,
  }),

  // ── CHAOS ───────────────────────────────────────────────────────────────────

  // Death Guard — sickly green rising bubbles + murk
  deathguard: rising(['#4a7c4a', '#3a6e3a', '#6b8e23', '#556b2f'], {
    count: 28, shape: 'circle',
    sMin: 2.5, sMax: 7, opMin: 0.2, opMax: 0.4,
    speedMin: 0.15, speedMax: 0.45,
  }),

  // Chaos Space Marines — purple swirling warp corruption
  chaosspacemarines: cfg({
    number: { value: 35 },
    color: { value: ['#6b21a8', '#9333ea', '#7e22ce', '#4c1d95'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.15, max: 0.4 } },
    size: { value: { min: 1, max: 3.5 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.4, max: 1.2 }, outModes: { default: 'out' },
      warp: false,
    },
  }),

  // Thousand Sons — deep blue + gold arcane dust swirling
  thousandsons: drifting(['#1e40af', '#3b82f6', '#1e3a8a', '#c9a84c'], {
    count: 30, shape: 'triangle', dir: 'none',
    sMin: 1.5, sMax: 3.5, opMin: 0.2, opMax: 0.4,
    speedMin: 0.25, speedMax: 0.7,
  }),

  // World Eaters — blood red drops falling, some faster
  worldeaters: cfg({
    number: { value: 30 },
    color: { value: ['#8b0000', '#dc143c', '#6b0000', '#a00000'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.25, max: 0.5 } },
    size: { value: { min: 2, max: 4.5 } },
    move: {
      enable: true, direction: 'bottom',
      speed: { min: 0.6, max: 1.8 },
      straight: false, random: true, outModes: { default: 'out' },
    },
  }),

  // Emperor's Children — hot pink + magenta chaotic pulses
  emperorschildren: cfg({
    number: { value: 32 },
    color: { value: ['#ff00ff', '#dd00aa', '#ee00cc', '#cc0099'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.15, max: 0.4 } },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.5, max: 1.5 }, outModes: { default: 'out' },
    },
  }),

  // Chaos Daemons — multi-color warp sparks (chaotic mix)
  chaosdaemons: cfg({
    number: { value: 40 },
    color: { value: ['#9333ea', '#dc143c', '#22c55e', '#f97316', '#3b82f6'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.15, max: 0.4 } },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.3, max: 1.3 }, outModes: { default: 'out' },
    },
  }),

  // Chaos Knights — dark orange + corruption purple, falling heavy
  chaosknights: falling(['#7c3aed', '#4c1d95', '#ea580c', '#78350f'], {
    count: 22, shape: 'square',
    sMin: 2, sMax: 5, opMin: 0.15, opMax: 0.35,
    speedMin: 0.2, speedMax: 0.7,
  }),

  // ── XENOS ───────────────────────────────────────────────────────────────────

  // Tyranids — bio-luminescent spores, slow alien drift
  tyranids: cfg({
    number: { value: 32 },
    color: { value: ['#7c3aed', '#6d28d9', '#65a30d', '#84cc16', '#4c1d95'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.2, max: 0.5 } },
    size: { value: { min: 1.5, max: 5 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.15, max: 0.55 }, outModes: { default: 'out' },
    },
  }),

  // Genestealer Cults — purple spore mist drifting
  genestealercults: drifting(['#7e22ce', '#a855f7', '#581c87', '#9333ea'], {
    count: 28, shape: 'circle', dir: 'bottom-right',
    sMin: 1.5, sMax: 4, opMin: 0.15, opMax: 0.35,
    speedMin: 0.2, speedMax: 0.55,
  }),

  // Necrons — bright green energy discharge particles
  necrons: cfg({
    number: { value: 30 },
    color: { value: ['#39ff14', '#00ff41', '#00cc33', '#1aff1a'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.2, max: 0.55 } },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.3, max: 1.0 }, outModes: { default: 'out' },
    },
  }),

  // Orks — green spores rising + orange rust sparks falling
  orks: cfg({
    number: { value: 38 },
    color: { value: ['#16a34a', '#15803d', '#ea580c', '#c2410c'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.15, max: 0.4 } },
    size: { value: { min: 1.5, max: 4 } },
    move: {
      enable: true, direction: 'none', random: true,
      speed: { min: 0.3, max: 1.0 }, outModes: { default: 'out' },
    },
  }),

  // Aeldari — flowing cyan soul-light ribbons
  aeldari: drifting(['#06b6d4', '#22d3ee', '#0e7490', '#67e8f9', '#a5f3fc'], {
    count: 28, shape: 'star', dir: 'none',
    sMin: 1, sMax: 2.5, opMin: 0.2, opMax: 0.5,
    speedMin: 0.2, speedMax: 0.65,
  }),

  // Drukhari — dark violet shards, some fast, some drifting
  drukhari: cfg({
    number: { value: 28 },
    color: { value: ['#1e1b4b', '#7c3aed', '#4c1d95', '#a855f7'] },
    shape: { type: 'triangle' },
    opacity: { value: { min: 0.15, max: 0.4 } },
    size: { value: { min: 2, max: 4.5 } },
    move: {
      enable: true, direction: 'bottom',
      speed: { min: 0.4, max: 1.4 },
      straight: false, random: true, outModes: { default: 'out' },
    },
  }),

  // T'au — clean blue-white precision tech particles
  tau: drifting(['#93c5fd', '#bfdbfe', '#3b82f6', '#dbeafe'], {
    count: 22, shape: 'circle', dir: 'none',
    sMin: 1, sMax: 2.5, opMin: 0.15, opMax: 0.35,
    speedMin: 0.15, speedMax: 0.5,
  }),

  // Leagues of Votann — amber runic embers + stone dust falling
  leaguesofvotann: cfg({
    number: { value: 26 },
    color: { value: ['#f59e0b', '#d97706', '#78716c', '#a8a29e'] },
    shape: { type: 'circle' },
    opacity: { value: { min: 0.2, max: 0.45 } },
    size: { value: { min: 1.5, max: 3.5 } },
    move: {
      enable: true, direction: 'bottom',
      speed: { min: 0.2, max: 0.6 },
      straight: false, random: true, outModes: { default: 'out' },
    },
  }),
}
