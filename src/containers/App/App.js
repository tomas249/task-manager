import './App.css';
import MainPage from '../MainPage';

import mockData from '../../mock/mock';

function App() {
  return (
    <div className="App">
      <MainPage data={mockData} />
    </div>
  );
}

export default App;
