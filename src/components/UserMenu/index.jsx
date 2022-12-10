import { NavLink } from 'react-router-dom'
import '../UserMenu/user-menu-style.css'
import { MdDashboard, MdFavorite, MdLocationOn, MdOutlineModeEdit, MdBookmark, MdVpnKey, MdLogout } from 'react-icons/md'
import Swal from 'sweetalert2'

function Index ({ logoutHandler, url }) {
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
        <NavLink to='edit_profile' style={{ textDecoration: 'none' }} className={({ isActive }) => 'btn-menu-user' + (!isActive ? '' : ' active')}>
          <MdOutlineModeEdit className='mr-3'/>Edit Profile
        </NavLink>
        <NavLink to="alamat" style={{ textDecoration: 'none' }} className={({ isActive }) => 'btn-menu-user' + (!isActive ? '' : ' active')}>
          <MdLocationOn className='mr-3'/>Atur Alamat
        </NavLink>
        <NavLink to="pesanan" style={{ textDecoration: 'none' }} className={({ isActive }) => 'btn-menu-user' + (!isActive ? '' : ' active')}>
          <MdBookmark className='mr-3'/>Lihat Pesanan
        </NavLink>
        <button className='btn-keluar' onClick={logout}><MdLogout className='mr-3'/>Keluar</button>
      </div>
    </div>
  )
}

export default Index
