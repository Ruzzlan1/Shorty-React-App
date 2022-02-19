import React from 'react'

const Input = props => {
  return (
    <input
      className="shortener-input"
      type="url"
      placeholder="Shorten a link here.."
      name="fullLink"
      value={props.fullLink}
      onChange={props.handleChange}
      required
      pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})"
      autoFocus
      ref={props.isFocused}
      focused={props.focus}
    />
  )
}

export default Input
