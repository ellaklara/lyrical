import React, { FC } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css';
import { useParams } from 'react-router-dom';
import { GeniusSong } from '../../model/genius/geniusTypes';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { setCurrentSong } from '../../model/redux/songState';
import LyricsSection from './lyrics-section/lyrics-section';
import MediaSection from './media-section/media-section';
import { addSongToLibrary, removeSongFromLibrary } from '../../model/redux/libraryState';
import SongHeader from './song-header/song-header';

const SongPage: FC<{song: GeniusSong, library: GeniusSong[], updateSong: Function, addToLibrary: Function, removeFromLibrary: Function}> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

    return (
        <MainArea>
            <div className='song-page'>
                <SongHeader song={props.song} library={props.library} removeFromLibrary={props.removeFromLibrary} addToLibrary={props.addToLibrary}/>
                <div className='song-content'>  
                    <LyricsSection song={props.song} updateSong={props.updateSong}/>
                    <MediaSection song={props.song} updateSong={props.updateSong}/>
                </div>
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