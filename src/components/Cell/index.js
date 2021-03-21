import React, { Component } from 'react';
import RestedFlagActions from '../../actions/rested_flag';
import stateActions from '../../actions/state';
import { SymbolConstants } from '../../constants';
import nRestedFlagStore from '../../stores/flag';
import stateGameoverStore from "../../stores/stateGameover";
import stateRestartStore from '../../stores/stateRestart';
import './style.css';
export class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nBomb: this.props.nBomb,
            isBomb: this.props.isBomb,
            isFlag: false,
            isOpened: this.props.isOpened || false,

            content: " ",
        }
    }
    getColor = (content) =>  {
        switch(content) {
            case 1: return "blue";
            case 2: return "green";
            case 3: return "red";
            case 4: return "purple";
            default:
                return "black";
        }
    }
    
    onGame = () => {
        let { isOpened } = this.state;

        if (!isOpened) {
            this.onCloseHandler();
        }
        else {
            this.onOpenHandler();
        }
    }

    onCloseHandler = () => {
        this.setState({ content: SymbolConstants.CLOSE });
    }

    onOpenHandler = () => {
        let { isFlag, isBomb, nBomb } = this.state;
        if (isFlag) {
            RestedFlagActions.increment();
            this.setState({ content: nBomb });
        } 
        else if (isBomb) {
            stateActions.setGameOverState(true);
            this.onFinishHandler();
        }
        else {
            let content = nBomb === 0? 
                SymbolConstants.NO_BOMB:
                nBomb;
            this.setState({ content });
        }
    }

    onFinishHandler = () => {
        let { isBomb, nBomb, isOpened, isFlag } = this.state;
        // Case Lose:
        let content = SymbolConstants.NO_BOMB;
        if (!isBomb) {
            content = nBomb;
            if (isFlag) {
                content = SymbolConstants.MISS_FLAG;
            }
        } else {
            // Click boom
            content = SymbolConstants.BOMB;
        }
        console.log(content);
        this.setState({ content: content });
    }
    //*************** */
    // User actions
    //************** */
    openCell = () => {
        if (this.state.isOpened) return;
        if (stateGameoverStore.getState()) return;
        console.log("Open cell");
        this.setState({ isOpened: true });
        this.onOpenHandler();
    }
    toggleFlag = () => {
        if (this.state.isFlag) 
            RestedFlagActions.increment();
        else {
            if (nRestedFlagStore.getState() === 0) return;
            RestedFlagActions.decrement();
        }
        this.setState({ isFlag: !this.state.isFlag });
        
    }
    flagCell = (e) => {
        e.preventDefault(); // Prevent open context menu
        if (this.state.isOpened) return;
        this.toggleFlag();
        this.onGame();
    }
    componentWillUpdate(nextProps, abc, a1, b1) {
        if (this.state.isFlag) {
            this.setState({ isFlag: false });
        }

        if (nextProps !== this.props) {
            this.setState({ ...nextProps })
        }
    }
    componentDidMount() {
        stateGameoverStore.subscribe(() => {
            this.onFinishHandler();
            this.setState({ isOpened: stateGameoverStore.getState() });
        })
        stateRestartStore.subscribe(() => {
            this.setState({isOpened: false, content: SymbolConstants.NO_BOMB});
        })
    }
    render() {
        let { content, isOpened, isFlag } = this.state;
        if (!isOpened) content = isFlag? SymbolConstants.FLAG: SymbolConstants.NO_BOMB;        
        let color = this.getColor(content);

        return (
            <div>
                <div
                    className={`cell ${isOpened? "": "close"}`}
                    onClick={this.openCell}
                    onContextMenu={this.flagCell}>
                    <span style={{color: color}}>{content}</span>
                </div>
            </div>
        )
    }
}

export default Cell
