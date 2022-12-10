import { useEffect, useState } from 'react'
import { getUserById } from '../../confiq/firebase'
import NavBarLogin from '../../components/NavBarLogin'
import Loading from '../../components/Loading'
import CardItem from '../../components/CardItem'
import Footer from '../../components/Footer'
import CONFIQ from '../../confiq/confiq'

export default function Index ({ onLogout }) {
  const [loading, setLoading] = useState(false)
  const [favorit, setFavorit] = useState([])

  useEffect(() => {
    async function getProduk () {
      setLoading(true)
      const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
      setFavorit(user.favorit)
      setLoading(false)
    }
    getProduk()
  }, [])

  return (
    <div>
      <NavBarLogin logoutHandler={onLogout}/>
      <Loading visible={loading} />
      <div className='container mt-5 mb-5'>
        <h1 className='mb-5'>Produk Favorit mu</h1>
        <div className='row'>
          {favorit.length === 0 ? <div className='text-center text-secondary'>Tidak ada Produk yang disukai.</div> : favorit.map((item, index) => (<CardItem key={index} populer={item} {...item} />))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
