import { GeniusSearch, GeniusSong } from "../genius/geniusFunctions";

export interface SearchState {
    value: string,
    results: GeniusSearch | { hits: null }
}

export const SearchActionTypes = {
    SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
}

export interface SetSearchAction {
    type: string,
    payload: SearchState
}

export function setSearchResults(value: string, results: GeniusSearch): SetSearchAction {
    return {
        type: SearchActionTypes.SET_SEARCH_RESULTS,
        payload: { value: value, results: results }
    }
}

export type SearchActions = SetSearchAction;

export const searchReducer = (
    state: SearchState = {value: '', results: { hits: null }}, 
    action: SetSearchAction
): SearchState => {
    switch (action.type) {
        case SearchActionTypes.SET_SEARCH_RESULTS:
            return action.payload;
        default:
            return state;
    }
}