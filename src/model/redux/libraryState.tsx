import { GeniusSong } from "../genius/geniusTypes";

export type LibraryState = GeniusSong[]

export const LibraryActionTypes = {
    ADD_TO_LIBRARY: 'ADD_TO_LIBRARY',
    REMOVE_FROM_LIBRARY: 'REMOVE_FROM_LIBRARY',
}

export interface AddToLibraryAction {
    type: string,
    payload: GeniusSong
}

export function addSongToLibrary(song: GeniusSong): AddToLibraryAction {
    return {
        type: LibraryActionTypes.ADD_TO_LIBRARY,
        payload: song
    }
}

export function removeSongFromLibrary(song: GeniusSong): AddToLibraryAction {
    return {
        type: LibraryActionTypes.REMOVE_FROM_LIBRARY,
        payload: song
    }
}

export type LibraryActions = AddToLibraryAction;

export const libraryReducer = (
    state: LibraryState = [], 
    action: any
): LibraryState => {
    switch (action.type) {
        case LibraryActionTypes.ADD_TO_LIBRARY:
            return [...state, action.payload] ;
        case LibraryActionTypes.REMOVE_FROM_LIBRARY:
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)
            ]
        default:
            return state;
    }
}