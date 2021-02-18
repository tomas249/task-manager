import './Board.css';

export default function Board({ data, ElementManager, ...props }) {
  return (
    <div className="board-container" key={data.id}>
      <div className="board-title">{data.title}</div>
      <div className="board-list">
        {ElementManager({ list: data.list, ...props })}
      </div>
    </div>
  );
}
