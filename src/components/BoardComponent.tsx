import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { King } from '../models/figures/King';
import { Rook } from '../models/figures/Rook';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null;
    swapPlayer: () => void;
}


const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [castleWhite, setCastleWhite] = useState<boolean>(true)
    const [castleBlack, setCastleBlack] = useState<boolean>(true)
    const numberArr = [8, 7, 6, 5, 4, 3, 2, 1]
    const letterArr = ["A", "B", "C", "D", "E", "F", "G", "H"]

    
    function click (cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell) 
            }
        }
    }

    function cancelCastlingWhite() {
        for (let i = 0; i < board.cells.length; i++) {
            const row = board.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                if ((target.figure instanceof King) && (target.figure.color === Colors.WHITE) && target.figure.kingFirstStep === true) {
                    return setCastleWhite(true)
                } 
            }
        } return setCastleWhite(false)
    }

    function cancelCastlingBlack() {
        for (let i = 0; i < board.cells.length; i++) {
            const row = board.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                if ((target.figure instanceof King) && (target.figure.color === Colors.BLACK) && target.figure.kingFirstStep === true) {
                    return setCastleBlack(true)
                } 
            }
        } return setCastleBlack(false)
    }

    useEffect(() => {
        castleableWhite()
        cancelCastlingWhite()
    },[castleWhite, selectedCell])

    useEffect(() => {
        castleableBlack()
        cancelCastlingBlack()
    },[castleBlack, selectedCell])


    useEffect(() => {
        attackableCells()
    }, [selectedCell])

    function attackableCells() {
        board.attackableCells(selectedCell)
        updateBoard()
    }

    function castleableWhite() {
        board.castleableWhite(castleWhite)
    }

    function castleableBlack() {
        board.castleableBlack(castleBlack)
    }

    function updateBoard() {
       const newBoard = board.getCopyBoard()
       setBoard(newBoard)
    }


    return (
        <div className="chess">
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                        <CellComponent
                                key={cell.id}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                click={click}
                        />
                        )}
                    </React.Fragment>
                )}
            </div>
            <div className="numberColumn">
                {numberArr.map(number =>
                    <div key={number}>{number}</div>
                )}
            </div>
            <div className="letterColumn">
                {letterArr.map(letter =>
                    <div key={letter}>{letter}</div>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;