import React, { useState } from 'react';
<<<<<<< HEAD
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditSong({ reRender }) {
  const dispatch = useDispatch();
  const { songId } = useParams();
=======
import { useSelector } from 'react-redux';

function EditSong({ reRender }) {
>>>>>>> dev
  const song = useSelector(state => state.songs.curr);

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [previewImage, setPreviewImage] = useState(song.previewImage);

  // const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    const payload = {
      title,
      description,
      url,
      imageUrl: previewImage
    }

<<<<<<< HEAD
    dispatch(songActions.editSong(payload, songId))
=======
    // dispatch(songActions.editSong(payload, songId))
>>>>>>> dev
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });

<<<<<<< HEAD
    reRender();
=======
    reRender(payload);
>>>>>>> dev
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul> */}
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Song URL
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <label>
        Song Image
        <input
          type="text"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Save</button>
    </form>
  );
}

export default EditSong;
