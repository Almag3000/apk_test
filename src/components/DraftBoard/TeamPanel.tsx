import HeroSlot from './HeroSlot'
import { useDraftStore } from '../../store/draftStore'

interface Props {
  team: 'my' | 'enemy'
}

export default function TeamPanel({ team }: Props) {
  const { myTeam, enemies } = useDraftStore()
  const heroes = team === 'my' ? myTeam : enemies
  const label = team === 'my' ? 'Мои союзники' : 'Противники'
  const color = team === 'my' ? 'text-dota-radiant' : 'text-dota-dire'
  const borderColor = team === 'my' ? 'border-dota-radiant/30' : 'border-dota-dire/30'
  const bgColor = team === 'my' ? 'bg-dota-radiant/5' : 'bg-dota-dire/5'

  return (
    <div className={`flex-1 rounded-xl border ${borderColor} ${bgColor} p-3`}>
      <h3 className={`text-xs font-bold uppercase tracking-wider ${color} mb-3 text-center`}>
        {label}
      </h3>
      <div className="grid grid-cols-5 gap-1.5">
        {heroes.map((hero, i) => (
          <HeroSlot key={i} hero={hero} team={team} index={i} />
        ))}
      </div>
    </div>
  )
}
