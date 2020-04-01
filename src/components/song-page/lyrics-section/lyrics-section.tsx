import React, { FC, useState, useEffect } from 'react';
import Spinner from '../../../assets/spinner.svg';
import './lyrics-section.css';
import { GeniusSong } from '../../../model/genius/geniusFunctions';
import { scrapeGeniusLyrics } from '../../../model/genius/geniusLyrics';

const LyricsSection: FC<{song: GeniusSong, updateSong: Function}> = (props) => {

    const [lyrics, setLyrics] =  useState(props.song.lyrics ? props.song.lyrics : '')

    useEffect(() => {
        (async function fetchSongDetails() {
            if(props.song) {
                setLyrics(await scrapeGeniusLyrics(props.song.path))
            }
        })();
      }, [props.song]);

    function updateLyrics(lyrics: string): void {
        props.updateSong({...props.song, ...{lyrics: lyrics}})
    }

    return (
        <div className='lyrics-cont'>
            {lyrics === '' ? <img src={Spinner}/> : <textarea spellCheck='false' readOnly={true} defaultValue={lyrics} onChange={(e) => updateLyrics(e.target.value)}/>}
        </div>
    );
}

export default LyricsSection;