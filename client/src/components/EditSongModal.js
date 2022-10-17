import { useContext } from "react";
import { GlobalStoreContext } from "../store";

const EditSongModal = () => {
  const { store } = useContext(GlobalStoreContext);
    let title = document.getElementById("edit-song-title");
    let artist = document.getElementById("edit-song-artist");
    let youTubeId = document.getElementById("edit-song-youtube");
  if (store.currentList === null) {
    return <div id="edit-song-modal"></div>;
  } else {
    let songToEdit = {
      title: "",
      artist: "",
      youTubeId: "",
    };
    if (store.editSongIndex !== null) {
      let songList = store.currentList.songs;
      let song = songList[store.editSongIndex];
      songToEdit = {
        title: song.title,
        artist: song.artist,
        youTubeId: song.youTubeId,
      };
      title.value = songToEdit.title;
      artist.value = songToEdit.artist;
      youTubeId.value = songToEdit.youTubeId;
    }
  }
  return (
    <div className="modal" id="edit-song-modal" data-animation="slideInOutLeft">
      <div className="modal-root" id="verify-edit-list-root">
        <div className="modal-north">Edit Song</div>
        <div
          className="modal-center"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className="modal-title-content"
            style={{ fontSize: "30px", display: "flex", flexDirection: "row" }}
          >
            <div style={{ padding: "20px" }}>Title:</div>
            <input
              type="text"
              id="edit-song-title"
              style={{ width: "300px", height: "40px", fontSize: "30px" }}
            />
          </div>
          <div
            className="modal-artist-content"
            style={{ fontSize: "30px", display: "flex", flexDirection: "row" }}
          >
            <div style={{ padding: "20px" }}>Artist:</div>
            <input
              type="text"
              id="edit-song-artist"
              style={{ width: "300px", height: "40px", fontSize: "30px" }}
            />
          </div>
          <div
            className="modal-youtubeid-content"
            style={{ fontSize: "30px", display: "flex", flexDirection: "row" }}
          >
            <div style={{ padding: "20px" }}>YouTube Id:</div>
            <input
              type="text"
              id="edit-song-youtube"
              style={{ width: "300px", height: "40px", fontSize: "30px" }}
            />
          </div>
        </div>
        <div className="modal-south">
          <input
            type="button"
            id="edit-song-confirm-button"
            className="modal-button"
            value="Confirm"
            onClick={() => store.editSong(store.editSongIndex, title.value, artist.value, youTubeId.value)}
          />
          <input
            type="button"
            id="edit-song-cancel-button"
            className="modal-button"
            value="Cancel"
            onClick={() => store.hideEditSongModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSongModal;
