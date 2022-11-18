import "./style.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBarLanding() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-custom">
      <Link to="/" className="navbar-brand p-3 font-weight-bold">
        Craftivity
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="ml-auto col-lg-8">
          <div className="input-group">
            <input
              type="text"
              placeholder="Kalung, Bandung..."
              className="form-control search-input-custom"
              aria-label="Search Input"
            />
            <div className="input-group-append">
              <span className="input-group-text search-icon-cutom">
                <FaSearch />
              </span>
            </div>
          </div>
        </div>
        <ul className="navbar-nav ml-auto mr-3">
          <li className="nav-item active">
            <Link to="/Home" className="nav-link">
              Keranjang
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Home" className="nav-link">
              Favorite
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Home" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarLanding;
