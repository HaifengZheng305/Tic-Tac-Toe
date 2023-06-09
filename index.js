const virtualBoard = (() => {
  const boardContent = ["", "", "", "", "", "", "", "", ""];

  const placeSymbol = (symbol, index) => {
    boardContent[index] = symbol;
  };

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      boardContent[i] = "";
    }
  };

  return { placeSymbol, resetBoard, boardContent };
})();




const player = (__symbol) => {
  const symbol = __symbol;
  const score = 0;

  return { symbol, score };
};




const physicalBoard = (() => {
  const fields = document.querySelectorAll(".fields");
  const message = document.querySelector(".message");
  const scoreBoard = document.querySelectorAll(".player_score");
  const resetButton = document.querySelector(".reset");

  fields.forEach(function (field) {
    field.addEventListener("click", function () {
      playerController.placeSymbol(parseInt(field.dataset.index));
      update();
    });
  });

  resetButton.addEventListener("click", function(){
    virtualBoard.resetBoard();
    playerController.resetPlayerControl();
    update();
  })

  const update = () => {
    let allowScoreUpdate = true
    for (let i = 0; i < 9; i++) {
      fields[i].textContent = virtualBoard.boardContent[i];
    }


    for (let i = 0; i < 2; i++) {
      scoreBoard[i].textContent = playerController.player_score[i];
    }
    message.textContent = playerController.message();
  };
})();




const playerController = (() => {
  const player1 = player("X");
  const player2 = player("O");
  const player_score = [];
  let total_rounds = 0;
  let currentTurn = 0;
  let gameover = false;
  let winner = "";

  const playerSymbol = () => {
    if ((currentTurn + total_rounds) % 2 === 0)  {
      return player1.symbol;
    } else {
      return player2.symbol;
    }
  };

  const placeSymbol = (index) => {
    if (virtualBoard.boardContent[index] == "" && gameover === false) {
      virtualBoard.placeSymbol(playerSymbol(), index);
      win(index);
      currentTurn++;
      updateScore();
      if (currentTurn === 9) {
        gameover = true;
        total_rounds++;
        winner = "DRAW";
      }
    }
  };

  const win = (index) => {
    const winCombinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
      [2, 4, 6],
    ];

    const result = winCombinations.filter((combination) =>
      combination.includes(index)
    );

    result.every((combination) => {
      if (
        virtualBoard.boardContent[combination[0]] === playerSymbol() &&
        virtualBoard.boardContent[combination[1]] === playerSymbol() &&
        virtualBoard.boardContent[combination[2]] === playerSymbol()
      ) {
        gameover = true;
        winner = playerSymbol();
        return false;
      } else {
        return true;
      }
    });
  };

  const message = () => {
    let msg = "";
    if (gameover === false) {
      msg = playerSymbol() + "'s TURN";
    } 
    else if (gameover === true) {
      if (winner === "DRAW") {
        msg = winner;
      } else {
        msg = winner + " WON";
      }
    }
    return msg;
  };

  const updateScore = () => {
    if (winner === "X") {
      player1.score++;
      total_rounds++;
    } else if (winner === "O") {
      player2.score++;
      total_rounds++;
    }

    player_score[0] = player1.score;
    player_score[1] = player2.score;
  };

  const resetPlayerControl = () => {
    currentTurn = 0;
    gameover = false;
    winner = "";

  };

  return { placeSymbol, message, resetPlayerControl, player_score };
})();
