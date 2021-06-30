import "./NewPlaceholder.css";
import React, { useState } from "react";
import Modal from "react-modal";
import { availableTypes, newElementForm } from "../AvailableElements";

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
  const [elType, setElType] = useState(false);
  const [formData, setFormData] = useState({});

  const closeModal = () => {
    setIsOpen(false);
    setElType(false);
  };
  const openModal = () => setIsOpen(true);

  const handleAddElement = (ev) => {
    ev.preventDefault();
    closeModal();
    const newEl = {
      ...formData,
      type: elType,
      id: String(Date.now()),
      list: [],
    };
    addElement(newEl);
    setFormData({});
  };

  const handleDataChange = (ev) => {
    ev.preventDefault();
    setFormData({ ...formData, [ev.target.name]: ev.target.value.trim() });
  };

  const handleTypeChange = (ev) => {
    ev.preventDefault();
    setElType(ev.target.value);
    setFormData({ ...formData, type: ev.target.value });
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
    <>
      <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
        {!elType && (
          <>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Choose a type:</div>
            {availableTypes.map((type) => (
              <div key={type} style={{ padding: "0.5rem" }} onChange={handleTypeChange}>
                <input type="radio" id={type} value={type} name="type" required />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </>
        )}
        {elType && (
          <form onSubmit={handleAddElement}>
            <h3>{elType}</h3>
            <hr />
            {newElementForm[elType].map((formEl, idx) => (
              <div className="form-element" key={formEl.name}>
                <label htmlFor={formEl.name}>{formEl.label}</label>
                <br />
                <input
                  type={formEl.type}
                  id={formEl.name}
                  name={formEl.name}
                  required={formEl.required}
                  onChange={handleDataChange}
                  autoFocus={!idx}
                  autoComplete="off"
                />
              </div>
            ))}
            <div style={{ marginTop: "2rem", width: "100%" }}>
              <button style={{ width: "100%", height: "3rem" }} type="submit">
                ADD
              </button>
            </div>
          </form>
        )}
      </Modal>
      <div className="placeholder" onClick={openModal} onDragOver={allowDrop} onDrop={onDrop}>
        <span>+</span>
      </div>
    </>
  );
}

export default NewPlaceholder;
