import { useState, useRef } from "react";

type Callback = {
  id?: number
  (isVisible: boolean): void
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
    callback.id = createId()
    eventListeners.current.push(callback)
    const boundedHandler = handlerEvent.bind(null)
    document.addEventListener('visibilitychange', boundedHandler)

    return () => {
      document.removeEventListener('visibilitychange', boundedHandler)
      eventListeners.current = eventListeners.current.filter((el) => el.id !== callback.id)
    }
  }

  function createId() {
    let id = Math.random()
    const check = eventListeners.current.find((el) => el.id === id)
    if(check) {
      createId()
    }
    return id
  }

  return {
    onVisibilityChange, 
    visible, 
    count
  }
}