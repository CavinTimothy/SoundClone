import { csrfFetch } from "./csrf";

const SET_SONG = 'songs/setSong';
const GET_ONE = 'songs/getOne';
const GET_ALL = 'songs/getAll';
const LOAD_LIST = 'songs/loadList';
const DELETE_SONG = 'songs/deleteSong';

const setSong = (song) => {
  return {
    type: SET_SONG,
    song,
  };
};

const getOne = (song) => {
  return {
    type: GET_ONE,
    song
  };
};

const getAll = (list) => {
  return {
    type: GET_ALL,
    all: list
  };
};

const loadSongList = (list) => {
  return {
    type: LOAD_LIST,
    list,
  };
};

const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId,
  };
};

export const newSong = (payload) => async dispatch => {
  const response = await csrfFetch('/api/songs', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    const newSong = await response.json();
    dispatch(setSong(newSong));
    // console.log('NEWSONG: ', newSong)
    // return newSong;
  }
}

export const getOneSong = (songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}`);
  if (response.ok) {
    const song = await response.json();
    dispatch(getOne(song))
    return song;
  }
}

const shuffle = list => list.sort(() => Math.random() - 0.5);

export const getAllSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs`);
  if (response.ok) {
    let allSongs = await response.json();
    dispatch(getAll(shuffle(allSongs)));
    // return allSongs;
  }
}

export const editSong = (info, songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: 'PUT',
    body: JSON.stringify(info)
  });
  if (response.ok) {
    const updatedSong = await csrfFetch(`/api/songs/${songId}`).then(res => res.json());
    dispatch(setSong(updatedSong));
    return updatedSong;
  }
}

export const loadList = () => async dispatch => {
  const response = await csrfFetch(`/api/songs/current`);
  if (response.ok) {
    let list = await response.json();
    dispatch(loadSongList(list));
    // return list;
  }
}

export const removeSong = (song) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const res = await response.json();
    dispatch(deleteSong(song.id));
    return res;
  }
  throw response;
}

const initialState = {
  allSongs: [],
  mySongs: [],
  curr: null
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SONG:
      state.mySongs.push(action.song);
      state.allSongs.push(action.song);
      return { ...state, curr: action.song };
    case GET_ONE:
      return { ...state, curr: action.song };
    case GET_ALL:
      // const allSongs = {};
      // action.all.forEach(song => allSongs[song.id] = song);
      if (action.all) return { ...state, allSongs: action.all };
      else return { ...state };
    case LOAD_LIST:
      // const mySongs = {};
      // action.list.forEach(song => mySongs[song.id] = song);
      if (action.list) return { ...state, mySongs: action.list };
      else return { ...state };
    case DELETE_SONG:
      const newState = { ...state };
      // delete newState.mySongs[action.songId];
      // delete newState.allSongs[action.songId];
      newState.curr = null;
      return newState;
    default:
      return state;
  }
}

export default songReducer
