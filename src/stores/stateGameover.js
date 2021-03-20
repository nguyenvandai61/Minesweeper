import { createStore } from 'redux'

function state(state = {}, action) {
    switch (action.type) {
        case 'SET_GAMEOVER':
            state = action.state;
            return state;
        default:
            return state;
    }
}

const stateGameoverStore = createStore(state, false);


export default stateGameoverStore;