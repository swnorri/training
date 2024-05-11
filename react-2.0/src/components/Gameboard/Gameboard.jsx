export default function Gameboard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIdx) =>
                <li key={rowIdx}>
                    <ol>
                        {row.map((playerSymbol, colIdx) =>
                            <li key={colIdx}>
                                <button
                                    onClick={() => onSelectSquare(rowIdx, colIdx)}
                                    disabled={playerSymbol}
                                >{playerSymbol}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}