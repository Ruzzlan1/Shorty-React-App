import React from 'react'
// import Link from '../components/Link'
function Shortener() {
  return (
    <div className="shortener-container">
      <input
        className="shortener-input"
        type="text"
        placeholder="Shorten a link here.."
      />
      <button className="button button-primary shortener-button">
        Shorten it
      </button>
    </div>
  )
}

export default Shortener
