import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
// import React from 'react';
import { Link } from 'react-router-dom';
import './Library.css'
import { loadList } from '../../store/songs';

function Library() {
  const dispatch = useDispatch();
  const userSongs = useSelector((state) => Object.values(state.songs.mySongs));

  useEffect(() => {
    dispatch(loadList());
  }, [dispatch]);

  return (
    <div className='libParent'>
      <h2 id='hOne'>My Songs</h2>
      <ul className='libUl'>
        {userSongs.map(({ title, description, previewImage }, idx) => (
          <li key={idx} className='libLi'>
            <Link to={`/songs/${userSongs[idx].id}`}>
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
  );
}

export default Library
