import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import "./GameField.scss"
import Button from '../Button/Button';

/**
 * 
 * Модель данных карточки игры
 * 
 */
export interface CardItem {
  image: string
  isOpen: boolean
  isDone: boolean
}

/**
 * 
 * Стейт игрового поля в процессе игры
 * 
 */
export interface GameFieldState {
  finished: boolean,
  fieldLocked: boolean,
  score: number
  firstCard?: CardItem,
  secondCard?: CardItem,
  cards: CardItem[]
}

/**
 * 
 * Параметры игрового поля, хандлеры на старт / завершение игры
 * 
 */
export interface GameFieldProps {
  stopGame: () => void
  endGame: (score: number) => void
}

function GameField(props: GameFieldProps) {

  const [state, onState] = useState<GameFieldState>({
    fieldLocked: false,
    finished: false,
    score: 0,
    cards: []
  })

  /**
   * 
   * Показать карточки игроку
   * 
   */
  const hideField = () => {
    state.fieldLocked = false
    for(const card of state.cards) {
      card.isOpen = false;
    }
    onState({...state})
  }

  /**
   * 
   * Спрятать карточки
   * 
   */
  const showField = () => {
    state.fieldLocked = true
    for(const card of state.cards) {
      card.isOpen = true;
    }
    onState({...state})
    setTimeout(hideField, 5000);
  }

  /**
   * 
   * Заполнить игровое поле карточками для игры
   * 
   */
  const fillCards = () => {
    state.cards = []
    for (var i=0; i<9; i++) {
      state.cards.push(
        { image: 'img-' + (i+1), isOpen: false, isDone: false}
      )
      state.cards.push(
        { image: 'img-' + (i+1), isOpen: false, isDone: false}
      )
    }

    // Псевдо рандомайзер поля. Неэффективный т.к. не контролируется макс. дистанция между парами карт. 
    // todo: rewrite random gen
    state.cards.sort(() => Math.random() - 0.5)

    onState({...state})
  }

  /**
   * 
   * После монтирования компонента, заполнить поле, и показать игроку карточки
   * 
   */
  useEffect(()=> {
    fillCards()
    setTimeout(showField, 100)
  }, [])

  /**
   * 
   * Закрыть открытую пару карточек
   * 
   */
  const closeCards = () => {
    if (state.firstCard !== undefined && state.secondCard !== undefined) {
      state.firstCard.isOpen = false
      state.secondCard.isOpen = false
      state.firstCard = undefined
      state.secondCard = undefined
      state.fieldLocked = false
    }
    onState({...state})
  }

  /**
   * 
   * Убрать отыгранную пару карточек
   * 
   */
  const removeCards = () => {
    if (state.firstCard !== undefined && state.secondCard !== undefined) {
      state.firstCard.isDone = true
      state.secondCard.isDone = true
      state.firstCard = undefined
      state.secondCard = undefined
      state.fieldLocked = false
    }

    /**
     * 
     * Если не осталось закрытых карт на поле, показать результаты
     * 
     */
    if (state.cards.filter((card) => { return !card.isDone}).length <= 0) {
      setTimeout(() => { props.endGame(state.score) }, 500)
    }

    onState({...state})
  }

  /**
   * 
   * Проверка открытых карточек на совпадение, подсчет результатов
   * 
   */
  const checkGameField = () => {

    state.fieldLocked = false

    if (state.firstCard !== undefined && state.secondCard !== undefined) {

      state.fieldLocked = true

      if (state.secondCard.image === state.firstCard.image) {
        state.score += state.cards.filter((card) => { return !card.isDone}).length / 2
        setTimeout(removeCards, 300)
      } else {
        state.score -= state.cards.filter((card) => { return card.isDone}).length / 2
        setTimeout(closeCards, 1000)
      }
      if (state.score <= 0) state.score = 0

    }

    onState({ ...state })
  }

  /**
   * 
   * Обработчик нажатия на карточку
   * 
   * @param card 
   * @returns 
   */
  const onClickCard = (card: CardItem) => {

    if (state.fieldLocked) return
    if (card.isOpen) return
    if (card.isDone) return

    state.fieldLocked = true

    if (state.firstCard === undefined) {
      state.firstCard = card
    } else {
      state.secondCard = card
    }

    card.isOpen = true

    onState({ ...state })
    setTimeout(checkGameField, 300)
  }


  return (
    <div className='field'>
      <div className='field__score'>
        <div className='field__score_wrap'>
          Баллов: {state.score}
        </div>
      </div>
      <div className='field__cards'>
        <div className='field__cards_wrap'>
          {state.cards.map((card, card_id) => {
            return <Card
              key={card_id}
              onClick={() => onClickCard(card)}
              image={card.image}
              isOpen={card.isOpen}
              isDone={card.isDone}
            />
          })}
        </div>
      </div>
      <div className='field__actions'>
        <Button onClick={props.stopGame}>Завершить игру</Button>
      </div> 
    </div>
  );
}

export default GameField;