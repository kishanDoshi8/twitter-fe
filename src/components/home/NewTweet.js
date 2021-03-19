import { faCalendarWeek, faImage, faPollH, faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTweet } from '../../actions/tweetActions';

const NewTweet = () => {
    const [tweet, setTweet] = useState('');

    const dispatch = useDispatch();
    const sendTweet = (e) => {
        e.preventDefault();
        if(!tweet.trim()) return;
        dispatch(createTweet({ tweetBody: tweet }));

        setTweet('');
    }

    return (
        <div className="new-tweet px-2 py-1">
            <div className="profile-pic"></div>
            <form onSubmit={sendTweet}>
                <span className="tweet-input">
                    <input type="textarea" name="tweet" value={tweet} onChange={e => setTweet(e.target.value)} placeholder="What's happening?" autoComplete="off"/>
                </span>
                <div className="tweet-btns">
                    <ul className="tweet-options">
                        <li className="tweet-option">
                            <a className="tweet-link">
                                <FontAwesomeIcon icon={faImage} />
                            </a>
                        </li>
                        <li className="tweet-option">
                            <a className="tweet-link">
                                <FontAwesomeIcon icon={faPollH} />
                            </a>
                        </li>
                        <li className="tweet-option">
                            <a className="tweet-link">
                                <FontAwesomeIcon icon={faSmileWink} />
                            </a>
                        </li>
                        <li className="tweet-option">
                            <a className="tweet-link">
                                <FontAwesomeIcon icon={faCalendarWeek} />
                            </a>
                        </li>
                    </ul>

                    <div className="tweet-btn">
                        <button className="btn btn-primary btn-md" type="submit">Tweet</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewTweet;