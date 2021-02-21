import "./Section.css";

export default function Section({ loadList, element, handleDelete, handleUpdate }) {
  return (
    <div className="section-container">
      <div className="section-title">
        {element.title}
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => handleUpdate(element)}>Update</button>
      </div>
      <hr />
      <div className="section-taskList">{loadList()}</div>
    </div>
  );
}
