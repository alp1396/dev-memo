import Button from "../Button/Button"
import "./Welcome.scss"

interface WelcomeProps {
  startGame: () => void
}

function Welcome(props: WelcomeProps) {
  
  return <div className="welcome">
    <img src="/welcome.png" alt=""/>
    <h1>Игра Memory</h1>
    <Button onClick={() => { props.startGame() }}>Начать игру!</Button>
  </div>
  
}

export default Welcome
