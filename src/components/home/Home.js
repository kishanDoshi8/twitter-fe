import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import { AUTH_ERROR } from '../../actions/types';
import NewTweet from './NewTweet';
import Tweets from './Tweets';
import { logout } from '../../actions/authActions';
import Navbar from '../Navbar/Navbar';

const HomeScreen = () => {

    // Authenticate and Load User;
    const dispatch = useDispatch(loadUser());
    const auth = useSelector(state => state.auth);
    const { user } = auth;
    useEffect(() => {
        dispatch(loadUser());
    }, []);

    // Check for errors
    const error = useSelector(state => state.error);
    useEffect(() => {
        if(error.id === AUTH_ERROR) {
            window.location.pathname = '/';
        }
    }, [error])

    const logoutUser = () => {
        dispatch(logout());
        window.location.pathname = '/';
    }

  return (
      <div>
          <h2 className="sticky-top nav-title px-2 py-1">Home</h2>
          {/* <button style={{marginBottom: '2rem', padding: '0.5rem 1rem'}} onClick={logoutUser} >Logout</button> */}
          <NewTweet />
          <hr/>
          <Tweets />
      </div>
  );
}

export default HomeScreen;