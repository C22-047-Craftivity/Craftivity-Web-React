import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboardCustomize, MdForum } from 'react-icons/md'
import { FaUserEdit, FaBoxes, FaSignOutAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import './mitraMenu.css'

export default function Index ({ onLogout }) {
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
          onLogout()
        }
      })
  }
  return (
    <div className='menuMitra'>
        <NavLink to='/' className={({ isActive }) => 'btn-menu' + (!isActive ? '' : ' active')}><MdDashboardCustomize /><span> Dashboard</span></NavLink>
        <NavLink to='/profil' className={({ isActive }) => 'btn-menu' + (!isActive ? '' : ' active')}><FaUserEdit /><span> Profil</span></NavLink>
        <NavLink to='/list-barang' className={({ isActive }) => 'btn-menu' + (!isActive ? '' : ' active')}><FaBoxes /><span> Barang</span></NavLink>
        <button className='btn-menu' onClick={ () => Swal.fire('SEGERA HADIR', 'Fitur ini sedang dalam pengembangan', 'info') } ><MdForum /><span> Forum</span></button>
        <button className='btn-menu mt-3' onClick={logout} ><FaSignOutAlt /><span> Keluar</span></button>
    </div>
  )
}
