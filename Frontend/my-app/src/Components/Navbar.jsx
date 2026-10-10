import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Medi<span>Cost</span> Insight
        </Link>
      </div>

      <div className="nav-center">
        <Link to="/about">About</Link>
        <Link to="/docs">Docs</Link>
        <Link to="/predict">Predict</Link>
      </div>

      <div className="nav-right">
        <button className="cta-btn">Check Premium</button>
      </div>
    </nav>
  );
}
