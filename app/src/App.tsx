import React, { useState } from 'react';
import GameField from './Components/GameField/GameField';
import Welcome from './Components/Welcome/Welcome';
import EndGame from './Components/EndGame/EndGame';

/**
 * 
 * Глобальный статус игры
 * 
 */
enum GameState {
  welcome,
  game,
  endgame,
}

/**
 * 
 * Основной стейт приложения
 * 
 */
interface AppGameState {
  state: GameState,
  score: number,
  
  /**
   * 
   * Возможность начисления очков за скорость
   * учет времени на игру
   * 
   */
  time: number,
  start: number,

  /**
   * 
   * Возможность подсчета таблицы рекордов
   * 
   */
  highscores: {
    [key: string]: {
      name: string,
      score: number,
      time: number,
    }
  }
}

function App() {

  const [state, onState] = useState<AppGameState>({
    state: GameState.welcome,
    score: 0,
    start: Date.now(),
    time: 0,
    highscores: {},
  });

  /**
   * 
   * Обнуление статистики, новая игра
   * 
   */
  const startGame = () => {
    state.score = 0
    state.start = Date.now()
    state.time = 0
    state.state = GameState.game
    onState({ ...state })
  }
  
  /**
   * 
   * Конец игры, вывод результатов
   * 
   */
  const endGame = (score: number) => {
    state.time = Date.now() - state.start
    state.score = score
    state.state = GameState.endgame
    onState({ ...state })
  }

  /**
   * 
   * Остановка текущей игры и переход в меню
   * 
   */
  const stopGame = () => {
    state.state = GameState.welcome
    onState({ ...state })
  }

  return (
    <div className="App">
      {state.state === GameState.welcome &&
        <Welcome startGame={startGame} />
      }
      {state.state === GameState.game &&
        <GameField stopGame={stopGame} endGame={endGame} />
      }
      {state.state === GameState.endgame &&
        <EndGame score={state.score} time={state.time} startGame={startGame} />
      }
    </div>
  );
}

export default App;
