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
    let query: string[] = []
    if(minWidth) {
      query.push(`(min-width: ${minWidth}px)`) 
    }
    if(maxWidth) {
      query.push(`(max-width: ${maxWidth}px)`)
    }
    if(minHeigth) {
      query.push(`(min-heigth: ${minHeigth}px)`)
    }
    if(maxHeigth) {
      query.push(`(min-heigth: ${minHeigth}px)`)
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