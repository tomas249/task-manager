import "./Section.css";

export default function Section({ loadList, element: { title }, handleDelete, handleUpdate }) {
  return (
    <div draggable className="section-container">
      <div className="section-title">
        <div style={{ top: "20px", left: "-65px" }} className="btn-container">
          <button className="btn-edit" onClick={() => handleUpdate({ title })}>
            EDIT
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            DELETE
          </button>
        </div>
        {title}
      </div>
      <hr />
      <div className="section-taskList">{loadList()}</div>
    </div>
  );
}
