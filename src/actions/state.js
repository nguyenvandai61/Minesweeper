import stateGameoverStore from "../stores/stateGameover"
import stateRestartStore from "../stores/stateRestart"

const stateActions = {
    setGameOverState(state) {
        stateGameoverStore.dispatch({
            type: 'SET_GAMEOVER',
            state: state,
        })
    },
    setRestartState(state) {
        stateRestartStore.dispatch({
            type: 'SET_RESTART',
            state: state,
        })
    }
}

export default stateActions;

