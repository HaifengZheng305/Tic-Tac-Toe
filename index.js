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
  
    return { placeSymbol, resetBoard, boardContent
    };
  })();
  
  const player = (__symbol) => {
    const symbol = __symbol;
  
    return { symbol };
  }
  
  const physicalBoard = (() => {
    const fields = document.querySelectorAll(".fields");

    fields.forEach(function(field){
        field.addEventListener( 'click', function(){
            /*playerTurn.updateTurn();
            playerTurn.playerSymbol();
            virtualBoard.placeSymbol(playerTurn.playerSymbol(), field.dataset.index)*/
            update();
        });
    });

    const update = () => {
      for (let i = 0; i < 9; i++) {
        fields[i].textContent = virtualBoard.boardContent[i];
      };
    };
  
    return { update };
  
  })();

  const playerTurn = (() => {
    const player1 = player("X");
    const player2 = player("O");
    let currentTurn = 0;

    const updateTurn = () => {
        if (currentTurn !== 9)
        {
            currentTurn ++;
        }
    }

    const playerSymbol = () => {
        return player1.symbol;
    }

    updateTurn();
    console.log(currentTurn)

    return {updateTurn, playerSymbol};
  })();
  