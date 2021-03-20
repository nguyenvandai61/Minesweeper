import store from "../stores/levels"
const levelActions = {
    setLevel(level) {
        store.dispatch({
            type: "SET_LEVEL",
            level: level
        })
    }
}

export default levelActions;