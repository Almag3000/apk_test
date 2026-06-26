import { useEffect } from 'react'
import { useDraftStore } from '../store/draftStore'
import type { Hero } from '../types'

const CACHE_KEY = 'dota_heroes_v2'
const CACHE_TTL = 86400000 // 24 hours

export function useHeroes() {
  const { heroes, setHeroes } = useDraftStore()

  useEffect(() => {
    if (heroes.length > 0) return

    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL) {
          setHeroes(data)
          return
        }
      } catch {
        // stale cache, re-fetch
      }
    }

    fetch('https://api.opendota.com/api/heroes')
      .then((r) => r.json())
      .then((data: Hero[]) => {
        setHeroes(data)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
      })
      .catch(() => {
        // noop — show empty state
      })
  }, [heroes.length, setHeroes])

  return heroes
}

export function heroImgUrl(hero: Hero): string {
  const short = hero.name.replace('npc_dota_hero_', '')
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${short}.png`
}

export function heroPortraitUrl(hero: Hero): string {
  const short = hero.name.replace('npc_dota_hero_', '')
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${short}_full.png`
}
