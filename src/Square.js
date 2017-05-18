import React from 'react'

class Square extends React.Component {
  render() {
    var squareColor = '';
    if(this.props.cellId % 2 === 0 && this.props.cellId % 16 < 8 ||
       this.props.cellId % 2 === 1 && this.props.cellId % 16 > 7) {
      squareColor = {
        background: "#e8c07a"
      };
    }
    else {
      squareColor = {
        background: "#a86103"
      };
    }
    if(this.props.piece === null) {
      return (
        <div className='square' style={squareColor} onClick={this.props.onClick}/>
      );
    }
    var imgSrc = "";
    switch (this.props.owner + this.props.piece) {
      case "whiteP":
        imgSrc = './images/white_pawn.png';
        break;
      case "whiteR":
        imgSrc = './images/white_rook.png';
        break;
      case "whiteN":
        imgSrc = './images/white_knight.png';
        break;
      case "whiteB":
        imgSrc = './images/white_bishop.png';
        break;
      case "whiteQ":
        imgSrc = './images/white_queen.png';
        break;
      case "whiteK":
        imgSrc = './images/white_king.png';
        break;
      case "blackP":
        imgSrc = './images/black_pawn.png';
        break;
      case "blackR":
        imgSrc = './images/black_rook.png';
        break;
      case "blackN":
        imgSrc = './images/black_knight.png';
        break;
      case "blackB":
        imgSrc = './images/black_bishop.png';
        break;
      case "blackQ":
        imgSrc = './images/black_queen.png';
        break;
      case "blackK":
        imgSrc = './images/black_king.png';
    }
    return (
      <div className="square" style={squareColor} onClick={this.props.onClick}>
        <img src={imgSrc}/>
      </div>
    );
  }
}
export default Square
