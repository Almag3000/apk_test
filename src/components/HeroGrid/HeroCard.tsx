import { useState } from 'react'
import { heroImgUrl } from '../../hooks/useHeroes'
import { useDraftStore } from '../../store/draftStore'
import type { Hero } from '../../types'

const ATTR_BG: Record<string, string> = {
  str: 'bg-dota-str/10 border-dota-str/30',
  agi: 'bg-dota-agi/10 border-dota-agi/30',
  int: 'bg-dota-int/10 border-dota-int/30',
  all: 'bg-dota-uni/10 border-dota-uni/30',
}

const ATTR_DOT: Record<string, string> = {
  str: 'bg-dota-str',
  agi: 'bg-dota-agi',
  int: 'bg-dota-int',
  all: 'bg-dota-uni',
}

interface Props {
  hero: Hero
  isPicked: boolean
}

export default function HeroCard({ hero, isPicked }: Props) {
  const [imgErr, setImgErr] = useState(false)
  const { selectedSlot, setHero, setSelectedSlot, myTeam, enemies } = useDraftStore()

  const handleClick = () => {
    if (isPicked) return

    if (selectedSlot) {
      setHero(selectedSlot.team, selectedSlot.index, hero)
      return
    }

    // Auto-assign to next empty slot
    const emptyMyIdx = myTeam.findIndex((h) => h === null)
    if (emptyMyIdx !== -1) {
      setHero('my', emptyMyIdx, hero)
      return
    }
    const emptyEnemyIdx = enemies.findIndex((h) => h === null)
    if (emptyEnemyIdx !== -1) {
      setHero('enemy', emptyEnemyIdx, hero)
      return
    }

    // All slots full — select first slot to replace
    setSelectedSlot({ team: 'my', index: 0 })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPicked}
      className={`relative group rounded-lg overflow-hidden border transition-all duration-150
        ${isPicked
          ? 'opacity-30 cursor-not-allowed border-dota-border'
          : `${ATTR_BG[hero.primary_attr] || 'bg-dota-card border-dota-border'} hover:scale-105 hover:shadow-lg hover:shadow-black/40 hover:z-10 active:scale-95 cursor-pointer`
        }`}
    >
      <div className="aspect-[3/4] relative">
        {imgErr ? (
          <div className="w-full h-full bg-dota-card flex items-center justify-center p-1">
            <span className="text-dota-muted text-xs text-center leading-tight">{hero.localized_name}</span>
          </div>
        ) : (
          <img
            src={heroImgUrl(hero)}
            alt={hero.localized_name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={() => setImgErr(true)}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pt-6 pb-1 px-0.5">
          <p className="text-white text-[0.6rem] font-semibold text-center leading-tight truncate">
            {hero.localized_name}
          </p>
        </div>
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${ATTR_DOT[hero.primary_attr] || 'bg-dota-border'}`} />
        {isPicked && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-dota-dire text-xl">✕</span>
          </div>
        )}
      </div>
    </button>
  )
}
