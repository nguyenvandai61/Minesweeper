import React, { Component } from 'react'
import store from '../../../stores/levels'
export class BombCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nBomb: 0
        }

    } 
    componentDidMount() {
        store.subscribe(() => {
            this.setState({nBomb: store.getState().nBomb})
        })
    }
    render() {
        let {nBomb} = this.state;
        return (
            <div>
                <button className="btnCounter">{nBomb}</button>
            </div>
        )
    }
}

export default BombCounter
