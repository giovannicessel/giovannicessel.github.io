import { useEffect, useState } from 'react'

export function useTypewriter(text, speedMs = 100, startDelay = 0, enabled = true) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText('')
      setIsComplete(false)
      return undefined
    }

    setDisplayedText('')
    setIsComplete(false)

    let intervalId
    const start = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i += 1
        setDisplayedText(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(intervalId)
          setIsComplete(true)
        }
      }, speedMs)
    }, startDelay)

    return () => {
      clearTimeout(start)
      if (intervalId) clearInterval(intervalId)
    }
  }, [text, speedMs, startDelay, enabled])

  return { displayedText, isComplete }
}
