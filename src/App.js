import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Shortener from './components/Shortener'
import About from './components/About'
import Banner from './components/Banner'
import Footer from './components/Footer'
import './style.scss'

function App() {
  return (
    // <div className="App">
    <div className="container">
      <Navbar />
      <Intro />
      <Shortener />
      <About />
      <Banner />
      <Footer />
    </div>
    // </div>
  )
}

export default App
