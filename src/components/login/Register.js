import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import { REGISTER_FAIL } from '../../actions/types';
import AlertMessage from '../AlertMessage';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);

    // redux
    const { auth, error }= useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth.isAuthenticated) {
            setSuccess(true);
            setTimeout(() => {
                window.location.pathname = '/';
            }, 3000);
        }
    }, [auth])

    const signup = (e) => {
        e.preventDefault();
        let user ={ name, email, password, confirmPassword };
        dispatch(register(user));
    }

    const goBack = () => {
        window.location.pathname = "/"
    }

    return (
        <div className="register">
            {error.id === REGISTER_FAIL && <AlertMessage success={false} msg={error.msg} />}
            {success && <AlertMessage success={true} msg={'Registration Successful! Redirecting...'} /> }
            <h1 className="text-lg">Register</h1>
            <form onSubmit={signup} className="form">
                <input type="text" onChange={e => setName((e.target.value).trim())} name="username" value={name} placeholder="Username" required/>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" name="email" required />
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" name="password" required />
                <input type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" name="password" required />
                <button type="submit" className="btn btn-primary btn-md">Register</button>
                <button type="button" onClick={goBack} className="btn btn-primary btn-md">Go back</button>
            </form>
        </div>
    );
}

export default Register;