import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import gridItem from '../components/gridItem';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            boardDim: {
                width: 70,
                height: 50
            },
            board:[],
            oldBoard: [],
            on: true,
            generation: 0,
            itemsToRender: []
        }
        this.addListener = this.addListener.bind(this);
        this.countNeighbours = this.countNeighbours.bind(this);
    }

    objectClick(x, y){
        let newState = {...this.state.board};
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
                
                if(x === aliveItem || x ===aliveItem+1 || x === aliveItem-1 || x === aliveItem-2 || x === aliveItem-3){
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
        let date = new Date();
        let now = date.getTime();
        this.state.generation++;
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
        let finish = date.getTime();
        console.log(finish);
        if(this.state.on){
            setTimeout(this.playGame.bind(this), 90);
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
                if(this.state.board[itemY][itemX].life === "alive" || this.state.board[itemY][itemX].life === "born"){
                    count++;
                }
            }
            if(this.state.board[y][x].life ==="alive" || this.state.board[y][x].life ==="born" ){
                if(count < 2 || count > 3){
                    objLife = "death";
                } else {
                    objLife = "alive";
                }
            } else {
                if(count === 3){
                    objLife = "born";
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
        this.state.generation = 0;
        this.emit("change");
    }

    changeBoardSize(id){
        console.log(id);
        if(id === "70x50"){
            this.state.boardDim.width = 70;
            this.state.boardDim.height = 50;
        } else if("50x30"){
            this.state.boardDim.width = 50;
            this.state.boardDim.height = 30;
        } else if("100x70"){
            this.state.boardDim.width = 100;
            this.state.boardDim.height = 70;
        }
        this.setupGame();
        this.emit("changed width");
    } 
    makeStep(){
        this.state.on = false;
        this.playGame();
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
            case "CHANGE_BOARD_SIZE":
            this.changeBoardSize(action.id);
            break;
            case "MAKE_STEP": 
            this.makeStep();
            break;
            default:
                break;
        }
    }

}
let GameStore = new GameStoreCon();
Dispatcher.register(GameStore.addListener.bind(this));
export default GameStore;