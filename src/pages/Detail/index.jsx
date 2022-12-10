import NavBarLogin from '../../components/NavBarLogin'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'

import DeskripsiDetail from '../../components/Detail/deskripsi-detail'
import ImageDetail from '../../components/Detail/image-detail'
import RincianDetail from '../../components/Detail/rincian-detail'
import TokoDetail from '../../components/Detail/toko-detail'
import CountDetail from '../../components/Detail/count-detail'
import { ButtonBeli, ButtonKeranjang } from '../../components/Button'
import StarWidget from '../../components/Star'
import ReviewItem from '../../components/Review/review-item'
import { useNavigate, useParams } from 'react-router-dom'
import { getMitra, getProduk, getUserById, saveCheckout, saveUserData } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import EmptyList from '../../assets/emptyList.png'
import Swal from 'sweetalert2'
import CONFIQ from '../../confiq/confiq'

function Index ({ onLogout }) {
  const [jumlah, setJumlah] = useState(1)
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [produk, setProduk] = useState({})
  const [totalHarga, setTotal] = useState(produk.harga)
  const [mitra, setMitra] = useState([])
  const [user, setUser] = useState([])
  const navigate = useNavigate()

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

  async function getDataUser () {
    const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
    setUser(user)
  }

  function TambahKeranjang () {
    const dataKeranjang = {
      idKeranjang: +new Date(),
      idBarang: id,
      idMitra: produk.idMitra,
      jumlah,
      totalHarga
    }
    const result = saveUserData({ ...user, keranjang: user.keranjang === '' ? [dataKeranjang] : [...user.keranjang, dataKeranjang] })
    Swal.fire('Berhasil', 'Berhasil ditambahkan ke keranjang', 'success')
    window.location.reload()
  }

  function NotFound () {
    return (
      <center>
        <img src={EmptyList} width={250} height={250} className='img-fluid mx-auto d-block' alt='' />
        <h6><b>Reviews tidak ditemukan!</b></h6>
      </center>
    )
  }

  async function beliSekarang () {
    const dataBarang = {
      idBarang: produk.idBrg,
      idMitra: produk.idMitra,
      jumlah,
      totalHarga
    }

    const dataProdukCheckout = {
      idPemesanan: +new Date(),
      idUser: localStorage.getItem(CONFIQ.authUser),
      barang: [dataBarang],
      totalItemAll: jumlah,
      totalHargaAll: totalHarga,
      tanggalPemesanan: +new Date(),
      statusPemesanan: 'Menunggu Pembayaran'
    }
    const result = await saveCheckout({ ...dataProdukCheckout })
    navigate(`/pembayaran/${dataProdukCheckout.idPemesanan}`)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    getProdukById()
    getDataUser()
    console.log(produk)
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
            <ButtonKeranjang onTambahKeranjang={TambahKeranjang}/>
            <ButtonBeli onBeliSekarang={beliSekarang}/>
          </div>
        </div>
      </div>

      <div className="row text-center mt-4">
        <div className="col">
            <h6 className="font-weight-bold">Total Review</h6>
            <div className="text-total-review">{produk.reviews === '' ? '0' : produk.reviews?.length} <span style={{ fontSize: 30 }}>review</span></div>
        </div>
        <div className="col">
            <h6 className="font-weight-bold">Rata-rata Rating</h6>
            <div className="text-total-bintang">{produk.rating} <span><StarWidget lengthStar={produk.rating}/></span></div>
        </div>
      </div>
      <div className="p-4">
        {
         produk.reviews === ''
           ? <NotFound/>
           : produk.reviews?.map((review) => (<ReviewItem review={review}/>
           ))
        }
      </div>
      </div>
      <Footer />
    </div>
  )
}
export default Index
