import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const Navbar = ({tabs, icons, selected, setSelected, children}) => {

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
        window.location.pathname = '/';
    }

    const goTo = tab => {
        tab = tab.toLowerCase();
        setSelected(tab);
        window.location.pathname = tab;
    }

    return (
        <div className="nav-area container">
            <div className="nav sticky-top">
                <ul className="nav-items">
                    <FontAwesomeIcon className="m-2" icon={faTwitter} style={{fontSize: "1.7rem"}} />
                    {tabs.map(tab => (
                        <li className="nav-item" key={tab} onClick={() => goTo(tab)}>
                            <a className={tab.toLowerCase() === selected ? "nav-link active" : "nav-link"}>
                                <FontAwesomeIcon icon={icons.get(tab)} style={{fontSize: "1.5rem"}} />
                                <span className="nav-item-title ml-2"> {tab} </span>
                            </a>
                        </li>
                    ))}
                    <a style={{position: 'absolute', bottom: '3rem', fontSize: "1.5rem"}} onClick={logoutUser}>
                        <FontAwesomeIcon className="mx-2" icon={faSignOutAlt} />
                        <span className="nav-item-title">Logout</span>
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