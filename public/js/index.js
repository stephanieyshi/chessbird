// parameters needed; pass in whether they are black or white
// 1. black or white
// 2. current state of the board

// /api/newgame
// /api/newmove/<game id>
// params: new state

$.ajax({
	url: "./api/state/" + window.location.pathname.split('/').slice(-1)[0],
}).done(function(data) {
	$(document).ready(function() {
		var chess = new Chess(data.board);
		var s, t;
		var board;

		var onDragStart = function (source, piece, position, orientation) {
			if (piece[0] != data.board.split()[1]) {
				return false;
			}
		}

		var onDrop = function (source, target) {
			if (source == target) {
				return 'snapback';
			}
			var tempMove = (new Chess(data.board)).move({
				from: source,
				to: target,
				promotion: 'q',
			})
			if (tempMove === null) {
				$('body').append('Invalid move bro');
				return 'snapback';
			}

			// if it's valid, turn on the "confirm" button
			$('.ui.modal').modal('show');
			s = source;
			t = target;
		}
        
		var board = ChessBoard('board', {
			position: data.board,
			draggable: true,
			dropOffBoard: 'snapback',
			onDragStart: onDragStart,
			onDrop: onDrop,
			snapbackSpeed: 0,
		});

		if (chess.in_checkmate()) {
			$('body').append($('h1').append("ur done fo"));
		}

		$('#startBtn').on('click', board.start);
		$('#clearBtn').on('click', board.clear);
        
		$('#confirmBtn').on('click', function () {
			var move = chess.move({
				from: s,
				to: t,
				promotion: 'q'
			})
			$.ajax({
				url: './api/newmove',
				data: {
					board: chess.fen(),
					id: window.location.pathname.split('/').slice(-1)[0]
				},
				type: 'post',
				contentType: 'application/json',
				success: function (result) {
					window.location.href = result.redirect
				}
			})
		});
		$('#declineBtn').on('click', function () {
			board.position(data.board, false);
		})
	});
});
