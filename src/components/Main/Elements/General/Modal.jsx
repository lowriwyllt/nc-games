import Modal from "react-modal";

Modal.setAppElement("#root");

function MyModal({ modalIsOpen, setIsOpen, contentLabel, Content, id }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={contentLabel}
      className="modal"
      id={id}
    >
      <button onClick={closeModal} className="closeModal">
        &times;
      </button>
      <Content />
    </Modal>
  );
}

export default MyModal;
