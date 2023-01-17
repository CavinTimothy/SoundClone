import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import * as songActions from './store/songs';
import Navigation from './components/Navigation';
import Upload from './components/Upload';
import Library from './components/Library';
import SongPage from './components/SongPage';
import HomePage from './components/HomePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/upload'>
            <Upload />
          </Route>
          <Route path='/library'>
            <Library />
          </Route>
          <Route path='/songs/:songId'>
            <SongPage />
          </Route>
          <Route exact path='/'>
            <HomePage />
          </Route>
        </Switch>
      )}
      <footer className='footer'>
        <div className='footerDiv'>
          <h4 id='about'>About</h4>
          <p>Author: <a id='github' href='mailto:cavintimotht2014@gmail.com'>Cavin Timothy</a></p>
          <p><a id='github' href='https://github.com/CavinTimothy'>GitHub</a></p>
        </div>
      </footer>
    </>
  );
}

export default App;
