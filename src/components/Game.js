import React, { Component } from 'react';
import Board from './Board';
import { calculateWinner } from './Helper';
import './Styles.css';

class Game extends Component {
    state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
    // setting the initial state above
    // stepNumber is set to set to max 9 steps in case it's a draw

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

    // Handle board restart - set component state to initial state
    handleBoardRestart = () => {
        this.setState({
            squares: Array(9).fill(null),
            stepNumber: 0,
            xIsNext: true
        })
    }

   render() {
   const history = this.state.history;
   const current = history[this.state.stepNumber];
   const winning = calculateWinner(current.squares);
    
   let status;
    if (winning) {
      status = 'Winner: ' + winning;
    } else if (this.state.stepNumber == 9) {
      status = 'It is a draw'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        <div className="game-info">
          <div>{status}</div>
        </div>
        <div className="restart-button"><button className="btn" onClick={this.handleBoardRestart}>Start new game</button></div>
        </div>
      
      </div>
      
    );
  }
}

export default Game;