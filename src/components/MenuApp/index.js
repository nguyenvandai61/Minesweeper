import React, { Component } from 'react'
import BombCounter from '../BombCounter'
import RestartButton from '../RestartButton'
import Timer from '../Timer'

export class MenuApp extends Component {
    render() {
        let {restart} = this.props;
        return (
            <div>
                <BombCounter/>
                <RestartButton onClick={restart}/>
                <Timer/>
            </div>
        )
    }
}

export default MenuApp
