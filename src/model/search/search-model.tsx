import { GeniusSong } from "../genius/geniusTypes";

const cleanString = (str: string) => {
    var output = '';
    for (var i=0; i<str.length; i++) {
        if (str.charCodeAt(i) <= 127) {
            output += str.charAt(i);
        }
    }
    return output;
}

export const searchGeniusSongArray = (query: string) => {
    
    return function(song: GeniusSong) {
        const q = query.toLowerCase()
        const title = cleanString(song.title).toLowerCase(), artist = cleanString(song.primary_artist.name).toLowerCase()
        return title.includes(q) 
        || artist.includes(q)
    }
}