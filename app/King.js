import Piece from './piece';
import BoardState from './BoardState';

export default class King extends Piece {
	constructor(row, col, color) {
		const img = color === 'white' ? '2654' : '265A';
		super(row, col, color, img);
	}
	getTargets() {
		const enemyTargets = BoardState.getEnemyTargets();
		console.log(enemyTargets);
	}
}
