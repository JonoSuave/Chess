import Piece from './piece';
import BoardState from './BoardState';

export default class King extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2654' : '265A';
		super(row, col, color, img);
	}
	getTargets(forCheck) {
		const enemyTargets = forCheck ? [] : BoardState.getEnemyTargets();
		console.log(enemyTargets);
		const targets = [];
		const targetToCheck = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
		for (let i = 0; i < targetToCheck.length; i++) {
			const rowAdd = this.row + targetToCheck[i][0];
			const colAdd = this.col + targetToCheck[i][1];
			if (BoardState.isOnBoard(rowAdd, colAdd) && (BoardState.isEnemy(rowAdd, colAdd) || BoardState.isEmptyCell(rowAdd, colAdd) || forCheck)) {
				targets.push({ row: rowAdd, col: colAdd });
			}
		}
		const targetsAvailable = targets.filter(target => !isInEnemyTargets(target));

		function isInEnemyTargets(target) {
			return enemyTargets.reduce((found, currTarget) => {
				if (found) return true;
				return (target.row === currTarget.row && target.col === currTarget.col);
			}, false);
		}

		return targetsAvailable;
//		crossCheckTargets(element) {
//
//		}

		// filter out enemy targets from targets
		// return filtered array
	}
//		for (let i = this.row + 1; i <= this.row + 1; i++) {
//			if (BoardState.isOnBoard(i, this.col)) {
//				targets.push({ row: i, col: this.col });
//			}
//		}
//		for (let i = this.row - 1; i >= this.row - 1; i--) {
//			if (BoardState.isOnBoard(i, this.col)) {
//				targets.push({ row: i, col: this.col });
//			}
//		}
//		for (let i = this.col + 1; i >= this.col + 1; i++) {
//			if (BoardState.isOnBoard(this.row, i)) {
//				targets.push({ row: this.row, col: i });
//			}
//		}
//		for (let i = this.col - 1; i >= this.col - 1; i--) {
//			if (BoardState.isOnBoard(this.row, i)) {
//				targets.push({ row: this.row, col: i });
//			}
//		}
//	}
}
