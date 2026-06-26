export interface Hero {
  id: number
  name: string
  localized_name: string
  primary_attr: 'str' | 'agi' | 'int' | 'all'
  attack_type: 'Melee' | 'Ranged'
  roles: string[]
}

export interface Matchup {
  hero_id: number
  games_played: number
  wins: number
}

export type Position = 1 | 2 | 3 | 4 | 5

export interface Item {
  name: string
  displayName: string
  tip?: string
}

export interface HeroBuild {
  heroId: number
  starting: Item[]
  early: Item[]
  core: Item[]
  luxury: Item[]
  situational: Item[]
  tips: string
}

export interface Recommendation {
  hero: Hero
  score: number
  reasons: string[]
}
