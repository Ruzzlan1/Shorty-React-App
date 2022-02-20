import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
        <CopyToClipboard text={props.shortLink}>
          <button
            className="btn btn-primary btn-link"
            onClick={props.handleClick}
          >
            {props.clicked}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Link
