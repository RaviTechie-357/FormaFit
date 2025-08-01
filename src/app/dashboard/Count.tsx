// dashboard/Count.tsx
import React,{ useEffect, useState } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
}

export const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const current = Math.min(Math.floor((progress / duration) * end), end)
      setCount(current)
      if (current < end) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [end, duration])

  return <span>{count.toLocaleString()}{suffix}</span>
}
