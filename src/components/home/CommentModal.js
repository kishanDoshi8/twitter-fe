import { faCalendarWeek, faImage, faPollH, faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { postComment } from '../../actions/tweetActions';

const CommentModal = ({ isShowing, hide, tweet }) => {
    
    const [newTweet, setNewTweet] = useState('');
    const [charLeft, setCharLeft] = useState(280);

    const dispatch = useDispatch();
    
    // return null if tweet not selected
    if(!isShowing) return null;

    const sendTweet = () => {
        if(!newTweet.trim()) return;

        const comment = {
            id: tweet._id,
            commentBody: newTweet,
        }
        dispatch(postComment(comment));
        // dispatch(createTweet({ tweetBody: tweet }));

        setNewTweet('');
        setCharLeft(280);
        // animate before hiding
        hide();
    }

    const handleTextarea = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = e.target.scrollHeight + 'px';
        setNewTweet(e.target.value);
        setCharLeft(280 - (e.target.value.length));
    }

    const onKeyUpHandler = e => {
        if (e.ctrlKey && e.keyCode === 13) {
            sendTweet();
        }
    }

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
                    <div className="comment-modal">
                        <div className="comment-modal-header">
                            <div className="close-btn" onClick={hide}> &times; </div>
                        </div>

                        <div className="comment-modal-body">
                            <div className="profile-pic"></div>

                            <div className="comment-tweet">
                                <div className="tweet-username"> @{tweet.userName} </div>
                                <div className="tweet-body"> {tweet.tweetBody} </div>
                                
                                <div className="tweet-info">
                                    Replying to <a> @{tweet.userName}</a>
                                </div>
                            </div>

                        </div>

                        

                        <div className="comment-modal-compose" >
                            <div className="profile-pic"></div>
                            
                            <textarea maxLength="280" rows="3" name="tweet" value={newTweet} autoComplete="off" placeholder="Tweet your reply" onKeyUp={e => onKeyUpHandler(e)} onChange={e => handleTextarea(e)} ></textarea>
                        </div>

                        <div className="comment-modal-footer">
                            <div className="comment-tweet-btns">
                                <ul className="comment-tweet-options">
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
                                    <button className="btn btn-primary btn-md" type="button" onClick={() => sendTweet()}>Tweet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>, document.body
        )
    )
}

export default CommentModal;

// import React, { useState } from 'react';

// const  = () => {
//     return ();
// }

// export default ;