import axios, { CancelTokenSource } from 'axios';
import credentials from '../../credentials/credentials.json';

let musixmatchAjax: CancelTokenSource;
const resources: any = {};
async function fetchMusixmatch(endpoint: string, errorRes: any): Promise<any> { 
    
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
        const data = await res.data;
        const r = await data.data;
        const message = await r.message;
        const body = message.body;
        resources[endpoint] = body;
        return body;
    } catch (error) {
        return errorRes;
    }
}

export async function searchTrack(artist: string, title: string): Promise<any> {
    return await fetchMusixmatch(`track.search?q_artist=${artist}&q_track=${title}`, {hits: null, canceled: true})
}
export async function getTrackLyrics(trackId: string): Promise<any> {
    return await fetchMusixmatch(`track.lyrics.get?track_id=${trackId}`, {hits: null, canceled: true})
}

export async function getLyrics(artist: string, title: string) {
    const track: any = await searchTrack(artist, title)
    const lyrics = await getTrackLyrics(track.track_list[0].track.track_id)
    return lyrics.lyrics.lyrics_body.substring(0, lyrics.lyrics.lyrics_body.indexOf('*******'));
}
