import { GeniusSong } from "../genius/geniusTypes";

export interface SongState {
    current: GeniusSong | null,
}

export const SongActionTypes = {
    SET_CURRENT_SONG: 'SET_CURRENT_SONG',
}

export interface SetSongAction {
    type: string,
    payload: GeniusSong
}

export function setCurrentSong(song: GeniusSong): SetSongAction {
    return {
        type: SongActionTypes.SET_CURRENT_SONG,
        payload: song
    }
}

export type SongActions = SetSongAction;

export const songReducer = (
    state: SongState = { current: null }, 
    action: SetSongAction
): SongState => {
    switch (action.type) {
        case SongActionTypes.SET_CURRENT_SONG:
            return {current: action.payload};
        default:
            return state;
    }
}