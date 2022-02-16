import React from 'react'
import Link from '../components/Link'

function Shortener(props) {
  // Set React States
  const [components, setComponent] = React.useState([])
  const [url, setUrl] = React.useState({
    fullLink:
      'https://bitchesgirls.com/youtube/Valkyrae/valkyrae-youtube-nudes-feb-3-2022/',
    shortLink: '',
  })
  // create component

  const link = components.map(item => {
    return (
      <Link
        key={url.fullLink}
        fullLink={url.fullLink}
        shortLink={url.shortLink}
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
    setComponent(prevArr => [...prevArr, link])
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
        />
        <button className="btn btn-primary btn-shortener" onClick={getShortUrl}>
          Shorten it
        </button>
      </div>
      {link}
    </div>
  )
}

export default Shortener
