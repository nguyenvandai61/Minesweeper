import React, { Component } from 'react'
import RestedFlagActions from '../../../actions/rested_flag';
import nRestedFlagStore from '../../../stores/flag';
import store from '../../../stores/levels'
export class BombCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nRestedFlag: 1
        }

    } 
    componentDidMount() {
        store.subscribe(() => {
            let nBomb = store.getState().nBomb;
            let nRestedFlag = store.getState().nBomb;
            RestedFlagActions.setNRestedFlag(nRestedFlag)
            this.setState({nBomb, nRestedFlag })
        })
        nRestedFlagStore.subscribe(() => {
            this.setState({nRestedFlag: nRestedFlagStore.getState()});
        })
    }
    render() {
        let {nBomb, nRestedFlag} = this.state;
        return (
            <div>
                <button className="btnCounter">{nRestedFlag}</button>
            </div>
        )
    }
}

export default BombCounter
