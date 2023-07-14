import { useEffect, useState } from "react"

type useMediaQueryProps = {
  query: string
}

function getMatches(query: string) {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches
  }
  return false
}

export function useMediaQuery({query}: useMediaQueryProps) {
  const [check, setCheck] = useState(getMatches(query))

  function handleChange() {
    setCheck(getMatches(query))
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    handleChange()
    mediaQueryList.addEventListener('change', handleChange)
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return check
}