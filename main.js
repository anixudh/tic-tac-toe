const gameBoard = (()=>{
    //let boardArr=['X','O','X','X','O','O','X','X','O'];
    let boardArr=[];

    const setBoardArr=(newArr)=>{ boardArr=newArr;}

    const getBoardArr=()=>{ return boardArr; };

    const fillBoard = () =>{
        //const gameGrid=document.querySelector(".game-grid");
        for(let i=0;i<9;i++){
            let grid=document.querySelector(`.grid-${i+1}`);
            grid.textContent=boardArr[i];
        }
    }
    const checkTie=()=>{
        for(let i=0;i<9;i++){
            if(boardArr[i]==undefined) return false;
        }
        return true;
    }
    const checkWin=()=>{
        if(boardArr[0]===boardArr[1] && boardArr[0]===boardArr[2] && boardArr[0]!=undefined) return true;
        if(boardArr[3]===boardArr[4] && boardArr[3]===boardArr[5] && boardArr[3]!=undefined) return true;
        if(boardArr[6]===boardArr[7] && boardArr[6]===boardArr[8] && boardArr[6]!=undefined) return true;

        if(boardArr[0]===boardArr[3] && boardArr[0]===boardArr[6] && boardArr[0]!=undefined) return true;
        if(boardArr[1]===boardArr[4] && boardArr[1]===boardArr[7] && boardArr[1]!=undefined) return true;
        if(boardArr[2]===boardArr[5] && boardArr[2]===boardArr[8] && boardArr[2]!=undefined) return true;

        if(boardArr[0]===boardArr[4] && boardArr[0]===boardArr[8] && boardArr[4]!=undefined) return true;
        if(boardArr[2]===boardArr[4] && boardArr[2]===boardArr[6] && boardArr[4]!=undefined) return true;

        return false;
    }

    return{
        setBoardArr,
        getBoardArr,
        fillBoard,
        checkTie,
        checkWin
    };

})();

const playerControl=(()=>{

    let turn=document.querySelector(".turn");
    let p1name="Player 1";
    let p2name="Player 2";

    const setP1Name=(newName)=>{
        p1name=newName;
    }

    const setP2Name=(newName)=>{
        p2name=newName;
    }

    const playerOne=()=>{
        return 'X';
    }
    
    const playerTwo=()=>{
        return 'O';
    }

    let current=1;

    const changeTurn=()=>{
        if(current==1) current=2;
        else current=1;

    }

    const displayPlayer=()=>{
        turn.textContent="Current Turn  : "+(current==1?`${p2name}: '${playerTwo()}'`:`${p1name}: '${playerOne()}'`);
        return current;
    }

    const gameEnd=(res)=>{
        let result=document.querySelector(".result");
        if(res=="tie") result.textContent="It's a tie!";
        else result.textContent=(current==1?`${p2name}: '${playerTwo()}' won the game!`:`${p1name}: '${playerOne()}' won the game!`);
        grids.removeEventListener('click',clickedGrid);
        turn.textContent="";
    }

    return{
        setP1Name,
        setP2Name,
        playerOne,
        playerTwo,
        changeTurn,
        displayPlayer,
        gameEnd
    };
})();

const clickedGrid=e=>{

    //console.log(e.target.className);

    let i=parseInt(e.target.className.substr(e.target.className.length-1,1),10)-1;

    let boardArr=gameBoard.getBoardArr;
    //console.log(boardArr[i])

    if(boardArr[i]!=undefined){
        //playerControl.changeTurn();
        return;
    }

    if(playerControl.displayPlayer()==1) boardArr[i]=playerControl.playerOne();
    else boardArr[i]=playerControl.playerTwo();
    playerControl.changeTurn();

    gameBoard.setBoardArr(boardArr);
    gameBoard.fillBoard();

    if(gameBoard.checkWin()) playerControl.gameEnd("end"); //playerControl.gameEnd();
    else if(gameBoard.checkTie()) playerControl.gameEnd("tie");
    
};

const submitNames=e=>{
    let p1name=document.querySelector("#player1").value;
    let p2name=document.querySelector("#player2").value;
    playerControl.setP1Name(p1name);
    playerControl.setP2Name(p2name);
    document.querySelector(".form").style.display="none";
    document.querySelector(".turn").textContent=`Current Turn-${p1name}: '${playerControl.playerOne()}'`;
    console.log(gameBoard.getBoardArr());
};

const resetGame=e=>{
    /*gameBoard.setBoardArr([]);
    gameBoard.fillBoard();
    document.querySelector("#player1").value="";
    document.querySelector("#player2").value="";
    document.querySelector(".form").style.display="flex";*/
    location.reload();
};

gameBoard.fillBoard();


const grids=document.querySelector(".game-grid");
grids.addEventListener('click',clickedGrid);


const submit=document.querySelector(".submit");
submit.addEventListener('click',submitNames);

const reset=document.querySelector(".reset");
reset.addEventListener('click',resetGame);