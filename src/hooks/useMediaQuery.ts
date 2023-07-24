import { useEffect, useState } from "react"

type useMediaQueryProps = {
  query: string
  defaultValue?: boolean
}

function getMatches(query: string, defaultValue: boolean) {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches
  }
  return defaultValue
}

export function useMediaQuery({query, defaultValue = false}: useMediaQueryProps) {
  const [check, setCheck] = useState(getMatches(query, defaultValue))

  function handleChange() {
    setCheck(getMatches(query, defaultValue))
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