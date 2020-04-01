import React, { FC, useState, useEffect, Fragment } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css';
import { useParams } from 'react-router-dom';
import { GeniusSong } from '../../model/genius/geniusFunctions';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { setCurrentSong } from '../../model/redux/songState';
import LoadingImg from '../loading-img/loading-img';
import LyricsSection from './lyrics-section/lyrics-section';
import MediaSection from './media-section/media-section';

const SongPage: FC<{song: GeniusSong, updateSong: Function}> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

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
    song: state.songState.current
});

const mapDispatchToProps = (dispatch: any): any => ({
    updateSong: (song: GeniusSong) => {dispatch(setCurrentSong(song))}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongPage);