import { createStore } from 'redux'

function state(state = {}, action) {
    switch (action.type) {
        case 'SET_RESTART':
            state = action.state;
            return state;
        default:
            return state;
    }
}

const stateRestartStore = createStore(state, false);


export default stateRestartStore;