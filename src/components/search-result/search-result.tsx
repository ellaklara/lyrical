import React, { FC, useState, useEffect } from 'react';
import './search-result.css'
import Thumbnail from '../thumbnail/thumbnail';

type SearchResultProps = {
    result: any,
}

const SearchResult: FC<SearchResultProps> = (props) => {
    return (
        <li className='search-result' key={props.result.path}>
            <Thumbnail src={props.result.song_art_image_thumbnail_url}/>
            <div className='result-details'>
                {props.result.title}<br/>
                {props.result.primary_artist.name}
            </div>
        </li>
    );
}

export default SearchResult;