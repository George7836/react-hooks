import React from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

type callback = {
  (matches: boolean): React.ReactNode
}

type MediaQueryProps = {
  minWidth?: number
  maxWidth?: number
  minHeigth?: number
  maxHeigth?: number
  minResolution?: string
  maxResolution?: string
  orientation?: string
  children: React.ReactNode | callback
}

export default function MediaQuery({
  minWidth, 
  maxWidth, 
  minHeigth, 
  maxHeigth, 
  minResolution, 
  maxResolution, 
  orientation, 
  children}: MediaQueryProps) {
  const mql = useMediaQuery({ query: returnQuery() })

  function returnQuery() {
    let query: string
    if(minWidth) {
      query = `(min-width: ${minWidth}px)`
    }
    if(maxWidth) {
      query = `(max-width: ${maxWidth}px)`
    }
    if(minHeigth) {
      query = `(min-heigth: ${minHeigth}px)`
    }
    if(maxHeigth) {
      query = `(min-heigth: ${minHeigth}px)`
    }
    if(minResolution) {
      query = `(min-resolution: ${minResolution})`
    }
    if(maxResolution) {
      query = `(max-resolution: ${maxResolution})`
    }
    if(orientation) {
      query = `(orientation: ${orientation})`
    }
    return query!
  }

  if(typeof children === 'function') return <>{children(mql)}</>
  else if(mql) return  <>{children}</>
  else return null
}