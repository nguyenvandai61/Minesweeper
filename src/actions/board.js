import BoardStore from "../stores/board";
import BoardOpenZeroStore from "../stores/boardOpenZero";

const BoardActions = {
    setBoardGame(board) {
        BoardStore.dispatch({
            type: "SET_BOARD_GAME",
            board: board
        })
    },
    setBoardOpenZero(board) {
        BoardOpenZeroStore.dispatch({
            type: "SET_BOARD_OPEN_ZERO",
            board: board,
        })
    },
}

export default BoardActions;