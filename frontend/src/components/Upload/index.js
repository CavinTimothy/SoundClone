import React, { useState } from 'react';
import * as songActions from '../../store/songs';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Upload.css'

function Upload() {
  const dispatch = useDispatch();
  const userSong = useSelector(state => state.songs.curr);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [isUploaded, setIsUploaded] = useState('');
  const [errors, setErrors] = useState([]);

  if (isUploaded) {
    return (<Redirect to={`/songs/${userSong.id}`} />);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsUploaded(false);

    const payload = {
      title,
      description,
      url,
      previewImage
    }

    await dispatch(songActions.newSong(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    setIsUploaded(true);
  }

  return (
    <>
      <div className='formContainer'>
        <form onSubmit={handleSubmit} className='uploadForm'>
          <h3 id='upload-title'>Upload a new song</h3>
          <div>
            <ul>
              {errors.map((error, idx) => <li id="err" key={idx}>{error}</li>)}
            </ul>
          </div>
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
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
          </label>
          <label className='uploadItem uploadFile'>
            Song URL
            <input
              type="text"
              name="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <button type='submit' id='upload'>Upload</button>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </form>
      </div>
    </>
  );
}

export default Upload;
