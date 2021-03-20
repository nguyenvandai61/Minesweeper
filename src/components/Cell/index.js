import React, { Component } from 'react';
import stateActions from '../../actions/state';
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

            content: "_",
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
        this.setState({ content: "_" });
    }

    onOpenHandler = () => {
        let { isBomb, nBomb } = this.state;

        if (isBomb) {
            stateActions.setGameOverState(true);
            this.onFinishHandler();
        }
        else {
            this.setState({ content: nBomb });
        }
    }

    onFinishHandler = () => {
        let { isBomb, nBomb, isOpened, isFlag } = this.state;
        // Case Lose:
        let content = "_";
        if (!isBomb) {
            content = nBomb;
            if (isFlag) {
                content = "M";
            }
        } else {
            // Click boom
            content = "*";
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
            console.log(stateGameoverStore.getState())
            this.onFinishHandler();
            this.setState({ isOpened: stateGameoverStore.getState() });
        })
        stateRestartStore.subscribe(() => {
            console.log("sss")
            this.setState({isOpened: false, content: "_"});
        })
    }
    contentHandler() {

    }
    render() {
        let { content, isOpened, isFlag } = this.state;
        if (!isOpened) {
            content = isFlag? "F": "_";
        }
        return (
            <div>
                <div
                    className="cell"
                    onClick={this.openCell}
                    onContextMenu={this.flagCell}>
                    <span>{content}</span>
                </div>
            </div>
        )
    }
}

export default Cell
