import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { songReducer, SongActions } from './songState';
import { searchReducer, SearchActions } from './searchState';

const rootReducer = combineReducers({
    songState: songReducer,
    searchState: searchReducer,
});

export type AppActions = 
    SongActions |
    SearchActions;

export type AppState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'root',
    storage,
}
   
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));
export const persistor = persistStore(store);

export type Dispatch = typeof store.dispatch