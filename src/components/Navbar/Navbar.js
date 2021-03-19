import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const Navbar = ({tabs, icons, selected, setSelected, children}) => {

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
        window.location.pathname = '/';
    }

    return (
        <div className="nav-area">
            <div className="nav sticky-top">
                <ul className="nav-items">
                    <FontAwesomeIcon icon={faTwitter} style={{fontSize: "1.7rem"}} />
                    {tabs.map(tab => (
                        <li className="nav-item" key={tab}>
                            <a className={tab === selected ? "nav-link active" : "nav-link"}
                                onClick={() => setSelected(tab)}
                            >
                                <FontAwesomeIcon icon={icons.get(tab)} style={{fontSize: "1.5rem"}} />
                            </a>
                        </li>
                    ))}
                    <a style={{marginTop: "3rem", fontSize: "1.5rem"}} onClick={logoutUser}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </a>
                </ul>
            </div>

            <div className="nav-component">
                {children}
            </div>
        </div>
    );
}

export default Navbar;