/* eslint-disable no-unused-vars */
import React from 'react'
import FooterNav from './FooterNav'
import SocialIcons from './SocialIcons'
import { footerData } from '../../cardData'
function Footer() {
  const footerNav = footerData.map(item => {
    return (
      <FooterNav key={item.id} title={item.title} category={item.categories} />
    )
  })

  return (
    <footer className="footer-container">
      <div className="container footer">
        <h4 className="header-secondary footer-header">Shortly</h4>
        {footerNav}
        <SocialIcons />
      </div>
    </footer>
  )
}

export default Footer
