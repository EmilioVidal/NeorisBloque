import React from 'react'

const Game = ({count, plus}) => {
  return (
    <div>
      <div>
        <h2>{count}</h2>
        <br />
        <button onClick={plus}>aumentar</button>
    </div>
    </div>
  );
}

export default Game
