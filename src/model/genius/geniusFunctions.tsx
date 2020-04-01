import axios, { CancelTokenSource } from 'axios';
import credentials from '../../credentials/credentials.json';
import { GeniusSearch, GeniusArtist, GeniusSong, GeniusMedia } from './geniusTypes';

let geniusAjax: CancelTokenSource;
const resources: any = {};
async function fetchGenius(endpoint: string): Promise<any> { 
    
    if (geniusAjax) {
        geniusAjax.cancel();
    }
    try {
        if (resources[endpoint]) {
            return resources[endpoint];
          }
        geniusAjax = axios.CancelToken.source();
    
        const res = await axios.get(`/.netlify/functions/node-fetch/https://api.genius.com/${endpoint}`, {
            cancelToken: geniusAjax.token,
            headers: { 'Authorization': `Bearer ${credentials.genius.access_token}` } 
        })
        resources[endpoint] = res.data.response;
        return res.data.response;
    } catch (err) {
        throw err; 
    }
}

export async function searchSong(query: string): Promise<GeniusSearch | {hits: null}> {
    try {
        return await fetchGenius('search/?q='+query)
    } catch (err) {
        return {hits: null};
    }
}

export async function getArtist(artistId: string): Promise<GeniusArtist> {
    try {
        return await fetchGenius('artists/'+artistId);
    } catch (err) {
        throw err;
    }
}

export async function getSong(songId: string): Promise<GeniusSong> {
    try {
        const songRes = await fetchGenius('songs/'+songId);
        return songRes.song;
    } catch (err) {
        throw err;
    }
}

export async function getSongMedia(songId: string): Promise<GeniusMedia[]> {
    try {
        const songRes = await fetchGenius('songs/'+songId);
        return songRes.song.media;
    } catch (err) {
        throw err;
    }
}

