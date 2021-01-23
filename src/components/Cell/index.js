import React, { Component } from 'react';
import './style.css';

export class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nBomb: 0,
            isBomb: false,
            isFlag: false,
            isOpened: false,

            content: "", 
        }
    }
    

    onGame = () => {
        let {isOpened} = this.state;
        
        if (!isOpened) {
            this.onOpenHandler();
        } 
        else {
            this.onCloseHandler();
        }
    }
    
    onCloseHandler = () => {
        this.setState({content: ""});    
    } 

    onOpenHandler = () => {
        let {isBomb, nBomb} = this.state;
        if (isBomb) {
            this.onFinishHandler();
        }
        this.setState({content: nBomb});
    }

    onFinishHandler = () => {
        let {isBomb, nBomb, isOpened, isFlag} = this.state;
        // Case Lose:
        let content = "";
        if (!isBomb) {
            content = nBomb;
            if (isFlag) {
                content = "M";
            }
        } else {
            content = "B";
            if (isOpened) {
                content = "*";
            }    
        }
        this.setState({content: content});    
    }
    //*************** */
    // User actions
    //************** */
    openCell = () => {
        if (this.state.isOpened) return;
        console.log("Open cell");
        this.setState({isOpened: true});
        this.onOpenHandler();
    }

    flagCell = (e) => {
        e.preventDefault(); // Prevent open context menu
        this.setState({isFlag: true, content: "F"});
    }

    render() {
        let {content} = this.state;
        
        return (
            <div 
            className="cell" 
            style={{backgroundColor: "#9A8598"}} 
            onClick={this.openCell}
            onContextMenu={this.flagCell}>
                <span>{content}</span>
            </div>
        )
    }
}

export default Cell
