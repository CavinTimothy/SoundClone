import React, { useState } from 'react';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Upload.css'

function Upload() {
  const dispatch = useDispatch();
  const userSongs = useSelector(state => Object.values(state.songs))
  const [initLen] = useState(Object.values(userSongs).length)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [errors, setErrors] = useState([]);

  if (userSongs.length > initLen) {
    const newSong = Object.values(userSongs).pop();
    return (<Redirect to={`/songs/${newSong.id}`} />);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("previewImage", previewImage);
    // formData.append("url", url);
    const payload = {
      title,
      description,
      url,
      previewImage
    }

    return dispatch(songActions.newSong(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit} noValidate className='uploadForm'>Upload a new song
        <label className='uploadItem'>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className='uploadItem'>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className='uploadItem uploadFile'>
          Song Image
          <input
            // type="file"
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
        <label className='uploadItem uploadFile' for="url">
          Song URL
          <input
            type="file"
            // type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <button type='submit'>Upload</button>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </form>
    </div>
  );
}

export default Upload;
