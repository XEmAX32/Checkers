var board = document.getElementById("chess-board"),
    ctx = board.getContext("2d"),
    game = {
        createBoard: function(){
            for (var n = 0; n < 4; n++) {
                for (var m = 0; m < 4; m++) {
                    ctx.beginPath();
                    ctx.rect(n * 75, m * 75, 37.5, 37.5);
                    ctx.rect((2 * n + 1) * 37.5, (2 * m + 1) * 37.5, 37.5, 37.5);
                    ctx.fillStyle = "#856342";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    };
