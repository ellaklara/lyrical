import React, { FC } from 'react';
import './search-bar.css';

const SearchBar: FC<{value: string, loading: Boolean, onChangeHandler: Function, placeholder: string}> = (props) => {
    return (
        <input
            className={`search-bar-input ${props.loading ? 'loading' : ''}`}
            //value={props.value}
            onChange={e => props.onChangeHandler(e)}
            placeholder={props.placeholder}
            />
    );
}

export default SearchBar;