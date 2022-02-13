/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import navbarLogo from '../images/logo.svg'

function Navbar() {
  const [navOpen, setNavOpen] = React.useState(false)
  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={navbarLogo} alt="Navbar Logo" />
      </div>
      {navOpen && (
        <div className="nav-wrapper">
          <ul className="nav-list nav-list__primary">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Resources
              </a>
            </li>
          </ul>
          <ul className="nav-list nav-list__secondary">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Login
              </a>
            </li>
            <a href="#" className="button button-primary nav-list__button">
              Sign Up
            </a>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
