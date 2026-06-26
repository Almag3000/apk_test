import { useDraftStore } from '../../store/draftStore'
import type { Position } from '../../types'

const ROLES: { pos: Position; label: string; short: string; icon: string }[] = [
  { pos: 1, label: 'Керри', short: 'Carry', icon: '⚔️' },
  { pos: 2, label: 'Мид', short: 'Mid', icon: '🔮' },
  { pos: 3, label: 'Оффлейн', short: 'Off', icon: '🛡️' },
  { pos: 4, label: 'Сапп 4', short: 'Sup4', icon: '🌀' },
  { pos: 5, label: 'Хард сапп', short: 'Sup5', icon: '💊' },
]

export default function RoleSelector() {
  const { myRole, setMyRole } = useDraftStore()

  return (
    <div className="flex items-center gap-2">
      <span className="text-dota-muted text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
        Моя роль:
      </span>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {ROLES.map((r) => (
          <button
            key={r.pos}
            onClick={() => setMyRole(r.pos)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap
              ${myRole === r.pos
                ? 'bg-dota-gold text-dota-bg shadow-lg shadow-dota-gold/20'
                : 'bg-dota-card border border-dota-border text-dota-muted hover:border-dota-gold/50 hover:text-dota-text'
              }`}
          >
            <span>{r.icon}</span>
            <span className="hidden sm:inline">{r.label}</span>
            <span className="sm:hidden">{r.short}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
