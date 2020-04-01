import React, { FC } from 'react';
import { connect } from 'react-redux';
import './search-result.css'
import Thumbnail from '../thumbnail/thumbnail';
import { NavLink } from 'react-router-dom'
import { GeniusSong } from '../../model/genius/geniusFunctions';
import { setCurrentSong } from '../../model/redux/songState';
import { Dispatch } from 'redux';
import { AppState } from '../../model/redux/store';

type SearchResultProps = {
    song: GeniusSong,
}

export interface SearchResultPropsActions {
    onClick: any
}

const SearchResult: FC<SearchResultProps & SearchResultPropsActions> = (props) => {
    return (
        <NavLink to={`/song/${props.song.id}`} >
            <li className='search-result' key={props.song.path} onClick={() => props.onClick(props.song)}>
                <Thumbnail src={props.song.song_art_image_thumbnail_url}/>
                <div className='result-details'>
                    {props.song.title}<br/>
                    {props.song.primary_artist.name}
                </div>
            </li>
        </NavLink>
    );
}

const mapStateToProps = (state: AppState, ownProps: any): any => ({
    songState: state.songState
});

const mapDispatchToProps = (dispatch: any): any => ({
    onClick: (song: GeniusSong) => {dispatch(setCurrentSong(song))}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult);
