/**
 * move = [first, second]
 * empty is 0
 * pawn is 1
 * king is 2
 * queen is 3
 * rook is 4
 * knight is 5
 * bishop is 6
 */

function neighbors(x, y) {
	var arr = [];
		for (i = x - 1; i <= x + 1; i++) {
			for (j = y - 1; j <= y + 1; j++) {
				if (i >= 0 && i < 8 && j >= 0 && j < 8) {
					arr.push([i,j]);
				}
			}
		}
	return arr;
}

function isCheck(board) {
	
}

function King(x, y, board) {
	this.x = x;
	this.y = y;
	this.board = board;
	this.validMove = function (x, y) {
		// need to check if king is checkmate
		for (l in this.validSquares()) {
			if (l[0] == x && l[1] == y) {
				return true;
			}
		}
		return false;
	}
	this.validSquares = function () {
		for (i = x - 1; i <= x + 1; i++) {
			for (j = y - 1; j <= y + 1; j++) {
				if (i >= 0 && i < 8 && j >= 0 && j < 8) {
					arr.push([i,j]);
				}
			}
		}
		return arr;
	}
}

function Queen(x, y, board) {
	this.x = x;
	this.y = y;
	this.board = board;
	this.validMove = function (x, y) {
		for (l in this.validSquares()) {
			if (l[0] == x && l[1] == y) {
				return true;
			}
		}
		return false;
	}
	this.validSquares = function () {
		for ()
	}
}

function Pawn(x, y) {
	
}

function validMove(m, board, callback) {

}

function isCheck(board, callback) {

}

/** Applies the given move to the board. Board assumed to be 8x8 */
function makeMove(m, board) {

}

/** Returns 1 if white has won, 2 if black, 3 for stalemate, 0 if neither. */
function winningSituation() {

}
