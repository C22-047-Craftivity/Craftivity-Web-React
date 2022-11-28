import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CONFIQ from '../confiq/confiq'
import { getMitra } from '../confiq/firebase'
import LandingPage from '../pages/Landing'
import LoginUserPage from '../pages/LoginUser'
import RegisterUserPage from '../pages/RegisterUser'
import LoginMitraPage from '../pages/LoginMitra'
import RegisterMitraPage from '../pages/RegisterMitra'
import DetailPage from '../pages/Detail'
import KeranjangPage from '../pages/Keranjang'

function Index () {
  const [authMitra, setAuthMitra] = useState(localStorage.getItem(CONFIQ.authMitra) || null)
  const [authUser, setAuthUser] = useState(localStorage.getItem(CONFIQ.authUser) || null)
  const [dataMitra, setDataMitra] = useState([])

  useEffect(() => {
    async function getDataMitra () {
      const { data } = await getMitra()
      setDataMitra(data)
    }
    getDataMitra()
  }, [])

  function onLoginMitra (data) {
    console.log(dataMitra)
    for (let i = 0; i < dataMitra.length; i++) {
      if (dataMitra[i].id === data) {
        localStorage.setItem(CONFIQ.authMitra, data)
        setAuthMitra(data)
      }
    }
  }

  function onLoginUser (data) {
    localStorage.setItem(CONFIQ.authUser, data)
    setAuthUser(data)
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
