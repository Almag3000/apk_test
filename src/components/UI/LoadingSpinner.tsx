export default function LoadingSpinner({ text = 'Загрузка...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-12 h-12 border-4 border-dota-border border-t-dota-gold rounded-full animate-spin" />
      <p className="text-dota-muted text-sm">{text}</p>
    </div>
  )
}
