import Button from "../Button/Button"
import "./EndGame.scss"

interface EndGameProps {
  score: number
  time: number
  startGame: () => void
}

function EndGame(props: EndGameProps) {

  const pluralText = (n: number, str: string[]) => {  
    const cases = [2, 0, 1, 1, 1, 2];  
    return str[ (n%100>4 && n%100<20)? 2 : cases[(n%10<5)?n%10:5] ];  
  }


  return <div className="endgame">
    <img src="/endgame.png" alt=""/>
    <h1>Игра завершена!</h1>
    <p>Вы набрали <strong>{props.score}</strong> {pluralText(props.score, ['балл', 'балла', 'баллов'])}</p>
    <Button onClick={props.startGame} >Повторить игру</Button>
  </div>
}

export default EndGame