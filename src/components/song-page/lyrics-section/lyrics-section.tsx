import React, { FC, useState, useEffect } from 'react';
import Spinner from '../../../assets/spinner.svg';
import './lyrics-section.css';
import { GeniusSong } from '../../../model/genius/geniusTypes';
import { scrapeGeniusLyrics } from '../../../model/genius/geniusLyrics';
import Edit from '../../../assets/icons/edit-outline.svg'

const LyricsSection: FC<{song: GeniusSong, updateSong: Function, songInLibrary: Function}> = (props) => {

    const [lyrics, setLyrics] =  useState('')
    const [readOnly, setReadOnly] = useState(true)

    useEffect(() => {
        setLyrics(props.song.lyrics ? props.song.lyrics : '')
    }, [props.song])

    useEffect(() => {
        (async function fetchSongDetails() {
            if(props.song) {
                setLyrics(await scrapeGeniusLyrics(props.song.path))
            }
        })();
      }, [props.song]);

    function editLyrics(): void {
        setReadOnly(!readOnly)
        if(!readOnly) {
            props.updateSong({id: props.song.id, lyrics: lyrics})
        }
    }

    return (
        <div className='lyrics-cont'>
            {lyrics === '' ? <img src={Spinner}/> : 
            <>
                <div className={`lyrics-toolbar ${props.songInLibrary() ? '' : 'hidden'}`}>
                    <div className={`toolbar-btn ${readOnly ? '' : 'active'}`} onClick={() => editLyrics()}>
                        <div className='toolbar-icon'>
                            <img alt='edit' src={Edit}/>
                        </div>
                    </div>
                </div>
                <textarea spellCheck='false' defaultValue={lyrics} readOnly={readOnly} onChange={(e) => setLyrics(e.target.value)}/>
            </>
            }
        </div>
    );
}

export default LyricsSection;