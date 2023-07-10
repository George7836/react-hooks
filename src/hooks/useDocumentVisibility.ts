import { useState, useRef } from "react";

type Callback = {
  (callback: boolean): void
}

export function useDocumentVisibility() {
  const [visible, setVisible] = useState<boolean>(
    typeof document !== 'undefined'
      ? document.visibilityState === 'visible'
      : true
  )
  const [count, setCount] = useState(0)
  const eventListeners = useRef<Callback[]>([])

  function handlerEvent() {
    setVisible(document.visibilityState === 'visible')

    if(document.hidden) {
      setCount((count) => count + 1)
    }

    eventListeners.current.forEach((callback) => {
      callback(document.visibilityState === 'visible')
    })
  }

  const onVisibilityChange = (callback: Callback) => {
    eventListeners.current.push(callback)
    const boundedHandler = handlerEvent.bind(null)
    document.addEventListener('visibilitychange', boundedHandler)

    return () => {
      document.removeEventListener('visibilitychange', boundedHandler)
    }
  }

  return {
    onVisibilityChange, 
    visible, 
    count
  }
}