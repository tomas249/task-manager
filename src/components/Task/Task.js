import "./Task.css";

export default function Task({ element: { title, url, endDate }, handleDelete, handleUpdate }) {
  const toUpdate = { title, endDate };
  return (
    <div className="task-container">
      <div className="task" draggable>
        {!url && <div>{title}</div>}
        {url && (
          <div className="pointer-event">
            <a
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
              target="_blank"
              rel="noreferrer"
              href={url}
            >
              {title}
              <span style={{ fontStyle: "italic", color: "darkgray" }}> link</span>
            </a>
          </div>
        )}
        <div>{endDate}</div>
      </div>
      <div style={{ top: "10px", left: "-40px" }} className="btn-container">
        <button className="btn-edit" onClick={() => handleUpdate(toUpdate)}>
          EDIT
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          {" "}
          DELETE
        </button>
      </div>
    </div>
  );
}
