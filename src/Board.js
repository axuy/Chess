import React from 'react';
import Square from './Square.js'
 
class Board extends React.Component {
  constructor() {
    super();
    var squares = this.initializeBoard(Array(64).fill(null));
    this.state = {
      selected: null,
      squares: squares,
      whiteToMove: true
    };
  }

  initializeBoard(squares) {
    squares[0] = {
      piece: "R",
      owner: "black"
    };
    squares[1] = {
      piece: "N",
      owner: "black"
    };
    squares[2] = {
      piece: "B",
      owner: "black"
    };
    squares[3] = {
      piece: "Q",
      owner: "black"
    };
    squares[4] = {
      piece: "K",
      owner: "black"
    };
    squares[5] = {
      piece: "B",
      owner: "black"
    };
    squares[6] = {
      piece: "N",
      owner: "black"
    };
    squares[7] = {
      piece: "R",
      owner: "black"
    };
    squares[56] = {
      piece: "R",
      owner: "white"
    };
    squares[57] = {
      piece: "N",
      owner: "white"
    };
    squares[58] = {
      piece: "B",
      owner: "white"
    };
    squares[59] = {
      piece: "Q",
      owner: "white"
    };
    squares[60] = {
      piece: "K",
      owner: "white"
    };
    squares[61] = {
      piece: "B",
      owner: "white"
    };
    squares[62] = {
      piece: "N",
      owner: "white"
    };
    squares[63] = {
      piece: "R",
      owner: "white"
    };
    for (var i = 8; i < 16; i++) {
      squares[i] = {
        piece: "P",
        owner: "black"
      }
    }
    for (var i = 48; i < 56; i++) {
      squares[i] = {
        piece: "P",
        owner: "white"
      }
    }
    return squares;
  }

  handleClick(cellId) {
    if(this.state.selected !== null) {
      var legalMovesOfSelected = this.getLegalMoves(this.state.selected)
      if(legalMovesOfSelected.includes(cellId)) {
        var newSquares = this.state.squares.slice();
        newSquares[cellId] = {
          piece: this.state.squares[this.state.selected].piece,
          owner: this.state.squares[this.state.selected].owner
        }
        newSquares[this.state.selected] = null;
        this.setState({
          selected: null,
          squares: newSquares,
          whiteToMove: !this.state.whiteToMove
        });
      }
      else {
        this.setState({
          selected: null
        })
      }
    }
    else if(this.state.squares[cellId] !== null) {
      if(this.state.whiteToMove && this.state.squares[cellId].owner === "white" ||
         !this.state.whiteToMove && this.state.squares[cellId].owner === "black") {
        this.setState({
          selected: cellId
        });
      }
    }
  }

  getLegalMoves(cellId) {//TODO: make sure you can't move yourself into check, castling, en passsant
    var legalMoves = [];
    if(this.state.squares[cellId] === null) {
      return legalMoves;
    }
    var x = cellId % 8;
    var y = Math.floor(cellId / 8);
    switch(this.state.squares[cellId].piece) {
      case "B":
        var i = 1;
        while(true) {
          if(x + i > 7 || y + i > 7) {
            break;
          }
          var key = x + i + (y + i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x - i < 0 || y - i < 0) {
            break;
          }
          var key = x - i + (y - i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x + i > 7 || y - i < 0) {
            break;
          }
          var key = x + i + (y - i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x - i < 0 || y + i > 7) {
            break;
          }
          var key = x - i + (y + i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        break;
      case "K":
        var possibleMoves = [
          {x: x + 1, y: y},
          {x: x - 1, y: y},
          {x: x, y: y + 1},
          {x: x, y: y - 1},
          {x: x + 1, y: y + 1},
          {x: x - 1, y: y - 1},
          {x: x + 1, y: y - 1},
          {x: x - 1, y: y + 1}
        ];
        legalMoves = possibleMoves.filter((move) =>
          move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8 &&
          (this.state.squares[move.x + move.y * 8] === null ||
          this.state.squares[move.x + move.y * 8].owner !== this.state.squares[cellId].owner)  
        ).map((move) =>
          move.x + move.y * 8
        );
        break;
      case "N":
        var possibleMoves = [
          {x: x + 1, y: y + 2},
          {x: x - 1, y: y + 2},
          {x: x + 1, y: y - 2},
          {x: x - 1, y: y - 2},
          {x: x + 2, y: y + 1},
          {x: x - 2, y: y + 1},
          {x: x + 2, y: y - 1},
          {x: x - 2, y: y - 1}
        ];
        legalMoves = possibleMoves.filter((move) =>
          move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8 &&
          (this.state.squares[move.x + move.y * 8] === null ||
          this.state.squares[move.x + move.y * 8].owner !== this.state.squares[cellId].owner)  
        ).map((move) =>
          move.x + move.y * 8
        );
        break;
      case "P":
        if(this.state.squares[cellId].owner === "white") {
          if(this.state.squares[cellId - 8] === null) {
            legalMoves.push(cellId - 8);
            if(cellId > 47 && cellId < 56 && this.state.squares[cellId - 16] === null) {
              legalMoves.push(cellId - 16)
            }
          }
          var possibleCaptures = [
            {x: x - 1, y: y - 1},
            {x: x + 1, y: y - 1}
          ];
          legalMoves = legalMoves.concat(possibleCaptures.filter((move) =>
            move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8 &&
            this.state.squares[move.x + move.y * 8] !== null &&
            this.state.squares[move.x + move.y * 8].owner !== this.state.squares[cellId].owner
          ).map((move) =>
            move.x + move.y * 8
          ));
        }
        else {
          if(this.state.squares[cellId + 8] === null) {
            legalMoves.push(cellId + 8);
            if(cellId > 7 && cellId < 16 && this.state.squares[cellId + 16] === null) {
              legalMoves.push(cellId + 16)
            }
          }
          var possibleCaptures = [
            {x: x - 1, y: y + 1},
            {x: x + 1, y: y + 1}
          ];
          legalMoves = legalMoves.concat(possibleCaptures.filter((move) =>
            move.x >= 0 && move.x < 8 && move.y >= 0 && move.y < 8 &&
            this.state.squares[move.x + move.y * 8] !== null &&
            this.state.squares[move.x + move.y * 8].owner !== this.state.squares[cellId].owner
          ).map((move) =>
            move.x + move.y * 8
          ));
        }
        break;
      case "Q":
        var i = 1;
        while(true) {
          if(x + i > 7) {
            break;
          }
          var key = x + i + y * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x - i < 0) {
            break;
          }
          var key = x - i + y * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(y + i > 7) {
            break;
          }
          var key = x + (y + i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(y - i < 0) {
            break;
          }
          var key = x + (y - i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x + i > 7 || y + i > 7) {
            break;
          }
          var key = x + i + (y + i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x - i < 0 || y - i < 0) {
            break;
          }
          var key = x - i + (y - i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x + i > 7 || y - i < 0) {
            break;
          }
          var key = x + i + (y - i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x - i < 0 || y + i > 7) {
            break;
          }
          var key = x - i + (y + i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        break;
      case "R":
        var i = 1;
        while(true) {
          if(x + i > 7) {
            break;
          }
          var key = x + i + y * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(x - i < 0) {
            break;
          }
          var key = x - i + y * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(y + i > 7) {
            break;
          }
          var key = x + (y + i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
        i = 1;
        while(true) {
          if(y - i < 0) {
            break;
          }
          var key = x + (y - i) * 8;
          if(this.state.squares[key] === null) {
            legalMoves.push(key);
          }
          else if(this.state.squares[key].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(key);
            break;
          }
          else {
            break;
          }
          i++;
        }
    }
    return legalMoves;
  }

  renderSquare(cellId) {
    var isPossibleMove = false;
    if(this.state.selected !== null) {
      isPossibleMove = this.getLegalMoves(this.state.selected).includes(cellId);
    }
    if(this.state.squares[cellId] == null) {
      return (
        <Square
          key={cellId}
          cellId={cellId}
          piece={null}
          owner={null}
          isPossibleMove={isPossibleMove}
          isSelected={false}
          onClick={() => this.handleClick(cellId)}
        />
      );
    }
    return (
      <Square
        key={cellId}
        cellId={cellId}
        piece={this.state.squares[cellId].piece}
        owner={this.state.squares[cellId].owner}
        isPossibleMove={isPossibleMove}
        isSelected={(cellId === this.state.selected)}
        onClick={() => this.handleClick(cellId)}
      />
    );
  }

  render() {
    var rows = [];
    var columns = [];
    var cellId = 0;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if(i === 1) {
          columns.push(this.renderSquare(cellId))
        }
        else if(i === 6) {
          columns.push(this.renderSquare(cellId))
        }
        else if(i === 0) {
          if(j === 0 || j === 7) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 1 || j === 6) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 2 || j === 5) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 3) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 4) {
            columns.push(this.renderSquare(cellId))
          }
        }
        else if(i === 7) {
          if(j === 0 || j === 7) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 1 || j === 6) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 2 || j === 5) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 3) {
            columns.push(this.renderSquare(cellId))
          }
          if(j === 4) {
            columns.push(this.renderSquare(cellId))
          }
        }
        else {
          columns.push(this.renderSquare(cellId))
        }
        cellId++
      }
      rows.push(<div className="board-row" key={"row" + i}>{columns}</div>)
      columns = [];
    }

    return (
      <div className="container-fluid vertical-center">
        <div className="col-md-12 text-center">
          {rows}
        </div>
      </div>
    );
  }
}
export default Board
