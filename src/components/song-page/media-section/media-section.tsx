import React, { FC, useState, useEffect } from 'react';
import Spinner from '../../../assets/spinner.svg';
import './media-section.css';
import { GeniusSong, getSongMedia, GeniusMedia } from '../../../model/genius/geniusFunctions';
import YouTube from 'react-youtube';

const MediaSection: FC<{song: GeniusSong, updateSong: Function}> = (props) => {

    const [media, setMedia]: any = useState(props.song.media ? props.song.media : [])
    const [musicVideo, setMusicVideo]: any = useState(<></>)

    useEffect(() => {
        (async function fetchMedia() {
            setMedia(await getSongMedia(props.song.id.toString()))
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

    return (
        <div className='media-container'>
            <div className='music-video'>
                {musicVideo}
            </div>
        </div>
    );
}

export default MediaSection;