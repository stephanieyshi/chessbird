/**
 * move = [first, second]
 * pawn is 0
 * king is 1
 * queen is 2
 * rook is 3
 * knight is 4
 * bishop is 5
 */

function King(x, y, board) {
	this.x = x;
	this.y = y;
	this.board;
	this.validMove = function (x, y) {
		for (l in this.validSquares()) {
			if (l[0] == x && l[1] == y) {
				return true;
			}
		}
		return false;
	}
	this.validSquares = function () {
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
}

function Queen(x, y) {
	this.x = x;
	this.y = y;
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
