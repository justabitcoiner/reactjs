import { useState } from 'react';
import './TicTacToe.css';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSnapshot = history[currentMove]
    const xIsNext = currentMove % 2 === 0

    function handlePlay(snapshot) {
        const nextHistory = [...history.slice(0, currentMove + 1), snapshot]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(move) {
        setCurrentMove(move)
    }

    const moves = history.map((snapshot, move) => {
        let description = 'go to move #' + move

        return <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    })

    return (
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} snapshot={currentSnapshot} onPlay={handlePlay} />
            </div>
            <div className='game-info'>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}
function Board({ xIsNext, snapshot, onPlay }) {
    const winner = calculateWinner(snapshot)
    let gameStatus = null
    if (winner) {
        gameStatus = "Winner: " + winner
    } else {
        gameStatus = "Next player: " + (xIsNext ? "X" : "O")
    }

    function handleClick(i) {
        const nextSnapshot = snapshot.slice()
        if (nextSnapshot[i] || calculateWinner(nextSnapshot)) {
            return
        }
        nextSnapshot[i] = xIsNext ? "X" : "O"
        onPlay(nextSnapshot)
    }
    return (
        <>
            <div className='status'>{gameStatus}</div>
            <div className="board-row">
                <Square value={snapshot[0]} onSquareClick={() => handleClick(0)} />
                <Square value={snapshot[1]} onSquareClick={() => handleClick(1)} />
                <Square value={snapshot[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={snapshot[3]} onSquareClick={() => handleClick(3)} />
                <Square value={snapshot[4]} onSquareClick={() => handleClick(4)} />
                <Square value={snapshot[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={snapshot[6]} onSquareClick={() => handleClick(6)} />
                <Square value={snapshot[7]} onSquareClick={() => handleClick(7)} />
                <Square value={snapshot[8]} onSquareClick={() => handleClick(8)} />
            </div>
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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}