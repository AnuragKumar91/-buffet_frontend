import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Form from "./components/Form";
import Test from "./components/Test";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/test" element={<Test />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
