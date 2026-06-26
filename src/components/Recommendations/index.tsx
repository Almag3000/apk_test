import HeroRecommendations from './HeroRecommendations'
import ItemBuild from './ItemBuild'
import { useDraftStore } from '../../store/draftStore'
import { heroImgUrl } from '../../hooks/useHeroes'
import { useMemo } from 'react'

export default function RecommendationsPanel() {
  const { myTeam } = useDraftStore()

  const myHero = useMemo(() => {
    // Show build for the first picked hero on my team
    return myTeam.find(Boolean) ?? null
  }, [myTeam])

  return (
    <div className="space-y-3">
      <HeroRecommendations />
      <div className="rounded-xl border border-dota-border bg-dota-card p-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-dota-int text-sm">🛍️</span>
          <h3 className="text-dota-int text-sm font-bold uppercase tracking-wider">
            Сборка предметов
          </h3>
          {myHero && (
            <div className="ml-auto flex items-center gap-1.5">
              <img src={heroImgUrl(myHero)} alt={myHero.localized_name} className="w-8 h-6 object-cover rounded" />
              <span className="text-dota-text text-xs">{myHero.localized_name}</span>
            </div>
          )}
        </div>
        <ItemBuild hero={myHero} />
      </div>
    </div>
  )
}
