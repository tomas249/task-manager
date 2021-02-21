import "./Board.css";

export default function Board({ loadList, element, handleDelete, handleUpdate }) {
  return (
    <div draggable className="board-container" key={element.id}>
      <div className="board-title">
        {element.title}
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => handleUpdate(element)}>Update</button>
      </div>
      <div className="board-list">{loadList()}</div>
    </div>
  );
}
