var board = [[]]; // 2d matrix
var text = "";
var width = 40;
var height = 375;
var interval = 100;

$(function() {
    for (var x = 0; x < width; x++) {
        var y = 0;
        board[x] = []
        text += "<tr>";
        for (y; y < height; y++) {
            if (Math.floor(Math.random() * 5) >= 4) {
                board[x][y] = new Life(x, y, "alive");
                text += "<td id=\"" + x + "," + y + "\"><img class=\"octagon\" src=\"assets/Mesh-100.png\" /></td>";
            } else {
                board[x][y] = new Life(x, y, "dead");
                text += "<td id=\"" + x + "," + y + "\"></td>"
            }
        }
        text += "</tr>";
    }

    document.getElementById("table").innerHTML = text;
    setInterval(tick, interval);
    setTimeout(function () {
        setInterval(cleanup, interval);
    }, interval / 2)
})

function tick() {
    board.forEach(function(row) {
        row.forEach(function(life) {
            if (life) {
                var neighbours = 0;
                
                if (board[(life.x - 1 + width) % width][(life.y + 1) % height].state == "alive") { // 1
                    neighbours++;
                }
                if (board[(life.x) % width][(life.y + 1) % height].state == "alive") { // 2
                    neighbours++;
                }
                if (board[(life.x + 1) % width][(life.y + 1) % height].state == "alive") { // 3
                    neighbours++;
                }
                if (board[(life.x - 1 + width) % width][(life.y) % height].state == "alive") { // 4
                    neighbours++;
                }
                if (board[(life.x + 1) % width][(life.y) % height].state == "alive") { // 5
                    neighbours++;
                }
                if (board[(life.x - 1 + width) % width][(life.y - 1 + height) % height].state == "alive") { // 6
                    neighbours++;
                }
                if (board[(life.x) % width][(life.y - 1 + height) % height].state == "alive") { // 7
                    neighbours++;
                }
                if (board[(life.x + 1) % width][(life.y - 1 + height) % height].state == "alive") { // 8
                    neighbours++;
                }

                if (life.state == "alive" && (neighbours < 2 || neighbours > 3)) {
                    life.state = "dying";
                } else if (life.state == "dead" && neighbours == 3) {
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
                    document.getElementById(life.x + "," + life.y).innerHTML = "";
                    life.state = "dead";
                } else if (life.state == "born") {
                    document.getElementById(life.x + "," + life.y).innerHTML = "<img class=\"octagon\" src=\"assets/Mesh-100.png\" />";
                    life.state = "alive";
                }
            }
        }, this);
     }, this);
}

class Life {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state; // "born", "alive", "dying", "dead"
    }
}