import { createStore } from 'redux'

function state(state = {}, action) {
    switch (action.type) {
        case 'SET_BOARD_GAME':
            state = action.board;
            return state;
        default:
            return state;
    }
}

const BoardGameStore = createStore(state, []);


export default BoardGameStore;