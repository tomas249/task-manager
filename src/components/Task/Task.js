import './Task.css';

export default function Task({ data, deleteElement, ...props }) {
  return (
    <div className="task-container" key={data.id}>
      <div className="task">
        <div>{data.title}</div>
        <div>{data.endDate}</div>
        <button onClick={deleteElement}>Delete</button>
      </div>
    </div>
  );
}
