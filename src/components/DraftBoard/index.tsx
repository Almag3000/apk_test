import TeamPanel from './TeamPanel'
import { useDraftStore } from '../../store/draftStore'

export default function DraftBoard() {
  const { reset } = useDraftStore()

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-dota-border" />
        <span className="text-dota-muted text-xs uppercase tracking-widest">Состав</span>
        <div className="flex-1 h-px bg-dota-border" />
      </div>
      <div className="flex gap-2 items-stretch">
        <TeamPanel team="my" />
        <div className="flex flex-col items-center justify-center gap-2 px-1">
          <div className="text-dota-muted text-xs font-bold uppercase tracking-wider">VS</div>
          <button
            onClick={reset}
            className="text-dota-muted text-xs hover:text-dota-dire transition-colors mt-2 rotate-90"
            title="Сбросить"
          >
            ↺
          </button>
        </div>
        <TeamPanel team="enemy" />
      </div>
    </div>
  )
}
