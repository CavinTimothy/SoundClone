import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
<<<<<<< HEAD
import EditSong from './EditSong'
import './EditSong.css';

function EditSongModal() {
  const [showModal, setShowModal] = useState();

  const reRender = () => {
    setShowModal(false);
=======
import { editSong } from '../../store/songs';
import EditSong from './EditSong'
import './EditSong.css';

function EditSongModal({ dispatch, songId, setIsEdited }) {
  const [showModal, setShowModal] = useState();

  const reRender = (payload) => {
    setShowModal(false);
    dispatch(editSong(payload, songId));
    setIsEdited(true);
>>>>>>> dev
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} id='editButton'>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong reRender={reRender} />
        </Modal>
      )}
    </>
  )
}

export default EditSongModal;
