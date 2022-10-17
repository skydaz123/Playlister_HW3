import jsTPS_Transaction from "../common/jsTPS.js"
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initSongIndex, initOriginalSong) {
        super();
        this.store = initStore;
        this.songIndex = initSongIndex;
        this.originalSong = initOriginalSong;
    }

    doTransaction() {
        this.store.deleteSong(this.songIndex);
    }
    
    undoTransaction() {
        this.store.insertSong(this.songIndex, this.originalSong);
    }
}