import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { editSong, getOneSong } from '../../store/songs';
import EditSong from './EditSong'
import './EditSong.css';

function EditSongModal({ dispatch, songId, setIsEdited }) {
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    dispatch(getOneSong(songId))
  }, [dispatch, songId])

  const reRender = (payload) => {
    setShowModal(false);
    dispatch(editSong(payload, songId));
    setIsEdited(true);
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className='editButton'>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong reRender={reRender} />
        </Modal>
      )}
    </>
  )
}

export default EditSongModal;
