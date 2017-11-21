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

export let pauseGame = () => {
    Dispatcher.dispatch({
        type: "PAUSE_GAME"
    });
}

export let clearBoard = (text) => {
    Dispatcher.dispatch({
        type: "CLEAR_BOARD"
    });
}