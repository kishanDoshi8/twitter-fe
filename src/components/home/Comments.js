import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faRetweet, faShare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart as faHeartRegular,  } from '@fortawesome/free-regular-svg-icons';
import CommentModal from './CommentModal';
import useModal from '../customHooks/useModal';


const Comments = ({ comment, user }) => {

    const {isShowing, toggle} = useModal();
    const {liked, setLiked} = useState(false);

    // redux
    // dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        comment.likes.forEach(like => {
            if(like === user._id) {
                setLiked(true);
            }
        })
    }, [comment, user])

    const likeUnlike = (e, id) => {
        console.log(user);
        if(liked) {
            commentUnlike(id);
        } else {
            commentLike(id);
        }
        // e.stopPropagation();
        // if(tweet.likes.indexOf(user._id) >= 0) {
        //     tweetUnlink(id);
        // } else {
        //     tweetLike(id);
        // }
    }

    const commentLike = id => {
        
    }

    const commentUnlike = id => {

    }

    // const tweetLike = (id) => {
    //     dispatch(likeTweet(id));
    // }

    // const tweetUnlink = id => {
    //     dispatch(unlikeTweet(id));
    // }
    
    return (
        <div className="comments">
            <div className="comments-profile">
                <div className="profile-pic"></div>
            </div>

            <div className="comments-comment">
                <div className="tweet-username">
                    <a >
                        @{comment.userName} 
                    </a>
                    <span> - {moment(comment.createdAt).toNow(true)} ago</span>
                </div>
                <div className="comments-tweet-body mt-1"> {comment.commentBody} </div>

                <div className="tweet-options pt-2 pr-4">
                    <div className="tweet-option ">
                        <a className="tweet-link comment" onClick={toggle}>
                            <FontAwesomeIcon icon={faComment} />
                        </a>
                        <span className="ml-1"> {comment.comments?.length ? comment.comments?.length : null} </span>
                        <CommentModal isShowing={isShowing} hide={toggle} tweet={comment} />
                    </div>
                    <div className="tweet-option">
                        <a className="tweet-link retweet">
                            <FontAwesomeIcon icon={faRetweet} />
                        </a>
                        <span className="ml-1"> {comment.retweet?.length ? comment.retweet?.length : null} </span>
                    </div>
                    <div className="tweet-option">
                        <a className={comment.likes?.indexOf(user._id) >= 0 ? "tweet-link like liked" : "tweet-link like"} 
                            onClick={(e) => likeUnlike(e, comment._id)}>
                                {comment.likes?.indexOf(user._id) >= 0 ? (
                                    <FontAwesomeIcon icon={faHeartSolid} />
                                    ) : (
                                    <FontAwesomeIcon icon={faHeartRegular} />
                                )}
                        </a>
                        <span className="ml-1"> {comment.likes?.length ? comment.likes?.length : null} </span>
                    </div>
                    <div className="tweet-option">
                        <a className="tweet-link share">
                            <FontAwesomeIcon icon={faShare} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;