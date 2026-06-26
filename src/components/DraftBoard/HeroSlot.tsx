import { heroImgUrl } from '../../hooks/useHeroes'
import { useDraftStore } from '../../store/draftStore'
import type { Hero } from '../../types'

interface Props {
  hero: Hero | null
  team: 'my' | 'enemy'
  index: number
}

const ATTR_COLOR: Record<string, string> = {
  str: 'border-dota-str',
  agi: 'border-dota-agi',
  int: 'border-dota-int',
  all: 'border-dota-uni',
}

export default function HeroSlot({ hero, team, index }: Props) {
  const { selectedSlot, setSelectedSlot, removeHero } = useDraftStore()
  const isSelected = selectedSlot?.team === team && selectedSlot.index === index
  const teamColor = team === 'my' ? 'border-dota-radiant' : 'border-dota-dire'

  if (hero) {
    return (
      <div className="relative group">
        <div
          className={`relative w-full aspect-[3/4] rounded-lg overflow-hidden border-2 cursor-pointer transition-all
            ${ATTR_COLOR[hero.primary_attr] || 'border-dota-border'}
            hover:brightness-110`}
          onClick={() => setSelectedSlot({ team, index })}
        >
          <img
            src={heroImgUrl(hero)}
            alt={hero.localized_name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent pt-4 pb-1 px-1">
            <p className="text-white text-xs font-semibold text-center leading-tight truncate">
              {hero.localized_name}
            </p>
          </div>
        </div>
        <button
          onClick={() => removeHero(team, index)}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-dota-dire text-white text-xs items-center justify-center hidden group-hover:flex z-10 font-bold leading-none"
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setSelectedSlot(isSelected ? null : { team, index })}
      className={`w-full aspect-[3/4] rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1
        ${isSelected
          ? `${teamColor} bg-dota-card animate-pulse`
          : 'border-dota-border bg-dota-card/50 hover:border-dota-gold/60 hover:bg-dota-card'
        }`}
    >
      <span className={`text-2xl ${isSelected ? (team === 'my' ? 'text-dota-radiant' : 'text-dota-dire') : 'text-dota-border'}`}>
        +
      </span>
      <span className="text-dota-muted text-xs">{isSelected ? 'Выбирайте' : 'Слот'}</span>
    </button>
  )
}
