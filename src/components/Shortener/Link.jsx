import React from 'react'

function Link(props) {
  // Set React States

  return (
    <div className="link">
      <div className="link-container">
        <a href={props.fullLink} className="full-link">
          {props.fullLink}
        </a>
        <a href={props.shortLink} className="short-link">
          {props.shortLink}
        </a>
        <button className="btn btn-primary btn-link">Copy</button>
      </div>
    </div>
  )
}

export default Link
