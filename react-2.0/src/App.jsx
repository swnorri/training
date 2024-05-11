import { useState } from 'react';
import { WINNING_COMBINATIONS } from './components/WinningCombos/WinningCombos.js';

import Player from "./components/Player/Player.jsx";
import Gameboard from "./components/Gameboard/Gameboard.jsx";
import Log from "./components/Logs/Log.jsx";
import Gameover from "./components/Gameboard/Gameover.jsx";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};
const INITGAMESTATE = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns, players) {
  return gameTurns.length > 0 && gameTurns[0].player == 'X' ? 'O' : 'X';
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combo of WINNING_COMBINATIONS) {
    const firstSquareCombo = gameBoard[combo[0].row][combo[0].column];
    const secondSquareCombo = gameBoard[combo[1].row][combo[1].column];
    const thirdSquareCombo = gameBoard[combo[2].row][combo[2].column];

    if (firstSquareCombo &&
      firstSquareCombo === secondSquareCombo &&
      firstSquareCombo === thirdSquareCombo
    ) {
      winner = players[firstSquareCombo];
    }
  }
  return winner;
}
function deriveGameboar(gameTurns) {
  let gameBoard = [...INITGAMESTATE].map(inner => [...inner]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboar(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns(prevTurns => {
      const curPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [{
        square: {
          row: rowIdx,
          col: colIdx
        },
        player: curPlayer
      }, ...prevTurns];

      return updateTurns;
    });
  }
  function handleRestart() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((cur) => {
      return {
        ...cur,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} onRestart={handleRestart} />}
        <Gameboard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;