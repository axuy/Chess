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

  renderSquare(cellId) {
    if(this.state.squares[cellId] == null) {
      return (
        <Square
          key={cellId}
          cellId={cellId}
          piece={null}
          owner={null}
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
        onClick={() => this.handleClick(cellId)}
      />
    );
  }

  handleClick(cellId) {
    if(this.state.selected !== null) {
      var newSquares = this.state.squares.slice();
      newSquares[cellId] = {
        piece: this.state.squares[this.state.selected].piece,
        owner: this.state.squares[this.state.selected].owner
      }
      newSquares[this.state.selected] = null
      this.setState({
        selected: null,
        squares: newSquares,
        whiteToMove: !this.state.whiteToMove
      });
    }
    if(this.state.squares[cellId] !== null) {
      this.state.selected = cellId;
    }
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
