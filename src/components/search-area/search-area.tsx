import React, { FC, useState, useEffect } from 'react';
import { searchSong } from '../../model/genius/geniusFunctions';
import './search-area.css'
import SearchResult from '../search-result/search-result';
import Spinner from '../../assets/spinner.svg'
import MainArea from '../main-area/main-area';

const SearchArea: FC<{}> = (props) => {

    const initialCont = <div className='center'>Search for a song...</div>;

    const [loading, setLoading] = useState(false);
    const [results, setResults]: any = useState({response: null});
    const [value, setValue] = useState('');
    const [cont, setCont] = useState(initialCont);

    useEffect(() => {
        if(results.hits) {
            if (results.canceled) {
                setCont(<></>)
            } else if (value === '') {
                setCont(initialCont)
            } else if(results.hits.length === 0) {
                setCont(<div className='center'>No results</div>)
            } else
            setCont(
                <ul className='search-results'>
                    {results.hits.map((result: any) =>
                        <SearchResult result={result.result}/>
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
        
        <div style={{display: 'flex', width: '100%', height: '100%', flexDirection: 'column'}}>
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
                {loading ? <div className='center' ><img src={Spinner}></img></div> : cont}
            </MainArea>
        </div>
    );
}

export default SearchArea;