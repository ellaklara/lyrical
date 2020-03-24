import credentials from '../../credentials/credentials.json';
const proxy_url = 'https://cors-anywhere.herokuapp.com/'

function fetchGenius(endpoint: string): void {   
    const target = `https://api.genius.com/${endpoint}`
    fetch(proxy_url + target,{
        headers: { 'Authorization': `Bearer ${credentials.genius.access_token}` }
    })
    .then(blob => blob.json())
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log(e);
    });
}

export function searchGenius(query: string): void {
    fetchGenius('search?q='+query)
}

export function fetchSong(song_id: string): void {
    fetchGenius('songs/'+song_id)
}

searchGenius('OOHYO')