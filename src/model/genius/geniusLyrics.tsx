import axios from 'axios';
import $ from 'cheerio';

export async function scrapeGeniusLyrics(path: string): Promise<any> {
    return await axios.get(`/.netlify/functions/node-fetch/https://genius.com${path}`)
        .then(r=>r.data)
        .then(r=>$('.lyrics', r).text().replace(/ *\[[^\]]*]:?\n?/g, '').replace(/^\s+/g, '').replace(/\s*$/,''))
}