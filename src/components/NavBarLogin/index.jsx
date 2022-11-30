import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import '../NavBarLogin/navbar-login-style.css'
import FavoriteIcon from '../../assets/Favorite.svg'
import CartIcon from '../../assets/Cart.svg'
import { getUserById, logout } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'

function NavBarLanding () {
  const [user, setUser] = useState([])

  useEffect(() => {
    async function getDataUserById () {
      const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
      setUser(user)
      console.log(user)
    }
    getDataUserById()
  }, [])
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
                <img src={user.profile_picture} alt="" className='profile-image-button'/>
            </a>
            <div class="dropdown-menu dropdown-menu-right mt-3">
              <Link to="/keranjang" className="dropdown-item">
                Atur Profile
              </Link>
              <div class="dropdown-divider"></div>
              <button onClick={logout}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBarLanding
