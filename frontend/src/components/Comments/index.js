import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, newComment, removeComment } from '../../store/comments';
import './Comments.css';

function Comments() {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const [comment, setComment] = useState('');
  const songComments = useSelector(state => Object.values(state.comments));
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getComments(songId));
  }, [dispatch, songId]);

  const handleDelete = (e, idx) => {
    e.preventDefault();
    dispatch(removeComment(songComments[idx]));
  }

  const handleComment = e => {
    e.preventDefault();
    setComment('');
    dispatch(newComment(comment, songId, user));
  }

  if (!user) {
    return (
      <div className='parent'>
        <ul className='commentUl'>Comments
          {user && (
            <form onSubmit={handleComment}>
              <input
                type='text'
                value={comment}
                placeholder={'Write a comment'}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </form>
          )}
          {songComments && songComments.map(({ body, User }, idx) => (
            <li key={idx} className='commentItem'>
              <h5>{User.username}</h5>{/* The component re renders when this element is commented out*/}
              <p id='comment'>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  else {
    return (
      <div className='parent'>
        <ul className='commentUl'>Comments
          {user && (
            <form onSubmit={handleComment}>
              <input
                type='text'
                value={comment}
                placeholder={'Write a comment'}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </form>
          )}
          {songComments && songComments.map(({ body, User, userId }, idx) => (
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
}

export default Comments;
