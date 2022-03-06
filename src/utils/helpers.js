import React, { useEffect } from 'react'

export const useOutsideAlerter = (ref, setter) => {
  useEffect(() => {
    //Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setter(true)
      } else {
        setter(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export const findId = (id, component) => {
  component(oldState =>
    oldState.map(item => {
      if (item.id !== id) return item
      return { ...item, clicked: true }
    })
  )
}
