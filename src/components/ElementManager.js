import NewPlaceholder from './NewPlaceholder';
import element from './AvailableElements';

const withDrag = (Element) => {
  return (props) => Element({ ...props, seudo: 'tooomas' });
};

function ElementManager({ list, setList, newPhConfig, ...props }) {
  // (i) list = [element, element, element]
  // (i) elementList: {id, type, title, list: THIS LIST}

  const addElToLIst = (element) => {};

  const modElList = (element) => (newElList) => {
    const modList = list.map((el) =>
      el.id !== element.id ? el : { ...element, list: newElList }
    );
    setList(modList);
  };

  const pushElToList = (element) => setList([...list, element]);

  const delElFromList = (elIdx) => () =>
    setList(list.filter((el, idx) => idx !== elIdx));

  return (
    <>
      {list.map((el, idx) => (
        <div key={el.id}>
          {withDrag(element[el.type])({
            ...props,
            data: el,
            ElementManager,
            setList: modElList(el),
            deleteElement: delElFromList(idx),
          })}
        </div>
      ))}
      <NewPlaceholder addElement={pushElToList} />
    </>
  );
}

export default ElementManager;
