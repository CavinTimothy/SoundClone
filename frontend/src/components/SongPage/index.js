import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import * as songActions from '../../store/songs';
import Comments from '../Comments';
import EditSongModal from '../EditSongModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
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

  // const style = {
  //   // backgroundColor: 'rgba(255, 255, 255, 0.1)',
  //   backgroundImage: 'url(' + song.previewImage + ')',
  //   backgroundSize: 'cover'
  // };

  if (!user || user === 'undefined') {
    return (
      <>
        {song && (
          <>
            <div style={{ backgroundImage: 'url(' + song.previewImage + ')' }} className='container'>
              <div className='layer'>
                <img src={song.previewImage} alt='Song Cover' id='image' />
                <div className='info'>
                  <h1 className='header'>{song.title}</h1>
                  <h2 className='header'>{`Song by - ${song.User.username}`}</h2>
                  <p className='desc'>{song.description}</p>
                  <div id='audio'><audio controls controlsList='nodownload' src={song.url} id='player' /></div>
                </div>
              </div>
            </div>
            <Comments />
          </>
        )}
      </>
    );
  }
  else {
    return (
      <>
        {song && (
          <>
            <div style={{ backgroundImage: 'url(' + song.previewImage + ')' }} className='container'>
              <div className='layer'>
                <img src={song.previewImage} alt='Song Cover' id='image' />
                <div className='info'>
                  <h1 className='header'>{song.title}</h1>
                  <h2 className='header'>{`Song by - ${song.User.username}`}</h2>
                  <p className='desc'>{song.description}</p>
                  <div id='audio'><audio controls controlsList='nodownload' src={song.url} id='player' /></div>
                  {user.id === song.User.id && (
                    <span className='actions'>
                      <EditSongModal dispatch={dispatch} songId={songId} setIsEdited={setIsEdited} />
                      <ConfirmDeleteModal func={handleDelete} type={'song'} />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Comments />
          </>
        )}
      </>
    );
  }
}

export default SongPage
