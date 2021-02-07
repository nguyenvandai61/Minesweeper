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
            alert("Boom! Gameover!");
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
        this.setState({isOpened: true});
        this.onOpenHandler();
    }
    toggleFlag = () => {
        this.setState({isFlag: !this.state.isFlag});        
    }
    flagCell = (e) => {
        e.preventDefault(); // Prevent open context menu
        console.log("Flag");
        this.toggleFlag();
        this.onGame();
    }
    componentWillUpdate(nextProps) {
        let context = this.context;
        if (this.state.isFlag) {
            this.setState({isFlag: false});
        }

        if (nextProps !== this.props) {
            let {nBomb, isBomb} = nextProps;
            this.setState({nBomb: nBomb, isBomb: isBomb})
        }
        if (context && context.isRestart && this.state.isOpened) {
            console.log("Restart");
                this.setState({isOpened: false, });
        }
    }
    render() {
        let {content, isOpened, isFlag} = this.state;
        if (!isOpened) {
            content=isFlag?"F":"";
        }
        return (
                <div 
                className="cell"  
                onClick={this.openCell}
                onContextMenu={this.flagCell}>
                    <span>{content}</span>
                </div>
        )
    }
}
Cell.contextType = AppContext;

export default Cell
