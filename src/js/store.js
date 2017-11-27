import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            boardDim: {
                width: 100,
                height: 80
            },
            board:[],
            oldBoard: [],
            on: true
        }
        this.addListener = this.addListener.bind(this);
        this.countNeighbours = this.countNeighbours.bind(this);
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
        return this.state.board;
    }

    setupGame(){
        this.state.board = [];
        for (let i = 0; i < this.state.boardDim.height; i++) {
            let temp = [];
            for (let x = 0; x < this.state.boardDim.width; x++) {
                let aliveItem = Math.round(Math.random()*this.state.boardDim.width);
                let obj = {
                    life: "",
                    x: "",
                    y: ""
                }
                obj.x = x;
                obj.y = i;
                //obj.life = "death";
                
                if(x === aliveItem || x ===aliveItem+1 || x === aliveItem-1 || x === aliveItem-2){
                    obj.life ="alive";
                } else {
                    obj.life = "death";
                }

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
                let objLife = this.countNeighbours(y, x);
                let obj = {};
                obj.x = x;
                obj.y = y;
                obj.life = objLife; 
                temp.push(obj);
            }
            this.state.oldBoard.push(temp);
        }
        this.state.board = this.state.oldBoard;
        if(this.state.on){
            setTimeout(this.playGame.bind(this), 50);
        }
        this.emit("change");
    }

    countNeighbours(y, x){
        let count = 0;
        const neighbours = [[y-1, x-1], 
        [y-1, x], 
        [y-1, x+1], 
        [y, x-1], 
        [y, x+1 ], 
        [y+1 , x-1 ], 
        [y+1, x], 
        [y+1 , x+1]
    ];
        let objLife = "";
            for (let i = 0; i < neighbours.length; i++) {
                let item = neighbours[i];
                let itemX = item[1];
                let itemY = item[0];
                if (itemY === -1){
                    itemY = this.state.boardDim.height-1;
                } else if(itemY > this.state.boardDim.height-1){
                    itemY = 0;
                } 
                if (itemX === -1){
                    itemX = this.state.boardDim.width-1;

                } else if(itemX > this.state.boardDim.width-1){
                    itemX = 0;
                } 
                if(this.state.board[itemY][itemX].life === "alive"){
                    count++;
                }
            }
            if(this.state.board[y][x].life ==="alive"){
                if(count < 2 || count > 3){
                    objLife = "death";
                } else {
                    objLife = "alive";
                }
            } else {
                if(count === 3){
                    objLife = "alive";
                } else {
                    objLife = "death";
                }
            }
            return objLife;
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