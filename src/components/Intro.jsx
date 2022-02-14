import React from 'react'
import introImg from '../images/illustration-working.svg'

function Intro() {
  return (
    <div className="bg-white">
      <div className="container bg-white">
        <section className="intro">
          <img src={introImg} alt="Intro section" className="intro-img" />
          <article className="intro-article">
            <h1 className="header-primary intro-article__header">
              More than just shorter links
            </h1>
            <p className="text-primary intro-article__text">
              Build your brand's recognition and get detailed insights on how
              your links performing
            </p>
            <button className="btn btn-primary intro-button">
              Get Started
            </button>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Intro
