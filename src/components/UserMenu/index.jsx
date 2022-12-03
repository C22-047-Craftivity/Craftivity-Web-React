import { NavLink } from 'react-router-dom'
import '../UserMenu/user-menu-style.css'
import { MdDashboard, MdFavorite, MdLocationOn, MdOutlineModeEdit, MdBookmark, MdVpnKey, MdLogout } from 'react-icons/md'
import Swal from 'sweetalert2'

function Index ({ logoutHandler }) {
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
  return (
    <div className="card-user-menu">
      <div className="card-body">
        <NavLink to="/profile" style={{ textDecoration: 'none' }} className="btn btn-link text-left text-dark w-100">
          <MdDashboard className='mr-3'/>Dashboard
        </NavLink>
        <NavLink to="/edit_profile" style={{ textDecoration: 'none' }} className="btn btn-link text-left text-dark w-100">
          <MdOutlineModeEdit className='mr-3'/>Edit Profile
        </NavLink>
        <NavLink to="/alamat" style={{ textDecoration: 'none' }} className="btn btn-link text-left text-dark w-100">
          <MdLocationOn className='mr-3'/>Atur Alamat
        </NavLink>
        <NavLink to="/pesanan" style={{ textDecoration: 'none' }} className="btn btn-link text-left text-dark w-100">
          <MdBookmark className='mr-3'/>Lihat Pesanan
        </NavLink>
        <NavLink to="/list_favorite" style={{ textDecoration: 'none' }} className="btn btn-link text-left text-dark w-100">
          <MdFavorite className='mr-3'/>Favorite Kamu
        </NavLink>
        <NavLink to="/ubah_password" style={{ textDecoration: 'none' }} className="btn btn-link text-left text-dark w-100">
          <MdVpnKey className='mr-3'/>Ubah Password
        </NavLink>
        <button className='btn btn-keluar text-left w-100' onClick={logout}><MdLogout className='mr-3'/>Keluar</button>
      </div>
    </div>
  )
}

export default Index
