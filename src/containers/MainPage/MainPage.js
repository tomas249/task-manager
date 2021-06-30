import "./MainPage.css";
import React, { useState } from "react";
import { ListManager } from "../../components/ElementManager";

const defaultElement = { root: { id: "root", list: [] } };
const localElements = JSON.parse(localStorage.getItem("elements")) || defaultElement;

function MainPage() {
  const [elementList, setElementList] = useState(localElements);

  const resetElementsLocally = () => localStorage.removeItem("elements");
  const saveElementsLocally = () => localStorage.setItem("elements", JSON.stringify(elementList));
  const getElement = (id) => elementList[id];
  const editElement = (pId, action) =>
    ({
      add: (pIdx, element) => {
        const cId = element.id;
        const elements = { ...elementList };
        elements[cId] = element;
        if (pIdx === -1) elements[pId].list = [...elements[pId].list, cId];
        else elements[pId].list.splice(pIdx, 0, cId);
        setElementList(elements);
      },
      delete: (cId) => {
        const elements = { ...elementList };
        elements[pId].list = elements[pId].list.filter((elId) => elId !== cId);
        const deleteChild = (list) =>
          list.forEach((elId) => {
            elements[elId].list?.length && deleteChild(elements[elId].list);
            delete elements[elId];
          });
        deleteChild(elements[cId].list);
        delete elements[cId];
        setElementList(elements);
      },
      move: (dpId, dpIdx, cId) => {
        const elements = { ...elementList };
        elements[pId].list = elements[pId].list.filter((elId) => elId !== cId);
        if (dpIdx === -1) elements[dpId].list = [...elements[dpId].list, cId];
        else elements[dpId].list.splice(dpIdx, 0, cId);
        setElementList(elements);
      },
      update: (updatedElement) => {
        const elements = { ...elementList };
        elements[pId] = { ...elements[pId], ...updatedElement };
        setElementList(elements);
      },
    }[action]);

  const loadList = ListManager({
    newPhConfig: { config: { display: true } },
    elementId: "root",
    getElement,
    editElement,
  });

  return (
    <>
      <div className="container">{loadList()}</div>
      <hr style={{ marginTop: "5rem" }} />
      <button onClick={saveElementsLocally}>Save</button>
      <button onClick={resetElementsLocally}>Reset</button>
      {/* <pre>{JSON.stringify(elementList, undefined, 2)}</pre> */}
    </>
  );
}

export default MainPage;
