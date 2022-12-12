import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/library'><button className='nav-button'>Library</button></NavLink>
        <NavLink to='/upload'><button className='nav-button'>Upload</button></NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='navbar'>
      <nav id='nav'>
        <NavLink exact to="/" >
          <button id='home'>
            <div className='font'><i className="fa-brands fa-soundcloud"></i>SoundClone</div>
          </button>
        </NavLink>
        {isLoaded && sessionLinks}
      </nav>
    </div>
  );
}

export default Navigation;
