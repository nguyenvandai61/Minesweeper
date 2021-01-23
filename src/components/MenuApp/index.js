import React, { Component } from 'react'
import BombCounter from '../BombCounter'
import RestartButton from '../RestartButton'
import Timer from '../Timer'

export class MenuApp extends Component {
    render() {
        return (
            <div>
                <BombCounter/>
                <RestartButton/>
                <Timer/>
            </div>
        )
    }
}

export default MenuApp
