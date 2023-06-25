import React from "react";
import Square from './Square';
import { calculateWinner } from '../lib/calculateWinner';

export default function Board({ xIsNext, squares, onPlay, draw = false }) {
    const winner = calculateWinner(squares);
    let winnerSquares = [];
    let status;

    if (winner) {
        status = "Winner: " + winner.player;
        winnerSquares = winner.squares;
    } else if (draw) {
        status = "No more moves";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(i) {
        if (winner || squares[i]) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares);
    }

    function renderSquare(i) {
        return <Square
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                winner={winnerSquares.indexOf(i) !== -1}
            />;
    }

    function renderRow(row) {
        return (
            <div className="board-row" key={row}>
                {renderSquare(row * 3 + 0)}
                {renderSquare(row * 3 + 1)}
                {renderSquare(row * 3 + 2)}
            </div>
        )
    }

    function renderBoard() {
        let board = [];
        for (let i=0; i<3; i++) {
            board.push(renderRow(i));
        }

        return board;
    }

    return (
        <div>
            <div className="status">{status}</div>

            {renderBoard()}
        </div>
    );
}