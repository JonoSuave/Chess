import Piece from './piece';
import BoardState from './BoardState';

export default class Queen extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2655' : '265B';
		super(row, col, color, img);
	}
	getTargets(forCheck) {
		const possiblePieceMoves = [];
		const selfRow = this.row;
		const selfCol = this.col;
		getTargetsHelper(1, 1, selfRow, selfCol);
		getTargetsHelper(1, -1, selfRow, selfCol);
		getTargetsHelper(-1, 1, selfRow, selfCol);
		getTargetsHelper(-1, -1, selfRow, selfCol);

		function getTargetsHelper(changeRow, changeCol) {
			const clickedRow = selfRow;
			const clickedCol = selfCol;
			for (let i = clickedRow + changeRow, j = clickedCol + changeCol; i > -8 && i < 8 && j > -8 && j < 8; i += changeRow, j += changeCol) {
				const rowAdd = i;
				const colAdd = j;
				if (BoardState.isOnBoard(rowAdd, colAdd) && BoardState.isEmptyCell(rowAdd, colAdd)) {
					possiblePieceMoves.push({
						row: rowAdd,
						col: colAdd
					});
				} else if (BoardState.isOnBoard(rowAdd, colAdd) && BoardState.isEnemy(rowAdd, colAdd) || forCheck) {
					possiblePieceMoves.push({
						row: rowAdd,
						col: colAdd
					});
					break;
				} else if (BoardState.isOnBoard(rowAdd, colAdd) && !BoardState.isEmptyCell(rowAdd, colAdd)) {
					break;
				}
			}
		}
		for (let i = this.row - 1; i >= 0; i--) {
			if (BoardState.isEmptyCell(i, this.col)) {
				possiblePieceMoves.push({ row: i, col: this.col });
			} else if (!BoardState.isEmptyCell(i, this.col)) {
				if (BoardState.isEnemy(i, this.col)) {
					possiblePieceMoves.push({ row: i, col: this.col });
					break;
				} else {
					break;
				}
			}
		}
		for (let i = this.row + 1; i <= 7; i++) {
			if (BoardState.isEmptyCell(i, this.col)) {
				possiblePieceMoves.push({ row: i, col: this.col });
			} else if (!BoardState.isEmptyCell(i, this.col)) {
				if (BoardState.isEnemy(i, this.col)) {
					possiblePieceMoves.push({ row: i, col: this.col });
					break;
				} else {
					break;
				}
			}
		}
		for (let i = this.col - 1; i >= 0; i--) {
			if (BoardState.isEmptyCell(this.row, i)) {
				possiblePieceMoves.push({ col: i, row: this.row });
			} else if (!BoardState.isEmptyCell(this.row, i) && BoardState.isEnemy(this.row, i)) {
				possiblePieceMoves.push({ col: i, row: this.row });
				break;
			} else {
				break;
			}
		}
		for (let i = this.col + 1; i <= 7; i++) {
			if (BoardState.isEmptyCell(this.row, i)) {
				possiblePieceMoves.push({ col: i, row: this.row });
			} else if (!BoardState.isEmptyCell(this.row, i) && BoardState.isEnemy(this.row, i)) {
				possiblePieceMoves.push({ col: i, row: this.row });
				break;
			} else {
				break;
			}
		}
		return possiblePieceMoves;
	}
}
