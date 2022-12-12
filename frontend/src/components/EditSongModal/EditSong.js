import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { editSong } from '../../store/songs';

function EditSong({ reRender }) {
  const song = useSelector(state => state.songs.curr);

  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [url, setUrl] = useState(song.url);
  const [previewImage, setPreviewImage] = useState(song.previewImage);

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      title,
      description,
      url,
      imageUrl: previewImage
    }

    // dispatch(editSong(payload, songId))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //     else reRender();
    //   });
    reRender(payload);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div class='err'>
        {errors.map((error, idx) => (
          <p key={idx}>{'*' + error}</p>
        ))}
      </div>
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
      <button type='submit' className='editButton'>Save</button>
    </form>
  );
}

export default EditSong;
