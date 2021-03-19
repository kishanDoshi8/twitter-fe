import React, { useEffect, useState } from 'react';
import AlertMessage from '../AlertMessage';
import { loadUser, loginUser } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN_FAIL } from '../../actions/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const LoginScreen = () => {
    const [email, setEmail] = useState('');   
    const [password, setPassword] = useState('');

    //redux
    const { auth, error } = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadUser());
    }, []);

    useEffect(() => {
        if(auth.isAuthenticated) {
            window.location.pathname = '/home';
        }
    }, [auth]);

    const login = (e) => {
        e.preventDefault();
        const userLogin = { email, password }
        dispatch(loginUser(userLogin));
    }

    const signup = () => {
        window.location.pathname = '/register';
    }

    return (
        <div id="login-screen">
            <div className="login">
                <div className="logo"></div>
                <FontAwesomeIcon icon={faTwitter} size="5x" color="white" />
                <h1 style={{color: "white"}}>Log in to Tweeter</h1>
                <form onSubmit={login} className="form">
                    <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" name="email" required />
                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" name="password" required />
                    <button type="submit" className="btn btn-md btn-primary">Log in</button>
                    <button type="button" onClick={signup} className="btn btn-primary btn-md">Sign up</button>
                    {error.id === LOGIN_FAIL && <AlertMessage success={false} msg={error.msg} />}
                </form>
            </div>
        </div>
    );
}

export default LoginScreen;