import NavBarLogin from '../../components/NavBarLogin'
import Footer from '../../components/Footer'
import populer from '../../components/PopulerSection/populer'
import { useEffect, useState } from 'react'

import DeskripsiDetail from '../../components/Detail/deskripsi-detail'
import ImageDetail from '../../components/Detail/image-detail'
import RincianDetail from '../../components/Detail/rincian-detail'
import TokoDetail from '../../components/Detail/toko-detail'
import CountDetail from '../../components/Detail/count-detail'
import { ButtonBeli, ButtonKeranjang } from '../../components/Button'
import StarWidget from '../../components/Star'
import ReviewItem from '../../components/Review/review-item'
import { useParams } from 'react-router-dom'
import { getMitra, getProduk } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import EmptyList from '../../assets/emptyList.png'

function Index ({ onLogout }) {
  const data = populer[0]
  const [jumlah, setJumlah] = useState(1)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [produk, setProduk] = useState({})
  const [totalHarga, setTotal] = useState(produk.harga)
  const [mitra, setMitra] = useState([])

  async function getProdukById () {
    setLoading(true)
    const { error, produk } = await getProduk(id)
    const { Mitra } = await getMitra(produk.idMitra)
    if (!error) {
      setProduk(produk)
      setMitra(Mitra)
      setTotal(produk.harga)
    }
    setLoading(false)
  }

  function NotFound () {
    return (
      <center>
        <img src={EmptyList} width={400} height={400} className='img-fluid mx-auto d-block' alt='' />
        <h6><b>Reviews tidak ditemukan!</b></h6>
      </center>
    )
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    getProdukById()
  }, [id])

  return (
    <div>
      <NavBarLogin logoutHandler={onLogout}/>
      <Loading visible={loading} />
      <div className="container mt-4 mb-5">
        <h3>{produk.nama}</h3>
        <div className="row mb-5">
        <ImageDetail data={produk} />
        <div className="col-lg-6">
          <h1><b>Rp.{produk.harga}</b></h1>
          <RincianDetail data={produk} />
          <TokoDetail mitra={mitra} />
          <DeskripsiDetail data={produk} />

          <span className="font-weight-bold">Banyak Beli</span>
          <div className="row">
            <CountDetail
              harga={produk.harga}
              jumlah={jumlah}
              setJumlah={setJumlah}
              setTotal={setTotal}
            />
            <div className="col text-right">
            <span>Total Bayar</span>
            <h3 className="font-weight-bold">Rp.{totalHarga}</h3>
          </div>
          </div>
          <div className="row mt-5 d-flex justify-content-around">
            <ButtonKeranjang />
            <ButtonBeli />
          </div>
        </div>
      </div>

      <div className="row text-center mt-4">
        <div className="col">
            <h6 className="font-weight-bold">Total Review</h6>
            <div className="text-total-review">{[produk.reviews].length} <span style={{ fontSize: 30 }}>review</span></div>
        </div>
        <div className="col">
            <h6 className="font-weight-bold">Rata-rata Rating</h6>
            <div className="text-total-bintang">{produk.rating} <span><StarWidget lengthStar={produk.rating}/></span></div>
        </div>
      </div>
      <div className="p-4">
        {
         [produk.reviews].length === 0
           ? <NotFound/>
           : [produk.reviews].map((review) => (<ReviewItem review={review}/>
             ))
        }
      </div>
      </div>
      <Footer />
    </div>
  )
}
export default Index
