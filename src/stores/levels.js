import { createStore } from 'redux'
import {Levels} from '../constants';

function levels(state = {}, action) {
    switch (action.type) {
        case 'SET_LEVEL':
            state = action.level;
            return state;
        default:
            return state;
    }
}

const store = createStore(levels, Levels.HARD);

export default store;