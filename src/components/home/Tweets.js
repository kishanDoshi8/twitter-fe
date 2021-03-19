import { faHeart as faHeartSolid, faRetweet, faShare } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as faHeartRegular,  } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets, likeTweet, unlikeTweet } from '../../actions/tweetActions';
import moment from 'moment';

const Tweets = () => {

    const [liked, setLiked] = useState(new Set());

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
        console.log('Click on tweet', tweetId);
        window.location.pathname = '/tweet/' + tweetId;
    }

    const profileClickHandler = (e, userId) => {
        console.log('Click on profile', userId);
        e.stopPropagation();
    }

    return (
        <div>
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

                        <div className="tweet-options mt-2">
                            <div className="tweet-option ">
                                <a className="tweet-link comment">
                                    <FontAwesomeIcon icon={faComment} />
                                </a>
                                <span className="ml-1"> {tweet.comments.length} </span>
                            </div>
                            <div className="tweet-option">
                                <a className="tweet-link retweet">
                                    <FontAwesomeIcon icon={faRetweet} />
                                </a>
                                <span className="ml-1"> {tweet.retweets.length} </span>
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
                                <span className="ml-1"> {tweet.likes.length} </span>
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