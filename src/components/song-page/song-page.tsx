import React, { FC, useState, useEffect, Fragment } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css'
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { getLyrics } from '../../model/musixmatch/musixmatchFunctions';
import { GeniusMedia, GeniusSong, getSongMedia } from '../../model/genius/geniusFunctions';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { setCurrentSong } from '../../model/redux/songState';
import LoadingImg from '../loading-img/loading-img';
import Spinner from '../../assets/spinner.svg'

const SongPage: FC<{song: GeniusSong, updateSong: Function}> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

    const [lyrics, setLyrics] =  useState(props.song.lyrics ? props.song.lyrics : [])
    const [media, setMedia]: any = useState(props.song.media ? props.song.media : [])
    const [musicVideo, setMusicVideo]: any = useState(<></>)

    useEffect(() => {
        (async function fetchSongDetails() {
            if(props.song) {
                //setLyrics(await getLyrics(props.song.primary_artist.name, props.song.title))
            }
        })();

        (async function fetchMedia() {
            setMedia(await getSongMedia(songId))
        })();
      }, [props.song]);

    useEffect(() => {
        props.updateSong({...props.song, media})
        media.forEach((m: GeniusMedia) => {
            if(m.provider === 'youtube') {
                setMusicVideo(<YouTube videoId={m.url.replace('http://www.youtube.com/watch?v=', '')}/>)
            }
        });
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
                        <div className='song-title'>
                            {props.song.title}
                        </div>
                        <div className='song-artist'>
                            {props.song.primary_artist.name}
                        </div>

                    </div> 
                    
                </div>
                <div className='song-content'>  
                    <div className='lyrics-cont'>
                        <div className='song-navbar'>
                            <div className='navbar-btn active'>
                                1
                            </div>
                            <div className='navbar-btn'>
                                2
                            </div>
                        </div>    
                        {props.song.lyrics !== '' ? <textarea defaultValue={lyrics}/> : <img src={Spinner}/>}
                    </div>
                
                <div className='music-video-container'>
                    <div className='music-video'>
                        {musicVideo}
                    </div>

                    </div>
                
                </div>
                <div className='song-media'>
                            {/*media.length === 0 ? <img src={Spinner}/> : <>{media.map((m: GeniusMedia) =>
                                <Fragment key={m.url}>
                                    <a href={m.url} target='_blank' rel='noopener noreferrer'>{m.provider}</a>
                                </Fragment>
                            )}</>*/}
                        </div>
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