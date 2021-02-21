import NewPlaceholder from "./NewPlaceholder";
import { Element } from "./AvailableElements";

export function ListManager({ elementId, newPhConfig, ...props }) {
  const list = props.list || props.getElement(elementId).list;

  const addElement = (element) => {
    props.editElement(elementId, "add")(-1, element);
    // props.editElement("1613910363562", "move")("1613910353842", 0, "1613910371125");
  };

  const moveElement = (opId, cId) => {
    props.editElement(opId, "move")(elementId, -1, cId);
  };

  return () => (
    <>
      {list.map((elId, idx) => ElementManager({ elementId: elId, pId: elementId, idx, ...props }))}
      <NewPlaceholder config={newPhConfig} addElement={addElement} moveElement={moveElement} />
    </>
  );
}

//ListManager
export function ElementManager({ elementId, pId, idx, getElement, editElement, ...props }) {
  const element = getElement(elementId);

  const handleUpdate = (element) => {
    const title = prompt("Set new title:");
    if (!title) return;
    editElement(elementId, "update")({ ...element, title });
  };

  const handleDelete = () => {
    editElement(pId, "delete")(elementId);
  };

  const loadList = ListManager({
    ...props,
    elementId,
    list: element.list,
    getElement,
    editElement,
  });

  // DRAG

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const onDragStart = (ev) => {
    ev.stopPropagation();
    ev.dataTransfer.setData("text", `${pId}-${elementId}`);
  };

  const onDrop = (ev) => {
    ev.stopPropagation();
    const [opId, cId] = ev.dataTransfer.getData("text").split("-");
    editElement(opId, "move")(pId, idx, cId);
  };

  return (
    <div draggable key={elementId} onDragOver={allowDrop} onDragStart={onDragStart} onDrop={onDrop}>
      {Element[element.type]({ ...props, loadList, element, handleUpdate, handleDelete })}
    </div>
  );
}
