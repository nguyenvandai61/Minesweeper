import React, { Component } from 'react'
import { AppContext } from '../../AppContext';

export class RestartButton  extends Component {
    render() {
        let props = this.props;
        return (
            <div>
                <button {...props}><i class="fa fa-smile-o" aria-hidden="true"></i></button>
            </div>
        )
    }
}

export default RestartButton
