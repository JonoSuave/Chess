import Rook from './rook';
import Knight from './Knight';
import Bishop from './bishop';
import King from './King';
import Queen from './Queen';
import Pawn from './Pawn';

export default class Board {
	constructor() {
		this.state = [
			[new Rook(0, 0, 'white'), new Knight(0, 1, 'white'), new Bishop(0, 2, 'white'), new King(0, 3, 'white'), new Queen(0, 4, 'white'), new Bishop(0, 5, 'white'), new Knight(0, 6, 'white'), new Rook(0, 7, 'white')],
			[new Pawn(1, 0, 'white'), new Pawn(1, 1, 'white'), new Pawn(1, 2, 'white'), new Pawn(1, 3, 'white'), new Pawn(1, 4, 'white'), new Pawn(1, 5, 'white'), new Pawn(1, 6, 'white'), new Pawn(1, 7, 'white')],
//			new Array(8),
			new Array(8),
			[null, null, null, new King(3, 3, 'black'), null, null, null, null],
			[null, null, null, null, new Bishop(4, 4, 'black'), null, null, null],
//			new Array(8),
			new Array(8),
			[new Rook(6, 0, 'black'), new Pawn(6, 1, 'black'), new Pawn(6, 2, 'black'), new Pawn(6, 3, 'black'), new Pawn(6, 4, 'black'), new Pawn(6, 5, 'black'), new Pawn(6, 6, 'black'), new Pawn(6, 7, 'black')],
			[new Rook(7, 0, 'black'), new Knight(7, 1, 'black'), new Bishop(7, 2, 'black'), new Knight(7, 3, 'black'), new Queen(7, 4, 'black'), new Bishop(7, 5, 'black'), new Knight(7, 6, 'black'), new Rook(7, 7, 'black')]
		];

		this.turn = 'white';
	}

	currentTurn() {
		this.turn = this.turn === 'white' ? 'white' : 'black';
		return this.turn;
	}

	changeTurn() {
		this.turn = this.turn === 'white' ? 'black' : 'white';
		return this.turn;
	}

	isEmptyCell(row, col) {
		return (!this.state[row][col] && this.isOnBoard(row, col));
	}

	isEnemy(row, col) {
		return this.state[row][col] && this.state[row][col].color !== this.turn;
	}

	isOnBoard(row, col) {
		return ((row < 8 && row > -1) && (col < 8 && col > -1));
	}

	getEnemyTargets() {
		let enemyTargets = [];
		this.state.forEach((row) => {
			row.filter(rowElement => rowElement).forEach((element) => {
				if (!this.isEmptyCell(element.row, element.col) && this.isEnemy(element.row, element.col)) {
				//					getEnemyTargets =[...getEnemyTargets, ...element.getTargets(true)];
					enemyTargets = enemyTargets.concat(element.getTargets(true));
					console.log(enemyTargets);
				}
			});
		});
		return enemyTargets;
	}

	isTarget(clickedPiece, targetsArr) {
		for(let i = 0; i < targetsArr.length; i++) {
			if(targetsArr[i].row === clickedPiece.row && targetsArr[i].col = clickedPiece.col) {
				return true;
			}
		}
	}
	
	movePiece(pieceMoved, newLocation) {
		this.state[newLocation[row]][newLocation[col]] = this.state[pieceMoved[row]][pieceMoved[col]];
	}
}
