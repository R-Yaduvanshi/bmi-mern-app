import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Welcome to BMI App</h1>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
