import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";



export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = [] 
    lostWhiteFigures: Figure[] = [] 


    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))  //black cells
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))  // white cells
                }
            }
            this.cells.push(row);
        }
    }

    public castleableWhite(castleWhite: boolean) {
        if (castleWhite === true) {
            for (let i = 0; i < this.cells.length; i++) {
                const row = this.cells[i]
                for (let j = 0; j < row.length; j++) {
                    const target = row[j];
                    if ((target.figure instanceof King) && (target.board.getCell(6,7) === target) && (target.figure.color === Colors.WHITE)) {
                        if((target.board.getCell(7,7).figure instanceof Rook) && (target.board.getCell(7,7).figure?.rookFirstStep === true)) {
                            target.board.getCell(7,7).figure = null
                            new Rook(Colors.WHITE, this.getCell(5, 7))    
                        } 
                    }
                    if ((target.figure instanceof King) && (target.board.getCell(2,7) === target) && (target.figure.color === Colors.WHITE)) {
                        if ((target.board.getCell(0,7).figure instanceof Rook) && (target.board.getCell(0,7).figure?.rookFirstStep === true)) {
                            target.board.getCell(0,7).figure = null
                            new Rook(Colors.WHITE, this.getCell(3, 7))
                        }
                    } 
                }
            }
        }
    }

    public castleableBlack(castleBlack: boolean) {
        if (castleBlack === true) {
            for (let i = 0; i < this.cells.length; i++) {
                const row = this.cells[i]
                for (let j = 0; j < row.length; j++) {
                    const target = row[j];
                    if ((target.figure instanceof King) && (target.board.getCell(2,0) === target) && (target.figure.color === Colors.BLACK)) {
                        if((target.board.getCell(0,0).figure instanceof Rook) && (target.board.getCell(0,0).figure?.rookFirstStep === true)){
                            target.board.getCell(0,0).figure = null
                            new Rook(Colors.BLACK, this.getCell(3, 0))     
                        }
                    } 
                    if ((target.figure instanceof King) && (target.board.getCell(6,0) === target) && (target.figure.color === Colors.BLACK)) {
                        if ((target.board.getCell(7,0).figure instanceof Rook) && (target.board.getCell(7,0).figure?.rookFirstStep === true)) {
                            target.board.getCell(7,0).figure = null
                            new Rook(Colors.BLACK, this.getCell(5, 0))
                        }
                    }
                }
            }
        } 
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.lostBlackFigures = this.lostBlackFigures
        return newBoard;
    }

    public attackableCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target)   //!! change data to boleean
            } 
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public getCellName (x: number, y: number){
        const nameArr = Array.from(this.cells)
        console.log(nameArr);
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }

    public addFigures() {
        this.addBishops()
        this.addKings()
        this.addKnights()
        this.addPawns()
        this.addQueens()
        this.addRooks()
    }
}