import React, { Component } from 'react'
import stateActions from '../../../actions/state';
import {Button} from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

export class RestartButton extends Component {
    restartGame = () => {
        stateActions.setGameOverState(false);
        stateActions.setRestartState(true);
    }
    render() {
        return (
            <div>
                <Button color="primary" variant="contained" onClick={this.restartGame}>
                    <InsertEmoticonIcon></InsertEmoticonIcon>
                </Button>
            </div>
        )
    }
}

export default RestartButton
