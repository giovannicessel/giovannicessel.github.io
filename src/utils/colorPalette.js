export const colors = {
  background: {
    primary: '#0a0e27',
    secondary: '#1a1f3a',
    variation1: '#0f1433',
    variation2: '#141a3f',
  },
  accent: {
    purple: '#6a0dad',
    purpleLight: '#9d4edd',
    blue: '#3a0ca3',
    cyan: '#00d9ff',
    green: '#39ff14',
  },
  text: {
    primary: '#e0e0e0',
    secondary: '#808080',
  },
}

export function getGradient(type) {
  const gradients = {
    hero: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #3a0ca3 100%)',
    runes: 'linear-gradient(45deg, #6a0dad 0%, #00d9ff 50%, #39ff14 100%)',
    card: 'linear-gradient(180deg, rgba(106, 13, 173, 0.1) 0%, rgba(58, 12, 163, 0.05) 100%)',
  }
  return gradients[type] ?? gradients.hero
}

export function getGlowColor(hex, alpha = 0.6) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
