/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

function Link() {
  const [isMobile, setIsMobile] = React.useState(false)
  return (
    <div className="link-container">
      {isMobile && (
        <a href="#" className="full-link">
          https://scrimba.com/learn/learnreact/
        </a>
      )}
      <a href="#" className="short-link">
        shorturl.at/xCMV1
      </a>
      <button className="btn btn-primary btn-link">Copy</button>
    </div>
  )
}

export default Link
