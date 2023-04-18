import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function CommentModal({ modalIsOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="submittedAPost"
    >
      <button onClick={closeModal}>&times;</button>
      <p>Your comment has been submitted!</p>
    </Modal>
  );
}

export default CommentModal;
