import React from 'react'
import introImg from '../images/illustration-working.svg'

function Intro() {
  return (
    <section className="intro">
      <article className="intro-article">
        <h1 className="intro-article__header">More than just shorter links</h1>
        <p className="intro-article__text">
          Build your brand's recognition and get detailed insights on how your
          links performing
        </p>
        <button className="button-primary intro-button">Get Started</button>
      </article>
      <img src={introImg} alt="Intro section" className="intro-img" />
    </section>
  )
}

export default Intro
