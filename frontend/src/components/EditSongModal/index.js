import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSong from './EditSong'
import './EditSong.css';

function EditSongModal() {
  const [showModal, setShowModal] = useState();

  const reRender = () => {
    setShowModal(false);
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
