import DraftBoard from './components/DraftBoard'
import HeroGrid from './components/HeroGrid'
import RecommendationsPanel from './components/Recommendations'
import RoleSelector from './components/UI/RoleSelector'
import ItemBuild from './components/Recommendations/ItemBuild'
import { useDraftStore } from './store/draftStore'
import { useHeroes } from './hooks/useHeroes'
import type { Hero } from './types'

export default function App() {
  useHeroes()
  const { activeTab, setActiveTab } = useDraftStore()

  return (
    <div className="h-full flex flex-col bg-dota-bg overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-dota-border bg-dota-card/80 backdrop-blur-sm px-4 py-2">
        <div className="max-w-screen-lg mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-dota-gold text-xl">⚔️</span>
            <h1 className="text-dota-gold font-bold text-sm tracking-wide uppercase hidden sm:block">
              Dota 2 Draft Assistant
            </h1>
            <h1 className="text-dota-gold font-bold text-sm tracking-wide uppercase sm:hidden">
              DotaDraft
            </h1>
          </div>
          <div className="flex-1" />
          <nav className="flex gap-1">
            {(['draft', 'build'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                  ${activeTab === tab
                    ? 'bg-dota-gold text-dota-bg'
                    : 'text-dota-muted hover:text-dota-text'
                  }`}
              >
                {tab === 'draft' ? (
                  <><span className="hidden sm:inline">🗡️ </span>Пик</>
                ) : (
                  <><span className="hidden sm:inline">🛍️ </span>Предметы</>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-screen-lg mx-auto px-3 py-3 space-y-3 pb-6">
          {activeTab === 'draft' ? <DraftView /> : <BuildView />}
        </div>
      </main>
    </div>
  )
}

function DraftView() {
  return (
    <>
      <RoleSelector />
      <DraftBoard />
      <RecommendationsPanel />
      <HeroGrid />
    </>
  )
}

function BuildView() {
  const { buildHero, setBuildHero, heroes, heroSearch, setHeroSearch } = useDraftStore()

  const q = heroSearch.toLowerCase()
  const filtered = heroes
    .filter((h) => !q || h.localized_name.toLowerCase().includes(q))
    .sort((a, b) => a.localized_name.localeCompare(b.localized_name))

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-dota-border bg-dota-card p-3">
        <p className="text-dota-muted text-xs mb-2">
          Выберите героя для просмотра сборки предметов:
        </p>
        <input
          type="search"
          value={heroSearch}
          onChange={(e) => setHeroSearch(e.target.value)}
          placeholder="Поиск героя..."
          className="w-full bg-dota-bg border border-dota-border rounded-lg px-3 py-2 text-dota-text text-sm placeholder:text-dota-muted/60 outline-none focus:border-dota-gold/60 mb-2"
        />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1.5 max-h-52 overflow-y-auto pr-1">
          {filtered.map((hero) => (
            <BuildHeroCard
              key={hero.id}
              hero={hero}
              isSelected={buildHero?.id === hero.id}
              onSelect={() => setBuildHero(buildHero?.id === hero.id ? null : hero)}
            />
          ))}
        </div>
      </div>
      <ItemBuild hero={buildHero} />
    </div>
  )
}

function BuildHeroCard({
  hero,
  isSelected,
  onSelect,
}: {
  hero: Hero
  isSelected: boolean
  onSelect: () => void
}) {
  const short = hero.name.replace('npc_dota_hero_', '')
  return (
    <button
      onClick={onSelect}
      className={`relative rounded-lg overflow-hidden border transition-all duration-150
        ${isSelected
          ? 'border-dota-gold ring-1 ring-dota-gold scale-105'
          : 'border-dota-border hover:border-dota-gold/50 hover:scale-105'
        }`}
    >
      <div className="aspect-[3/4]">
        <img
          src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${short}.png`}
          alt={hero.localized_name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent pt-4 pb-0.5 px-0.5">
          <p className="text-white text-[0.55rem] font-semibold text-center truncate">
            {hero.localized_name}
          </p>
        </div>
      </div>
    </button>
  )
}
