import "./Board.css";

export default function Board({ loadList, element: { title }, handleDelete, handleUpdate }) {
  return (
    <div draggable className="board-container">
      <div style={{ top: "0", left: "-65px" }} className="btn-container">
        <button className="btn-edit" onClick={() => handleUpdate({ title })}>
          EDIT
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          DELETE
        </button>
      </div>
      <div draggable className="board-title">
        {title}
      </div>
      <div className="board-list">{loadList()}</div>
    </div>
  );
}
