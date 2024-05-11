import { useState } from 'react';

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);


    function handleKeyDown(e) {
        if (e.key.toLowerCase() == 'enter') {
            handleClick(e);
        }
    } 
    function handleClick(e) {
        setIsEditing(curVal => !curVal);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(e) {
        setPlayerName(e.target.value);
    }
    function handleFocus(e) {
        e.target.select();
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {
                    isEditing ?
                        <input
                            type="text"
                            required
                            value={playerName}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onFocus={handleFocus}
                        ></input> :
                        <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}