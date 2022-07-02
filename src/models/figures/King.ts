import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from "../../assets/black-king.png"
import whitelogo from "../../assets/white-king.png"
import { Rook } from "./Rook";

export class King extends Figure {

    isFirstStepKing = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell) : boolean {
        if (!super.canMove(target)) return false
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        if(this.cell.isCastleableRight(target) 
        && this.isFirstStepKing 
        && this.kingFirstStep 
        /* && (this.cell.board.getCell(7,7).figure?.rookFirstStep === true && this.cell.board.getCell(4,7).figure?.kingFirstStep === true)  */
        && (target.x === this.cell.x + 2)) return true

        if(this.cell.isCastleableLeft(target) 
        && this.isFirstStepKing 
        && this.kingFirstStep 
        /* && (this.cell.board.getCell(0,7).figure?.rookFirstStep === true) */  
        && (target.x === this.cell.x - 2)) return true
        return (dx === 1 && dy === 1) || (dx === 1 && dy === 1) || (dx === 0 && dy === 1) || (dx === 1 && dy === 0)
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStepKing = false;
        this.kingFirstStep = false;
    }
}