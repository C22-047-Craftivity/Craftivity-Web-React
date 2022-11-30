import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import '../NavBarLogin/navbar-login-style.css'
import FavoriteIcon from '../../assets/Favorite.svg'
import CartIcon from '../../assets/Cart.svg'

function NavBarLanding () {
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
              <span className="input-group-text search-icon-custom-nav">
                <BiSearchAlt style={{ width: 20 }} />
              </span>
            </div>
          </div>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/favorite" className="circle-button mr-4">
              <img src={FavoriteIcon} alt="" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/keranjang" className="circle-button mr-4">
              <img src={CartIcon} alt="" />
            </Link>
          </li>
          <li class="nav-item dropdown">
            <a
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className='profile-image-button'/>
            </a>
            <div class="dropdown-menu dropdown-menu-right mt-3">
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item" href="#">
                Another action
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBarLanding
