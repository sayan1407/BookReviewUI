import { Routes, Route } from "react-router";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Review from "./Review";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review/:id" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
