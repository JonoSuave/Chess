import Piece from './piece';
import BoardState from './BoardState';

export default class Bishop extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2657' : '265D';
		super(row, col, color, img);
	}

	getTargets() {
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
				} else if (BoardState.isOnBoard(rowAdd, colAdd) && BoardState.isEnemy(rowAdd, colAdd)) {
					possiblePieceMoves.push({
						row: rowAdd,
						col: colAdd
					});
					break;
				}
			}
		}
		return possiblePieceMoves;
	}
}
