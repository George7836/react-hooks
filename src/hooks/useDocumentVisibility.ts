import { useState, useRef, useCallback, useEffect } from "react";

type Callback = (isVisible: boolean) => void
type DeleteEventListener = () => void

function getDocumentVisivility() {
  if (typeof document === "undefined") return true
  return !document.hidden
}

export function useDocumentVisibility() {
  const [visible, setVisible] = useState<boolean>(getDocumentVisivility())
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
      setVisible(getDocumentVisivility())
  
      if(document.hidden) {
        setCount((count) => count + 1)
      }
  
      eventListeners.current.forEach((callback) => {
        callback(getDocumentVisivility())
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