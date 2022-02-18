/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import fbIcon from '../../images/icon-facebook.svg'
import twIcon from '../../images/icon-twitter.svg'
import pintIcon from '../../images/icon-pinterest.svg'
import instaIcon from '../../images/icon-instagram.svg'

function SocialIcons() {
  return (
    <ul className="social-icons">
      <a href="#" className="social-icons__link">
        <img src={fbIcon} alt="facebook logo" />
      </a>
      <a href="#" className="social-icons__link">
        <img src={twIcon} alt="facebook logo" />
      </a>
      <a href="#" className="social-icons__link">
        <img src={pintIcon} alt="facebook logo" />
      </a>
      <a href="#" className="social-icons__link">
        <img src={instaIcon} alt="facebook logo" />
      </a>
    </ul>
  )
}

export default SocialIcons
