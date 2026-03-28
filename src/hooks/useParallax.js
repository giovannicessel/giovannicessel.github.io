import { useScroll, useTransform } from 'framer-motion'

export function useScrollParallax(inputRange = [0, 600], outputRange = [0, 80]) {
  const { scrollY } = useScroll()
  return useTransform(scrollY, inputRange, outputRange)
}
