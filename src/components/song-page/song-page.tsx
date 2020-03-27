import React, { FC, useState, useEffect } from 'react';
import MainArea from '../main-area/main-area';
import { GeniusSong } from '../../model/genius/geniusFunctions'
import './song-page.css'
import { RouteComponentProps, Link } from 'react-router-dom';
import { getLyrics } from '../../model/musixmatch/musixmatchFunctions';

type SongPageProps = {
    location: Link,
    song: GeniusSong
}

const SongPage: FC<SongPageProps> = (props) => {
    const [lyrics, setLyrics] = useState('')

    useEffect(() => {
        (async function anyNameFunction() {
            function cleanString(input: string) {
                var output = "";
                for (var i=0; i<input.length; i++) {
                    if (input.charCodeAt(i) <= 127) {
                        output += input.charAt(i);
                    }
                }
                return output;
            }
            setLyrics(await getLyrics(props.location.state.song.primary_artist.name, cleanString(props.location.state.song.title)))
        })();
      }, []);

    return (
        <MainArea>
            <div className='song-page'>
                <div className='song-header'>
                    <img src={props.location.state.song.header_image_url}/>
                    <div className='song-details'>
                        {props.location.state.song.title}<br></br>
                        {props.location.state.song.primary_artist.name}
                    </div> 
                </div>
                
                <textarea value={lyrics}/>
                <div>
                    test
                </div>
            </div>  
        </MainArea>
    );
}

export default SongPage;