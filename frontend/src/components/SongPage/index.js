import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
<<<<<<< HEAD
=======
import { getComments } from '../../store/comments';
>>>>>>> dev
import * as songActions from '../../store/songs';
import Comments from '../Comments';
import EditSongModal from '../EditSongModal';
import './SongPage.css';

function SongPage() {
  const dispatch = useDispatch();
  const { songId } = useParams();
<<<<<<< HEAD
  const song = useSelector(state => state.songs.curr);
  const user = useSelector(state => state.session.user);
  const [isDeleted, setIsDeleted] = useState(false);
  // const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(songActions.getOneSong(songId));
  }, [dispatch])
=======
  const user = useSelector(state => state.session.user);
  const song = useSelector(state => state.songs.curr);
  const comments = useSelector(state => Object.values(state.comments));

  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    dispatch(songActions.getOneSong(songId));
    // dispatch(songActions.loadList());
    dispatch(getComments(songId));
    isEdited && setIsEdited(false);
  }, [dispatch, songId, isEdited])
>>>>>>> dev

  if (isDeleted) return (<Redirect to={`/library`} />);

  const handleDelete = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    // setErrors([]);
=======
>>>>>>> dev
    dispatch(songActions.removeSong(song));
    setIsDeleted(true)
  }

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
<<<<<<< HEAD
              <EditSongModal />
              <button onClick={handleDelete} className='delete'>Delete</button>
            </span>
          )}
          <Comments user={user} />
=======
              <EditSongModal dispatch={dispatch} songId={songId} setIsEdited={setIsEdited} />
              <button onClick={handleDelete} className='delete'>Delete</button>
            </span>
          )}
          <Comments user={user} comments={comments} />
>>>>>>> dev
        </div>
      )}
    </>
  );
}

export default SongPage
