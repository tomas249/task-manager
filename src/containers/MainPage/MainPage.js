import './MainPage.css';
import React, { useState } from 'react';
import ElementManager from '../../components/ElementManager';

function MainPage() {
  const [elementList, setElementList] = useState(
    localStorage.getItem('elements') || []
  );
  const [transferedData, setTransferedData] = useState();

  const getTransferedData = () => transferedData;

  const saveElements = () => {
    // console.log(ele)
  };

  return (
    <div className="container">
      {ElementManager({
        list: elementList,
        setList: setElementList,
        saveElements,
        setTransferedData,
        getTransferedData,
        newPhConfig: { config: { display: true } },
      })}
    </div>
  );
}

export default MainPage;
