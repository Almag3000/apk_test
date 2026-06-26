import { getBuildByHeroId } from '../../data/builds'
import ItemCard from '../UI/ItemCard'
import type { Hero } from '../../types'
import type { Item } from '../../types'

interface SectionProps {
  title: string
  items: Item[]
  accent?: string
}

function BuildSection({ title, items, accent = 'text-dota-muted' }: SectionProps) {
  if (items.length === 0) return null
  return (
    <div>
      <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${accent}`}>{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <ItemCard key={item.name} item={item} size="md" />
        ))}
      </div>
    </div>
  )
}

export default function ItemBuild({ hero }: { hero: Hero | null }) {
  if (!hero) {
    return (
      <div className="rounded-xl border border-dota-border bg-dota-card p-4 flex flex-col items-center justify-center py-12 gap-3">
        <span className="text-4xl">⚔️</span>
        <p className="text-dota-muted text-sm text-center">
          Выберите героя из сетки выше, чтобы увидеть рекомендуемую сборку предметов
        </p>
      </div>
    )
  }

  const build = getBuildByHeroId(hero.id)

  if (!build) {
    return (
      <div className="rounded-xl border border-dota-border bg-dota-card p-4">
        <h3 className="text-dota-text font-semibold mb-3">{hero.localized_name}</h3>
        <div className="rounded-lg bg-dota-bg border border-dota-border p-4 text-center">
          <p className="text-dota-muted text-sm">
            Сборка для этого героя ещё не добавлена в базу данных.
          </p>
          <p className="text-dota-muted/60 text-xs mt-1">
            Базовые рекомендации: Magic Wand, Boots, BKB и предметы по ситуации.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-dota-border bg-dota-card p-4 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-dota-gold">🎒</span>
        <h3 className="text-dota-text font-bold">{hero.localized_name} — сборка предметов</h3>
      </div>

      {build.tips && (
        <div className="bg-dota-gold/10 border border-dota-gold/30 rounded-lg px-4 py-2">
          <p className="text-dota-text text-xs leading-relaxed">💡 {build.tips}</p>
        </div>
      )}

      <BuildSection title="Стартовые предметы" items={build.starting} accent="text-dota-muted" />
      <BuildSection title="Ранняя игра" items={build.early} accent="text-dota-gold/80" />
      <BuildSection title="Ядро сборки" items={build.core} accent="text-dota-agi" />
      <BuildSection title="Поздняя игра" items={build.luxury} accent="text-dota-int" />
      <BuildSection title="По ситуации" items={build.situational} accent="text-dota-uni" />
    </div>
  )
}
