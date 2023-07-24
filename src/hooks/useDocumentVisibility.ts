import { useState, useRef, useCallback, useEffect } from "react";

type Callback = (isVisible: boolean) => void
type DeleteEventListener = () => void

function getDocumentVisivility(defaultValue: boolean) {
  if (typeof document === "undefined" || defaultValue === false) return true
  return !document.hidden
}

export function useDocumentVisibility(defaultValue: boolean = false) {
  const [visible, setVisible] = useState<boolean>(getDocumentVisivility(defaultValue))
  const [count, setCount] = useState(0)
  const eventListeners = useRef<Callback[]>([])

  const onVisibilityChange = useCallback(
    (callback: Callback): DeleteEventListener => {
    eventListeners.current.push(callback)    
    return () => {
      const index = eventListeners.current.indexOf(callback)
      if(index > -1) eventListeners.current.splice(index, 1) 
    }
  }, [])

  useEffect(() => {
    function handleEvent() {
      setVisible(!document.hidden)
  
      if(document.hidden) {
        setCount((count) => count + 1)
      }
  
      eventListeners.current.forEach((callback) => {
        callback(!document.hidden)
      })
    }

    document.addEventListener('visibilitychange', handleEvent)
    return () => {
      document.removeEventListener('visibilitychange', handleEvent)
    }
  }, [])

  return {
    onVisibilityChange, 
    visible, 
    count
  }
}