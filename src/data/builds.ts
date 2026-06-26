import type { HeroBuild, Item } from '../types'

const i = (name: string, displayName: string, tip?: string): Item => ({ name, displayName, tip })

const builds: HeroBuild[] = [
  // --- CARRY pos 1 ---
  {
    heroId: 1, // Anti-Mage
    starting: [i('branches','Iron Branch'), i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('power_treads','Power Treads'), i('ring_of_basilius','Ring of Basilius')],
    core: [i('manta','Manta Style','Уходите через Split Image'), i('abyssal_blade','Abyssal Blade'), i('butterfly','Butterfly')],
    luxury: [i('skadi','Eye of Skadi'), i('satanic','Satanic'), i('heart','Heart of Tarrasque')],
    situational: [i('sphere','Linken\'s Sphere','Против point-target заклинаний'), i('monkey_king_bar','Monkey King Bar','Против уклонения')],
    tips: 'Фармите в изоляции, используйте Blink для эскейпа. Избегайте тимфайтов без BKB. Manta Style — обязательный предмет.',
  },
  {
    heroId: 8, // Juggernaut
    starting: [i('wraith_band','Wraith Band'), i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('phase_boots','Phase Boots'), i('ring_of_basilius','Ring of Basilius')],
    core: [i('vladmir','Vladimir\'s Offering'), i('blade_mail','Blade Mail'), i('black_king_bar','Black King Bar')],
    luxury: [i('butterfly','Butterfly'), i('assault','Assault Cuirass'), i('abyssal_blade','Abyssal Blade'), i('satanic','Satanic')],
    situational: [i('mjollnir','Mjollnir','Против иллюзий'), i('monkey_king_bar','Monkey King Bar','Против уклонения')],
    tips: 'Omnislash наносит урон в иммунитете. Blade Fury хорошо для фарма. Используйте BKB перед тимфайтом.',
  },
  {
    heroId: 44, // Phantom Assassin
    starting: [i('wraith_band','Wraith Band'), i('circlet','Circlet'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('power_treads','Power Treads')],
    core: [i('battlefury','Battle Fury','Для быстрого фарма'), i('desolator','Desolator'), i('black_king_bar','Black King Bar')],
    luxury: [i('abyssal_blade','Abyssal Blade'), i('butterfly','Butterfly'), i('satanic','Satanic')],
    situational: [i('nullifier','Nullifier','Против Glimmer/Force Staff'), i('monkey_king_bar','MKB','Против уклонения')],
    tips: 'Blur даёт 50% шанс уклонения — хорошо против физ урона. Стачивайте Coup de Grace для критов. Избегайте АоЕ-заклинаний.',
  },
  {
    heroId: 41, // Faceless Void
    starting: [i('wraith_band','Wraith Band'), i('circlet','Circlet'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('power_treads','Power Treads')],
    core: [i('maelstrom','Maelstrom'), i('black_king_bar','Black King Bar'), i('manta','Manta Style')],
    luxury: [i('butterfly','Butterfly'), i('skadi','Eye of Skadi'), i('mjollnir','Mjollnir')],
    situational: [i('monkey_king_bar','MKB','Против уклонения'), i('greater_crit','Daedalus','Когда нужен бурст')],
    tips: 'Chronosphere блокирует всех, кроме вас. Спасайте союзников из Chrono. Maelstrom отлично работает с атаками в Chrono.',
  },
  {
    heroId: 67, // Spectre
    starting: [i('circlet','Circlet'), i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('bracer','Bracer'), i('tranquil_boots','Tranquil Boots')],
    core: [i('radiance','Radiance','Основа билда'), i('manta','Manta Style'), i('diffusal_blade','Diffusal Blade')],
    luxury: [i('butterfly','Butterfly'), i('skadi','Eye of Skadi'), i('heart','Heart of Tarrasque')],
    situational: [i('abyssal_blade','Abyssal Blade'), i('satanic','Satanic')],
    tips: 'Haunt позволяет приходить на любой тимфайт. Radiance + иллюзии от Manta = огромный урон. Долгий фармер — не торопитесь в тимфайт.',
  },
  {
    heroId: 42, // Wraith King
    starting: [i('gauntlets','Gauntlets'), i('gauntlets','Gauntlets'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('phase_boots','Phase Boots')],
    core: [i('armlet','Armlet of Mordiggian'), i('black_king_bar','Black King Bar'), i('assault','Assault Cuirass')],
    luxury: [i('abyssal_blade','Abyssal Blade'), i('monkey_king_bar','MKB'), i('satanic','Satanic'), i('heart','Heart of Tarrasque')],
    situational: [i('heavens_halberd','Heaven\'s Halberd','Против carry'), i('aghanims_shard','Aghanim\'s Shard')],
    tips: 'Reincarnation даёт вторую жизнь. Armlet — активируйте в бою и снимайте когда HP критическое. BKB обязателен.',
  },
  // --- MID pos 2 ---
  {
    heroId: 11, // Shadow Fiend
    starting: [i('circlet','Circlet'), i('branches','Iron Branch'), i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('bottle','Bottle'), i('phase_boots','Phase Boots')],
    core: [i('invis_sword','Shadow Blade'), i('crystalys','Crystalys'), i('greater_crit','Daedalus')],
    luxury: [i('black_king_bar','Black King Bar'), i('butterfly','Butterfly'), i('satanic','Satanic')],
    situational: [i('monkey_king_bar','MKB','Против уклонения'), i('rapier','Divine Rapier','Финальный ультра-предмет')],
    tips: 'Накапливайте Souls для максимального урона. Shadow Blade для инициации Requiem of Souls. Держитесь на безопасной дистанции.',
  },
  {
    heroId: 17, // Storm Spirit
    starting: [i('null_talisman','Null Talisman'), i('circlet','Circlet'), i('tango','Tango'), i('clarity','Clarity')],
    early: [i('magic_wand','Magic Wand'), i('bottle','Bottle'), i('power_treads','Power Treads')],
    core: [i('bloodstone','Bloodstone'), i('orchid','Orchid Malevolence'), i('ultimate_scepter','Aghanim\'s Scepter')],
    luxury: [i('sphere','Linken\'s Sphere'), i('sheepstick','Scythe of Vyse'), i('bloodthorn','Bloodthorn')],
    situational: [i('eternal_shroud','Eternal Shroud','Против магии'), i('black_king_bar','Black King Bar')],
    tips: 'Ball Lightning потребляет много маны. Bloodstone восполняет ману. Electric Vortex + Orchid для кики цели.',
  },
  {
    heroId: 74, // Invoker
    starting: [i('null_talisman','Null Talisman'), i('circlet','Circlet'), i('tango','Tango'), i('clarity','Clarity')],
    early: [i('bottle','Bottle'), i('power_treads','Power Treads'), i('witch_blade','Witch Blade')],
    core: [i('ultimate_scepter','Aghanim\'s Scepter'), i('blink','Blink Dagger'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('sheepstick','Scythe of Vyse'), i('bloodthorn','Bloodthorn'), i('refresher','Refresher Orb')],
    situational: [i('sphere','Linken\'s Sphere'), i('force_staff','Force Staff')],
    tips: 'Учите Quas-Wex (4-4-0) для контроля или Exort (0-0-7) для урона. Sun Strike — глобальный урон. EMP уничтожаетману врагов.',
  },
  {
    heroId: 49, // Dragon Knight
    starting: [i('branches','Iron Branch'), i('branches','Iron Branch'), i('gauntlets','Gauntlets'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('bracer','Bracer'), i('phase_boots','Phase Boots')],
    core: [i('blink','Blink Dagger'), i('black_king_bar','Black King Bar'), i('ultimate_scepter','Aghanim\'s Scepter')],
    luxury: [i('assault','Assault Cuirass'), i('heart','Heart of Tarrasque'), i('shivas_guard','Shiva\'s Guard')],
    situational: [i('crimson_guard','Crimson Guard'), i('eternal_shroud','Eternal Shroud')],
    tips: 'Elder Dragon Form — трансформация, усиливающая атаки. В Corrosive Dragon форме замедляете врагов. Очень устойчивый герой, хорошо в тимфайте.',
  },
  // --- OFFLANE pos 3 ---
  {
    heroId: 2, // Axe
    starting: [i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve'), i('wind_lace','Wind Lace')],
    early: [i('magic_wand','Magic Wand'), i('phase_boots','Phase Boots'), i('bracer','Bracer'), i('vanguard','Vanguard')],
    core: [i('blink','Blink Dagger'), i('black_king_bar','Black King Bar'), i('blade_mail','Blade Mail')],
    luxury: [i('heart','Heart of Tarrasque'), i('assault','Assault Cuirass'), i('crimson_guard','Crimson Guard')],
    situational: [i('eternal_shroud','Eternal Shroud','Против магии'), i('heavens_halberd','Heaven\'s Halberd')],
    tips: 'Counter Helix — случайный АоЕ урон в ответ на атаки. Culling Blade убивает врага с низким HP и сбрасывает кулдаун. Врывайтесь в толпу врагов.',
  },
  {
    heroId: 29, // Tidehunter
    starting: [i('bracer','Bracer'), i('tango','Tango'), i('flask','Healing Salve'), i('wind_lace','Wind Lace')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots'), i('hood_of_defiance','Hood of Defiance')],
    core: [i('blink','Blink Dagger'), i('ultimate_scepter','Aghanim\'s Scepter'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('heart','Heart of Tarrasque'), i('shivas_guard','Shiva\'s Guard'), i('refresher','Refresher Orb')],
    situational: [i('eternal_shroud','Eternal Shroud'), i('pipe','Pipe of Insight')],
    tips: 'Ravage — огромный АоЕ стан. Нажмите BKB перед Ravage, чтобы не прервали. Anchor Smash снижает урон врагов.',
  },
  {
    heroId: 99, // Bristleback
    starting: [i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('wind_lace','Wind Lace'), i('vanguard','Vanguard'), i('tranquil_boots','Tranquil Boots')],
    core: [i('crimson_guard','Crimson Guard'), i('eternal_shroud','Eternal Shroud'), i('heart','Heart of Tarrasque')],
    luxury: [i('assault','Assault Cuirass'), i('shivas_guard','Shiva\'s Guard'), i('blade_mail','Blade Mail')],
    situational: [i('pipe','Pipe of Insight','Против АоЕ магии'), i('black_king_bar','Black King Bar')],
    tips: 'Стойте спиной к врагам — Bristleback снижает получаемый урон с тыла. Quill Spray накапливается стаками. Очень живучий герой.',
  },
  {
    heroId: 104, // Legion Commander
    starting: [i('gauntlets','Gauntlets'), i('branches','Iron Branch'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('phase_boots','Phase Boots'), i('bracer','Bracer')],
    core: [i('blink','Blink Dagger'), i('black_king_bar','Black King Bar'), i('blade_mail','Blade Mail')],
    luxury: [i('assault','Assault Cuirass'), i('heart','Heart of Tarrasque'), i('aghanims_shard','Aghanim\'s Shard')],
    situational: [i('heavens_halberd','Heaven\'s Halberd','Дизейбл carry'), i('armlet','Armlet')],
    tips: 'Duel — дуэль один на один. Победа даёт бонусный урон навсегда. Прессуйте саппортов, дуэльтесь с изолированными врагами.',
  },
  {
    heroId: 38, // Beastmaster
    starting: [i('branches','Iron Branch'), i('gauntlets','Gauntlets'), i('tango','Tango'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('phase_boots','Phase Boots'), i('helm_of_the_dominator','Helm of the Dominator')],
    core: [i('blink','Blink Dagger'), i('black_king_bar','Black King Bar'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('assault','Assault Cuirass'), i('crimson_guard','Crimson Guard'), i('aghanims_shard','Aghanim\'s Shard')],
    situational: [i('pipe','Pipe of Insight'), i('eternal_shroud','Eternal Shroud')],
    tips: 'Hawk даёт обзор карты. Boar + Inner Beast даёт огромный DPS. Wild Axes срубают деревья — используйте для инициации через лес.',
  },
  // --- SOFT SUPPORT pos 4 ---
  {
    heroId: 7, // Earthshaker
    starting: [i('gauntlets','Gauntlets'), i('tango','Tango'), i('flask','Healing Salve'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots'), i('bracer','Bracer')],
    core: [i('blink','Blink Dagger'), i('aghanims_shard','Aghanim\'s Shard'), i('ultimate_scepter','Aghanim\'s Scepter')],
    luxury: [i('heart','Heart of Tarrasque'), i('assault','Assault Cuirass'), i('refresher','Refresher Orb')],
    situational: [i('force_staff','Force Staff'), i('aether_lens','Aether Lens')],
    tips: 'Echo Slam наносит урон за каждую единицу рядом. Fissure блокирует проход — используйте чтобы разделить врагов. Blink + Fissure для инициации.',
  },
  {
    heroId: 87, // Disruptor
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('force_staff','Force Staff'), i('glimmer_cape','Glimmer Cape'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('aether_lens','Aether Lens')],
    situational: [i('ghost','Ghost Scepter'), i('blink','Blink Dagger')],
    tips: 'Glimpse возвращает врага в прошлую позицию. Kinetic Field + Static Storm = полная изоляция цели. Очень мощный в позиционной войне.',
  },
  {
    heroId: 86, // Rubick
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots'), i('aether_lens','Aether Lens')],
    core: [i('force_staff','Force Staff'), i('glimmer_cape','Glimmer Cape')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('blink','Blink Dagger')],
    situational: [i('ghost','Ghost Scepter'), i('cyclone','Eul\'s Scepter')],
    tips: 'Spell Steal копирует последнее заклинание врага. Воруйте мощные ультиметы (Ravage, Chronosphere). Aether Lens увеличивает дальность заклинаний.',
  },
  {
    heroId: 62, // Bounty Hunter
    starting: [i('circlet','Circlet'), i('tango','Tango'), i('flask','Healing Salve'), i('wind_lace','Wind Lace')],
    early: [i('magic_wand','Magic Wand'), i('phase_boots','Phase Boots'), i('orb_of_corrosion','Orb of Corrosion')],
    core: [i('invis_sword','Shadow Blade'), i('aghanims_shard','Aghanim\'s Shard'), i('black_king_bar','Black King Bar')],
    luxury: [i('abyssal_blade','Abyssal Blade'), i('silver_edge','Silver Edge'), i('butterfly','Butterfly')],
    situational: [i('diffusal_blade','Diffusal Blade'), i('force_staff','Force Staff')],
    tips: 'Track врага для бонусного золота и видения. Jinada — большой удар с замедлением. Скрытность позволяет занимать позицию для инициации.',
  },
  // --- HARD SUPPORT pos 5 ---
  {
    heroId: 5, // Crystal Maiden
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('tranquil_boots','Tranquil Boots')],
    core: [i('force_staff','Force Staff'), i('glimmer_cape','Glimmer Cape')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('aghanims_shard','Aghanim\'s Shard'), i('blink','Blink Dagger')],
    situational: [i('aether_lens','Aether Lens'), i('ghost','Ghost Scepter','Защита от физ урона')],
    tips: 'Freezing Field — мощный ультимет, но вас могут прервать. Используйте Glimmer Cape во время ульта. Crystal Nova замедляет. Arcane Aura восстанавливает ману союзникам.',
  },
  {
    heroId: 26, // Lion
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch'), i('flask','Healing Salve')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('blink','Blink Dagger'), i('aether_lens','Aether Lens'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('sheepstick','Scythe of Vyse')],
    situational: [i('force_staff','Force Staff'), i('ghost','Ghost Scepter')],
    tips: 'Earth Spike + Hex + Finger of Death = бурст убийство. Finger урон растёт с каждым убийством. Hex — жёсткий контроль. Двойной контроль делает Lion сильным.',
  },
  {
    heroId: 30, // Witch Doctor
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('force_staff','Force Staff'), i('glimmer_cape','Glimmer Cape'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('aether_lens','Aether Lens')],
    situational: [i('cyclone','Eul\'s Scepter'), i('ghost','Ghost Scepter')],
    tips: 'Death Ward — зависящий от позиции канал. Прячьтесь за деревьями во время ульта. Voodoo Restoration лечит союзников в АоЕ. Maledict хорош против высокого HP.',
  },
  {
    heroId: 37, // Warlock
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('refresher','Refresher Orb'), i('aghanims_shard','Aghanim\'s Shard'), i('force_staff','Force Staff')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('aether_lens','Aether Lens')],
    situational: [i('glimmer_cape','Glimmer Cape'), i('blink','Blink Dagger')],
    tips: 'Chaotic Offering призывает Golem при тимфайте. Shadow Word лечит союзника или наносит урон врагу. Fatal Bonds связывает врагов — урон по одному делится.',
  },
  {
    heroId: 50, // Dazzle
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('glimmer_cape','Glimmer Cape'), i('force_staff','Force Staff'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('solar_crest','Solar Crest')],
    situational: [i('aether_lens','Aether Lens'), i('ghost','Ghost Scepter')],
    tips: 'Shallow Grave не даёт умереть союзнику (HP не опустится ниже 1). Используйте в последний момент. Weave снижает броню врагов. Shadow Wave лечит цепочкой союзников.',
  },
  {
    heroId: 31, // Lich
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('force_staff','Force Staff'), i('glimmer_cape','Glimmer Cape')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('aghanims_shard','Aghanim\'s Shard'), i('aether_lens','Aether Lens')],
    situational: [i('ghost','Ghost Scepter'), i('cyclone','Eul\'s Scepter')],
    tips: 'Chain Frost — прыгающий ледяной шар. Урон растёт с каждым прыжком. Sacrifice убивает крипа союзника для маны. Frost Blast замедляет.',
  },
  {
    heroId: 64, // Jakiro
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots')],
    core: [i('force_staff','Force Staff'), i('aether_lens','Aether Lens'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('glimmer_cape','Glimmer Cape')],
    situational: [i('blink','Blink Dagger'), i('pipe','Pipe of Insight')],
    tips: 'Macropyre — длинная полоса огня. Используйте для контроля зоны или под башней. Dual Breath замедляет атаку и передвижение. Ice Path — стан по линии.',
  },
  {
    heroId: 27, // Shadow Shaman
    starting: [i('ward_observer','Observer Ward'), i('tango','Tango'), i('clarity','Clarity'), i('branches','Iron Branch')],
    early: [i('magic_wand','Magic Wand'), i('arcane_boots','Arcane Boots'), i('aether_lens','Aether Lens')],
    core: [i('blink','Blink Dagger'), i('aghanims_shard','Aghanim\'s Shard')],
    luxury: [i('ultimate_scepter','Aghanim\'s Scepter'), i('force_staff','Force Staff')],
    situational: [i('glimmer_cape','Glimmer Cape'), i('ghost','Ghost Scepter')],
    tips: 'Mass Serpent Wards разрушают башни быстро. Hex + Shackles = долгий контроль. Массово уничтожайте башни когда враг мёртв.',
  },
]

export function getBuildByHeroId(heroId: number): HeroBuild | undefined {
  return builds.find((b) => b.heroId === heroId)
}

export default builds
