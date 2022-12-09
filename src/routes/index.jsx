import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CONFIQ from '../confiq/confiq'
import { getAllMitra, getAllUser, logout } from '../confiq/firebase'
import LoginUserPage from '../pages/LoginUser'
import RegisterUserPage from '../pages/RegisterUser'
import LoginMitraPage from '../pages/LoginMitra'
import RegisterMitraPage from '../pages/RegisterMitra'
import DetailPage from '../pages/Detail'
import KeranjangPage from '../pages/Keranjang'
import Swal from 'sweetalert2'
import HomePage from '../pages/HomePage'
import ProfileUserPage from '../pages/ProfileUser'
import EditProfilePage from '../pages/ProfileUser/edit_profile'
import AlamatPage from '../pages/ProfileUser/alamat'
import LihatPesananPage from '../pages/ProfileUser/lihat_pesanan'
import FavoritePage from '../pages/ProfileUser/favorite'
import UbahPasswordPage from '../pages/ProfileUser/ubah_password'
import HeaderMitra from '../components/MitraHeader'
import MenuMitra from '../components/MitraMenu'
import ProfilMitra from '../pages/ProfilMitra'
import ListBarangMitra from '../pages/ListBarangMitra'
import FooterMitra from '../components/MitraFooter'
import ChekoutPage from '../pages/InvoicePembayaran'

function Index () {
  const [authMitra, setAuthMitra] = useState(localStorage.getItem(CONFIQ.authMitra) || null)
  const [authUser, setAuthUser] = useState(localStorage.getItem(CONFIQ.authUser) || null)
  const [dataMitra, setDataMitra] = useState([])
  const [dataUser, setDataUser] = useState([])

  useEffect(() => {
    async function getDataAllUser () {
      const { DataMitra } = await getAllMitra()
      const { DataUser } = await getAllUser()
      setDataMitra(DataMitra)
      setDataUser(DataUser)
    }
    getDataAllUser()
  }, [])

  async function onLoginMitra (data) {
    for (let i = 0; i < dataMitra.length; i++) {
      if (dataMitra[i].idMitra === data.uid) {
        localStorage.setItem(CONFIQ.authMitra, data.uid)
        return setAuthMitra(data.uid)
      }
    }
    if (authMitra === null) {
      Swal.fire('Akses ditolak', 'akun tidak memiliki akses ke halaman ini!', 'error')
      await onLogout()
    }
  }

  async function onLoginUser (data) {
    for (let i = 0; i < dataUser.length; i++) {
      if (dataUser[i].idUser === data.uid) {
        localStorage.setItem(CONFIQ.authUser, data.uid)
        return setAuthUser(data.uid)
      }
    }
    if (authUser === null) {
      Swal.fire('Akses ditolak', 'akun tidak memiliki akses ke halaman ini!', 'error')
      await onLogout()
    }
  }

  async function onLogout () {
    const { error } = await logout()
    if (!error) {
      localStorage.clear()
      setAuthMitra(null)
      setAuthUser(null)
    }
  }

  if (authUser === null && authMitra === null) {
    return (
      <Routes>
        <Route path="/*" element={<LoginUserPage onloginUser={onLoginUser} />} />
        <Route path="/registerUser" element={<RegisterUserPage />} />
        <Route path="/loginMitra" element={<LoginMitraPage onLoginMitra={onLoginMitra} />} />
        <Route path="/registerMitra" element={<RegisterMitraPage />} />
      </Routes>
    )
  }

  if (authMitra !== null) {
    return (
      <>
       <header>
        <HeaderMitra />
       </header>
       <main>
        <div className='container'>
          <div className='row mt-5 mb-5'>
            <div className='col-sm-3 col-2'>
              <MenuMitra onLogout={onLogout} />
            </div>
            <div className='col-sm-9 col-10'>
              <Routes>
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/profil" element={<ProfilMitra />} />
                <Route path="/list-barang" element={<ListBarangMitra />} />
                <Route path="/forum" element={<DetailPage />} />
              </Routes>
            </div>
          </div>
        </div>
       </main>
       <FooterMitra />
      </>
    )
  }
  return (
    <Routes>
        <Route path="/" element={<HomePage onLogout={onLogout}/>} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/detail/:id" element={<DetailPage onLogout={onLogout}/>} />
        <Route path="/pembayaran/:id" element={<ChekoutPage onLogout={onLogout}/>} />
        <Route path="profile" element={<ProfileUserPage onLogout={onLogout}/>}>
          <Route path="edit_profile" element={<EditProfilePage/>}/>
          <Route path="alamat" element={<AlamatPage/>}/>
          <Route path="pesanan" element={<LihatPesananPage />}/>
          <Route path="list_favorite" element={<FavoritePage />}/>
          <Route path="ubah_password" element={<UbahPasswordPage />}/>
        </Route>
        <Route path="/keranjang" element={<KeranjangPage onLogout={onLogout}/>}/>
      </Routes>
  )
}

export default Index
