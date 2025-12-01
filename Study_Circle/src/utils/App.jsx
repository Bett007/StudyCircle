import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar";
import SOSFeed from "../components/SOSFeed";
import SOSForm from "../components/SOSForm";
import "./styles.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<SOSFeed />} />
          <Route path="/sos" element={<SOSForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
