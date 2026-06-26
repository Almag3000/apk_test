import { useState } from 'react'
import type { Item } from '../../types'

const ITEM_CDN = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items'

interface Props {
  item: Item
  size?: 'sm' | 'md' | 'lg'
}

export default function ItemCard({ item, size = 'md' }: Props) {
  const [err, setErr] = useState(false)

  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-10',
    lg: 'w-20 h-14',
  }

  return (
    <div className="group relative flex flex-col items-center gap-1">
      <div className={`${sizes[size]} rounded-md overflow-hidden border border-dota-border bg-dota-bg flex items-center justify-center`}>
        {err ? (
          <div className="w-full h-full bg-dota-border/30 flex items-center justify-center text-dota-muted text-xs text-center p-0.5">
            {item.displayName.slice(0, 6)}
          </div>
        ) : (
          <img
            src={`${ITEM_CDN}/${item.name}.png`}
            alt={item.displayName}
            className="w-full h-full object-cover"
            onError={() => setErr(true)}
          />
        )}
      </div>
      <span className="text-dota-muted text-xs text-center leading-tight max-w-[4rem] line-clamp-2">
        {item.displayName}
      </span>
      {item.tip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-dota-bg border border-dota-gold/40 rounded-lg px-3 py-2 text-xs text-dota-text w-40 text-center hidden group-hover:block z-50 shadow-xl">
          {item.tip}
        </div>
      )}
    </div>
  )
}
