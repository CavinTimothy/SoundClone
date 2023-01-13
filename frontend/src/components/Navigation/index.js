import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { login } from '../../store/session'

import './Navigation.css';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const demoLogin = () => {
    dispatch(login({ credential: 'Demo User', password: 'password' }))
  }

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
        <button className='demo-button' onClick={demoLogin}>Demo</button>
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
