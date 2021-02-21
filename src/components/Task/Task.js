import "./Task.css";

export default function Task({ element, handleDelete, handleUpdate }) {
  return (
    <div className="task-container" draggable>
      <div className="task">
        <div>{element.title}</div>
        <div>{element.endDate}</div>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => handleUpdate(element)}>Update</button>
      </div>
    </div>
  );
}
