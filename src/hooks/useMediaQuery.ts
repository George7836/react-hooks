import { useEffect, useState } from "react"

type useMediaQueryProps = {
  query: string
}

export function useMediaQuery({query}: useMediaQueryProps) {
  const mql = window.matchMedia(query)
  const [check, setCheck] = useState<boolean>(mql.matches)

  function checkChanges(e: MediaQueryListEvent) {
    setCheck((check) => e.matches)
  }

  useEffect(() => {
    mql.addEventListener('change', checkChanges)
    return () => {
      mql.removeEventListener('change', checkChanges)
    }
  }, [])

  return check
}