import React, { Component } from 'react';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            ticks: 0,
        }
    }
    componentDidMount() {
        this.startClock();
    }
    formatTime = () => {
        let {hours, minutes, seconds} = this.state;
        let time = [hours, minutes, seconds];
        return time.map(number => {
            return number.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            })
        })
    }

    startClock = () => {
        this.tickClock()
    }
    tickClock = () => {
        let hours, minutes, seconds, ticks;
        setInterval(() => {
            ticks = this.state.ticks + 1;
            hours = Math.floor(ticks / 3600);
            minutes = Math.floor((ticks - hours * 3600) / 60);
            seconds = ticks % 60;
            this.setState({hours, minutes, seconds, ticks})
        }, 1000)
    }
    render() {
        let fNum = this.formatTime();
        return (
            <div>
                {fNum[0]}:{fNum[1]}:{fNum[2]}
            </div>
        );
    }
}

export default index;