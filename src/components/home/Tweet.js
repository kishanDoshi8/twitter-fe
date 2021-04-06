import { faHeart as faHeartSolid, faRetweet, faShare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as faHeartRegular,  } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTweetById, likeTweet, unlikeTweet } from '../../actions/tweetActions';
import { loadUser } from '../../actions/authActions';
import useModal from '../customHooks/useModal';
import CommentModal from './CommentModal';
import Comments from './Comments';

const Tweet = () => {

    const [tweet, setTweet] = useState({});
    const tweetState = useSelector(state => state.tweet.tweet);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {isShowing, toggle} = useModal();

    useEffect(() => {
        const pathname = window.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1);
        dispatch(getTweetById(id));
        dispatch(loadUser());
    }, []);

    useEffect(() => {
        setTweet(tweetState);
    }, [tweetState, user]);

    const likeUnlike = (e, id) => {
        e.stopPropagation();
        if(tweet.likes.indexOf(user._id) >= 0) {
            tweetUnlink(id);
        } else {
            tweetLike(id);
        }
    }

    const tweetLike = (id) => {
        dispatch(likeTweet(id));
    }

    const tweetUnlink = id => {
        dispatch(unlikeTweet(id));
    }

    const tweetClickHandler = (e, tweetId) => {
        e.stopPropagation();
        window.location.pathname = '/tweet/' + tweetId;
    }

    const profileClickHandler = (e, userId) => {
        e.stopPropagation();
    }

    return (
        <div>
            {tweet ? (
                <>
                    <div className="sticky-top nav-title px-2 py-1">
                        <span className="mr-2 text-primary pointer" onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </span>
                        <span><h2>Thread</h2></span>
                    </div>
                    
                    <div className="thread p-2">
                        <div className="profile">
                            <div className="profile-pic mr-2"></div>
                            <div className="tweet-username">
                                <a>
                                    @{tweet.userName}
                                </a>
                            </div>
                        </div>

                        <div className="tweet-body m-2 pb-2 text-md">
                            {tweet.tweetBody}
                        </div>
                        <div className="time-date pb-2 text-sm">
                            {moment(tweet.createdAt).format('hh:mm A - MMM DD, YYYY')}
                        </div>

                        <div className="tweet-status bb p-2">
                            <div className="tweet-status">
                                {tweet.likes?.length > 1 ? (tweet.likes.length + ' likes') : (
                                    tweet.likes?.length === 1 ? (tweet.likes.length + ' like') : (null)
                                )}
                            </div>

                            <div className="tweet-status">
                                {tweet.retweets?.length > 1 ? (tweet.likes.length + ' retweets') : (
                                    tweet.retweets?.length === 1 ? (tweet.likes.length + ' retweets') : (null)
                                )}
                            </div>
                        </div>


                    </div>

                    <div className="tweet-options pb-2 bb">
                        <div className="tweet-option ">
                            <a className="tweet-link comment" onClick={toggle}>
                                <FontAwesomeIcon icon={faComment} />
                            </a>
                            <span className="ml-1"> {tweet.comments?.length ? tweet.comments?.length : null} </span>
                            <CommentModal isShowing={isShowing} hide={toggle} tweet={tweet} />
                        </div>
                        <div className="tweet-option">
                            <a className="tweet-link retweet">
                                <FontAwesomeIcon icon={faRetweet} />
                            </a>
                            <span className="ml-1"> {tweet.retweets?.length ? tweet.retweets?.length : null} </span>
                        </div>
                        <div className="tweet-option">
                            <a className={tweet.likes?.indexOf(user._id) >= 0 ? "tweet-link like liked" : "tweet-link like"} 
                                onClick={(e) => likeUnlike(e, tweet._id)}>
                                    {tweet.likes?.indexOf(user._id) >= 0 ? (
                                        <FontAwesomeIcon icon={faHeartSolid} />
                                        ) : (
                                        <FontAwesomeIcon icon={faHeartRegular} />
                                    )}
                            </a>
                            <span className="ml-1"> {tweet.likes?.length ? tweet.likes?.length : null} </span>
                        </div>
                        <div className="tweet-option">
                            <a className="tweet-link share">
                                <FontAwesomeIcon icon={faShare} />
                            </a>
                        </div>
                    </div>

                    {tweet.comments?.map(comment => (
                        <div key={comment._id} className="bb p-2 comments-wrapper">
                            <Comments comment={comment} user={user} />
                        </div>
                    ))}
                </>
            ) : ('Loading...')}
        </div>
    );
}

export default Tweet;