import Piece from './piece';
import BoardState from './BoardState';

export default class Pawn extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2659' : '265F';
		super(row, col, color, img);
		this.hasMoved = false;
	}

	getTargets(forCheck) {
		const possiblePieceMoves = [];
		const blackEnemyTargets = [[1, 1], [1, -1]];
		const whiteEnemyTargets = [[-1, 1], [-1, -1]];
		const cellClickedCol = this.col;
		if (BoardState.currentTurn() === 'white' || forCheck) {
			for (let i = this.row + 1; i <= this.row + 1; i++) {
				if (BoardState.isEmptyCell(i, this.col)) {
					possiblePieceMoves.push({ row: i, col: this.col });
				}
			}
			if (this.row === 1 && !forCheck) {
				for (let i = this.row + 2; i <= this.row + 2; i++) {
					if (BoardState.isEmptyCell(i - 1, cellClickedCol) && BoardState.isEmptyCell(i, cellClickedCol)) {
						possiblePieceMoves.push({ row: i, col: cellClickedCol });
					}
				}
			}
			for (let i = 0; i < blackEnemyTargets.length; i++) {
				const rowAdd = this.row + blackEnemyTargets[i][0];
				const colChange = this.col + blackEnemyTargets[i][1];
				if (BoardState.isEnemy(rowAdd, colChange)) {
					possiblePieceMoves.push({ row: rowAdd, col: colChange });
				}
			}
		} else if (BoardState.currentTurn() === 'black') {
			for (let j = this.row - 1; j >= this.row - 1; j--) {
				if (BoardState.isEmptyCell(j, this.col)) {
					possiblePieceMoves.push({ row: j, col: this.col });
				}
			}
			if (this.row === 6) {
				for (let k = this.row - 2; k >= this.row - 2; k--) {
					if (BoardState.isEmptyCell(k + 1, cellClickedCol) && BoardState.isEmptyCell(k, cellClickedCol)) {
						possiblePieceMoves.push({ row: k, col: cellClickedCol });
					}
				}
			}
			for (let j = 0; j < whiteEnemyTargets.length; j++) {
				const rowAdd = this.row - whiteEnemyTargets[j][0];
				const colChange = this.col - whiteEnemyTargets[j][1];
				if (BoardState.isEnemy(rowAdd, colChange)) {
					possiblePieceMoves.push({ row: rowAdd, col: colChange });
				}
			}
		}
//		BoardState.changeTurn();
		return possiblePieceMoves;
	}
}
