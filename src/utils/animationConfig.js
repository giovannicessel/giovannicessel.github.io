export const transitionConfig = {
  fast: { duration: 0.15, ease: 'easeOut' },
  normal: { duration: 0.3, ease: [0.42, 0, 0.58, 1] },
  slow: { duration: 0.6, ease: 'easeInOut' },
  bounce: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: transitionConfig.normal,
}
