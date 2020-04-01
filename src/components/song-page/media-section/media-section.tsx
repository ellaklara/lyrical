import React, { FC, useState, useEffect } from 'react';
import Spinner from '../../../assets/spinner.svg';
import './media-section.css';
import { getSongMedia } from '../../../model/genius/geniusFunctions';
import YouTube from 'react-youtube';
import { GeniusSong, GeniusMedia } from '../../../model/genius/geniusTypes';

const MediaSection: FC<{song: GeniusSong, updateSong: Function}> = (props) => {

    const [media, setMedia]: any = useState([])
    const [musicVideo, setMusicVideo]: any = useState(<img src={Spinner}/>)

    useEffect(() => {
        (async function fetchMedia() {
            try {
                setMedia(await getSongMedia(props.song.id.toString()))
            } catch {
                
            }
        })();
      });

    useEffect(() => {
        media.forEach((m: GeniusMedia) => {
            if(m.provider === 'youtube') {
                setMusicVideo(
                    <div className='music-video'>
                        <YouTube videoId={m.url.replace('http://www.youtube.com/watch?v=', '')}/>
                    </div>
                )
            }
        });
        props.updateSong({...props.song, media})
    }, [media])

    return (
        <div className='media-container'>
            {musicVideo}
        </div>
    );
}

export default MediaSection;