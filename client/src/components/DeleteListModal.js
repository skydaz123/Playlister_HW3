import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

const DeleteListModal = () => {
    const { store } = useContext(GlobalStoreContext);
    let modalName = "";
    if (store.currentList !== undefined && store.deleteListId !== null){
        modalName = store.currentList.name;
    }
    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-list-root'>
                    <div className="modal-north">
                        Delete playlist?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the {modalName} playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            onClick={() => store.deleteList()}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            onClick={() => store.hideDeleteListModal()}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;