import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CONFIQ from '../confiq/confiq'
import { getMitra, getUser, logout } from '../confiq/firebase'
import LandingPage from '../pages/Landing'
import LoginUserPage from '../pages/LoginUser'
import RegisterUserPage from '../pages/RegisterUser'
import LoginMitraPage from '../pages/LoginMitra'
import RegisterMitraPage from '../pages/RegisterMitra'
import DetailPage from '../pages/Detail'
import KeranjangPage from '../pages/Keranjang'
import Swal from 'sweetalert2'

function Index () {
  const [authMitra, setAuthMitra] = useState(localStorage.getItem(CONFIQ.authMitra) || null)
  const [authUser, setAuthUser] = useState(localStorage.getItem(CONFIQ.authUser) || null)
  const [dataMitra, setDataMitra] = useState([])
  const [dataUser, setDataUser] = useState([])

  useEffect(() => {
    async function getDataAllUser () {
      const { DataMitra } = await getMitra()
      const { DataUser } = await getUser()
      setDataMitra(DataMitra)
      setDataUser(DataUser)
    }
    getDataAllUser()
  }, [])

  async function onLoginMitra (data) {
    for (let i = 0; i < dataMitra.length; i++) {
      if (dataMitra[i].id === data.uid) {
        localStorage.setItem(CONFIQ.authMitra, data.uid)
        return setAuthMitra(data.uid)
      }
    }
    if (authMitra === null) {
      Swal.fire('Akses ditolak', 'akun tidak memiliki akses ke halaman ini!', 'error')
      await logout()
    }
  }

  async function onLoginUser (data) {
    console.log(dataUser)
    for (let i = 0; i < dataUser.length; i++) {
      if (dataUser[i].id === data.uid) {
        localStorage.setItem(CONFIQ.authUser, data.uid)
        return setAuthUser(data.uid)
      }
    }
    if (authUser === null) {
      Swal.fire('Akses ditolak', 'akun tidak memiliki akses ke halaman ini!', 'error')
      await logout()
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
      <Routes>
        <Route path="/*" element={<DetailPage />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginUserPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/keranjang" element={<KeranjangPage/>}/>
    </Routes>
  )
}

export default Index
