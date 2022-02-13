/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
function Link() {
  return (
    <div className="link-container">
      <a href="#" className="full-link">
        https://scrimba.com/learn/learnreact/
      </a>
      <a href="#" className="short-link"></a>
      <button className="link-button">Copy</button>
    </div>
  )
}

export default Link
