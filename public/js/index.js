var fenToArray = function (fenfirst) {
	// only takes first part of fen
	var mapping = {
		'r': 3,
		'n': 5,
		'b': 4,
		'q': 2,
		'k': 1,
		'p': 6,
		'P': 12,
		'R': 9,
		'N': 11,
		'B': 10,
		'Q': 8,
		'K': 7,
	}
	var arr = [];
	var f = fenfirst.split();
	for (var i = 0; i < f.length; i++) {
		var arr2 = [];
		for (var j = 0; j < f[i].length; j++) {
			if (!isNaN(f[i][j])) {
				for (var k = 0; k < parseInt(f[i][j]); k++) {
					arr2.push(0);
				}
			} else {
				arr2.push(mapping[f[i][j]]);
			}
		}
		arr.push(arr2);
	}
	return arr;
}

$.ajax({
	url: "./api/state/" + window.location.pathname.split('/').slice(-1)[0],
}).done(function(data) {
	$(document).ready(function() {
        // REMOVE
        data = {
			player: 'w',
			board: 'rnbqkbnr/pppppp1p/8/6p1/5P2/8/PPPPP1PP/RNBQKBNR w KQkq g6 0 2' // should be a FEN
		};
        
		var chess = new Chess(data.board);
		var s, t;
		var board;

		var onDragStart = function (source, piece, position, orientation) {
			if (piece[0] != data.board.split(' ')[1]) {
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
                $('.message').removeClass('hidden');
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
				url: './api/new_move/' + window.location.pathname.split('/').slice(-1)[0],
				data: {
					fen: chess.fen(),
					board: fenToArray(chess.fen()),
					position: chess.fen().split(' ')[0],
					player: chess.fen().split(' ')[1],
					castle: chess.fen().split(' ')[2],
					enpassant: chess.fen().split(' ')[3],
					halfmove: chess.fen().split(' ')[4],
					fullmove: chess.fen().split(' ')[5],
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
		});
	});
});
