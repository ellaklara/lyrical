import React, { FC, useState } from 'react';
import './library.css'
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import SearchResult from '../search-result/search-result';
import { GeniusSong } from '../../model/genius/geniusTypes';
import MainArea from '../main-area/main-area';
import AreaHeader from '../main-area/area-header/area-header';
import SearchBar from '../search-bar/search-bar';
import songPage from '../song-page/song-page';
import Container from '../container/container';
import { searchGeniusSongArray } from '../../model/search/search-model';

const Library: FC<{library: GeniusSong[]}> = (props) => {

    const [filteredLibrary, setFilteredLibrary] = useState(props.library)

    const onChangeHandler = (e: any) => {
        const filtered = props.library.filter(searchGeniusSongArray(e.target.value))
        setFilteredLibrary(filtered.length > 0 ? filtered : props.library)
    }

    return (
        <Container>
            <AreaHeader>
                <SearchBar value={''} loading={false} onChangeHandler={onChangeHandler} placeholder='search library'/>
            </AreaHeader>
            <MainArea>
                <ul className='search-results'>
                {filteredLibrary.map((song: any) =>
                    <SearchResult key={song.id} song={song}/>
                )}
                </ul>
            </MainArea>
        </Container>
    );
}

const mapStateToProps = (state: AppState, ownProps: any): any => ({
    library: state.libraryState
});

export default connect(
    mapStateToProps
)(Library);