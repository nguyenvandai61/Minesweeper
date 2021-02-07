import React, { Component } from 'react'
import { AppContext } from '../../AppContext'

export class BombCounter extends Component {
    render() {
        return (
            <div>
                <button className="btnCounter">{this.context.level.nBomb}</button>
            </div>
        )
    }
}

BombCounter.contextType = AppContext;
export default BombCounter
