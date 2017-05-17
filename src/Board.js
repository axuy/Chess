import React from 'react';
import Square from './Square.js'
 
class Board extends React.Component {
  renderSquare(cellId, piece, owner) {
    return (
      <Square
        key={cellId}
        cellId={cellId}
        piece={piece}
        owner={owner}
        onClick={() => this.handleClick(cellId)}
      />
    );
  }

  handleClick(cellId) {

  }

  render() {
    var rows = [];
    var columns = [];
    var cellId = 0;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if(i == 1) {
          columns.push(this.renderSquare(cellId, 'P', "black"))
        }
        else if(i == 6) {
          columns.push(this.renderSquare(cellId, 'P', "white"))
        }
        else if(i == 0) {
          if(j == 0 || j == 7) {
            columns.push(this.renderSquare(cellId, 'R', "black"))
          }
          if(j == 1 || j == 6) {
            columns.push(this.renderSquare(cellId, 'N', "black"))
          }
          if(j == 2 || j == 5) {
            columns.push(this.renderSquare(cellId, 'B', "black"))
          }
          if(j == 3) {
            columns.push(this.renderSquare(cellId, 'Q', "black"))
          }
          if(j == 4) {
            columns.push(this.renderSquare(cellId, 'K', "black"))
          }
        }
        else if(i == 7) {
          if(j == 0 || j == 7) {
            columns.push(this.renderSquare(cellId, 'R', "white"))
          }
          if(j == 1 || j == 6) {
            columns.push(this.renderSquare(cellId, 'N', "white"))
          }
          if(j == 2 || j == 5) {
            columns.push(this.renderSquare(cellId, 'B', "white"))
          }
          if(j == 3) {
            columns.push(this.renderSquare(cellId, 'Q', "white"))
          }
          if(j == 4) {
            columns.push(this.renderSquare(cellId, 'K', "white"))
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
