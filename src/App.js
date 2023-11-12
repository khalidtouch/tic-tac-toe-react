import { useState } from "react";

function Board({ isFirstPlayer, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : "Next player: " + (isFirstPlayer ? "X" : "O");

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    isFirstPlayer == true ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  function resetGame() {
    onPlay(Array(9).fill(null));
  }

  // returns true if board is populated and false otherwise
  function boardPopulated(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] != "X" || squares[i] != "O") return false;
    }
    return true;
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(0)} value={squares[0]} />
        <Square onSquareClick={() => handleClick(1)} value={squares[1]} />
        <Square onSquareClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(3)} value={squares[3]} />
        <Square onSquareClick={() => handleClick(4)} value={squares[4]} />
        <Square onSquareClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="board-row">
        <Square onSquareClick={() => handleClick(6)} value={squares[6]} />
        <Square onSquareClick={() => handleClick(7)} value={squares[7]} />
        <Square onSquareClick={() => handleClick(8)} value={squares[8]} />
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Game() {
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, updateCurrentMove] = useState(0)
  const currentSquares = history[currentMove];

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move) }>{description}</button>
      </li>
    )
  });

  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    updateCurrentMove(nextHistory.length - 1);
    setIsFirstPlayer(!isFirstPlayer);
  }

  function jumpTo(nextMove) {
    updateCurrentMove(nextMove);
    setIsFirstPlayer(nextMove % 2 === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          isFirstPlayer={isFirstPlayer}
          onPlay={handlePlay}
          squares={currentSquares}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
