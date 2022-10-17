import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { song, index } = props;
    const { store } = useContext(GlobalStoreContext);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedTo, setDraggedTo] = useState(false);
    
    const handleDragStart = (event) => {
        event.dataTransfer.setData("song", index);
        setIsDragging(true);
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        setDraggedTo(true);
    }

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDraggedTo(true);
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDraggedTo(false);
    }

    const handleDrop = (event) => {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);
        setIsDragging(false);
        

        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }

    let cardClass = "list-card unselected-list-card";
    if (draggedTo){
        cardClass = "selected-list-card";
    }
    return (
        <div
            key={index}
            id={'song-' + index}
            className={cardClass}
            onDoubleClick={() => store.showEditSongModal(index)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                onClick={() => store.showDeleteSongModal(index)}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;