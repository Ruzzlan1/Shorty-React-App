import React from 'react'
import Link from './Link'

function Shortener(props) {
  // Set React States
  const [components, setComponent] = React.useState([])
  const [errors, setErrors] = React.useState('')
  const [url, setUrl] = React.useState({
    fullLink:
      'https://developers.google.com/web/updates/2016/10/addeventlistener-once',
    shortLink: '',
  })
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
      try {
        const res = await fetch(
          `https://api.shrtco.de/v2/shorten?url=${url.fullLink}`
        )
        if (res.status === 400) {
          throw new Error('no input entered')
        }

        const data = await res.json()
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
  }, [url.fullLink === ''])

  // adding event listener for get url
  function getShortUrl() {
    if (url.fullLink === '') {
      setErrors('No input inserted')
      return
    }
    if (url.shortLink === '') {
      setErrors('Invalid link inserted')
      return
    }
    console.log('Valid link inserted')
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
    console.log('Short link getted')
  }

  // for input changes
  function handleChange(event) {
    const { name, value } = event.target
    setUrl(prevUrl => {
      return {
        ...prevUrl,
        [name]: value,
      }
    })
  }
  // render component
  return (
    <div className="container">
      <div className="shortener">
        <input
          className="shortener-input"
          type="text"
          placeholder="Shorten a link here.."
          name="fullLink"
          value={url.fullLink}
          onChange={handleChange}
          required={url.requried}
        />
        <button className="btn btn-primary btn-shortener" onClick={getShortUrl}>
          Shorten it
        </button>
        {errors && <span className="error-message text-red">{errors}</span>}
      </div>
      {link}
    </div>
  )
}

export default Shortener
