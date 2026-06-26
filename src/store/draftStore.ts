import { create } from 'zustand'
import type { Hero, Matchup, Position } from '../types'

interface SelectedSlot {
  team: 'my' | 'enemy'
  index: number
}

interface DraftStore {
  heroes: Hero[]
  myTeam: (Hero | null)[]
  enemies: (Hero | null)[]
  myRole: Position
  selectedSlot: SelectedSlot | null
  matchupCache: Record<number, Matchup[]>
  activeTab: 'draft' | 'build'
  buildHero: Hero | null
  heroSearch: string
  roleFilter: string

  setHeroes: (heroes: Hero[]) => void
  setHero: (team: 'my' | 'enemy', index: number, hero: Hero) => void
  removeHero: (team: 'my' | 'enemy', index: number) => void
  setMyRole: (role: Position) => void
  setSelectedSlot: (slot: SelectedSlot | null) => void
  cacheMatchups: (heroId: number, matchups: Matchup[]) => void
  setActiveTab: (tab: 'draft' | 'build') => void
  setBuildHero: (hero: Hero | null) => void
  setHeroSearch: (q: string) => void
  setRoleFilter: (r: string) => void
  reset: () => void
}

export const useDraftStore = create<DraftStore>((set, get) => ({
  heroes: [],
  myTeam: [null, null, null, null, null],
  enemies: [null, null, null, null, null],
  myRole: 1,
  selectedSlot: null,
  matchupCache: {},
  activeTab: 'draft',
  buildHero: null,
  heroSearch: '',
  roleFilter: 'All',

  setHeroes: (heroes) => set({ heroes }),

  setHero: (team, index, hero) => {
    const state = get()
    const allPicked = [
      ...state.myTeam,
      ...state.enemies,
    ].filter(Boolean).map((h) => h!.id)
    if (allPicked.includes(hero.id)) return

    set((s) => {
      if (team === 'my') {
        const myTeam = [...s.myTeam]
        myTeam[index] = hero
        return { myTeam, selectedSlot: null }
      } else {
        const enemies = [...s.enemies]
        enemies[index] = hero
        return { enemies, selectedSlot: null }
      }
    })
  },

  removeHero: (team, index) =>
    set((s) => {
      if (team === 'my') {
        const myTeam = [...s.myTeam]
        myTeam[index] = null
        return { myTeam }
      } else {
        const enemies = [...s.enemies]
        enemies[index] = null
        return { enemies }
      }
    }),

  setMyRole: (role) => set({ myRole: role }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  cacheMatchups: (heroId, matchups) =>
    set((s) => ({ matchupCache: { ...s.matchupCache, [heroId]: matchups } })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setBuildHero: (hero) => set({ buildHero: hero }),
  setHeroSearch: (q) => set({ heroSearch: q }),
  setRoleFilter: (r) => set({ roleFilter: r }),

  reset: () =>
    set({
      myTeam: [null, null, null, null, null],
      enemies: [null, null, null, null, null],
      selectedSlot: null,
    }),
}))
