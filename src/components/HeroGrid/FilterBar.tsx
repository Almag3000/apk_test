import { useDraftStore } from '../../store/draftStore'

const ROLE_FILTERS = ['Все', 'Carry', 'Support', 'Initiator', 'Durable', 'Nuker', 'Escape', 'Disabler', 'Pusher']

export default function FilterBar() {
  const { heroSearch, setHeroSearch, roleFilter, setRoleFilter } = useDraftStore()

  return (
    <div className="space-y-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dota-muted">🔍</span>
        <input
          type="search"
          value={heroSearch}
          onChange={(e) => setHeroSearch(e.target.value)}
          placeholder="Поиск героя..."
          className="w-full bg-dota-card border border-dota-border rounded-lg pl-9 pr-4 py-2 text-dota-text text-sm placeholder:text-dota-muted/60 outline-none focus:border-dota-gold/60 transition-colors"
        />
      </div>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {ROLE_FILTERS.map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r === 'Все' ? 'All' : r)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all
              ${(roleFilter === 'All' && r === 'Все') || roleFilter === r
                ? 'bg-dota-gold/20 text-dota-gold border border-dota-gold/40'
                : 'bg-dota-card border border-dota-border text-dota-muted hover:border-dota-gold/40 hover:text-dota-text'
              }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  )
}
