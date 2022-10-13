import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

const DeleteSongModal = () => {
    const { store } = useContext(GlobalStoreContext);

    return (
        <div
            className="modal"
            id="delete-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-song-root'>
                <div className="modal-north">
                    Delete Song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete {songToDelete.title}?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="delete-song-confirm-button"
                        className="modal-button"
                        //onClick={}
                        value='Confirm' />
                    <input type="button"
                        id="delete-song-cancel-button"
                        className="modal-button"
                        //onClick={}
                        value='Cancel' />
                </div>
            </div>
        </div>
    )
}