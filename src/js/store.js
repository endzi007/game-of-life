import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            boardDim: {
                width: 50,
                height: 30
            },
            board:[],
            oldBoard: [],
            on: true
        }
        this.addListener = this.addListener.bind(this);
    }

    objectClick(x, y){
        _.flatMap(this.state.board, (element) => {
            var index = _.findIndex(element, {x, y});
            if(index !== -1){
                let clas = element[index].life === "alive"? "death" : "alive";
                element.splice(index, 1, {life: clas, x, y});
            }
        });
        GameStore.emit("change");
    }

    returnBoardState(){
        if(this.state.board.length === 0){
            this.setupGame();
        }
        console.log(this.state.board);
        return this.state.board;
    }

    setupGame(){
        this.state.board = [];
        for (let i = 0; i < this.state.boardDim.height; i++) {
            let temp = [];
            for (let x = 0; x < this.state.boardDim.width; x++) {
                let aliveItem = Math.round(Math.random()*50);
                let obj = {
                    life: "",
                    x: "",
                    y: ""
                }
                obj.x = x;
                obj.y = i;
                obj.life = "death";
                /*
                if(x === aliveItem || x ===aliveItem+1 || x === aliveItem-1 || x === aliveItem-2){
                    obj.life ="death";
                } else {
                    obj.life = "alive";
                }
                */
                temp.push(obj);
           }
           this.state.board.push(temp);
        }
    }
    playGame(){
        this.state.oldBoard = [];
        for (let y = 0; y < this.state.board.length; y++) {
            const element = this.state.board[y];
            let temp = [];
            for (let x = 0; x < element.length; x++) {
                let item = element[x];
                let nw = {
                    life: "",
                    x: "",
                    y: ""
                }
                nw.x = item.x;
                nw.y = item.y
                if(item.life === "alive"){
                    nw.life = "death"
                } else {
                    nw.life = "alive";
                }
                temp.push(nw);
            }
            this.state.oldBoard.push(temp);
        }
        this.state.board = this.state.oldBoard;
        if(this.state.on){
            setTimeout(this.playGame.bind(this), 1000);
        }
        this.emit("change");
    }
    startGame(){
        this.state.on = true;
        this.playGame();
    }

    stopGame(){
        this.state.on = false;
    }

    clearBoard(){
        _.map(_.flattenDeep(this.state.board),function(element){
            element.life = "death";
        });
        this.emit("change");
    }

    addListener(action){
        switch (action.type) {
            case "OBJECT_CLICK":
            this.objectClick(action.x, action.y);
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