import React, { Component } from 'react'

export class RestartButton  extends Component {
    render() {
        let props = this.props;
        let context = this.context;
        return (
            <div>
                <button {...props} onClick={context.toggleRestart}><i className="fa fa-smile-o" aria-hidden="true"></i></button>
            </div>
        )
    }
}

export default RestartButton
