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
        <NavLink to='/library'><button>Library</button></NavLink>
        <ProfileButton user={sessionUser} />
        <NavLink to='/upload'><button>Upload</button></NavLink>
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
      <nav>
        <NavLink exact to="/" >
          <button id='home'>
            <div className='font'><i className="fa-brands fa-soundcloud"></i>SoundCloud</div>
          </button>
        </NavLink>
        {isLoaded && sessionLinks}
      </nav>
    </div>
  );
}

export default Navigation;
