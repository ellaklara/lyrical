import React from 'react';
import './App.css';
import './theme/colors.css';
import SearchArea from './components/search-area/search-area';
import Navbar from './components/navbar/navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SongPage from './components/song-page/song-page';
import Library from './components/library/library';

function App() {
  return (
    <div style={{display: 'flex', width: '100%', height: '100%'}}>
      <Router>
        <Navbar/>
          <Switch>
              <Route exact path='/'>
                <Redirect to='/search'/>
              </Route>
              <Route path='/song/:songId'
                render={(props) => <SongPage {...props} />} >
              </Route>
              <Route path='/search'>
                <SearchArea/>
              </Route>
              <Route path='/library'>
                <Library/>
              </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
