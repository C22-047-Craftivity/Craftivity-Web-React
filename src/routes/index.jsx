import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import LandingPage from '../pages/Landing'
import LoginUserPage from '../pages/LoginUser'
import RegisterUserPage from '../pages/RegisterUser'
import LoginMitraPage from '../pages/LoginMitra'
import RegisterMitraPage from '../pages/RegisterMitra'

import DetailPage from '../pages/Detail'
import KeranjangPage from '../pages/Keranjang'

function Index () {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(false)

  if (loading) { return (<Loading />) }
  if (authUser === null) {
    return (
      <Routes>
        <Route path="/*" element={<LoginUserPage />} />
        <Route path="/registerUser" element={<RegisterUserPage />} />
        <Route path="/loginMitra" element={<LoginMitraPage />} />
        <Route path="/registerMitra" element={<RegisterMitraPage />} />
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
