import { Button, ButtonGroup } from '@material-ui/core';
import React, { Component } from 'react'

export class Menu extends Component {
    handleClick = (e) => {
        this.props.selectLevel(e.target.innerText.toUpperCase());
    }
    render() {
        let levelTxts = ["SuperEasy", "Easy", "Medium", "Hard"];
        let dom = levelTxts.map((lv,idx) => 
            (
                <Button
                onClick={this.handleClick} key={idx}> {lv} </Button>
                ))
        return (
            <ButtonGroup 
            color="primary"
            variant="contained"
            className = "menu">
                {dom}
            </ButtonGroup>
        )
    }
}

export default Menu
