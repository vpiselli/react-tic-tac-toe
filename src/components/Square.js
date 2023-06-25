import React from "react";

export default function Square({ value, onSquareClick, winner=false }) {
    return (
        <button
        className={`square ${winner ? "winner" : ""}`}
        onClick={onSquareClick}
        >{value}</button>
    );
}