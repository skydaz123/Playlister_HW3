import jsTPS_Transaction from "../common/jsTPS.js"
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import jsTPS_Transaction from "../common/jsTPS.js"

export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initStore) {
        super();
        this.store = initStore;
    }

    doTransaction() {
        this.store.addSong();
    }
    
    undoTransaction() {
        this.store.popSong();
    }
}