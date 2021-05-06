import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';

function Post({ postId, user, imageUrl, username, caption }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt='RafeQazi'
          src='/static/images/avatar/1.jpg'
        />{' '}
        <h3>{username}</h3>
      </div>
      {/* header -> avatar + username */}
      <img className='post__image' src={imageUrl} alt='react-logo' />
      {/* image */}
      <h4 className='post__text'>
        <strong>{username}</strong> {caption}
      </h4>

      <div className='post__comments'>
        {comments.map((comment) => (
          <p>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className='post__commentBox'>
          <input
            type='text'
            className='post__input'
            placeholder='A New Comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='post__button'
            type='submit'
            disabled={!comment.trim()}
            placeholder='Add a comment...'
            value={comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
