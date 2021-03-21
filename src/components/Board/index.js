import React, { Component } from 'react';
import Cell from "../Cell";
import store from "../../stores/levels"
import "./style.css";
import { Levels } from '../../constants';
import stateRestartStore from '../../stores/stateRestart';
import BoardActions from '../../actions/board';
import levelActions from '../../actions/levels';
export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bombBoard: [],
            board: [],
            level: Levels.HARD
        }
    }

    randomBomb(nBomb, nCell) {
        let set = new Set();
        while (set.size !== nBomb) {
            let n = Math.floor(Math.random() * nCell);
            set.add(n);
        }
        return Array.from(set);
    }

    initBombBoard = (nBomb, width, height) => {
        let bombPosArray = this.randomBomb(nBomb, width * height);
        let bombBoard = Array(height).fill().map(() => Array(width).fill(0));

        bombPosArray.forEach(bombIdx => {
            let i = Math.floor(bombIdx / width);
            let j = bombIdx % width;
            bombBoard[i][j] = 1;
        })
        return bombBoard;
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
        let w = (h > 0) ? board[0].length : 0;

        if (i < 0 || i >= h || j < 0 || j >= w) return 0;
        return board[i][j];
    }

    findBoard = (bombBoard) => {
        let h = bombBoard.length;
        let w = (h > 0) ? bombBoard[0].length : 0;

        let resBoard = [];

        for (let i = 0; i < h; i++) {
            let resRow = [];
            for (let j = 0; j < w; j++) {
                let value = "";
                let a = [];

                if (bombBoard[i][j] === 1) value = "B"
                else {
                    a.push(this.getValueBoard(bombBoard, i - 1, j - 1));
                    a.push(this.getValueBoard(bombBoard, i - 1, j));
                    a.push(this.getValueBoard(bombBoard, i - 1, j + 1));
                    a.push(this.getValueBoard(bombBoard, i, j - 1));
                    a.push(this.getValueBoard(bombBoard, i, j + 1));
                    a.push(this.getValueBoard(bombBoard, i + 1, j - 1));
                    a.push(this.getValueBoard(bombBoard, i + 1, j));
                    a.push(this.getValueBoard(bombBoard, i + 1, j + 1));

                    value = this.getNNeighborBomb(a)
                }

                resRow.push(value);
            }
            resBoard.push(resRow);
        }
        return resBoard;
    }

    renderBoard = () => {
        let {board, bombBoard} = this.state;
        return (
            board.map((row, i) => {
                return row.map((cell, j) => 
                (<div>
                    <Cell i={i} j={j} key={i+'_'+j} className="cell" nBomb={cell} isBomb={bombBoard[i][j]}/>
                </div>))
            })
        )
    }
    getEmptyBoard = () => {
        return {bombBoard: [], board: []}
    }
    restartGame = (level) => {
        if (!level) level = this.state.level;
        // Get level from store
        
        
        let bombBoard = this.initBombBoard(level.nBomb, level.width, level.height);
        let board = this.findBoard(bombBoard);
        BoardActions.setBoardGame(board);
        this.setState({
            level: level,
            bombBoard: bombBoard,
            board: board
        })
    }
    componentDidMount() {
        levelActions.setLevel(this.state.level);
        store.subscribe(() => {
            let level = store.getState()
            this.restartGame(level);
        })
        stateRestartStore.subscribe(() => {
            if (stateRestartStore.getState())
                this.restartGame();
        })
        this.restartGame(this.state.level);
    }


    render() {
        let { board, bombBoard } = this.state;
        let h = board.length;
        let w = (h > 0) ? board[0].length : 0;
        let boardStyle = {
            gridTemplateColumns: `repeat(${w}, auto)`,
            gridTemplateRows: `repeat(${h}, auto)`
        }

        return (
            <div>
                <div className="board" style={boardStyle}>
                    {this.renderBoard()}
                </div>
            </div>
        )
    }
}
