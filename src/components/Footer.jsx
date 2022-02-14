/* eslint-disable no-unused-vars */
import React from 'react'
import FooterNav from './FooterNav'
import SocialIcons from './SocialIcons'
import { footerData } from '../cardData'
function Footer() {
  const footerNav = footerData.map((item, index) => {
    return (
      <FooterNav key={item.id} title={item.title} category={item.categories} />
    )
  })

  return (
    <footer className="footer">
      <h4 className="header-secondary footer-header">Shortly</h4>
      {footerNav}
      {/* <FooterNav /> */}
      <SocialIcons />
    </footer>
  )
}

export default Footer
