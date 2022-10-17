import jsTPS_Transaction from "../common/jsTPS.js"
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initSongIndex, initOriginalSong, initTitle, initArtist, initYouTubeId) {
        super();
        this.store = initStore;
        this.songIndex = initSongIndex;
        this.originalSong = initOriginalSong;
        this.title = initTitle;
        this.artist = initArtist;
        this.youTubeId = initYouTubeId;
    }

    doTransaction() {
        this.store.editSong(this.title, this.artist, this.youTubeId, this.songIndex);
    }
    
    undoTransaction() {
        this.store.reverseEditSong(this.songIndex, this.originalSong);
    }
}