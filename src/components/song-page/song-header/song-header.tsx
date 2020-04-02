import React, { FC } from 'react';
import './song-header.css';
import LoadingImg from '../../loading-img/loading-img';
import PlusButton from '../../../assets/icons/plus-circle-outline.svg'
import { GeniusSong } from '../../../model/genius/geniusTypes';

const SongHeader: FC<{song: GeniusSong, library: GeniusSong[], removeFromLibrary: Function, addToLibrary: Function}> = (props) => {

    function checkLibrary(): any {
        for (const i in props.library) {
            if (props.library[i].id === props.song.id) {
                return { exists: true, index: i };
            }
        }
        return { exists: false };
    }

    function handleOnClick(): void {
        const libraryCheck = checkLibrary();
        libraryCheck.exists ? props.removeFromLibrary(libraryCheck.index) : props.addToLibrary(props.song)
    }

    return (
        <div className='song-header'>
            <div className='song-image'>
                <LoadingImg alt={props.song.title} src={props.song.song_art_image_url}/>
            </div>
            <div className='song-details'> 
                <div className='song-title'>
                    {props.song.title}
                    <span className='add-song'>
                        <img alt={'add/remove song'} src={PlusButton} className={checkLibrary().exists ? 'added' : ''} style={{height: '1em'}} 
                        onClick={() => handleOnClick()}/>
                    </span>
                </div>
                <div className='song-artist'>
                    {props.song.primary_artist.name}
                </div>
            </div> 
        </div>
    );
}

export default SongHeader;