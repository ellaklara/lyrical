import React, { FC, useState, useEffect } from 'react';
import Spinner from '../../../assets/spinner.svg';
import './lyrics-section.css';
import { GeniusSong } from '../../../model/genius/geniusTypes';
import { scrapeGeniusLyrics } from '../../../model/genius/geniusLyrics';
import SvgIcons from '../../../assets/icons/svg-icons.json'
import Svg from '../../svg/svg';

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

    const editLyrics = () =>  {
        setReadOnly(!readOnly)
        if(!readOnly) {
            props.updateSong({id: props.song.id, lyrics: lyrics})
        }
    }

    
    const [fontSize, setFontSize] = useState(1)

    const step = 0.1;
    const changeFontSize = (decrease: Boolean) => {
        if(decrease && (fontSize-step > step)) {
            setFontSize(fontSize-step)
        } else if (!decrease && (fontSize+step < 2.1)) {
            console.log(fontSize)
            setFontSize(fontSize+step)
        }
    }

    return (
        <div className='lyrics-cont'>
            {lyrics === '' ? <img src={Spinner}/> : 
            <>
                <div className='lyrics-toolbar'>
                    <div className={`toolbar-btn ${readOnly ? '' : 'active'} ${props.songInLibrary() ? '' : 'hidden'}`} onClick={editLyrics}>
                        <div className='toolbar-icon'>
                            <Svg icon={SvgIcons.editOutline}/>
                        </div>
                    </div>
                    <div className={`toolbar-btn ${(fontSize+step >= 2.1) ? 'disabled' : ''}`} onClick={() => changeFontSize(false)}>
                        <div className='toolbar-icon'>
                            <Svg icon={SvgIcons.plusOutline}/>
                        </div>
                    </div>
                    <div className='toolbar-btn' style={{minWidth: '45px'}}>
                        <div className='toolbar-icon'>
                            {Math.round(fontSize*100)+'%'}
                        </div>
                    </div>
                    <div className={`toolbar-btn ${(fontSize-step < step) ? 'disabled' : ''}`} onClick={() => changeFontSize(true)}>
                        <div className='toolbar-icon'>
                            <Svg icon={SvgIcons.minusOutline}/>
                        </div>
                    </div>
                </div>
                <textarea 
                    spellCheck='false' 
                    defaultValue={lyrics} 
                    readOnly={readOnly} 
                    onChange={(e) => setLyrics(e.target.value)}
                    style={{fontSize: (fontSize*1.2).toString()+'rem'}}
                />
            </>
            }
        </div>
    );
}

export default LyricsSection;