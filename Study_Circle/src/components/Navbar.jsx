import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h2 className="brand">StudyCircle</h2>
      <div className="links">
        <Link to="/">SOS Feed</Link>
        <Link to="/sos">Post SOS</Link>
      </div>
    </nav>
  );
}
