import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const rollNumber = sessionStorage.getItem("rollNumber")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={"/form"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
