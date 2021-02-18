import './Section.css';

export default function Section({ data, ElementManager, ...props }) {
  return (
    <div className="section-container" key={data.id}>
      <div className="section-title">{data.title}</div>
      <hr />
      <div className="section-taskList">
        {ElementManager({ list: data.list, ...props })}
      </div>
    </div>
  );
}
