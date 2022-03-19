import React, { useEffect, useRef, useState } from 'react'
import Link from './Link'
import Input from './Input'
import { nanoid } from 'nanoid'
import { useOutsideAlerter, findId, getJSON } from '../../utils/helpers'
import { API_URL } from '../../utils/config'
import { MainContext } from '../../context'
import { db } from '../../firebase-config'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

// whole Component
function Shortener(props) {
  // Set React States
  const [newLink, setNewLink] = useState([])
  const [errors, setErrors] = useState({
    invalid: '',
    input: '',
  })

  const [url, setUrl] = useState({
    id: '',
    fullLink: '',
    shortLink: '',
    clicked: false,
  })

  const [isFocused, setFocused] = useState(false)
  // using input ref
  const input = useRef(null)

  const data = {
    isFocused,
    setFocused,
    ...url,
  }

  // create component
  const link = newLink.map((item, index) => {
    return (
      <Link
        key={item.id}
        item={item}
        findId={() => findId(item.id, setNewLink)}
      />
    )
  })

  // useEffect for side effects and get data from API
  useEffect(() => {
    async function getUrl() {
      if (url.fullLink === '') return
      const shorten = `shorten?url=${url?.fullLink}`
      try {
        const data = await getJSON(`${API_URL}${shorten}`)

        if (data.error_code) {
          throw Error(data.error)
        }

        const { result } = data
        // debugger
        setUrl(prevUrl => {
          return {
            ...prevUrl,
            shortLink: result?.full_short_link,
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
    getUrl()
  }, [url.fullLink])

  // Add firestore database
  const q = query(collection(db, 'links'), orderBy('timestamp', 'desc'))
  useEffect(() => {
    onSnapshot(q, snapshot => {
      setNewLink(snapshot.docs.map(doc => ({ ...doc.data() })))
    })
  }, [])

  // adding event listener for get url
  function getShortUrl(event) {
    event.preventDefault()
    // add a new link component to firestore db
    addDoc(collection(db, 'links'), {
      ...url,
      id: nanoid(),
      timestamp: serverTimestamp(),
    })

    if (!url.shortLink) {
      setErrors(prevErr => {
        return {
          ...prevErr,
          invalid: 'Invalid link inserted',
        }
      })
      // return
    }

    setErrors(prevErr => {
      return {
        ...prevErr,
        invalid: '',
      }
    })

    // set all links reset again
    setUrl(prevUrl => {
      return {
        ...prevUrl,
        fullLink: '',
        shortLink: '',
      }
    })
  }

  // for input changes
  function handleChange(event) {
    const { name, value } = event.target
    setErrors(prevErr => {
      return {
        ...prevErr,
        input: event.target.validationMessage,
      }
    })

    setUrl(prevUrl => {
      return {
        ...prevUrl,
        [name]: value,
      }
    })
  }

  // for focus changes
  useOutsideAlerter(input, setFocused)

  // render component
  return (
    <MainContext.Provider value={data}>
      <div className="container">
        <form className="shortener" onSubmit={getShortUrl}>
          <Input handleChange={handleChange} isFocused={input} />
          <button
            className="btn btn-primary btn-shortener"
            disabled={url.fullLink === ''}
          >
            Shorten it
          </button>
          {errors && (
            <>
              <span className="error-message error-message-hidden text-red">
                {errors.input}
              </span>
              <span className="text-red error-message">{errors.invalid}</span>
            </>
          )}
        </form>
        {link}
      </div>
    </MainContext.Provider>
  )
}

export default Shortener
