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

    setTimeout(function () {
        setInterval(cleanup, 4000);
    }, 2000)
})

function tick() {
    board.forEach(function(row) {
        row.forEach(function(life) {
            if (life) {
                var neighbours = 0;
                if (board[(life.y) % 20][(life.x) % 10]) {
                    neighbours++;
                }

                if (Math.floor(Math.random() * 5) >= 3) {
                    life.state = "dying";
                } else {
                    life.state = "born";
                }
            }
        }, this);
    }, this);
}

function cleanup() {
     board.forEach(function(row) {
        row.forEach(function(life) {
            if (life) {
                if (life.state == "dying") {
                    document.getElementById(life.y + ":" + life.x).innerHTML = "";
                    life.state = "dead";
                } else if (life.state == "born") {
                    document.getElementById(life.y + ":" + life.x).innerHTML = "<img class=\"octagon\" src=\"assets/Mesh-100.png\" />";
                    life.state = "alive";
                }
            }
        }, this);
     }, this);
}

class Life {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = "dead"; // "born", "alive", "dying", "dead"
    }
}