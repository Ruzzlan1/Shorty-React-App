import cardImg from '../../images/icon-brand-recognition.svg'

function Card(props) {
  return (
    <div className="card-wrapper">
      <img src={cardImg} alt="Card image" className="card-image" />
      <div className="card">
        <h4 className="header-primary card-header">{props.item.title}</h4>
        <p className="card-article">{props.item.description}</p>
      </div>
    </div>
  )
}

export default Card
