import React, { FC, useState, useEffect } from 'react';
import { searchGenius } from '../../model/genius/geniusFunctions';
import './search-bar.css'
import Thumbnail from '../thumbnail/thumbnail';
import SearchResult from '../search-result/search-result';
import Spinner from '../../assets/spinner.svg'

type SearchBarProps = {

}

const SearchBar: FC<SearchBarProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [results, setResults]: any = useState({response: null});
    const [value, setValue] = useState('');
    const [cont, setCont] = useState(<div></div>);

    useEffect(() => {
        if(results.hits) {
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
        setResults(await searchGenius(val));
    };
  
    const onChangeHandler = async (e: any)  => {
        search(e.target.value);
        setValue(e.target.value);
    };

    return (
        <>
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
            <div className='search-area'> 
                {loading ? <div className='spinner' ><img src={Spinner}></img></div> : cont}
            </div>
        </>
    );
}

export default SearchBar;