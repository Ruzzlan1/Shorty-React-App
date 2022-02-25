import React, { useRef } from 'react'
import Link from './Link'
import Input from './Input'
import { nanoid } from 'nanoid'

function Shortener(props) {
  // Set React States
  const [newLink, setNewLink] = React.useState([])
  const [errors, setErrors] = React.useState({
    invalid: '',
    input: '',
  })
  const [url, setUrl] = React.useState({
    id: '',
    fullLink: 'https://www.typescriptlang.org/',
    shortLink: '',
    clicked: false,
  })

  const input = useRef(null)
  const [isFocused, setFocused] = React.useState(false)

  const [clicked, setClicked] = React.useState(false)

  // create component
  const link = newLink.map((item, index) => {
    return (
      <Link
        key={item.id}
        fullLink={item.fullLink}
        shortLink={item.shortLink}
        item={item}
        findId={() => findCurrentId(item.id)}
        clicked={item.clicked}
      />
    )
  })

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

    // Add new link data
    setNewLink([
      ...newLink,
      {
        ...url,
        id: nanoid(),
      },
    ])

    // set all links reset again
    setUrl(prevUrl => {
      return {
        ...prevUrl,
        fullLink: '',
        shortLink: '',
      }
    })
  }

  function findCurrentId(id) {
    console.log(id)
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

  // adding event listener for get url

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
