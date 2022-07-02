import logo from '../../assets/black-king.png'
import { Cell } from '../Cell';
import { Colors } from "../Colors";

export enum FigureNames {
    FIGURE = "figure",
    KING = "king",
    KNIGHT = "knight",
    PAWN = "pawn",
    QUEEN = "queen",
    ROOK = "rook",
    BISHOP = "bishop"
}


export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell
    name: FigureNames;
    id: number;
    kingFirstStep: boolean;
    rookFirstStep: boolean

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this //deploy figure on cell as current object  circular dependence
        this.logo = null;
        this.name = FigureNames.FIGURE
        this.id = Math.random()
        this.kingFirstStep = true
        this.rookFirstStep = true
    }

    canMove(target: Cell) : boolean {
        if (target.figure?.color === this.color) return false
        if (target.figure?.name === FigureNames.KING) return false
        return true
    }

    moveFigure(target: Cell) {

    }
}