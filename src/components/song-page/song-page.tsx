import React, { FC, useState, useEffect } from 'react';
import MainArea from '../main-area/main-area';
import './song-page.css'
import { Link, useParams } from 'react-router-dom';
import { getLyrics } from '../../model/musixmatch/musixmatchFunctions';
import { getSong, GeniusMedia } from '../../model/genius/geniusFunctions';
import { GeniusSong } from '../../model/genius/geniusFunctions';

type SongPageProps = {
    location: Link,
    song: GeniusSong
}

const SongPage: FC<SongPageProps> = (props) => {

    interface ParamTypes {
        songId: string
      }
    const { songId } = useParams<ParamTypes>()

    const [lyrics, setLyrics] = useState('')
    const [song, setSong]: any = useState({
        id: null,
        song_art_image_url: null,
        title: null,
        primary_artist: {
            name: null
        },
        media: [],
    })


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
            if(song.id) {
                setLyrics(await getLyrics(song.primary_artist.name, cleanString(song.title)))
            }
        })();
      }, [song]);

    useEffect(() => {
        (async function anyNameFunction() {
            setSong(await getSong(songId))
        })();
      }, []);

    return (
        <MainArea>
            <div className='song-page'>
                <div className='song-header'>
                    <img src={song.song_art_image_url}/>
                    <div className='song-details'> 
                        {song.title}<br/>
                        {song.primary_artist.name}<br/>
                        {song.media.map((m: GeniusMedia) =>
                            <a href={m.url} target='_blank'>{m.provider}</a>
                        )}
                        
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