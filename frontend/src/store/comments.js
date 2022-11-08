import { csrfFetch } from "./csrf";

const ADD_COMM = 'comments/addComm'
const LOAD_COMM = 'comments/loadComm';
const DELETE_COMM = 'comments/deleteComm';

const addComm = (comment) => {
  return {
    type: ADD_COMM,
    comment,
  };
};

const loadComm = (list) => {
  return {
    type: LOAD_COMM,
    list,
  };
};

const deleteComm = (commentId) => {
  return {
    type: DELETE_COMM,
    commentId,
  };
};

export const newComment = (comment, songId, user) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ body: comment })
  });
  if (response.ok) {
    const newComm = await response.json();
    newComm.User = user;
    dispatch(addComm(newComm));
    return newComm;
  }
}

export const getComments = (songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`);
  if (response.ok) {
    const list = await response.json();
    dispatch(loadComm(list))
    return list;
  }
}

export const removeComment = (comment) => async dispatch => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const res = await response.json();
    dispatch(deleteComm(comment.id));
    return res;
  }
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMM:
      return { ...state, [action.comment.id]: action.comment };
    case LOAD_COMM:
      const list = {}
      action.list.forEach((comm) => { list[comm.id] = comm });
      return { ...list };
    case DELETE_COMM:
      const newState = { ...state };
      delete newState[action.commentId]
      return newState;
    default:
      return state;
  }
}

export default commentReducer
