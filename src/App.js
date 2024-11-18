import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Warehouse from "./components/Warehouse/Warehouse";
import "./styles/output.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/warehouse/:id" element={<Warehouse />} />
      </Routes>
    </Router>
  );
}

export default App;
