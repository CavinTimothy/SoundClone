import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, newComment, removeComment } from '../../store/comments';
import './Comments.css';

function Comments({ user }) {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const comments = useSelector(state => Object.values(state.comments));
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(getComments(songId));
  }, [dispatch]);

  const handleDelete = (e, idx) => {
    e.preventDefault();
    dispatch(removeComment(comments[idx]));
  }

  const handleComment = e => {
    e.preventDefault();
    setComment('');
    dispatch(newComment(comment, songId, user));
  }

  return (
    <div className='parent'>
      <ul className='commentUl'>Comments
        {user && (
          <form onSubmit={handleComment}>
            <input
              type='text'
              value={comment}
              placeholder='Write a comment'
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </form>
        )}
        {comments && comments.map(({ body, User, userId }, idx) => (
          <li key={idx} className='commentItem'>
            <h5>{User.username}</h5>{/* The component re renders when this element is commented out*/}
            <p id='comment'>{body}</p>
            {user.id === userId && (
              <button onClick={(e) => handleDelete(e, idx)} className='delete'>Delete Comment</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
