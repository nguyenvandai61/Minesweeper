import nRestedFlagStore from "../stores/flag";

const RestedFlagActions = {
    setNRestedFlag(n) {
        nRestedFlagStore.dispatch({
            type: "SET_NUM_RESTED_FLAG",
            n: n
        })
    },
    decrement() {
        nRestedFlagStore.dispatch({
            type: "DECREMENT",
        })
    },
    increment() {
        nRestedFlagStore.dispatch({
            type: "INCREMENT",
        })
    }
}

export default RestedFlagActions;