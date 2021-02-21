import React, { useState } from "react";
import Modal from "react-modal";
import { availableTypes } from "../AvailableElements";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightgray",
    color: "black",
    fontSize: "1.3rem",
  },
  overlay: {
    backgroundColor: "rgba(176, 196, 222, 0.397)",
  },
};

Modal.setAppElement("#root");
function NewPlaceholder({ config, addElement, moveElement }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleAddElement = (ev) => {
    ev.preventDefault();
    closeModal();
    const type = ev.target.type.value;
    const title = ev.target.title.value;
    const id = String(Date.now());
    const list = [];
    addElement({ id, type, title, list });
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev) => {
    ev.stopPropagation();
    const [opId, cId] = ev.dataTransfer.getData("text").split("-");
    moveElement(opId, cId);
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
        <form onSubmit={handleAddElement}>
          <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Choose a type:</div>
          {availableTypes.map((type) => (
            <div key={type} style={{ padding: "0.5rem" }}>
              <input type="radio" id={type} value={type} name="type" required />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
          <div style={{ fontWeight: "bold", margin: "2rem 0 5px 0" }}>Title:</div>
          <input
            style={{ fontSize: "1.3rem", padding: "0.5rem" }}
            type="text"
            name="title"
            required
          />
          <div style={{ marginTop: "2rem", width: "100%" }}>
            <button style={{ width: "100%", height: "3rem" }} type="submit">
              ADD
            </button>
          </div>
        </form>
      </Modal>
      <div onClick={openModal} onDragOver={allowDrop} onDrop={onDrop}>
        <span>+</span>
      </div>
    </div>
  );
}

export default NewPlaceholder;
