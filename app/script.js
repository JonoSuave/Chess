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

	function removeDomPiece(objectPiece) {
		$(`#${objectPiece.row}${objectPiece.col}`).html('');
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

	let targets = [];
	let selection;

	$(document).ready(() => {
		$('.cell').click(function () {
			const id = $(this).attr('id');
			const currPiece = BoardState.state[id[0]][id[1]];
			console.log(currPiece);
			console.log(id);
			if (currPiece !== null && currPiece.color === BoardState.turn) {
				targets = currPiece.getTargets();
				highlightTargets(targets);
				selection = currPiece;
			} else if (currPiece !== null && BoardState.isEnemy(currPiece.row, currPiece.col) && BoardState.isTarget(currPiece, targets)) {
//				Going to use a spread operator
				const selectionCopy = Object.assign({}, selection);
				BoardState.movePiece(selection, currPiece);
				removeDomPiece(selection);
				removeDomPiece(selectionCopy);
				placePiece(selection);
				BoardState.changeTurn();
				removeHighlights();
			} else if (BoardState.isTarget({ row: +id[0], col: +id[1] }, targets)) {
				BoardState.movePiece(selection, { row: +id[0], col: +id[1] });
				removeDomPiece(selection);
				placePiece(selection);
				BoardState.changeTurn();
				removeHighlights();
			}
		});
	});
})();
