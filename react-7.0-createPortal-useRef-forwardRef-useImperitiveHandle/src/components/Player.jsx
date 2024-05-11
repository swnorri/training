import { useState, useRef } from 'react';

export default function Player() {
  const playerNameInput = useRef();
  const [playerName, setPlayerName] = useState();

  function handleSetNameClick(e){
    setPlayerName(playerNameInput.current.value);
    playerNameInput.current.value = '';
  }
  function handleFocus(e){
    e.target.select();
  }
  function handleKeyDown(e){
    if(e.key.toLowerCase() === 'enter')
      handleSetNameClick();
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input 
          ref={playerNameInput}
          type="text"
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSetNameClick}>Set Name</button>
      </p>
    </section>
  );
}
