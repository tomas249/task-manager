import React, { useState, useEffect } from 'react';
import './MainPage.css';

const Section = ({ idx, data, deleteElement, addElement }) => {
  const [list, setList] = useState(data.list);

  const handleAddElement = (e) => {
    const tfData = addElement();
    setList([...list, tfData]);
    console.log('onDrop:', tfData);
  };

  return (
    <div className="section-container">
      <div className="section-title">{data.title}</div>
      <hr />
      <div className="section-taskList">
        {ListManager(idx, list, {}, deleteElement, handleAddElement)}
      </div>
    </div>
  );
};

const Board = ({ idx, data, deleteElement, addElement }) => {
  return (
    <div
      className="board-container"
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        deleteElement(data);
        console.log('onDragStart:', data);
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        console.warn('onDragEnd:', e.dataTransfer.dropEffect);
        if (e.dataTransfer.dropEffect === 'move') {
        }
      }}
    >
      <div className="board-title">{data.title}</div>
      <div className="board-list">
        {ListManager(idx, data.list, {}, deleteElement, addElement)}
      </div>
    </div>
  );
};

const Task = ({ idx, data, deleteElement, addElement }) => {
  return (
    <div
      className="task-container"
      draggable
      onDragStart={(e) => {
        e.stopPropagation();
        deleteElement(data);
      }}
    >
      <div className="task">
        <div>{data.title}</div>
        <div>{data.endDate}</div>
      </div>
    </div>
  );
};

/**
 * ------------------ HELPERS ------------------
 */

const NewElementPlaceholder = ({ display = false, onAddElement, allowDrop }) => {
  const [displayAddPlaceholder, setDisplayAddPlaceholder] = useState(display);

  const displayPlaceholder = () => {
    setDisplayAddPlaceholder(true);
  };

  const hidePlaceholder = () => {
    if (display) return;
    setDisplayAddPlaceholder(false);
  };

  return (
    <div
      className={`add-element-container ${
        displayAddPlaceholder ? 'add-element' : 'add-element-hidden'
      }`}
      onMouseEnter={displayPlaceholder}
      onDragEnter={(e) => {
        displayPlaceholder();
        e.target.style.backgroundColor = 'rgba(119, 136, 153, 0.411)';
        e.target.style.maxHeight = '100vh';
        e.target.style.transition = 'max-height 1s ease-in';
      }}
      onMouseLeave={hidePlaceholder}
      onDragLeave={(e) => {
        hidePlaceholder();
        e.target.style.removeProperty('background-color');
        e.target.style.removeProperty('max-height');
        e.target.style.removeProperty('transition');
      }}
      onDragOver={allowDrop}
      onDrop={(e) => {
        e.stopPropagation();
        hidePlaceholder();
        e.target.style.removeProperty('background-color');
        e.target.style.removeProperty('max-height');
        e.target.style.removeProperty('transition');
        onAddElement(e);
      }}
    >
      <span>+</span>
    </div>
  );
};

function ListManager(idx = 0, list, config = {}, deleteElement, addElement) {
  const [fragList, setFragList] = useState(list);
  const onAddElement = (e) => {
    e.preventDefault();
    addElement(e);
    // setFragList()
  };
  const allowDrop = (e) => {
    e.stopPropagation();
    e.preventDefault(); // By default, data cannot be dropped
  };

  const typeMap = (key) => ({
    section: (props) => (
      <Section
        key={key}
        {...props}
        deleteElement={deleteElement}
        addElement={addElement}
      />
    ),
    board: (props) => (
      <Board key={key} {...props} deleteElement={deleteElement} addElement={addElement} />
    ),
    task: (props) => (
      <Task key={key} {...props} deleteElement={deleteElement} addElement={addElement} />
    ),
  });

  return (
    <>
      {list.map((el, idx) => typeMap(el.id)[el.type]({ idx, data: el }))}
      <NewElementPlaceholder
        display={config.display}
        onAddElement={onAddElement}
        allowDrop={allowDrop}
      />
    </>
  );
}

export default function MainLoader({ data }) {
  const [transferedData, setTransferedData] = useState(false);

  const getTransferedData = () => transferedData;

  return (
    <div className="container">
      {ListManager(0, data, { display: true }, setTransferedData, getTransferedData)}
    </div>
  );
}
