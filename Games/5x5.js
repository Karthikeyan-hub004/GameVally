document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let turn = "X";
    let isGameOver = false;
    let result = document.getElementById("result");
    let playButton = document.getElementById("play");
    let xWins = 0; 
    let oWins = 0;
    let xWinsDisplay = document.getElementById("xWins"); 
    let oWinsDisplay = document.getElementById("oWins");

     // Initialize the board
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove("x", "o");
        box.addEventListener("click", () => {
            if (!isGameOver && box.innerHTML === "") {
                box.innerHTML = turn;
                box.classList.add(turn.toLowerCase());
                checkWin();
                checkDraw();
                changeTurn();
            }
        });
    }); 

    // Function to change the turn
    
        function changeTurn() {
            if(turn === "X"){
                turn = "O";
            document.querySelector(".bg").style.left ='85px';
            document.querySelector(".bg").style.background= 'red';
            }else{
                turn = "X";
                document.querySelector(".bg").style.left ='0px';
                document.querySelector(".bg").style.background= 'aqua';
            }
        }

    // Function to check for a win
    function checkWin() {
        const winPatterns = [
            [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24,], // Rows
            [0,5,10,15,20],[1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23],[4,9,14,19,24], // Columns
            [0,6,12,18,24], [4,8,12,16,20]             // Diagonals
        ];

        winPatterns.forEach(pattern => {
            if (boxes[pattern[0]].innerHTML !== "" &&
                boxes[pattern[0]].innerHTML === boxes[pattern[1]].innerHTML &&
                boxes[pattern[1]].innerHTML === boxes[pattern[2]].innerHTML &&
                boxes[pattern[2]].innerHTML === boxes[pattern[3]].innerHTML &&
                boxes[pattern[3]].innerHTML === boxes[pattern[4]].innerHTML) {
                isGameOver = true;
                if (turn === "X") {
                     xWins++;
                      xWinsDisplay.innerHTML = xWins; 
                    } else {
                         oWins++;
                          oWinsDisplay.innerHTML = oWins; 
                        }
                result.innerHTML = `Player ${turn} WINS!`;
                result.style.display = "block";
            }
        });
    }

    // Function to check for a draw
    function checkDraw() {
        const isDraw = [...boxes].every(box => box.innerHTML !== "");
        if (isDraw && !isGameOver) {
            isGameOver = true;
            result.innerHTML = "It's a DRAW!";
            result.style.display = "block";
        }
    }

    // Reset the game
    playButton.addEventListener("click", () => {
        boxes.forEach(box => {
            box.innerHTML = "";
            box.classList.remove("x", "o");
        });
        turn = "X";
        document.querySelector(".bg").style.left ='0px';
        document.querySelector(".bg").style.background='aqua';
        isGameOver = false;
        result.style.display = "none";
    });
});
