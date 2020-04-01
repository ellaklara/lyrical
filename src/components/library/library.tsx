import React, { FC } from 'react';
import './library.css'
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import SearchResult from '../search-result/search-result';
import { GeniusSong } from '../../model/genius/geniusTypes';
import MainArea from '../main-area/main-area';

const Library: FC<{library: GeniusSong[]}> = (props) => {
    return (
        <MainArea>
            <ul className='search-results'>
            {props.library.map((song: any) =>
                <SearchResult key={song.id} song={song}/>
            )}
            </ul>
        </MainArea>
    );
}

const mapStateToProps = (state: AppState, ownProps: any): any => ({
    library: state.libraryState
});

export default connect(
    mapStateToProps
)(Library);