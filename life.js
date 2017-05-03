var board = [[]]; // 2d matrix
var text = "";

$(function() {
    for (var y = 10; y >= 0; y--) { // height - row - y
        var x = 0;
        board[y] = []
        text += "<tr>";
        for (x; x <= 20; x++) { // width - column - x
            if (Math.floor(Math.random() * 5) >= 4) {
                board[y][x] = new Life(x, y);
                text += "<td id=\"" + y + ":" + x + "\"><img class=\"octagon\" src=\"assets/Mesh-100.png\" /></td>";
            } else {
                board[y][x] = undefined;
                text += "<td id=\"" + y + ":" + x + "\"></td>"
            }
        }
        text += "</tr>";
    }

    console.log(board);
    document.getElementById("table").innerHTML = text;

    setInterval(tick, 4000);
})

function tick() {
    board.forEach(function(row) {
        row.forEach(function(life) {
            if (life) {
                var neighbours = 0;
                if (board[(life.y - 1) % 20][(life.x + 1) % 10]) {
                    neighbours++;
                }

                if (neighbours > 0) {
                    document.getElementById(life.x + ":" + life.y).innerHTML = "";
                    board[life.x][life.y] = undefined;
                }
            }
        }, this);
    }, this);
}

class Life {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dead = false;
    }
}