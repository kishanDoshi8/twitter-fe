import { faHeart as faHeartSolid, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as faHeartRegular,  } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets, likeTweet, unlikeTweet } from '../../actions/tweetActions';
import moment from 'moment';
import useModal from '../customHooks/useModal';
import CommentModal from './CommentModal';

const Tweets = () => {

    const [liked, setLiked] = useState(new Set());
    const [showComment, setShowComment] = useState('');
    const {isShowing, toggle} = useModal();

    const dispatch = useDispatch();
    const { tweets } = useSelector(state => state.tweet);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getTweets());
    }, [])

    useEffect(() => {
        tweets.forEach(tweet => {
            if(tweet.likes.indexOf(user._id) >= 0) {
                setLiked(old => new Set([...old, tweet._id]));
            }
        })
    }, [tweets, user]);

    const likeUnlike = (e, id) => {
        e.stopPropagation();
        let tweet = tweets.filter(t => t._id === id)[0];
        if(tweet.likes.indexOf(user._id) >= 0) {
            tweetUnlink(id);
        } else {
            tweetLike(id);
        }
    }

    const tweetLike = (id) => {
        dispatch(likeTweet(id));
        setLiked(old => new Set([...old, id]));
    }

    const tweetUnlink = id => {
        dispatch(unlikeTweet(id));
        setLiked(old => new Set([...old].filter(l => l !== id)));
    }

    const tweetClickHandler = (e, tweetId) => {
        e.stopPropagation();
        window.location.pathname = '/tweet/' + tweetId;
    }

    const profileClickHandler = (e, userId) => {
        e.stopPropagation();
    }

    const comment = (e, id) => {
        e.stopPropagation();
        setShowComment(id);
        toggle();
    }

    return (
        <div className="tweets">
            {tweets.map(tweet => (
                <div key={tweet._id} className="tweet" onClick={(e) => tweetClickHandler(e, tweet._id)}>
                    <div className="profile-pic"></div>
                    <div className="tweet-desc">
                        <div className="tweet-username">
                            <a onClick={(e) => profileClickHandler(e, tweet.userId)}>
                                @{tweet.userName} 
                            </a>
                            <span> - {moment(tweet.createdAt).toNow(true)} ago</span>
                        </div>
                        <div className="tweet-body mt-1"> {tweet.tweetBody} </div>

                        <div className="tweet-options mt-2 pr-2">
                            <div className="tweet-option ">
                                <a className="tweet-link comment" onClick={(e) => comment(e, tweet._id)}>
                                    <FontAwesomeIcon icon={faComment} />
                                </a>
                                <span className="ml-1"> {tweet.comments?.length ? tweet.comments?.length : null} </span>
                                <CommentModal isShowing={tweet._id === showComment ? isShowing : false} hide={toggle} tweet={tweet} />
                            </div>
                            <div className="tweet-option">
                                <a className="tweet-link retweet">
                                    <FontAwesomeIcon icon={faRetweet} />
                                </a>
                                <span className="ml-1"> {tweet.retweets?.length ? tweet.retweets?.length : null} </span>
                            </div>
                            <div className="tweet-option">
                                <a className={liked.has(tweet._id) ? "tweet-link like liked" : "tweet-link like"} 
                                    onClick={(e) => likeUnlike(e, tweet._id)}>
                                        {liked.has(tweet._id) ? (
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Tweets;