import $ from 'jquery';

export default class BoardSetup {

	createChessBoard() {
		for (let i = 0; i < 8; i++) {
			const divRow = $('<div></div>');
			divRow.addClass('row');
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 === 0) {
					const divRowBlock = $('<div></div>');
					$(divRow).append(divRowBlock);
					makeBlackSquare(divRowBlock, i, j);
//					makeCheckerImg(i, divRowBlock);
//					boardState[i][j] = pieceBuilder(i);
				} else if ((i + j) % 2 === 1) {
					const divRowBlock = $('<div></div>');
					$(divRow).append(divRowBlock);
					makeWhiteSquare(divRowBlock, i, j);
				} else {
					alert('Something is up');
				}
			}
			$('#master-div').append(divRow);
		}

		function makeBlackSquare(el, i, j) {
			el.addClass('black-cell');
			el.addClass('cell');
			const id = `${i}${j}`;
			$(el).attr('id', id);
		}

		function makeWhiteSquare(el, i, j) {
			el.addClass('white-cell');
			el.addClass('cell');
			const id = `${i}${j}`;
			$(el).attr('id', id);
		}
	}
}

