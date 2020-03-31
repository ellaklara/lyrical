import axios, { CancelTokenSource } from 'axios';
import credentials from '../../credentials/credentials.json';

export type GeniusSearch = {
    hits: [
        {
            highlights: any,
            index: string,
            type: string,
            result: GeniusArtist | GeniusSong | GeniusAlbum
        }
    ]
}

export type GeniusMedia = {
    native_uri?: string,
    provider: string,
    type: string,
    url: string
}

type GeniusArtist = {
    api_path: string,
    header_image_url: string,
    id: number,
    image_url: string,
    is_meme_verified: Boolean,
    is_verified: Boolean,
    name: string,
    url: string,
    iq: number
}

type GeniusAlbum = {
    api_path: string,
    cover_art_url: string,
    full_title: string,
    id: number,
    name: string,
    url: string,
    artist: GeniusArtist
}

export type GeniusSong = {
    annotation_count: number,
    api_path: string,
    apple_music_id: string,
    apple_music_player_url: string,
    description: any,
    embed_content: string,
    featured_video: Boolean,
    full_title: string,
    header_image_thumbnail_url: string,
    header_image_url: string,
    id: number,
    lyrics_owner_id: number,
    lyrics_state: string,
    path: string,
    pyongs_count: number,
    recording_location: string,
    release_date: string,
    release_date_for_display: string,
    song_art_image_thumbnail_url: string,
    song_art_image_url: string,
    stats: {
        accepted_annotations: number,
        contributors: number,
        iq_earners: number,
        transcribers: number,
        unreviewed_annotations: number,
        verified_annotations: number,
        hot: Boolean,
        pageviews: number
    },
    title: string,
    title_with_featured: string,
    url: string,
    current_user_metadata: any,
    album: GeniusAlbum,
    custom_performances: any,
    description_annotation: any,
    featured_artists: any,
    lyrics_marked_complete_by: string,
    media: GeniusMedia,
    primary_artist: GeniusArtist,
    producer_artists: GeniusArtist[],
    song_relationships: any,
    verified_annotations_by: any,
    verified_contributors: any
    verified_lyrics_by: any,
    writer_artists: GeniusArtist[],
    lyrics?: string
}

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

export async function getSongMedia(songId: string): Promise<GeniusMedia> {
    try {
        const songRes = await fetchGenius('songs/'+songId);
        return songRes.song.media;
    } catch (err) {
        throw err;
    }
}

