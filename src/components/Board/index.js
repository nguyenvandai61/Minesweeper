import React, { Component } from 'react';
import Cell from "../Cell";
import "./style.css";

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
                [0, 1, 0, 0],
            ]
        }
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
                            return row.map(cell => <Cell className="cell"/>)
                        }
                    )
                )}
            </div>
        )
    }
}
