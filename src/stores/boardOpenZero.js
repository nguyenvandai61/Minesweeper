import { createStore } from "redux";


function state(state = {}, action) { 
    switch(action.type) {
        case 'SET_BOARD_OPEN_ZERO':
            state.board = action.board;
            return state;
        default:
            return state;
    }
}
const BoardOpenZeroStore = createStore(state, {});
export default BoardOpenZeroStore;