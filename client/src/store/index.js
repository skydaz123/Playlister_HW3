import MoveSong_Transaction from "../transactions/MoveSong_transaction";
import AddSong_Transaction from "../transactions/AddSong_Transaction";
import EditSong_Transaction from "../transactions/EditSong_Transaction";
import DeleteSong_Transaction from "../transactions/DeleteSong_Transaction";

import { createContext, useState } from "react";
import jsTPS from "../common/jsTPS";
import api from "../api";
export const GlobalStoreContext = createContext({});

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
  MARK_SONG_FOR_EDITING: "MARK_SONG_FOR_EDITING",
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  DELETE_LIST: "DELETE_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  SHOW_DELETE_LIST_MODAL: "SHOW_DELETE_LIST_MODAL",
  HIDE_DELETE_LIST_MODAL: "HIDE_DELETE_LIST_MODAL",
  HIDE_DELETE_SONG_MODAL: "HIDE_DELETE_SONG_MODAL",
  HIDE_EDIT_SONG_MODAL: "HIDE_EDIT_SONG_MODAL",
  SET_LIST_ACTTIVE: "SET_LIST_ACTTIVE",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    idNamePairs: [],
    currentList: null,
    newListCounter: 0,
    listNameActive: false,
    deleteListId: null,
    deleteSongIndex: null,
    editSongIndex: null,
  });

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          idNamePairs: payload.idNamePairs,
          currentList: payload.playlist,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        console.log("CREATING NEW LIST");
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.SET_LIST_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: payload,
          deleteListId: store.deleteListId,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          idNamePairs: payload,
          currentList: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        console.log("payload is:" + payload);
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload.playlist,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: payload.id,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
        console.log("index to delete song is: " + payload);
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: store.deleteListId,
          deleteSongIndex: payload,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.MARK_SONG_FOR_EDITING: {
        console.log("index to edit song is: " + payload);
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: store.deleteListId,
          deleteSongIndex: null,
          editSongIndex: payload,
        });
      }

      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        console.log("SETTING CURRENT LIST");
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          listNameActive: false,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      case GlobalStoreActionType.DELETE_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter - 1,
          listNameActive: false,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          listNameActive: true,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.SHOW_DELETE_LIST_MODAL: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.currentList,
          deleteListId: store.deleteListId,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.HIDE_DELETE_LIST_MODAL: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          listNameActive: store.currentList,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.HIDE_DELETE_SONG_MODAL: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.currentList,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }

      case GlobalStoreActionType.HIDE_EDIT_SONG_MODAL: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.currentList,
          deleteListId: null,
          deleteSongIndex: null,
          editSongIndex: null,
        });
      }
      default:
        return store;
    }
  };
  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_ACTTIVE,
      payload: true,
    });
  };
  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = function (id, newName) {
    // GET THE LIST
    async function asyncChangeListName(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playist;
        playlist.name = newName;
        async function updateList(playlist) {
          // IMPLEMENT THIS
          response = await api.updatePlaylistById(playlist._id, playlist);
          if (response.data.success) {
            async function getListPairs(playlist) {
              response = await api.getPlaylistPairs();
              if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                  type: GlobalStoreActionType.CHANGE_LIST_NAME,
                  payload: {
                    idNamePairs: pairsArray,
                    playlist: playlist,
                  },
                });
              }
            }
            getListPairs(playlist);
          }
        }
        updateList(playlist);
      }
    }
    asyncChangeListName(id);
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    tps.clearAllTransactions();
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
  };

  store.createNewList = function () {
    async function asyncCreatePlayList() {
      const body = { name: "Untitled" };
      const response = await api.createPlaylist(body);
      if (response.data.success) {
        let result = await api.getPlaylistPairs();
        let pairsArray = result.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.CREATE_NEW_LIST,
          payload: pairsArray,
        });
        store.setCurrentList(pairsArray[pairsArray.length - 1]._id);
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncCreatePlayList();
  };

  store.deleteList = function (id) {
    console.log("delete id is : " + id);
    async function asyncDeleteList(test_id) {
      const response = await api.deletePlaylist(test_id);
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.DELETE_LIST,
          payload: null,
        });
        if (store.newListCounter === 0) {
          storeReducer({
            type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
            payload: [],
          });
        }
        store.loadIdNamePairs();
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    store.hideDeleteListModal();
    asyncDeleteList(id);
  };

  store.addAddSongTransaction = function () {
    let transaction = new AddSong_Transaction(store);
    tps.addTransaction(transaction);
  };

  store.addMoveSongTransaction = function (start, end) {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };

  store.addDeleteSongTransaction = function (index, originalSong) {
    let transaction = new DeleteSong_Transaction(store, index, originalSong);
    tps.addTransaction(transaction);
  };

  store.addEditSongTransaction = function (index, originalSong, title, artist, youTubeId) {
    let transaction = new EditSong_Transaction(store, index, originalSong, title, artist, youTubeId);
    tps.addTransaction(transaction);
  };

  store.addSong = function () {
    async function asyncAddSong() {
      let list = store.currentList;
      let song = {
        title: "Untitled",
        artist: "Unknown",
        youTubeId: "dQw4w9WgXcQ",
      };
      list.songs.push(song);
      await api.putPlaylist(list._id, list);
      store.setCurrentList(list._id);
    }
    asyncAddSong();
  };

  store.popSong = function () {
    async function asyncPopSong() {
      let list = store.currentList;
      list.songs.pop();
      await api.putPlaylist(list._id, list);
      store.setCurrentList(list._id);
    }
    asyncPopSong();
  };

  store.deleteSong = function (index) {
    async function asyncDeleteSong(test_index) {
      let list = store.currentList;
      list.songs.splice(test_index, 1);
      await api.putPlaylist(list._id, list);
      store.setCurrentList(list._id);
    }
    asyncDeleteSong(index);
    store.hideDeleteSongModal();
  };

  store.insertSong = function (index, song) {
    async function asyncInsertSong(test_index, test_song) {
      let list = store.currentList;
      list.songs.splice(test_index, 0, test_song);
      await api.putPlaylist(list._id, list);
      store.setCurrentList(list._id);
    }
    asyncInsertSong(index, song);
  };

  store.editSong = function(index, title, artist, youTubeId) {
    async function asyncEditSong(
      test_index,
      initTitle,
      initArtist,
      initYouTubeId
    ) {
      let list = store.currentList;
      let newSong = {
        title: initTitle,
        artist: initArtist,
        youTubeId: initYouTubeId,
      };
      list.songs[test_index] = newSong;
      await api.putPlaylist(list._id, list);
      store.setCurrentList(list._id);
    }
    asyncEditSong(index, title, artist, youTubeId);
    store.hideEditSongModal();
  };

  store.reverseEditSong = function(index, song) {
    async function asyncReverseEditSong(test_index, test_song) {
      let list = store.currentList;
      list.songs[test_index] = test_song;
      await api.putPlaylist(list._id, list);
      store.setCurrentList(list._id);
    }
    asyncReverseEditSong(index, song);
  }
  /*store.moveSong(start, end) {
            let list = store.currentList;
            start -= 1;
            end -= 1;
            if (start < end) {
                let temp = list.songs[start];
                for (let i = start; i < end; i++) {
                    list.songs[i] = list.songs[i + 1];
                }
                list.songs[end] = temp;
            }
            else if (start > end) {
                let temp = list.songs[start];
                for (let i = start; i > end; i--) {
                    list.songs[i] = list.songs[i - 1];
                }
                list.songs[end] = temp;
            }
            store.setCurrentList(list.id, list.songs);
    }*/

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = function () {
    async function asyncLoadIdNamePairs() {
      const response = await api.getPlaylistPairs();
      if (response.data.success) {
        let pairsArray = response.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncLoadIdNamePairs();
  };

  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;

        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: playlist,
          });
          store.history.push("/playlist/" + playlist._id);
        }
      }
    }
    asyncSetCurrentList(id);
  };
  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };
  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setlistNameActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  store.showDeleteListModal = function (id) {
    async function asyncShowDeleteListModal(test_id) {
      let modal = document.getElementById("delete-list-modal");
      modal.classList.add("is-visible");
      let response = await api.getPlaylistById(test_id);
      storeReducer({
        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        payload: {
          id: test_id,
          playlist: response.data.playlist,
        },
      });
    }
    asyncShowDeleteListModal(id);
  };

  store.showDeleteSongModal = function (index) {
    let modal = document.getElementById("delete-song-modal");
    modal.classList.add("is-visible");
    storeReducer({
      type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
      payload: index,
    });
  };

  store.showEditSongModal = function (index) {
    let modal = document.getElementById("edit-song-modal");
    modal.classList.add("is-visible");
    storeReducer({
      type: GlobalStoreActionType.MARK_SONG_FOR_EDITING,
      payload: index,
    });
  };

  store.hideEditSongModal = function () {
    let modal = document.getElementById("edit-song-modal");
    if (modal !== null) {
      modal.classList.remove("is-visible");
      storeReducer({
        type: GlobalStoreActionType.HIDE_EDIT_SONG_MODAL,
        payload: null,
      });
    }
  };
  store.hideDeleteListModal = function () {
    let modal = document.getElementById("delete-list-modal");
    if (modal !== null) {
      modal.classList.remove("is-visible");
      storeReducer({
        type: GlobalStoreActionType.HIDE_DELETE_LIST_MODAL,
        payload: null,
      });
    }
  };

  store.hideDeleteSongModal = function () {
    let modal = document.getElementById("delete-song-modal");
    if (modal !== null) {
      modal.classList.remove("is-visible");
      storeReducer({
        type: GlobalStoreActionType.HIDE_DELETE_SONG_MODAL,
        payload: null,
      });
    }
  };
  // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
  return { store, storeReducer };
};
