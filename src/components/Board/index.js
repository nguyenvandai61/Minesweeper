import React, { Component } from 'react';
import Cell from "../Cell";
import "./style.css";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bombBoard: [
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
                [0, 1, 0, 0],
            ],
            board: []
        }   
    }

    getNNeighborBomb = (matrix) => {
        let n = 0;
        for (let i = 0; i < 8; i++) {
                n += matrix[i];
        }
        return n;
    }

    getValueBoard = (board, i, j) => {
        let h = board.length;
        let w = (h>0)? board[0].length : 0;

        if (i < 0 || i >= h || j < 0 || j >= w) return 0;
        return board[i][j];
    }

    renderBoard = () => {
        let bomBoard = this.state.bombBoard;
        let h = bomBoard.length;
        let w = (h>0)? bomBoard[0].length : 0;

        let resBoard = [];
        
        for (let i = 0; i < h; i++) {
            let resRow = [];
            for (let j = 0; j < w; j++) {
                let value = "";
                let a = [];

                if (bomBoard[i][j] === 1) value = "B"
                else {
                    a.push(this.getValueBoard(bomBoard, i-1, j-1));
                    a.push(this.getValueBoard(bomBoard, i-1, j));
                    a.push(this.getValueBoard(bomBoard, i-1, j+1));
                    a.push(this.getValueBoard(bomBoard, i, j-1));
                    a.push(this.getValueBoard(bomBoard, i, j+1));
                    a.push(this.getValueBoard(bomBoard, i+1, j-1));
                    a.push(this.getValueBoard(bomBoard, i+1, j));
                    a.push(this.getValueBoard(bomBoard, i+1, j+1));

                    value = this.getNNeighborBomb(a)
                }                

                resRow.push(value);
            }
            resBoard.push(resRow);
        }
        console.log(resBoard);
        this.setState({board: resBoard});
    }
    componentDidMount() {
        this.renderBoard();
    }

    render() {
        let {board} = this.state;
    
        let h = board.length;
        let w = (h>0)? board[0].length : 0;

        let boardStyle = {
            gridTemplateColumns: `repeat(${w}, auto)`,
            gridTemplateRows: `repeat(${h}, auto)`
        }
        
        return (
            <div className="board" style={boardStyle}>
                {(
                    board.map(row => 
                        {
                            return row.map(cell => <Cell className="cell" value={cell}/>)
                        }
                    )
                )}
            </div>
        )
    }
}
