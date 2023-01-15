import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ func, type }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='delete' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <DeleteSong /> */}
          <p>{`Are you sure you want to delete this ${type}?`}</p>
          <span className='confirm'><button className='submit' onClick={func}>Confirm</button></span>
        </Modal>
      )}
    </>
  );
}

export default ConfirmDeleteModal;
