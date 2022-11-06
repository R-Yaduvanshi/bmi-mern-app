import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CalculateBMI from "./components/CalculateBMI";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <Logout />
      <Routes>
        <Route path="/" element={<h1>Welcome to BMI App</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calculateBMI" element={<CalculateBMI />} />
      </Routes>
    </div>
  );
}

export default App;
