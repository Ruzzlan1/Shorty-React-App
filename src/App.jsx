import React from 'react'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Shortener from './components/Shortener'
import About from './components/About'
import Banner from './components/Banner'
import Footer from './components/Footer'
import './module.scss'

function App() {
  // Set React States

  // Button event listener for link

  // console.log(isLink)
  return (
    <div className="hero">
      <Navbar />
      <Intro />
      <Shortener />
      <About />
      <Banner />
      <Footer />
    </div>
  )
}

export default App
