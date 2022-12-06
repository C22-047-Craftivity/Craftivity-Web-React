import { useEffect, useState } from 'react'
import Logo from '../../assets/Logo.png'
import { getMitra } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'
import './mitraHeader.css'

function Index () {
  const [mitra, setMitra] = useState([])

  useEffect(() => {
    async function getdataMitra () {
      const { Mitra } = await getMitra(localStorage.getItem(CONFIQ.authMitra))
      setMitra(Mitra)
    }
    getdataMitra()
  }, [])

  return (
    <div className='headerMitra'>
        <img src={Logo} alt='Logo Craftivity' />
        <h1>TOKO KU</h1>
        <div className='akunProfil'>
            <img className='img-fluid' src={mitra.profilePicture} alt='Profil' />
            <p>{mitra.namaToko}</p>
        </div>
    </div>
  )
}

export default Index
