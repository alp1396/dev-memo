import React from 'react'
import "./Card.scss"

interface CardProps {
  image: string
  isOpen: boolean
  isDone: boolean
  onClick: () => void
}

function Card(props: CardProps) {

  return (
    <div 
      className={'card ' 
        + (props.isOpen ? 'card-open ' : '') 
        + (props.isDone ? 'card-done ' : '')
      } 
      onClick={props.onClick}
    >
      <div className='card__content'>
        <div className='card__front'>
          <img src="/front.png" alt=''></img>
        </div>
        <div className='card__back'>
          <img src={"/cards/" + props.image + '.png'} alt=''/>
        </div>
      </div>
    </div>
  );

}

export default Card;