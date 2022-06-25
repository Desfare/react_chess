import React, { useEffect, useState } from "react";
import "./App.css"
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";


const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))


  useEffect(() => {
    restart()
  }, [])


  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
      />
    </div>
  );
};

export default App;
