import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import * as songActions from '../../store/songs';
import Comments from '../Comments';
import EditSongModal from '../EditSongModal';
import './SongPage.css';

function SongPage() {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const user = useSelector(state => state.session.user);
  const song = useSelector(state => state.songs.curr);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    dispatch(songActions.getOneSong(songId));
    isEdited && setIsEdited(false);
  }, [dispatch, songId, isEdited]);

  if (isDeleted) {
    dispatch(songActions.getAllSongs());
    return (<Redirect to={`/library`} />);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(songActions.removeSong(song));
    setIsDeleted(true)
  }

  if (!user || user === 'undefined') {
    return (
      <>
        {song && (
          <div className='container'>
            <h1 className='header'>{song.title}</h1>
            <h2 className='header'>{`Song by - ${song.User.username}`}</h2>
            <img src={song.previewImage} alt='Song Cover' id='image' />
            {/* <img src={`../${song.previewImage}`} alt='Song Cover' id='image' /> */}
            <p className='desc'>{song.description}</p>
            <div id='audio'><audio controls controlsList='nodownload' src={song.url} id='player' /></div>
            {/* <div id='audio'><audio controls controlsList='nodownload' src={`../${song.url}`} id='player' /></div> */}
            <Comments />
          </div>
        )}
      </>
    );
  }
  else {
    return (
      <>
        {song && (
          <div className='container'>
            <h1 className='header'>{song.title}</h1>
            <h2 className='header'>{`Song by - ${song.User.username}`}</h2>
            <img src={song.previewImage} alt='Song Cover' id='image' />
            {/* <img src={`../${song.previewImage}`} alt='Song Cover' id='image' /> */}
            <p className='desc'>{song.description}</p>
            <div id='audio'><audio controls controlsList='nodownload' src={song.url} id='player' /></div>
            {/* <div id='audio'><audio controls controlsList='nodownload' src={`../${song.url}`} id='player' /></div> */}
            {user.id === song.User.id && (
              <span className='actions'>
                <EditSongModal dispatch={dispatch} songId={songId} setIsEdited={setIsEdited} />
                <button onClick={handleDelete} className='delete'>Delete</button>
              </span>
            )}
            <Comments />
          </div>
        )}
      </>
    );
  }
}

export default SongPage
