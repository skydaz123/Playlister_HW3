import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import DeleteListModal from './DeleteListModal'
import { GlobalStoreContext } from '../store'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let enabledAddListButton = "playlister-button"
    if (store.modalOpen){
        enabledAddListButton += "-disabled";
    }
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={store.modalOpen}
                    className={enabledAddListButton}
                    value="+" />
                <div id="list-selector-text">Your Lists</div>
            
            </div>                {
                    listCard
                }
            </div>
            <DeleteListModal />
        </div>)
}

export default ListSelector;