import { Routes, Route } from "react-router";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
