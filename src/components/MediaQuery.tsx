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
}

export function MediaQuery({
  minWidth, 
  maxWidth, 
  minHeigth, 
  maxHeigth, 
  minResolution, 
  maxResolution, 
  orientation, 
  children}: MediaQueryProps) {
  function returnQuery() {
    const query: string[] = []
    if(minWidth) {
      if(typeof minWidth === 'number') query.push(`(min-width: ${minWidth}px)`) 
      else query.push(`(min-width: ${minWidth})`)
    }
    if(maxWidth) {
      if(typeof maxWidth === 'number') query.push(`(max-width: ${maxWidth}px)`)
      else query.push(`(max-width: ${maxWidth})`)
    }
    if(minHeigth) {
      if(typeof minHeigth === 'number') query.push(`(min-heigth: ${minHeigth}px)`)
      else query.push(`(min-heigth: ${minHeigth})`)
    }
    if(maxHeigth) {
      if(typeof maxHeigth === 'number') query.push(`(max-heigth: ${maxHeigth}px)`)
      else query.push(`(max-heigth: ${maxHeigth})`)
    }
    if(minResolution) {
      if(typeof minResolution === 'number') query.push(`(min-resolution: ${minResolution}dppx)`) 
      else query.push(`(min-resolution: ${minResolution})`)
    }
    if(maxResolution) {
      if(typeof maxResolution === 'number') query.push(`(min-resolution: ${maxResolution}dppx)`) 
      else query.push(`(min-resolution: ${maxResolution})`)
    }
    if(orientation) {
      query.push(`(orientation: ${orientation})`)
    }
    return query.join(' and ')
  }

  const mediaQueryList = useMediaQuery({ query: returnQuery() })

  if(typeof children === 'function') return <>{children(mediaQueryList)}</>
  if(mediaQueryList) return <>{children}</>
  return null
}