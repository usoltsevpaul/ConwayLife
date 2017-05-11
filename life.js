var board = [[]]; // 2d matrix
var text = "";
var height = 20;
var width = 40;
var interval = 250;
var ticks;
var cleanups;

$(function() {
    $("#randomize").click(randomizeBoard);
    $("#stop").click(() => stop());
    $("#go").click(() => go());
    $("#faster").click(() => faster(true));
    $("#slower").click(() => faster(false));
    $("#wider").click(() => wider(true));
    $("#narrower").click(() => wider(false));
    $("#higher").click(() => higher(true));
    $("#shorter").click(() => higher(false));
    
    randomizeBoard();
})

function stop() {
    clearInterval(ticks);
    clearInterval(cleanups);
}

function go() {
    ticks = setInterval(tick, interval);
    setTimeout(function () {
        cleanups = setInterval(cleanup, interval);
    }, interval / 2);
}

function wider(wider) {
    if (wider && width <= 65) {
        stop(); width += 5; randomizeBoard();
    } else if (!wider && width >= 20) {
        stop(); width -= 5; randomizeBoard();
    }
    document.getElementById("dimensions").innerHTML = height + " x " + width;
}

function higher(higher) {
    if (higher && height <= 20) {
        stop(); height += 5; randomizeBoard();
    } else if (!higher && height >= 10) {
        stop(); height -= 5; randomizeBoard();
    }
    document.getElementById("dimensions").innerHTML = height + " x " + width;
}

function faster(faster) {
    if (faster && interval >= 150) {
        interval -= 50; stop(); go();
    } else if (!faster && interval <= 950) {
        interval += 50; stop(); go();
    }
    document.getElementById("speed").innerHTML = interval;
}

function randomizeBoard() {
    board = [[]];
    text = "";
    for (var x = 0; x < height; x++) {
        var y = 0;
        board[x] = []
        text += "<tr>";
        for (y; y < width; y++) {
            if (Math.floor(Math.random() * 5) >= 3) {
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
}

function tick() {
    board.forEach(function(row) {
        row.forEach(function(life) {
            if (life) {
                var neighbours = 0;
                
                if (board[(life.x - 1 + height) % height][(life.y + 1) % width].state == "alive") { // 1
                    neighbours++;
                }
                if (board[(life.x) % height][(life.y + 1) % width].state == "alive") { // 2
                    neighbours++;
                }
                if (board[(life.x + 1) % height][(life.y + 1) % width].state == "alive") { // 3
                    neighbours++;
                }
                if (board[(life.x - 1 + height) % height][(life.y) % width].state == "alive") { // 4
                    neighbours++;
                }
                if (board[(life.x + 1) % height][(life.y) % width].state == "alive") { // 5
                    neighbours++;
                }
                if (board[(life.x - 1 + height) % height][(life.y - 1 + width) % width].state == "alive") { // 6
                    neighbours++;
                }
                if (board[(life.x) % height][(life.y - 1 + width) % width].state == "alive") { // 7
                    neighbours++;
                }
                if (board[(life.x + 1) % height][(life.y - 1 + width) % width].state == "alive") { // 8
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