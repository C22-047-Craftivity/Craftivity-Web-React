import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import LandingPage from '../pages/Landing'
import LoginPage from '../pages/LoginUser'
import DetailPage from '../pages/Detail'
import KeranjangPage from '../pages/Keranjang'

function Index () {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(false)

  if (loading) { return (<Loading />) }
  if (authUser === null) {
    return (
      <Routes>
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/keranjang" element={<KeranjangPage/>}/>
    </Routes>
  )
}

export default Index
