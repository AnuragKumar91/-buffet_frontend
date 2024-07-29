import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Form from './components/Form';
import List from './components/List';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/list-of-buffet-booking" element={<List />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
