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
import FavoritePage from './favorite'
import UbahPasswordPage from './ubah_password'

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
                        <Route path="list_favorite" element={<FavoritePage titlePage={'Favorite Kamu'} subtitlePage={'Lihat item yang kamu sukai disini!'}/>}/>
                        <Route path="ubah_password" element={<UbahPasswordPage titlePage={'Ubah Password'} subtitlePage={'Kalau kamu lupa password kamu, kamu bisa ganti password kamu disini!'}/>}/>
                    </Routes>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Index
