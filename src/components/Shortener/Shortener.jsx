import React, { useRef } from 'react'
import Link from './Link'
import Input from './Input'

function Shortener(props) {
  // Set React States
  const [components, setComponent] = React.useState([])
  const [errors, setErrors] = React.useState({
    invalid: '',
    input: '',
  })
  const [url, setUrl] = React.useState({
    fullLink: '',
    shortLink: '',
  })
  const input = useRef(null)
  const [isFocused, setFocused] = React.useState(false)
  // create component
  const link = components.map((item, index) => {
    return (
      <Link
        key={item.key}
        fullLink={item.fullLink}
        shortLink={item.shortLink}
      />
    )
  })

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
        console.log(result)
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
  function getShortUrl(event) {
    event.preventDefault()

    if (!url.shortLink || url.shortLink === '') {
      console.log('Invalid link')
      setErrors(prevErr => {
        return {
          ...prevErr,
          invalid: 'Invalid link inserted',
        }
      })
      return
    }

    setComponent([
      ...components,
      {
        key: Math.random() * 1000,
        ...url,
      },
    ])
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
    // setErrors(event.target.validationMessage)
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
