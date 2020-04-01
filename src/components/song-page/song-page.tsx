import React, { FC, useState, useEffect, Fragment } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css';
import { useParams } from 'react-router-dom';
import { GeniusSong } from '../../model/genius/geniusTypes';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { setCurrentSong } from '../../model/redux/songState';
import LoadingImg from '../loading-img/loading-img';
import LyricsSection from './lyrics-section/lyrics-section';
import MediaSection from './media-section/media-section';
import { addSongToLibrary, removeSongFromLibrary } from '../../model/redux/libraryState';
import PlusButton from '../../assets/icons/plus-circle-outline.svg'

const SongPage: FC<{song: GeniusSong, library: GeniusSong[], updateSong: Function, addToLibrary: Function, removeFromLibrary: Function}> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

    function checkLibrary(): any {
        for (const i in props.library) {
            if (props.library[i].id.toString() === songId) {
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
        <MainArea>
            <div className='song-page'>
                <div className='song-header'>
                    <div className='song-image'>
                        <LoadingImg alt={props.song.title} src={props.song.song_art_image_url}/>
                    </div>
                    <div className='song-details'> 
                        <div className='song-title'>
                            {props.song.title}
                            <span className='add-song'>
                                <img src={PlusButton} className={checkLibrary().exists ? 'added' : ''} style={{height: '1em'}} 
                                onClick={() => handleOnClick()}/>
                            </span>
                        </div>
                        <div className='song-artist'>
                            {props.song.primary_artist.name}
                        </div>
                        
                    </div> 
                </div>
                <div className='song-content'>  
                    <LyricsSection song={props.song} updateSong={props.updateSong}/>
                    <MediaSection song={props.song} updateSong={props.updateSong}/>
                </div>
                <div className='song-media'></div>
            </div>  
        </MainArea>
    );
}

const mapStateToProps = (state: AppState, ownProps: any): any => ({
    song: state.songState.current,
    library: state.libraryState
});

const mapDispatchToProps = (dispatch: any): any => ({
    updateSong: (song: GeniusSong) => {dispatch(setCurrentSong(song))},
    addToLibrary: (song: GeniusSong) => {dispatch(addSongToLibrary(song))}, 
    removeFromLibrary: (song: GeniusSong) => {dispatch(removeSongFromLibrary(song))},
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongPage);