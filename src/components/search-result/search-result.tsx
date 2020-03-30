import React, { FC } from 'react';
import './search-result.css'
import Thumbnail from '../thumbnail/thumbnail';
import { NavLink } from 'react-router-dom'

type SearchResultProps = {
    result: any,
}

const SearchResult: FC<SearchResultProps> = (props) => {
    return (
        <NavLink to={`/song/${props.result.id}`}>
            <li className='search-result' key={props.result.path}>
                <Thumbnail src={props.result.song_art_image_thumbnail_url}/>
                <div className='result-details'>
                    {props.result.title}<br/>
                    {props.result.primary_artist.name}
                </div>
            </li>
        </NavLink>
    );
}

export default SearchResult;