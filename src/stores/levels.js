import { createStore } from 'redux'
import {Levels} from '../constants';

function levels(state = {}, action) {
    switch (action.type) {
        case 'SET_LEVEL':
            state = action.levels;
            return state;
        default:
            return state;
    }
}

const store = createStore(levels, Levels.SUPEREASY);

// store.dispatch({
//     type: 'SET_LEVEL',
//     levels: Levels.HARD
// })

console.log(store.getState());

export default store;