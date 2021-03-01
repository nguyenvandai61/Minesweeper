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
        
        console.log(this.context);
        let {i, j} = this.props;
        this.context.selectedCell = i+j*this.context.level.width;
        console.log(this.context);
            
        if (isBomb) {
            this.onFinishHandler();
        }
        else {
            console.log(i);
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
            // Click boom
            content = "*";
            this.context.toggleGameover();
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
        if (this.context.isGameover) return;
        console.log("Open cell");
        this.setState({isOpened: true});
        this.onOpenHandler();
    }
    toggleFlag = () => {
        this.setState({isFlag: !this.state.isFlag});        
    }
    flagCell = (e) => {
        e.preventDefault(); // Prevent open context menu
        if (this.state.isOpened) return;
        this.toggleFlag();
        this.onGame();
    }
    componentWillUpdate(nextProps,abc, a1, b1) {
        let context = this.context;
        if (this.state.isFlag) {
            this.setState({isFlag: false});
        }
        
        if (nextProps !== this.props) {
            this.setState({...nextProps})
        }
        let {i, j} = this.props;
        let idx = i+j*this.context.level.width;
        // TODO: Loop update twice
        console.log(idx);
        if (context.isGameover && context.selectedCell == idx) {
            console.log("game over");
            this.setState({isOpened: true});
            context.toggleGameover();
        }
        if (context && context.isRestart && this.state.isOpened) {
            console.log("Restart");
            this.setState({isOpened: false, });
        }
    }
    render() {
        let {content, isOpened, isFlag} = this.state;
        if (this.context.isGameover) {
            isOpened = true;
        }
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
