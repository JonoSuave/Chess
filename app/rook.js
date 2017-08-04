import Piece from './piece';
import BoardState from './BoardState';

export default class Rook extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2656' : '265C';
		super(row, col, color, img);
	}
	getTargets(forCheck) {
		const possiblePieceMoves = [];
		for (let i = this.row - 1; i >= 0; i--) {
			if (BoardState.isEmptyCell(i, this.col)) {
				possiblePieceMoves.push({ row: i, col: this.col });
			} else if (!BoardState.isEmptyCell(i, this.col)) {
				if (BoardState.isEnemy(i, this.col) || forCheck) {
					possiblePieceMoves.push({ row: i, col: this.col });
					break;
				}
			}
		}
		for (let i = this.row + 1; i <= 7 && i > -1; i++) {
			if (BoardState.isEmptyCell(i, this.col)) {
				possiblePieceMoves.push({ row: i, col: this.col });
			} else if (!BoardState.isEmptyCell(i, this.col)) {
				if (BoardState.isEnemy(i, this.col)) {
					possiblePieceMoves.push({ row: i, col: this.col });
				}
			}
		}
		for (let i = this.col - 1; i >= 0; i--) {
			if (BoardState.isEmptyCell(this.row, i)) {
				possiblePieceMoves.push({ col: i, row: this.row });
			} else if (!BoardState.isEmptyCell(i, this.col)) {
				if (BoardState.isEnemy(i, this.col)) {
					possiblePieceMoves.push({ col: i, row: this.row });
					break;
				}
			}
		}
		for (let i = this.col + 1; i <= 7 && i > -1; i++) {
			if (BoardState.isEmptyCell(this.row, i)) {
				possiblePieceMoves.push({ col: i, row: this.row });
			} else if (!BoardState.isEmptyCell(i, this.col)) {
				if (BoardState.isEnemy(i, this.col)) {
					possiblePieceMoves.push({ col: i, row: this.row });
					break;
				}
			}
		}
		return possiblePieceMoves;
	}
}
