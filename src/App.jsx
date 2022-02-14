import React from 'react'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Shortener from './components/Shortener'
import About from './components/About'
import Banner from './components/Banner'
import Footer from './components/Footer'
import './module.scss'

function App() {
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
