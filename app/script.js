import BoardSetup from './boardSetup';
import BoardState from './BoardState';

require('./chess.css');

const $ = require('jquery');

const domBoard = new BoardSetup();
domBoard.createChessBoard();

(() => {
	placePiecesOnBoard();

	function placePiecesOnBoard() {
		for (let i = 0; i < BoardState.state.length; i++) {
			for (let j = 0; j < BoardState.state[i].length; j++) {
				if (BoardState.state[i][j]) {
					placePiece(BoardState.state[i][j]);
				}
			}
		}
	}
	function placePiece(objectPiece) {
		$(`#${objectPiece.row}${objectPiece.col}`).append(codeToString(objectPiece.img));
		console.log(objectPiece.constructor.name);
	}
	function codeToString(code) {
		return String.fromCharCode(parseInt(code, 16));
	}

	function highlightTargets(targets) {
		removeHighlights();
		targets.forEach((target) => {
			highlight(target);
		});
	}

	function removeHighlights() {
		$('#master-div').find('.highlight').removeClass('highlight');
	}

	function highlight(target) {
//		Highlight all targets and before doing so, remove highlights beforehand
		$(`#${target.row}${target.col}`).addClass('highlight');
	}

	$(document).ready(() => {
		$('.cell').click(function () {
			const id = $(this).attr('id');
			let currPiece = BoardState.state[id[0]][id[1]];
			console.log(currPiece);
			console.log(id);
			let targets = currPiece.getTargets();
			highlightTargets(targets);
		});
	});
})();
