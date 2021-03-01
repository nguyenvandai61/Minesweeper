import React, { Component } from 'react'
import BombCounter from './BombCounter'
import RestartButton from './RestartButton'
import Timer from './Timer'
import "../MenuApp/style.css"
export class MenuApp extends Component {
    render() {
        return (
            <div className="menu-app">
                <BombCounter />
                <RestartButton/>
                <Timer/>
            </div>
        )
    }
}

export default MenuApp
