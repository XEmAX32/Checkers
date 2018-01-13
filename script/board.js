var board = document.getElementById("chess-board"),
    ctx = board.getContext("2d");

const u = board.width / 8,
    white = "#e5e5e5",
    black = "#000",
    crown = "script/crown.svg";

var game = {
        data: {
            turn: 1,
            pos1: 0,
            pos2
        },
        pos: {
            11: 1,
            21: 0,
            31: 1,
            41: 0,
            51: 1,
            61: 0,
            71: 1,
            81: 0,
            12: 0,
            22: 1,
            32: 0,
            42: 1,
            52: 0,
            62: 1,
            72: 0,
            82: 1,
            13: 1,
            23: 0,
            43: 1,
            43: 0,
            53: 1,
            63: 0,
            73: 1,
            83: 0,
            14: 0,
            24: 0,
            34: 0,
            44: 0,
            54: 0,
            64: 0,
            74: 0,
            84: 0,
            15: 0,
            25: 0,
            35: 0,
            45: 0,
            55: 0,
            65: 0,
            75: 0,
            85: 0,
            16: 0,
            26: 2,
            36: 0,
            46: 2,
            56: 0,
            66: 2,
            76: 0,
            86: 2,
            17: 2,
            27: 0,
            37: 2,
            47: 0,
            57: 2,
            67: 0,
            77: 2,
            87: 0,
            18: 0,
            28: 2,
            38: 0,
            48: 2,
            58: 0,
            68: 2,
            78: 0,
            88: 2
        },
        init: function() {
            if (board.height == board.width) {
                game.createBoard();
                board.addEventListener("click", game.piece.analizeClick, false);
                document.getElementById("turn").innerHTML = "" + turn;
            } else {
                console.error("Error: board width and height must be the same size!");
                ctx.font = "60px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#b20000";
                ctx.fillText("Error", board.width / 2, board.height / 2);
            }
        },
        createBoard: function() {
            for (var n = 0; n < 4; n++) {
                for (var m = 0; m < 4; m++) {
                    ctx.beginPath();
                    ctx.rect(n * u * 2, m * u * 2, u, u);
                    ctx.rect((2 * n + 1) * u, (2 * m + 1) * u, u, u);
                    ctx.fillStyle = "#856342";
                    ctx.fill();
                    ctx.closePath();
                }
            }
            for (var m = 1; m < 9; m++) {
                for (var n = 1; n < 9; n++) {
                    if (game.pos[m * 10 + n] != 0) {
                        if (game.pos[m * 10 + n] == 2) {
                            var color = 2;
                        } else {
                            var color = 1;
                        }
                        game.piece.create(m, n, color)
                    }
                }
            }
        },
        getTurn: function() {
            var t = 1;
            if (game.data.turn % 2 == 1) {
                t = 2;
            }
            return t;
        },
        convert: function(pos) {
            pos = pos.toString();
            var y = parseInt(pos.slice(1, 2)),
                x = parseInt(pos.slice(0, 1));
            return [x, y];
        },
        piece: {
            create: function(x, y, color, crown) {
                ctx.beginPath();
                ctx.arc((x * u) - u / 2, (y * u) - u / 2, u * 0.4, 0, 2 * Math.PI);
                if (color == 1) {
                    ctx.fillStyle = "" + white;
                } else {
                    ctx.fillStyle = "" + black;
                }
                if (crown == true) {
                    ctx.drawImage(crown, (x * u) - u / 2, (x * u) - u / 2);
                }
                ctx.fill();
                ctx.closePath();
            },
            remove: function(x, y) {
                ctx.beginPath();
                ctx.rect((x - 1) * u, (y - 1) * u, u, u);
                if (game.cell.getColor(x * 10 + y) == "white") {
                    ctx.fillStyle = "#856342";
                } else {
                    ctx.fillStyle = "#FFFEC6";
                }
                ctx.fill();
                ctx.closePath();
            },
            move: function() {
                var pos1 = game.convert(game.data.pos1),
                    pos2 = game.convert(game.data.pos2);

                game.piece.remove(pos1[0], pos1[1]);
            },
            analizeClick: function(e) {
                var x = Math.round(e.clientX / u),
                    y = Math.round(e.clientY / u),
                    pos = x * 10 + y,
                    dif = pos2 - pos1,
                    num = pos1 - ((pos1 - pos2) / 2);
                if (game.pos[pos] == game.getTurn()) {
                    game.data.pos1 = pos;
                } else
                if (game.pos[pos] == 0 && game.data.pos1 !== 0) {
                    if ((9, 18, 11, 22).includes(Math.abs(dif))) {
                        /*Check if the move is possible for that type of piece (queen or not)*/
                        if (Math.sign(dif) == -1 && game.piece.isQueen() == false) { return; }
                        if (Math.sign(num) == 1) { game.data.num == num; }
                        game.piece.move();
                    }
                }
            },
            /*Ricorda: da riscrivere*/
            isQueen: function(pos) {
                var v = game.pos[pos].toString();
                if (v.search("q")) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        cell: {
            isEmpty: function(x, y) {
                if (game.pos[x * 10 + y] == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            getColor: function(x, y) {
                var color = "white";
                if ((x + y) % 2 == 1) {
                    color = "black";
                }
                return color;
            }
        }
    }
