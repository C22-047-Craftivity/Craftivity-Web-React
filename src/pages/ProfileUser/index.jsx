import React from 'react'
import NavbarLogin from '../../components/NavBarLogin'
import {
  Routes,
  Route
} from 'react-router-dom'
import UserMenu from '../../components/UserMenu'
import EditProfilePage from './edit_profile'
import AlamatPage from './alamat'
import LihatPesananPage from './lihat_pesanan'

function Index ({ onLogout }) {
  return (
        <div>
            <NavbarLogin logoutHandler={onLogout}/>
            <div className="container mt-4 mb-5">
                <div className="row mt-4">
                    <div className="col-lg-3">
                        <UserMenu logoutHandler={onLogout}/>
                    </div>
                    <div className="col">
                    <Routes>
                        <Route path="edit_profile" element={<EditProfilePage titlePage={'Edit Profile'} subtitlePage={'Atur data pribadi kamu disini!'}/>}/>
                        <Route path="alamat" element={<AlamatPage titlePage={'Atur Alamat'} subtitlePage={'Tambah alamat anda disini sebelum mulai belanja!'} />}/>
                        <Route path="pesanan" element={<LihatPesananPage titlePage={'Lihat Pesanan'} subtitlePage={'Lihat semua pesanan yang telah anda buat!'} />}/>
                    </Routes>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Index
