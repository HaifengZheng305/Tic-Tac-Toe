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

  fields.forEach(function (field) {
    field.addEventListener("click", function () {
      playerController.placeSymbol(parseInt(field.dataset.index));
      update();
    });
  });

  const update = () => {
    for (let i = 0; i < 9; i++) {
      fields[i].textContent = virtualBoard.boardContent[i];
    }
    message.textContent = playerController.message()
  };
})();

const playerController = (() => {
  const player1 = player("X");
  const player2 = player("O");
  let currentTurn = 0;
  let gameover = false;
  let winner = "";

  const playerSymbol = () => {
    if (currentTurn % 2 === 0) {
      return player1.symbol;
    } else {
      return player2.symbol;
    }
  };

  const placeSymbol = (index) => {
    if (virtualBoard.boardContent[index] == "") {
      virtualBoard.placeSymbol(playerSymbol(), index);
      win(index);
      currentTurn++;
      if (currentTurn === 9 && gameover === false) {
        gameover = true;
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
    if ((gameover === false)) {
      msg = playerSymbol() + "'s TURN";
    } else if ((gameover === true)) {
      if (winner === "DRAW") {
        msg = winner;
      } else {
        msg = winner + " WON";
      }
    }
    console.log(msg);
    return msg;
  };

  return {placeSymbol, message};
})();
