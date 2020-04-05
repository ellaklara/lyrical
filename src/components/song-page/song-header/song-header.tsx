import React, { FC, useState } from 'react';
import './song-header.css';
import LoadingImg from '../../loading-img/loading-img';
import PlusButton from '../../../assets/icons/plus-circle-outline.svg'
import { GeniusSong } from '../../../model/genius/geniusTypes';
import Dialog from "../../dialog/dialog";

const SongHeader: FC<{song: GeniusSong, songInLibrary: Function, library: GeniusSong[], toggleLibrary: Function}> = (props) => {

    const [openDialog, setOpenDialog] = useState(false);

    const toggleDialog = () => {
        if(props.songInLibrary()) {
            setOpenDialog(!openDialog)
        } else {
            props.toggleLibrary()
        }
    }

    return (
        <div className='song-header' style={{backgroundImage: 'url('+props.song.primary_artist.header_image_url+')'}}>
            <Dialog open={openDialog} onAccept={props.toggleLibrary} toggleScopeDialog={() => setOpenDialog(!openDialog)}>
                Are you sure you want to remove this song from your library?<br/>
                You will lose all changes made to the lyrics.
            </Dialog>
            <div className='black-overlay'>
                <div className='song-image'>
                    <LoadingImg alt={props.song.title} src={props.song.song_art_image_url}/>
                </div>
                <div className='song-details'> 
                    <div className='song-title'>
                        {props.song.title}
                        <span className='add-song'>
                            <img alt={'add/remove song'} src={PlusButton} className={props.songInLibrary() ? 'added' : ''} style={{height: '1em'}} 
                            onClick={toggleDialog}/>
                        </span>
                    </div>
                    <div className='song-artist'>
                        {props.song.primary_artist.name}
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default SongHeader;