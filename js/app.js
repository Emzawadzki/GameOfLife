document.addEventListener('DOMContentLoaded', function () {

  function GameOfLife(boardWidth, boardHeight) {
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.getElementById('board');
    this.cells = [];
    this.self = "";
    this.gameMode = 2;
    this.gameRunning = false;

    // generating board
    this.createBoard = function () {
      this.board.style.height = this.height * 10 + 'px';
      this.board.style.width = this.width * 10 + 'px';
      this.cellNumber = this.width * this.height;

      for (var i = 0; i < this.cellNumber; i++) {
        var newCell = document.createElement('div');
        this.board.appendChild(newCell);
        this.cells.push(newCell);

        newCell.addEventListener('click', function () {
          this.classList.toggle('live');
        })
      }
    }

    // searching cell coordinates
    this.getCellByCoords = function (x, y) {
      var wantedCellIndex = x + y * this.width;

      if (wantedCellIndex < 0 || wantedCellIndex > this.cells.length - 1) {
        return undefined;
      }
      var wantedCell = this.cells[wantedCellIndex];
      return (wantedCell);
    }

    // setting cell state (by coordinates)
    this.setCellState = function (x, y, state) {
      var selectedCell = this.getCellByCoords(x, y);
      selectedCell.classList.add(state);
    }

    // next cell state computing method
    this.computeCellNextState = function (x, y) {
      var nextCellState = 0;
      if (this.gameMode === 1) {
      var cellNeighbours = [
        this.getCellByCoords((x - 1), y), 
        this.getCellByCoords((x - 1), (y - 1)), 
        this.getCellByCoords(x, (y - 1)), 
        this.getCellByCoords((x + 1), (y - 1)), 
        this.getCellByCoords((x + 1), y), 
        this.getCellByCoords((x + 1), (y + 1)), 
        this.getCellByCoords(x, (y + 1)),
        this.getCellByCoords((x - 1), (y + 1))
      ]
      // gameMode2 - cells neighbours counting through all walls
    } else if (this.gameMode === 2) {
        if (x > 0 && x < this.width - 1 && y === 0) {
          var cellNeighbours = [
            this.getCellByCoords((x - 1), y),
            this.getCellByCoords((x - 1), (this.height - 1)),
            this.getCellByCoords(x, (this.height - 1)),
            this.getCellByCoords((x + 1), (this.height - 1)),
            this.getCellByCoords((x + 1), y),
            this.getCellByCoords((x + 1), (y + 1)),
            this.getCellByCoords(x, (y + 1)),
            this.getCellByCoords((x - 1), (y + 1))
          ]
        } else if (x > 0 && x < this.width - 1 && y === this.height - 1) {
          var cellNeighbours = [
            this.getCellByCoords((x - 1), y),
            this.getCellByCoords((x - 1), (y - 1)),
            this.getCellByCoords(x, (y - 1)),
            this.getCellByCoords((x + 1), (y - 1)),
            this.getCellByCoords((x + 1), y),
            this.getCellByCoords((x + 1), (0)),
            this.getCellByCoords(x, (0)),
            this.getCellByCoords((x - 1), (0))
          ]
        } else if (y > 0 && y < this.height - 1 && x === 0) {
          var cellNeighbours = [
            this.getCellByCoords((this.width - 1), y),
            this.getCellByCoords((this.width - 1), (y - 1)),
            this.getCellByCoords(x, (y - 1)),
            this.getCellByCoords((x + 1), (y - 1)),
            this.getCellByCoords((x + 1), y),
            this.getCellByCoords((x + 1), (y + 1)),
            this.getCellByCoords(x, (y + 1)),
            this.getCellByCoords((this.width - 1), (y + 1))
          ]
        } else if (y > 0 && y < this.height - 1 && x === this.width - 1) {
          var cellNeighbours = [
            this.getCellByCoords((x - 1), y),
            this.getCellByCoords((x - 1), (y - 1)),
            this.getCellByCoords(x, (y - 1)),
            this.getCellByCoords((0), (y - 1)),
            this.getCellByCoords((0), y),
            this.getCellByCoords((0), (y + 1)),
            this.getCellByCoords(x, (y + 1)),
            this.getCellByCoords((x - 1), (y + 1))
          ]
        } else if (x === 0 && y === 0) {
          var cellNeighbours = [
            this.getCellByCoords((this.width - 1), y),
            this.getCellByCoords((this.width - 1), (this.height - 1)),
            this.getCellByCoords(x, (this.height - 1)),
            this.getCellByCoords((x + 1), (this.height - 1)),
            this.getCellByCoords((x + 1), y),
            this.getCellByCoords((x + 1), (y + 1)),
            this.getCellByCoords(x, (y + 1)),
            this.getCellByCoords((this.width - 1), (y + 1))
          ]
        } else if (x === 0 && y === this.height - 1) {
          var cellNeighbours = [
            this.getCellByCoords((this.width - 1), y),
            this.getCellByCoords((this.width - 1), (y - 1)),
            this.getCellByCoords(x, (y - 1)),
            this.getCellByCoords((x + 1), (y - 1)),
            this.getCellByCoords((x + 1), y),
            this.getCellByCoords((x + 1), (0)),
            this.getCellByCoords(x, (0)),
            this.getCellByCoords((this.width - 1), (0))
          ]
        } else if (x === this.width - 1 && y === 0) {
          var cellNeighbours = [
            this.getCellByCoords((x - 1), y),
            this.getCellByCoords((x - 1), (this.height - 1)),
            this.getCellByCoords(x, (this.height - 1)),
            this.getCellByCoords((0), (this.height - 1)),
            this.getCellByCoords((0), y),
            this.getCellByCoords((0), (y + 1)),
            this.getCellByCoords(x, (y + 1)),
            this.getCellByCoords((x - 1), (y + 1))
          ]
        } else if (x === this.width - 1 && y === this.height - 1) {
          var cellNeighbours = [
            this.getCellByCoords((x - 1), y),
            this.getCellByCoords((x - 1), (y - 1)),
            this.getCellByCoords(x, (y - 1)),
            this.getCellByCoords((0), (y - 1)),
            this.getCellByCoords((0), y),
            this.getCellByCoords((0), (0)),
            this.getCellByCoords(x, (0)),
            this.getCellByCoords((x - 1), (0))
          ]
        }

        else {
          var cellNeighbours = [
            this.getCellByCoords((x - 1), y),
            this.getCellByCoords((x - 1), (y - 1)),
            this.getCellByCoords(x, (y - 1)),
            this.getCellByCoords((x + 1), (y - 1)),
            this.getCellByCoords((x + 1), y),
            this.getCellByCoords((x + 1), (y + 1)),
            this.getCellByCoords(x, (y + 1)),
            this.getCellByCoords((x - 1), (y + 1))
          ]
        }
      }
    
      // living neighbours count
      var livingCells = 0;
      for (var i = 0; i < cellNeighbours.length; i++) {
        if (cellNeighbours[i] === undefined) {
          continue;
        } else if (cellNeighbours[i].classList.contains('live')) {
          livingCells++;
        }
      }

      // computing next cell state
      if (this.getCellByCoords(x, y).classList.contains('live')) {
        // some of these IF st. are optional, kept for clearness though
        if (livingCells < 2) {
          nextCellState = 0;
        } else if (livingCells === 2 || livingCells === 3) {
          nextCellState = 1;
        } else if (livingCells > 3) {
          nextCellState = 0;
        }

      } else {
        if (livingCells === 3) {
          nextCellState = 1;
        }
      }

      return nextCellState;
    }

    // next board state generation
    this.computeNextGeneration = function () {
      this.nextGenerationArray = [];
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          this.nextGenerationArray.push(this.computeCellNextState(x, y));
        }
      }
    }

    // printing next generation
    this.printNextGeneration = function () {
      this.computeNextGeneration();
      for (var i = 0; i < this.cells.length; i++) {
        this.cells[i].classList.remove('live');
        if (this.nextGenerationArray[i] === 1) {
          this.cells[i].classList.add('live');
        }
      }
    }
  }

  // user interface settings

  // board generating
  var heightInput = document.querySelector('#height');
  var widthInput = document.querySelector('#width');
  var generateBtn = document.querySelector('#submit-btn');


  generateBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var containers = document.querySelectorAll('.flex-container');
    var newBoardHeight = Number(heightInput.value);
    var newBoardWidth = Number(widthInput.value);
    var gameInterval = document.querySelector('#interval');
    var newBoard = new GameOfLife(newBoardWidth, newBoardHeight);
    newBoard.createBoard();

    for (var i = 0; i < containers.length; i++) {
      containers[i].classList.toggle('hidden');
    }

    var playBtn = document.querySelector('#play');
    var pauseBtn = document.querySelector('#pause');

    playBtn.addEventListener('click', function () {
      if (newBoard.gameRunning === true) {
        return false;
      }
      var playGame = setInterval(function () {
        newBoard.printNextGeneration();
      }, (Number(gameInterval.value)*1000));
      self = playGame;
      newBoard.gameRunning = true;
    });

    pauseBtn.addEventListener('click', function () {
      clearInterval(self);
      newBoard.gameRunning = false;
    });
  });
})