const gameBoard = (()=>{
    //let boardArr=['X','O','X','X','O','O','X','X','O'];
    let boardArr=[];

    const setBoardArr=(newArr)=>{ boardArr=newArr; }

    const getBoardArr=()=>{ return boardArr; };

    const fillBoard = () =>{
        //const gameGrid=document.querySelector(".game-grid");
        for(let i=0;i<9;i++){
            let grid=document.querySelector(`.grid-${i+1}`);
            grid.textContent=boardArr[i];
        }
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
        checkWin
    };

})();

const playerControl=(()=>{

    let turn=document.querySelector(".turn");

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
        turn.textContent="Current Turn-"+(current==1?`Player two: '${playerTwo()}'`:`Player one: '${playerOne()}'`);
        return current;
    }

    const gameEnd=()=>{
        let result=document.querySelector(".result");
        result.textContent=(current==1?`Player two: '${playerTwo()}' won the game!`:`Player one: '${playerOne()}' won the game!`);
        grids.removeEventListener('click',clickedGrid);
        turn.textContent="";
    }

    return{
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

    if(gameBoard.checkWin()) playerControl.gameEnd(); //playerControl.gameEnd();
};

gameBoard.fillBoard();


const grids=document.querySelector(".game-grid");
grids.addEventListener('click',clickedGrid);
