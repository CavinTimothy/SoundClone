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
  // const user = useSelector(state => state.session.user);

  useEffect(() => {
    // if (user) {
    // }
    // dispatch(songActions.loadList());
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
    </>
  );
}

export default App;
