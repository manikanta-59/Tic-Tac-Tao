let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let count = 0;


let turnO = true; //playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgcontainer.classList.add("hide");
    count=0;

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            //playerO
            box.innerText = "O";
            turnO = false;
        } else {
            //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        console.log(count)

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }

    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;

    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledBoxes();

}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                showWinner(pos1Val);
                return true;
            }
        }
    }

};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcontainer.classList.remove("hide");
  disabledBoxes();
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
