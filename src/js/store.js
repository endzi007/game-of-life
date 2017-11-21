import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';

class GameStoreCon extends EventEmitter{
    constructor(){
        super();
        this.state = {
            prop1: "1"
        }
    }


    addListener(action){
        switch (action.type) {
            case "OBJECT_CLICK":
                break;
            default:
                break;
        }
    }

}
let GameStore = new GameStoreCon();
Dispatcher.register(GameStore.addListener.bind(this));
export default GameStore;