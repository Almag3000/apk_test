import { useMemo } from 'react'
import FilterBar from './FilterBar'
import HeroCard from './HeroCard'
import LoadingSpinner from '../UI/LoadingSpinner'
import { useDraftStore } from '../../store/draftStore'

export default function HeroGrid() {
  const { heroes, heroSearch, roleFilter, myTeam, enemies } = useDraftStore()

  const pickedIds = useMemo(
    () => new Set([...myTeam, ...enemies].filter(Boolean).map((h) => h!.id)),
    [myTeam, enemies]
  )

  const filtered = useMemo(() => {
    let list = heroes
    if (heroSearch.trim()) {
      const q = heroSearch.toLowerCase()
      list = list.filter((h) =>
        h.localized_name.toLowerCase().includes(q) ||
        h.name.includes(q.replace(/\s+/g, '_'))
      )
    }
    if (roleFilter !== 'All') {
      list = list.filter((h) => h.roles.includes(roleFilter))
    }
    return list.sort((a, b) => a.localized_name.localeCompare(b.localized_name))
  }, [heroes, heroSearch, roleFilter])

  if (heroes.length === 0) {
    return (
      <div className="rounded-xl border border-dota-border bg-dota-card p-4">
        <FilterBar />
        <LoadingSpinner text="Загружаем героев..." />
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-dota-border bg-dota-card p-3">
      <FilterBar />
      <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1.5 max-h-[380px] overflow-y-auto pr-1">
        {filtered.map((hero) => (
          <HeroCard key={hero.id} hero={hero} isPicked={pickedIds.has(hero.id)} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-dota-muted py-8 text-sm">Герои не найдены</p>
        )}
      </div>
      <p className="text-dota-muted/60 text-xs mt-2 text-right">
        {filtered.length} из {heroes.length} героев
      </p>
    </div>
  )
}
