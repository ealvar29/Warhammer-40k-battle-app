import React from 'react'
import { useTipsStore } from '../store/tipsStore'

export default function TipCard({ id, body, theme }) {
  const { dismissedTips, dismissTip } = useTipsStore()
  if (dismissedTips.includes(id)) return null
  return (
    <div className="rounded-2xl px-3.5 py-3 flex items-start gap-3"
      style={{ background: `${theme.secondary}0d`, border: `1px solid ${theme.secondary}25` }}>
      <p className="text-xs leading-relaxed flex-1" style={{ color: theme.textSecondary }}>
        💡 {body}
      </p>
      <button onClick={() => dismissTip(id)}
        className="text-xs px-2.5 py-1 rounded-lg shrink-0 font-bold"
        style={{ background: `${theme.secondary}18`, color: theme.secondary }}>
        Got it
      </button>
    </div>
  )
}
