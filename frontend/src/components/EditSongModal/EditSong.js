import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function EditSong({ reRender }) {
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
      previewImage
    }

    // dispatch(songActions.editSong(payload, songId))
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });

    reRender(payload);
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
          type="file"
          // type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <label>
        Song Image
        <input
          type="file"
          // type="text"
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
