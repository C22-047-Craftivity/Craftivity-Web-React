import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllProduk } from '../../confiq/firebase'
import NavBarLogin from '../../components/NavBarLogin'
import Loading from '../../components/Loading'
import CardItem from '../../components/CardItem'
import Footer from '../../components/Footer'

export default function Index ({ onLogout }) {
  const { keyword } = useParams()
  const [loading, setLoading] = useState(false)
  const [produk, setProduk] = useState([])

  useEffect(() => {
    async function getProduk () {
      setLoading(true)
      const { error, AllProduk } = await getAllProduk()
      if (!error) {
        const produkPerKategori = AllProduk.filter((produk) => { return produk.nama.toLowerCase().includes(keyword.toLowerCase()) })
        setProduk(produkPerKategori)
      }
      setLoading(false)
    }
    getProduk()
  }, [keyword])

  return (
    <div>
      <NavBarLogin logoutHandler={onLogout}/>
      <Loading visible={loading} />
      <div className='container mt-5 mb-5'>
        <h1 className='mb-5'>Pencarian berdasarkan '{keyword}'</h1>
        {produk.length === 0 ? <div className='text-center text-bold text-secondary'>Tidak ada Produk yang sesuai.</div> : produk.map((item, index) => (<CardItem key={index} populer={item} {...item} />))}
      </div>
      <Footer />
    </div>
  )
}
