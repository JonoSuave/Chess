import Piece from './piece';
import BoardState from './BoardState';

export default class Knight extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2658' : '265E';
		super(row, col, color, img);
	}

	getTargets() {
		const possiblePieceMoves = [];
		const targetsToCheck = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, -2], [1, 2], [-1, -2], [-1, 2]];
		for (let i = 0; i < targetsToCheck.length; i++) {
			const rowAdd = this.row + targetsToCheck[i][0];
			const colAdd = this.col + targetsToCheck[i][1];
			if (BoardState.isOnBoard(rowAdd, colAdd) && BoardState.isEmptyCell(rowAdd, colAdd)) {
				possiblePieceMoves.push({ row: rowAdd, col: colAdd });
			}
		}
		return possiblePieceMoves;
	}
}
