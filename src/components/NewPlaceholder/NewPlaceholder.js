import React from 'react';

function NewPlaceholder({ config, addElement }) {
  const onAddElement = () => {
    const type = prompt();
    const title = prompt();
    const newEl = {
      id: Date.now(),
      type,
      title,
      list: [],
    };
    addElement(newEl);
  };
  return (
    <div>
      <button onClick={onAddElement}>ADD</button>
    </div>
  );
}

export default NewPlaceholder;
