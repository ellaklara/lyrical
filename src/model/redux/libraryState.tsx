import { GeniusSong } from "../genius/geniusTypes";

export type LibraryState = GeniusSong[]

export const LibraryActionTypes = {
    ADD_TO_LIBRARY: 'ADD_TO_LIBRARY',
    REMOVE_FROM_LIBRARY: 'REMOVE_FROM_LIBRARY',
    UPDATE_SONG_IN_LIBRARY: 'UPDATE_SONG_IN_LIBRARY'
}

export interface AddToLibraryAction {
    type: string,
    payload: GeniusSong
}

export function toggleSongInLibrary(library: GeniusSong[], song: GeniusSong): AddToLibraryAction {
    return (library.find((s: GeniusSong) => s.id === song.id)) ? removeSongFromLibrary(song) : addSongToLibrary(song);
}

export function updateSongInLibrary(newValue: any): AddToLibraryAction {
    return {
        type: LibraryActionTypes.UPDATE_SONG_IN_LIBRARY,
        payload: newValue
    }
}

function addSongToLibrary(song: GeniusSong): AddToLibraryAction {
    return {
        type: LibraryActionTypes.ADD_TO_LIBRARY,
        payload: song
    }
}

function removeSongFromLibrary(song: GeniusSong): AddToLibraryAction {
    return {
        type: LibraryActionTypes.REMOVE_FROM_LIBRARY,
        payload: song
    }
}

export type LibraryActions = AddToLibraryAction;

export const libraryReducer = (
    state: LibraryState = [], 
    action: AddToLibraryAction
): LibraryState => {
    switch (action.type) {
        case LibraryActionTypes.ADD_TO_LIBRARY:
            return [...state, action.payload];
        case LibraryActionTypes.REMOVE_FROM_LIBRARY:
            const i = state.findIndex(
                (s: GeniusSong) => s.id === action.payload.id
            )
            return [
                ...state.slice(0, i),
                ...state.slice(i + 1)
            ]
        case LibraryActionTypes.UPDATE_SONG_IN_LIBRARY:  
            return state.map(song => {
                return (song.id === action.payload.id) ? {...song, ...action.payload} : song;
            });
        default:
            return state;
    }
}