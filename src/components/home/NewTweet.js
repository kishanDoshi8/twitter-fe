import { faCalendarWeek, faImage, faPollH, faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTweet } from '../../actions/tweetActions';

const NewTweet = () => {
    const [tweet, setTweet] = useState('');
    const [charLeft, setCharLeft] = useState(280);

    const dispatch = useDispatch();

    const sendTweet = () => {
        // e.preventDefault();
        if(!tweet.trim()) return;
        dispatch(createTweet({ tweetBody: tweet }));

        setTweet('');
    }

    const handleTextarea = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = e.target.scrollHeight + 'px';
        setTweet(e.target.value);
        setCharLeft(280 - (e.target.value.length));
    }

    const onKeyUpHandler = e => {
        if (e.ctrlKey && e.keyCode == 13) {
            sendTweet();
        }
    }

    return (
        <div className="new-tweet px-2 py-1">
            <div className="profile-pic"></div>
            <form onSubmit={sendTweet}>
                <span className="tweet-input" >
                    <textarea maxLength="280" rows="1" name="tweet" value={tweet} autoComplete="off" placeholder="What's happening?" onKeyUp={e => onKeyUpHandler(e)} onChange={e => handleTextarea(e)} ></textarea>
                    {/* <input type="textarea" name="tweet" value={tweet} onChange={e => setTweet(e.target.value)} placeholder="What's happening?" autoComplete="off"/> */}
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
                        <span className="mr-2" style={charLeft <= 100 ? {color: 'red', fontSize: '0.9rem', fontWeight: '700', opacity: '0.5'} : {fontSize: '0.7rem', opacity: '0.5' }} > {tweet ? charLeft : null} </span>
                        <button className="btn btn-primary btn-md" type="submit">Tweet</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewTweet;