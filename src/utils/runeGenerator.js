const ALL_RUNES = [
  'ᚠ',
  'ᚢ',
  'ᚦ',
  'ᚨ',
  'ᚱ',
  'ᚲ',
  'ᚷ',
  'ᚹ',
  'ᚺ',
  'ᚻ',
  'ᚼ',
  'ᚽ',
  'ᚾ',
  'ᚿ',
  'ᛁ',
  'ᛂ',
  'ᛃ',
  'ᛄ',
  'ᛅ',
  'ᛆ',
  'ᛇ',
  'ᛈ',
  'ᛉ',
]

export function getRandomRune() {
  return ALL_RUNES[Math.floor(Math.random() * ALL_RUNES.length)]
}

export function generateRuneString(length = 10) {
  return Array.from({ length }, () => getRandomRune()).join(' ')
}

export function getAllRunes() {
  return [...ALL_RUNES]
}

export function getRuneByIndex(index) {
  const i = ((index % ALL_RUNES.length) + ALL_RUNES.length) % ALL_RUNES.length
  return ALL_RUNES[i]
}
