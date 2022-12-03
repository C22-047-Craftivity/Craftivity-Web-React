import React from 'react'
import NavbarLogin from '../../components/NavBarLogin'
import { NavLink } from 'react-router-dom'
import UserMenu from '../../components/UserMenu'

function Index ({ onLogout }) {
  return (
        <div>
            <NavbarLogin logoutHandler={onLogout}/>
            <div className="container mt-4 mb-5">
                <h2>Dashboard User</h2>
                <h6>Kamu bisa melihat semua kegiatan kamu disini dan lengkapi data kamu!</h6>
                <div className="row mt-4">
                    <div className="col-lg-3">
                        <UserMenu logoutHandler={onLogout}/>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Index
