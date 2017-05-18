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
        console.log(this.getLegalMoves(cellId));
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
    switch(this.state.squares[cellId].piece) {
      case "B":
        var possibleMoveId = cellId + 7;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 7;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 7;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 7;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId + 9;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 9;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 9;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 9;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        break;
      case "K":
        var possibleMoveIds = [cellId + 1, cellId - 1, cellId + 8, cellId - 8];
        legalMoves = possibleMoveIds.filter((move) =>
          this.state.squares[move] !== undefined && (this.state.squares[move] === null || 
          this.state.squares[move].owner !== this.state.squares[cellId].owner)
        );
        break;
      case "N":
        var possibleMoveIds = [cellId + 17, cellId - 17, cellId + 15, cellId - 15];
        legalMoves = possibleMoveIds.filter((move) =>
          this.state.squares[move] !== undefined && (this.state.squares[move] === null || 
          this.state.squares[move].owner !== this.state.squares[cellId].owner)
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
          var possibleCaptures = [cellId - 7, cellId - 9];
          legalMoves = legalMoves.concat(possibleCaptures.filter((move) =>
            this.state.squares[move] !== undefined && (this.state.squares[move] !== null && 
            this.state.squares[move].owner !== this.state.squares[cellId].owner)
          ));
        }
        else {
          if(this.state.squares[cellId + 8] === null) {
            legalMoves.push(cellId + 8);
            if(cellId > 7 && cellId < 16 && this.state.squares[cellId + 16] === null) {
              legalMoves.push(cellId + 16)
            }
          }
          var possibleCaptures = [cellId + 7, cellId + 9];
          legalMoves = legalMoves.concat(possibleCaptures.filter((move) =>
            this.state.squares[move] !== undefined && (this.state.squares[move] !== null && 
            this.state.squares[move].owner !== this.state.squares[cellId].owner)
          ));
        }
        break;
      case "Q":
        var possibleMoveId = cellId + 7;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 7;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 7;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 7;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId + 9;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 9;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 9;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 9;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId + 1;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 1;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 1;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 1;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId + 8;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 8;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 8;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 8;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        break;
      case "R":
        var possibleMoveId = cellId + 1;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 1;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 1;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 1;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId + 8;
        while(possibleMoveId < 64) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId += 8;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
        possibleMoveId = cellId - 8;
        while(possibleMoveId > 0) {
          if(this.state.squares[possibleMoveId] === null) {
            legalMoves.push(possibleMoveId);
            possibleMoveId -= 8;
          }
          else if(this.state.squares[possibleMoveId].owner !== this.state.squares[cellId].owner) {
            legalMoves.push(possibleMoveId);
            break;
          }
          else {
            break;
          }
        }
    }
    return legalMoves;
  }

  renderSquare(cellId) {
    var isPossibleMove = false;
    if(this.state.selected !== null) {
      isPossibleMove = this.getLegalMoves(this.state.selected).filter((move) => move === cellId).length > 0;
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
          columns.push(this.renderSquare(cellId, null))
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
