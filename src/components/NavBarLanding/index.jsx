import React from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../NavBarLanding/navbar-style.css";
import FavoriteIcon from '../../assets/Favorite.svg';
import CartIcon from '../../assets/Cart.svg';

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
        <span className="nav          bar-toggler-icon"></span>
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
              <span className="input-group-text search-icon-custom">
                <BiSearchAlt style={{width:20}}/>
              </span>
            </div>
          </div>
        </div>
        <ul className="navbar-nav ml-auto mr-3">
          <li className="nav-item active">
            <Link to="/Home" className="circle-button mr-4">
              <img src={FavoriteIcon} alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Home" className="circle-button mr-4">
              <img src={CartIcon} alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Home" className="square-button" style={{ textDecoration: 'none'}}>
              <h4>Login</h4>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBarLanding;
