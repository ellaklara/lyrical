import axios, { CancelTokenSource } from 'axios';
import credentials from '../../credentials/credentials.json';

let musixmatchAjax: CancelTokenSource;
const resources: any = {};
async function fetchMusixmatch(endpoint: string): Promise<any> { 
    
    if (musixmatchAjax) {
        musixmatchAjax.cancel();
    }
    try {
        if (resources[endpoint]) {
            return resources[endpoint];
          }
        musixmatchAjax = axios.CancelToken.source();
    
        const res = await axios.get(
            `/.netlify/functions/node-fetch/https://api.musixmatch.com/ws/1.1/${endpoint}&apikey=${credentials.musixmatch.apikey}`, 
            {
                cancelToken: musixmatchAjax.token,
            }
        )
        resources[endpoint] = res.data.message.body;
        return res.data.message.body;
    } catch (err) {
        throw err;
    }
}

export async function searchTrack(artist: string, title: string): Promise<any> {
    try {
        return await fetchMusixmatch(`track.search?q_artist=${artist}&q_track=${title}`)
    } catch (err) {
        throw err;
    }
}

export async function getTrackLyrics(trackId: string): Promise<any> {
    try {
        return await fetchMusixmatch(`track.lyrics.get?track_id=${trackId}`)
    } catch (err) {
        throw err;
    }
}

export async function getLyrics(artist: string, title: string) {
    //var regExp = /\(([^)]+)\)/;
    //var matches = regExp.exec(title);
    try {   
        const track: any = await searchTrack(artist, title)
        console.log(track)
        const lyrics = await getTrackLyrics(track.track_list[0].track.track_id)
        return lyrics.lyrics.lyrics_body.substring(0, lyrics.lyrics.lyrics_body.indexOf('*******'));
    } catch (err) {
        throw err;
    }
}
