/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
function FooterNav(props) {
  return (
    <ul className="footer-nav">
      <p className="footer-nav__header">{props.title}</p>
      <li className="footer-nav__item">
        <a href="#" className="footer-nav__link">
          {props.category.one}
        </a>
      </li>
      <li className="footer-nav__item">
        <a href="#" className="footer-nav__link">
          {props.category.two}
        </a>
      </li>
      <li className="footer-nav__item">
        <a href="#" className="footer-nav__link">
          {props.category.three}
        </a>
      </li>
      {
        <li className="footer-nav__item">
          <a href="#" className="footer-nav__link">
            {props.category.four}
          </a>
        </li>
      }
    </ul>
  )
}

export default FooterNav
