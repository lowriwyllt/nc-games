import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function CommentModal({ modalIsOpen, setIsOpen }) {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#000";
  }

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
