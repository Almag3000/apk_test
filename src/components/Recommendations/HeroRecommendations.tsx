import { heroImgUrl } from '../../hooks/useHeroes'
import { useRecommendations } from '../../hooks/useRecommendations'
import { useDraftStore } from '../../store/draftStore'
import type { Recommendation } from '../../types'

function RecoCard({ rec }: { rec: Recommendation }) {
  const { selectedSlot, setHero, myTeam } = useDraftStore()

  const handleClick = () => {
    const slot = selectedSlot ?? (() => {
      const idx = myTeam.findIndex((h) => h === null)
      return idx !== -1 ? { team: 'my' as const, index: idx } : null
    })()
    if (slot) setHero(slot.team, slot.index, rec.hero)
  }

  const scoreColor =
    rec.score > 5 ? 'text-dota-agi' : rec.score > 0 ? 'text-dota-gold' : 'text-dota-muted'

  return (
    <button
      onClick={handleClick}
      className="flex-shrink-0 w-20 flex flex-col items-center gap-1 group"
    >
      <div className="w-20 h-16 rounded-lg overflow-hidden border border-dota-border group-hover:border-dota-gold/60 transition-all group-hover:scale-105 relative">
        <img
          src={heroImgUrl(rec.hero)}
          alt={rec.hero.localized_name}
          className="w-full h-full object-cover object-top"
        />
        {rec.score !== 0 && (
          <div className={`absolute top-0.5 right-0.5 text-xs font-bold ${scoreColor} bg-black/70 rounded px-0.5`}>
            {rec.score > 0 ? '+' : ''}{rec.score.toFixed(0)}
          </div>
        )}
      </div>
      <p className="text-dota-text text-xs font-semibold text-center leading-tight line-clamp-2">
        {rec.hero.localized_name}
      </p>
      {rec.reasons.length > 0 && (
        <p className="text-dota-agi text-xs text-center leading-tight line-clamp-1">
          {rec.reasons[0]}
        </p>
      )}
    </button>
  )
}

export default function HeroRecommendations() {
  const recs = useRecommendations()
  const { myRole, enemies } = useDraftStore()

  const roleNames: Record<number, string> = { 1: 'Керри', 2: 'Мид', 3: 'Оффлейн', 4: 'Сапп 4', 5: 'Хард Сапп' }
  const hasEnemies = enemies.some(Boolean)

  return (
    <div className="rounded-xl border border-dota-gold/20 bg-dota-card p-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-dota-gold text-sm">⭐</span>
        <h3 className="text-dota-gold text-sm font-bold uppercase tracking-wider">
          Рекомендации — {roleNames[myRole]}
        </h3>
      </div>

      {!hasEnemies ? (
        <p className="text-dota-muted text-xs text-center py-4">
          Добавьте героев противников для персонализированных рекомендаций
        </p>
      ) : recs.length === 0 ? (
        <p className="text-dota-muted text-xs text-center py-4">
          Загружаем данные о матчах...
        </p>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {recs.map((rec) => (
            <RecoCard key={rec.hero.id} rec={rec} />
          ))}
        </div>
      )}

      <p className="text-dota-muted/50 text-xs mt-2">
        Нажмите на героя, чтобы добавить в состав
      </p>
    </div>
  )
}
