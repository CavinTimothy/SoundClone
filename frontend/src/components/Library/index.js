import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Library.css'
import { loadList } from '../../store/songs';

function Library() {
  const dispatch = useDispatch();
  // const userSongs = useSelector(state => Object.values(state.songs.mySongs));
  const userSongs = useSelector(state => state.songs.mySongs);
  // const userSongs = Object.values(list);

  useEffect(() => {
    dispatch(loadList());
  }, [dispatch]);

  return (
    <>
      {userSongs && (
        <div className='libParent'>
          <h2 id='hOne'>My Songs</h2>
          <ul className='libUl'>
            {userSongs.map(({ title, description, previewImage }, idx) => (
              <li key={idx} className='libLi'>
                <Link className='libSongs' to={`/songs/${userSongs[idx].id}`}>
                  <div className='libItem'>
                    <h3 className='libItem'>{title}</h3>
                    <img src={previewImage} alt='Song cover' className='libItem img' style={{ width: '200px' }} />
                    <p className='libItem libP'>{description}<button id='play'><i className="fa-regular fa-circle-play" /></button></p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Library
