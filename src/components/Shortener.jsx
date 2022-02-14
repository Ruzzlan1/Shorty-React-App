import React from 'react'
import Link from '../components/Link'
function Shortener() {
  return (
    <div className="container">
      <div className="shortener">
        <input
          className="shortener-input"
          type="text"
          placeholder="Shorten a link here.."
        />
        <button className="btn btn-primary btn-shortener">Shorten it</button>
      </div>
      <Link />
    </div>
  )
}

export default Shortener
