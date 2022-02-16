/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

function Link(props) {
  // Set React States

  return (
    <div className="link">
      <div className="link-container">
        <a href="#" className="full-link">
          {props.fullLink}
        </a>
        <a href="#" className="short-link">
          {props.shortLink}
        </a>
        <button className="btn btn-primary btn-link">Copy</button>
      </div>
    </div>
  )
}

export default Link
