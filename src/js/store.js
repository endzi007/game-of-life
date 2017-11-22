import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            boardDim: {
                width: 50,
                height: 30
            },
            board:[]
        }
        this.addListener = this.addListener.bind(this);
    }

    objectClick(){
        GameStore.emit("change");
    }

    returnBoardState(){
        this.startGame();
        return this.state.board;
    }

    startGame(){
        for (let i = 0; i < this.state.boardDim.height; i++) {
            let temp = [];
            for (let x = 0; x < this.state.boardDim.width; x++) {
                if(x === 4){
                    temp.push("D");
                }
                temp.push("A");
           }
           this.state.board.push(temp);
        }
        GameStore.emit("change");
    }

    stopGame(){

    }

    clearBoard(){

    }

    addListener(action){
        switch (action.type) {
            case "OBJECT_CLICK":
            this.objectClick();
                break;
            case "START_GAME":
            this.startGame();
                break;
            case "STOP_GAME":
            this.stopGame();
                break;
            case "CLEAR_BOARD":
            this.clearBoard();
                break;
            default:
                break;
        }
    }

}
let GameStore = new GameStoreCon();
Dispatcher.register(GameStore.addListener.bind(this));
export default GameStore;