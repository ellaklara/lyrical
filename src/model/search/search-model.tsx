import { GeniusSong } from "../genius/geniusTypes";

const cleanString = (str: string) => {
    let clean = str;
    for (const char of ['\'', '’']) {
        clean = clean.replace(char, '');
    }
    return clean;
}

export const searchGeniusSongArray = (query: string) => {
    
    return function(song: GeniusSong) {
        if (query.trim() === '') {
            return true;
        }
        const q = cleanString(query).toLowerCase()
        const title = cleanString(song.title).toLowerCase(), artist = cleanString(song.primary_artist.name).toLowerCase()
        return title.includes(q) 
        || artist.includes(q)
    }
}