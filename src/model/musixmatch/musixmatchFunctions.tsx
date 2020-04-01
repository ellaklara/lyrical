import axios, { CancelTokenSource } from 'axios';
import credentials from '../../credentials/credentials.json';

let musixmatchAjax: CancelTokenSource;
const resources: any = {};
async function fetchMusixmatch(endpoint: string): Promise<any> { 
    
    /*
    if (musixmatchAjax) {
        musixmatchAjax.cancel();
    }*/
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

function cleanString(input: string) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output.replace('(', '').replace(')','').replace('Romanized', '').replace('English Translation', '').replace(/^\s+/g, '');
}

export async function getLyrics(artist: string, title: string) {
    try {   
        const tracks: any = await searchTrack(artist, cleanString(title))
        const filteredTracks = tracks.track_list.filter(function (t: any) {
            return t.track.has_lyrics === 1;
        });
        const lyrics = await Promise.all(filteredTracks.map(async (t: any) => {
            return await getTrackLyrics(t.track.track_id);
        }));
        return lyrics.filter((thing: any, index: any, self: any) =>
            index === self.findIndex((t: any) => (
                t.lyrics.lyrics_body === thing.lyrics.lyrics_body
            ))
        )
    } catch (err) {
        throw err;
    }
}
