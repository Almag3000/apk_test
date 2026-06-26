import { useEffect, useMemo } from 'react'
import { useDraftStore } from '../store/draftStore'
import type { Hero, Matchup, Recommendation } from '../types'

const POS_ROLES: Record<number, string[]> = {
  1: ['Carry'],
  2: ['Carry', 'Nuker', 'Escape'],
  3: ['Durable', 'Initiator', 'Disabler'],
  4: ['Support', 'Disabler', 'Initiator', 'Escape'],
  5: ['Support', 'Disabler', 'Healer'],
}

function heroFitsRole(hero: Hero, pos: number): boolean {
  const needed = POS_ROLES[pos] || []
  return hero.roles.some((r) => needed.includes(r))
}

async function fetchMatchups(heroId: number): Promise<Matchup[]> {
  const r = await fetch(`https://api.opendota.com/api/heroes/${heroId}/matchups`)
  if (!r.ok) return []
  return r.json()
}

export function useRecommendations(): Recommendation[] {
  const { heroes, myTeam, enemies, myRole, matchupCache, cacheMatchups } = useDraftStore()

  const pickedEnemies = enemies.filter(Boolean) as Hero[]

  useEffect(() => {
    for (const enemy of pickedEnemies) {
      if (!matchupCache[enemy.id]) {
        fetchMatchups(enemy.id)
          .then((data) => cacheMatchups(enemy.id, data))
          .catch(() => {})
      }
    }
  }, [pickedEnemies.map((e) => e.id).join(',')]) // eslint-disable-line react-hooks/exhaustive-deps

  return useMemo(() => {
    if (heroes.length === 0) return []

    const allPicked = new Set(
      [...myTeam, ...enemies].filter(Boolean).map((h) => h!.id)
    )

    const candidates = heroes.filter(
      (h) => !allPicked.has(h.id) && heroFitsRole(h, myRole)
    )

    const scored: Recommendation[] = candidates.map((hero) => {
      let score = 0
      const reasons: string[] = []

      for (const enemy of pickedEnemies) {
        const matchups = matchupCache[enemy.id] || []
        const entry = matchups.find((m) => m.hero_id === hero.id)
        if (entry && entry.games_played > 100) {
          const enemyWr = entry.wins / entry.games_played
          // enemyWr < 0.5 means our hero beats the enemy
          const advantage = (0.5 - enemyWr) * 100
          score += advantage
          if (advantage > 4) {
            reasons.push(`Контрит ${enemy.localized_name} (+${advantage.toFixed(0)}%)`)
          }
        }
      }

      return { hero, score, reasons }
    })

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 16)
  }, [heroes, myTeam, enemies, myRole, matchupCache])
}
