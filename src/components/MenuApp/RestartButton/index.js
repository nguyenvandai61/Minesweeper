import React, { Component } from 'react'
import stateActions from '../../../actions/state';

export class RestartButton extends Component {
    restartGame = () => {
        stateActions.setGameOverState(false);
        stateActions.setRestartState(true);
    }
    render() {
        return (
            <div>
                <button onClick={this.restartGame}><i className="fa fa-smile-o" aria-hidden="true"></i></button>
            </div>
        )
    }
}

export default RestartButton
