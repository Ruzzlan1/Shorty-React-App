import React from 'react'
import Card from './Card'
import { cardData } from '../cardData'

function About() {
  const cards = cardData.map(data => {
    console.log(data)
    return <Card key={data.id} item={data} />
  })
  return (
    <div className="container">
      <section className="about">
        <h3 className="header-primary about-header">Advanced Statistics</h3>
        <p className="about-article">
          Track how your links are performing across the web with our advanced
          statistics dashboard
        </p>
        {cards}
      </section>
    </div>
  )
}

export default About
