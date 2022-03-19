import React, { useEffect } from 'react'
import { TIMEOUT_SEC } from './config'

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

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`))
    }, s * 1000)
  })
}

export const getJSON = async url => {
  try {
    const fetchPromise = await fetch(url)
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)])
    const data = await res.json()

    return data
  } catch (error) {
    throw error
  }
}
