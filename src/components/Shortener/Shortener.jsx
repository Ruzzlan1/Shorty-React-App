import React, { useEffect, useRef } from 'react'
import Link from './Link'
import Input from './Input'
import { nanoid } from 'nanoid'
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
  const [newLink, setNewLink] = React.useState([])
  const [errors, setErrors] = React.useState({
    invalid: '',
    input: '',
  })
  const [url, setUrl] = React.useState({
    id: '',
    fullLink: '',
    shortLink: '',
    clicked: false,
  })
  const [isFocused, setFocused] = React.useState(false)
  // using input ref
  const input = useRef(null)

  // create component
  const link = newLink.map((item, index) => {
    return (
      <Link
        key={item.id}
        fullLink={item.fullLink}
        shortLink={item.shortLink}
        item={item}
        findId={() => findIdAndChangeCopyText(item.id)}
        clicked={item.clicked}
      />
    )
  })

  function findIdAndChangeCopyText(id) {
    setNewLink(oldLink =>
      oldLink.map(link => {
        if (link.id !== id) return link
        return { ...link, clicked: true }
      })
    )
  }

  // useEffect for side effects and get data from API
  React.useEffect(() => {
    async function getUrl() {
      if (url.fullLink === '') return
      const shorten = `shorten?url=${url?.fullLink}`
      try {
        const res = await fetch(
          // handle no url error at the beginning
          `https://api.shrtco.de/v2/${shorten}`
        )

        const data = await res.json()
        if (data.error_code) {
          throw Error(data.error)
        }

        const { result } = data
        // console.log(result)
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
    if (!url.shortLink || url.shortLink === '') {
      setErrors(prevErr => {
        return {
          ...prevErr,
          invalid: 'Invalid link inserted',
        }
      })
      return
    } else {
      setErrors(prevErr => {
        return {
          ...prevErr,
          invalid: '',
        }
      })
    }

    // set all links reset again
    setUrl(prevUrl => {
      return {
        ...prevUrl,
        fullLink: '',
        shortLink: '',
      }
    })

    // add a new link component to firestore db
    addDoc(collection(db, 'links'), {
      ...url,
      id: nanoid(),
      timestamp: serverTimestamp(),
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
  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFocused(true)
        } else {
          setFocused(false)
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
  useOutsideAlerter(input)

  // render component
  return (
    <div className="container">
      <form className="shortener" onSubmit={getShortUrl}>
        <Input
          fullLink={url.fullLink}
          handleChange={handleChange}
          isFocused={input}
          focus={isFocused.toString()}
        />
        <button className="btn btn-primary btn-shortener">Shorten it</button>
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
  )
}

export default Shortener
