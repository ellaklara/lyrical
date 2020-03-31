import React, { FC, useState, useEffect, Fragment } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css'
import { useParams } from 'react-router-dom';
import { getLyrics } from '../../model/musixmatch/musixmatchFunctions';
import { GeniusMedia, GeniusSong, getSongMedia } from '../../model/genius/geniusFunctions';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { setCurrentSong } from '../../model/redux/songState';
import LoadingImg from '../loading-img/loading-img';

const SongPage: FC<{song: GeniusSong, updateSong: Function}> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

    const [lyrics, setLyrics] =  useState(props.song.lyrics ? props.song.lyrics : '')
    const [media, setMedia]: any = useState(props.song.media ? props.song.media : [])

    useEffect(() => {
        (async function fetchSongDetails() {
            if(props.song) {
                setLyrics(await getLyrics(props.song.primary_artist.name, props.song.title))
            }
        })();

        (async function fetchMedia() {
            setMedia(await getSongMedia(songId))
        })();
      }, [props.song]);

    useEffect(() => {
        props.updateSong({...props.song, media})
    }, [media])

    useEffect(() => {
        props.updateSong({...props.song, lyrics})
    }, [lyrics])

    return (
        <MainArea>
            <div className='song-page'>
                <div className='song-header'>
                    <div className='song-image'>
                        <LoadingImg alt={props.song.title} src={props.song.song_art_image_url}/>
                    </div>
                    <div className='song-details'> 
                        {props.song.title}<br/>
                        {props.song.primary_artist.name}<br/>
                        {media.map((m: GeniusMedia) =>
                            <Fragment key={m.url}>
                                <a href={m.url} target='_blank' rel='noopener noreferrer'>{m.provider}</a><br/>
                            </Fragment>
                        )}
                        
                    </div> 
                </div>
                <textarea defaultValue={lyrics}/>
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