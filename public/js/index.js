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
        
        // RENDERING

          // Grab the template script
          var theTemplateScript = $("#board-template").html();
          console.log(theTemplateScript);

          // Compile the template
          var theTemplate = Handlebars.compile(theTemplateScript);

          // Define our data object
          var context = {
              board : '<div id="board" style="width: 400px"></div>'
          };

          // Pass our data to the template
          var theCompiledHtml = theTemplate(context);
          console.log(theCompiledHtml);

          // Add the compiled html to the page
          $('.content-placeholder').html(theCompiledHtml);

        
		// data = {
		// 	player: 'w',
		// 	board: 'rnbqkbnr/pppppp1p/8/6p1/5P2/8/PPPPP1PP/RNBQKBNR w KQkq g6 0 2' // should be a FEN
		// };
		var chess = new Chess(data.board);
		var s, t;
		var inMove = false, returnBack = false;
		var board;

		var onDragStart = function (source, piece, position, orientation) {
			if (piece[0] != data.player) {
				return false;
			}
		}

		var onDrop = function (source, target) {
			if (source == target) {
				return 'snapback';
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
				inMove = false;
				$('#confirmBtn').addClass('disabled');
				s = null;
				returnBack = true;	
				board.position(data.board, false);
				return 'snapback';
			} else if (tempMove === null) {
				// do something that notifies of an invalid move
				$('body').append('Invalid move bro');
				if (!inMove) {
					s = null;
				}
				return 'snapback';
			}

			// if it's valid, turn on the "confirm" button
			console.log('valid!');
			inMove = true;
			t = target;
			$('#confirmBtn').removeClass('disabled');
		}
        
		var board = ChessBoard('board', {
			position: data.board,
			draggable: true,
			dropOffBoard: 'snapback',
			onDragStart: onDragStart,
			onDrop: onDrop,
			onMoveEnd: onMoveEnd,
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
			console.log(chess.fen());
		})
	});
});
