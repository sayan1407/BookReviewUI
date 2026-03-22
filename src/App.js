import { Routes, Route } from "react-router";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Review from "./Review";
import AllReviews from "./AllReviews";
import Recommendation from "./Recommendation";
import Library from "./Library";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/allReviews/:id" element={<AllReviews />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;
