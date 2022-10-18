import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { useHistory } from "react-router-dom";
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();
  let enabledButtonClass = "playlister-button";

  let canUndo = store.canUndo();
  let canRedo = store.canRedo();

  let enableSongRedo = "playlister-button";
  let enableSongUndo = "playlister-button";
  let enableSongClose = "playlister-button";
  let enableSongAdd = "playlister-button";

  if (store.inListSelector) {
    enableSongRedo += "-disabled";
    enableSongUndo += "-disabled";
    enableSongClose += "-disabled";
    enableSongAdd += "-disabled";
  } 
  else {
    if (store.modalOpen) {
      enableSongRedo += "-disabled";
      enableSongUndo += "-disabled";
      enableSongClose += "-disabled";
      enableSongAdd += "-disabled";
    } else {
      if (!canUndo) {
        enableSongUndo += "-disabled";
      }
      if (!canRedo) {
        enableSongRedo += "-disabled";
      }
    }
  }

  function handleUndo() {
    store.undo();
  }
  function handleRedo() {
    store.redo();
  }
  function handleClose() {
    history.push("/");
    store.closeCurrentList();
  }
  let editStatus = false;
  if (store.isListNameEditActive) {
    editStatus = true;
  }
  return (
    <span id="edit-toolbar">
      <input
        type="button"
        id="add-song-button"
        disabled={store.inListSelector || store.modalOpen}
        value="+"
        onClick={() => store.addAddSongTransaction()}
        className={enableSongAdd}
      />
      <input
        type="button"
        id="undo-button"
        disabled={store.inListSelector || store.modalOpen || !canUndo}
        value="⟲"
        className={enableSongUndo}
        onClick={handleUndo}
      />
      <input
        type="button"
        id="redo-button"
        disabled={store.inListSelector || store.modalOpen || !canRedo}
        value="⟳"
        className={enableSongRedo}
        onClick={handleRedo}
      />
      <input
        type="button"
        id="close-button"
        disabled={store.inListSelector || store.modalOpen}
        value="&#x2715;"
        className={enableSongClose}
        onClick={handleClose}
      />
    </span>
  );
}

export default EditToolbar;
