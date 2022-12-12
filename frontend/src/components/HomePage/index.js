// import React, { useEffect } from "react";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getAllSongs } from "../../store/songs";
import './HomePage.css';

function HomePage() {
  // const dispatch = useDispatch();
  const list = useSelector((state) => state.songs.allSongs);

  // useEffect(() => {
  //   dispatch(getAllSongs());
  // }, [dispatch])

  return (
    <main>
      <div className="home-header">
        <div className="home-title">
          <h2>Enjoy Music with <b id="bold">SoundClone</b></h2>
        </div>
      </div>
      <h3 id="home-songs">Today's Picks</h3>
      <ul className='homeUl'>
        {list && list.map(({ title, previewImage, description }, idx) => (
          <li key={idx} className='homeLi'>
            <Link to={`/songs/${list[idx].id}`}>
              <div className='homeItem'>
                <h3 className='homeItem soti'>{title}</h3>
                <img src={previewImage} alt='Song cover' className='homeItem img' style={{ width: '200px' }} />
                <p className='homeP'>{description}<button id='play'><i className="fa-regular fa-circle-play"></i></button></p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default HomePage;
