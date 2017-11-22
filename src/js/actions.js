import Dispatcher from './dispatcher';

export let clickedObject = (text) => {
    Dispatcher.dispatch({
        type: "OBJECT_CLICK",
        id: text
    });
}

export let startGame = () => {
    Dispatcher.dispatch({
        type: "START_GAME"
    });
}

export let stopGame = () => {
    Dispatcher.dispatch({
        type: "STOP_GAME"
    });
}

export let clearBoard = (text) => {
    Dispatcher.dispatch({
        type: "CLEAR_BOARD"
    });
}