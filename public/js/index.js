// parameters needed; pass in whether they are black or white
// 1. black or white
// 2. current state of the board

// /api/newgame
// /api/newmove/<game id>
// params: new state

/*$.ajax({
	url: "./api/state/" + window.location.pathname.split('/').slice(-1)[0],
}).done(function(data) {*/
	$(document).ready(function() {
		data = {
			player: 'b',
			board: 'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19' // should be a FEN
		};
		var chess = new Chess(data.board);
		var s; 

		var onDragStart = function (source, piece, position, orientation) {
			if (piece[0] != data.player) {
				return false;
			}
		}

		var onDrop = function (source, target) {
			if (source == target) {
				return;
			}
			if (!s) {
				s = source;
			}
			var tempMove = (new Chess(data.board)).move({
				from: s,
				to: target,
				promotion: 'q',
			})
			if (target == s) {
				$('#confirmBtn').addClass('disabled');
				s = null;
				return;
			}
			// var move = chess.move({
			// 	from: s,
			// 	to: target,
			// 	promotion: 'q'
			// })
			console.log(tempMove);

			if (tempMove === null) {
				// do something that notifies of an invalid move
				$('body').append('Invalid move bro');
				return 'snapback';
			}

			// if it's valid, turn on the "confirm" button
			console.log('valid!');
			$('#confirmBtn').removeClass('disabled');
		}

		var board = ChessBoard('board', {
			position: data.board,
			draggable: true,
			dropOffBoard: 'snapback',
			onDragStart: onDragStart,
			onDrop: onDrop,
		});

		if (chess.in_checkmate()) {
			$('body').append($('h1').append("ur done fo"));
		}

		$('#startBtn').on('click', board.start);
		$('#clearBtn').on('click', board.clear);
	});
//})