// parameters needed; pass in whether they are black or white
// 1. black or white
// 2. current state of the board
data = {
	player: 'w',
	board: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R'
}
/*$.ajax({
	url: "./api/state/" + window.location.pathname.split('/').slice(-1)[0],
}).done(function(data) {*/
	$(document).ready(function() {
		var chess = new Chess();

		var onDragStart = function (source, piece, position, orientation) {
			if (piece[0] != data.player) {
				return false;
			}
		}

		var onDrop = function (source, target) {
			var move = chess.move({
				from: source,
				to: target,
				promotion: 'q'
			})

			if (move === null) {
				// do something that notifies of an invalid move
				$('body').append('Invalid move bro');
				return 'snapback';
			}

			// if it's valid, turn on the "confirm" button 
			console.log('valid!');
		}

		var board = ChessBoard('board', {
			position: data.board,
			draggable: true,
			dropOffBoard: 'snapback',
			onDragStart: onDragStart,
			onDrop: onDrop,
		});

		$('#startBtn').on('click', board.start);
		$('#clearBtn').on('click', board.clear);
	});
//})