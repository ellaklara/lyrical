import React, { FC, useState, useEffect } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css';
import { useParams } from 'react-router-dom';
import { GeniusSong } from '../../model/genius/geniusTypes';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { setCurrentSong } from '../../model/redux/songState';
import LyricsSection from './lyrics-section/lyrics-section';
import MediaSection from './media-section/media-section';
import { toggleSongInLibrary, updateSongInLibrary } from '../../model/redux/libraryState';
import SongHeader from './song-header/song-header';

const SongPage: FC<{song: GeniusSong, library: Array<GeniusSong>, updateSong: Function, updateSongInLibrary: Function, toggleLibrary: Function}> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

    const [song, setSong] = useState(props.song)
    const songInLibrary = () => {
        return props.library.find((x: GeniusSong) => x.id.toString() === songId) ? true : false;
    }

    useEffect(() => {
        setSong(props.song)
    }, [props.song])

    useEffect(() => {
        const librarySong = (props.library.find((x: GeniusSong) => x.id.toString() === songId))
        if(librarySong) {
            setSong(librarySong)
        }
    })

    return (
        <MainArea>
            <div className='song-page'>
                <SongHeader song={song} songInLibrary={songInLibrary} library={props.library} toggleLibrary={() => props.toggleLibrary(props.library, song)}/>
                <div className='song-content'>  
                    <LyricsSection song={song} updateSong={props.updateSongInLibrary} songInLibrary={songInLibrary}/>
                    <MediaSection song={song} updateSong={props.updateSong}/>
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
    updateSongInLibrary: (song: GeniusSong) => {dispatch(updateSongInLibrary(song))},
    toggleLibrary: (library: GeniusSong[], song: GeniusSong) => {dispatch(toggleSongInLibrary(library, song))}, 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongPage);