let boxes= document.querySelectorAll(".box");
let resetbutton=document.querySelector("#reset-button");
let newGamebtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let audioTurn = new Audio("ting.mp3")
let audioOver = new Audio("gameover.mp3")
let audioWin = new Audio("win.mp3")
let turnO= true; //playerX, playerO
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame=() =>{
    turnO= true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};
boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if(turnO){
            box.innerText = "O";
            turnO= false;
            audioTurn.play();
        } else {
            box.innerText="X";
            turnO = true;
            audioTurn.play();
        }
        box.disabled = true;
        count++;
        let iswinner= checkWinner();

        if(count ===9 && !iswinner){
            gameDraw();
            
        }
    });
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    audioOver.play();
};

const disabledBoxes = () =>{
    for(let box of boxes){
        box.disabled= true;
    }
};
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
};
const showWinner = (winner) =>{
msg.innerText = `congratulations,Winner is ${winner}`;
msgContainer.classList.remove("hide");
disabledBoxes();
audioWin.play();

};
const checkWinner=() =>{
    for (let pattern of winPatterns){
      let pos1Val= boxes[pattern[0]].innerText;
      let pos2Val= boxes[pattern[1]].innerText;
      let pos3Val= boxes [pattern[2]].innerText;
       
    if (pos1Val != "" && pos2Val !=""&& pos3Val !=""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
        }
    }
    
    }
};

    
 

newGamebtn.addEventListener("click",resetGame);
resetbutton.addEventListener("click",resetGame);