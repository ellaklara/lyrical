import React, { FC, useState, useEffect } from 'react';
import { searchSong } from '../../model/genius/geniusFunctions';
import './search-area.css'
import SearchResult from '../search-result/search-result';
import Spinner from '../../assets/spinner.svg'
import MainArea from '../main-area/main-area';
import { AppState } from '../../model/redux/store';
import { setSearchResults, SearchState } from '../../model/redux/searchState';
import { connect } from 'react-redux';
import { GeniusSearch } from '../../model/genius/geniusTypes';

const SearchArea: FC<{searchState: SearchState, setSearchState: Function}> = (props) => {

    const initialCont = <>Search for a song...</>;

    const [loading, setLoading] = useState(false);
    const [results, setResults]: any = useState(props.searchState.results);
    const [value, setValue] = useState(props.searchState.value);
    const [cont, setCont] = useState(initialCont);

    useEffect(() => {
        if(results.hits) {
            props.setSearchState(value, results);
            if(value === '') {
                setCont(initialCont);
            }
            else if(results.hits.length === 0) {
                setCont(<>No results</>)
            } else
            setCont(
                <ul className='search-results'>
                    {results.hits.map((song: any) =>
                        <SearchResult key={song.result.id} song={song.result}/>
                    )}
                </ul>
            );
            setLoading(false);
        }
    },[results])

    const search = async (val: string) => {
        setLoading(true);
        setResults(await searchSong(val));
    };
  
    const onChangeHandler = async (e: any)  => {
        search(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className='search-area'>
            <div className='search-bar-container'>
                <div className='search-bar'>
                    <input
                    className={`search-bar-input ${loading ? 'loading' : ''}`}
                    value={value}
                    onChange={e => onChangeHandler(e)}
                    placeholder="search me"
                    />
                </div>
            </div>
            <MainArea>
                <div className='center'>
                    {loading ? <img src={Spinner}></img> : cont}
                </div>
            </MainArea>
        </div>
    );
}

const mapStateToProps = (state: AppState, ownProps: any): any => ({
    searchState: state.searchState
});

const mapDispatchToProps = (dispatch: any): any => ({
    setSearchState: (value: string, results: GeniusSearch) => {dispatch(setSearchResults(value, results))}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchArea);