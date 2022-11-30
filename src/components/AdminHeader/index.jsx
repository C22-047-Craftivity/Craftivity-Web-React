import { useEffect, useState } from 'react'
import Logo from '../../assets/Logo.png'
import { getMitra } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'
import './adminHeader.css'

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
    <div className='headerAdmin'>
        <img src={Logo} alt='Logo Craftivity' />
        <h1>TOKO KU</h1>
        <div className='akunProfil'>
            <img className='img-fluid' src={mitra.profile_picture} alt='Profil' />
            <p>{mitra.nameStore}</p>
        </div>
    </div>
  )
}

export default Index
