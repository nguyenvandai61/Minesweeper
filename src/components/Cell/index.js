import React, { Component } from 'react';
import {AppContext} from '../../AppContext'
import './style.css';

export class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nBomb: this.props.nBomb,
            isBomb: this.props.isBomb,
            isFlag: false,
            isOpened: this.props.isOpened || false,

            content: "", 
        }
    }
    
    onGame = () => {
        let {isOpened} = this.state;
        
        if (!isOpened) {
            this.onCloseHandler();
        } 
        else {
            this.onOpenHandler();
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
        else {
            this.setState({content: nBomb});
        }
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
            content = "*";
            console.log("Boom!!");
        }
        
        this.setState({content: content});    
        console.log("Update ");
        console.log(content);
    }
    //*************** */
    // User actions
    //************** */
    openCell = () => {
        if (this.state.isOpened) return;
        console.log("Open cell");
        if (this.context.isRestart) {
            // this.context.toggleRestart();
        }
        this.setState({isOpened: true});
        this.onOpenHandler();
    }

    flagCell = (e) => {
        e.preventDefault(); // Prevent open context menu
        this.setState({isFlag: true, content: "F"});
        this.onGame();
    }
    componentWillUpdate(pre) {
        let context = this.context;
        if (context && context.isRestart && this.state.isOpened) {
            this.setState({isOpened: false, ...pre});
        }
    }
    render() {
        let {content, isOpened} = this.state;
        if (!isOpened) content="";
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
Cell.contextType = AppContext;

export default Cell
