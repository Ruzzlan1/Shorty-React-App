import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function Link(props) {
  return (
    <div className="link">
      <div className="link-container">
        <a href={props.item.fullLink} className="full-link">
          {props.item.fullLink}
        </a>
        <a href={props.item.shortLink} className="short-link">
          {props.item.shortLink}
        </a>
        <CopyToClipboard text={props.item.shortLink}>
          <button className="btn btn-primary btn-link" onClick={props.findId}>
            {props.item.clicked ? 'Copied' : 'Copy'}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Link
// https://facebook.com
