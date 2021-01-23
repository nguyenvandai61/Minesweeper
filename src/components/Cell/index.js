import React, { Component } from 'react'

export class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nBomb: 0,
            isBomb: false,
            isFlag: false,
            isClicked: false,
            isFinish : false
        }
    }
    render() {
        let content = "";
        let {nBomb, isBomb, isFlag, isClicked} = this.state;
        
        
        return (
            <div style={{backgroundColor: "#9A8598"}}>
                <button>{content}</button>
            </div>
        )
    }
}

export default Cell
