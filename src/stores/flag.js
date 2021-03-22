import { createStore } from 'redux'
function levels(state = {}, action) {
    switch (action.type) {
        case 'SET_NUM_RESTED_FLAG':
            state = action.n;
            return state;
        case 'DECREMENT':
            state = state - 1;
            return state;
        case 'INCREMENT':
            state = state + 1;
            return state;
        default:
            return state;
    }
}

const nRestedFlagStore = createStore(levels, 0);

export default nRestedFlagStore;