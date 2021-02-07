import React, { Component } from 'react'
import { AppContext } from '../../AppContext';

export class RestartButton  extends Component {
    render() {
        let props = this.props;
        let context = this.context;
        return (
            <div>
                <button {...props} onClick={context.toggleRestart}><i class="fa fa-smile-o" aria-hidden="true"></i></button>
            </div>
        )
    }
}

RestartButton.contextType = AppContext;

export default RestartButton
