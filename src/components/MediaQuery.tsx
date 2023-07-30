import React from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

type renderProp = {
  (matches: boolean): React.ReactNode
}

type MediaQueryProps = {
  minWidth?: number | `${number}px`
  maxWidth?: number | `${number}px`
  minHeigth?: number | `${number}px`
  maxHeigth?: number | `${number}px`
  minResolution?: number | `${number}dppx`
  maxResolution?: number | `${number}dppx`
  orientation?: "portrait" | "landscape"
  children: React.ReactNode | renderProp
  defaultValue?: boolean
}

export function MediaQuery({children, defaultValue = false, ...props}: MediaQueryProps) {
  function returnQuery() {
    const queries:string[] = []
    Object.entries(props).forEach(([key, value]) => {
      const property: string = key.replace(/([A-Z])/g, '-$&').toLowerCase()
      switch(property) {
        case 'orientation':
          queries.push(`(orientation: ${value})`)
          break;
        case 'min-resolution':
        case 'max-resolution':
          queries.push(`(${property}: ${typeof value === 'number' ? value + 'dppx' : value})`)
          break;
        default:
          queries.push(`(${property}: ${typeof value === 'number' ? value + 'px' : value})`)
      }
    })
    return queries.join(' and ')
  }

  const mediaQueryList = useMediaQuery({ query: returnQuery(), defaultValue: defaultValue })

  if(typeof children === 'function') return <>{children(mediaQueryList)}</>
  if(mediaQueryList) return <>{children}</>
  return null
}