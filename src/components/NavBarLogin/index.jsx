import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { BiSearchAlt } from 'react-icons/bi'
import '../NavBarLogin/navbar-login-style.css'
import FavoriteIcon from '../../assets/Favorite.svg'
import CartIcon from '../../assets/Cart.svg'
import { getUserById, logout } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'
import Swal from 'sweetalert2'

function NavBarLogin ({ logoutHandler }) {
  const [user, setUser] = useState([])
  const [keyword, setKeyword] = useInput('')
  const navigate = useNavigate()

  useEffect(() => {
    async function getDataUserById () {
      const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
      setUser(user)
    }
    getDataUserById()
  }, [])

  function logout () {
    Swal.fire({
      title: 'Apakah Anda yakin ingin keluar?',
      showDenyButton: true,
      confirmButtonText: 'Batal',
      denyButtonText: 'Keluar',
      icon: 'warning'
    })
      .then((result) => {
        if (result.isDenied) {
          logoutHandler()
        }
      })
  }

  function btnSearch () {
    if (keyword === '') {
      document.getElementById('search').focus()
    } else {
      navigate(`/${keyword}`)
    }
  }

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
              id='search'
              value={keyword}
              onChange={setKeyword}
              type="text"
              placeholder="Temukan produk yang kamu cari disini!"
              className="form-control search-input-custom"
              aria-label="Search Input"
            />
            <div className="input-group-append">
              <button type='button' className="btn-search" onClick={btnSearch} >
                <BiSearchAlt />
              </button>
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
          <li className="nav-item dropdown mr-3">
            <a
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={user.profilePicture} alt="" className='profile-image-button'/>
            </a>
            <div className="dropdown-menu dropdown-menu-right mt-3">
              <Link to="/profile/edit_profile" className="dropdown-item">
                Atur Profile
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" onClick={logout}>
                <span className='button-logout'>Logout</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBarLogin
