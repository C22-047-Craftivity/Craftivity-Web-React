/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import Footer from '../../components/Footer'
import '../Keranjang/keranjangPage.css'
import { ButtonCheckout } from '../../components/Button'
import KeranjangItem from '../../components/Keranjang'
import NavBarLogin from '../../components/NavBarLogin'
import Loading from '../../components/Loading'
import EmptyList from '../../assets/LoginVektorUser.png'
import { useEffect, useState } from 'react'
import { getUserById, saveCheckout, saveUserData } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'
import { useNavigate } from 'react-router-dom'

function Index ({ onLogout }) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [totalItemAll, setTotalItem] = useState(0)
  const [totalHargaAll, setTotalHarga] = useState(0)
  const navigate = useNavigate()

  async function getDataUser () {
    setLoading(true)
    const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
    setUser(user)
    setLoading(false)
    setTotalItem((user.keranjang?.reduce((a, v) => a = a + v.jumlah, 0)))
    setTotalHarga((user.keranjang?.reduce((b, w) => b = b + parseInt(w.totalHarga), 0)))
  }

  async function onDeleteKeranjang (id) {
    const itemKeranjang = user.keranjang?.filter((data) => data.idKeranjang !== id)
    setUser({ ...user, keranjang: itemKeranjang.length < 1 ? '' : itemKeranjang })
    const result = await saveUserData({ ...user, keranjang: itemKeranjang.length < 1 ? '' : itemKeranjang })
    window.location.reload()
  }

  function NotFound () {
    return (
      <center>
        <img src={EmptyList} width={250} height={250} className='img-fluid mx-auto d-block' alt='' />
        <h6><b>Keranjang kamu kosong. Pilih barang kamu dan masukkan ke keranjang!</b></h6>
      </center>
    )
  }

  async function checkout () {
    const dataProdukCheckout = {
      idPemesanan: +new Date(),
      idUser: localStorage.getItem(CONFIQ.authUser),
      barang: user.keranjang,
      totalItemAll,
      totalHargaAll,
      tanggalPemesanan: +new Date()
    }
    const result = await saveCheckout({ ...dataProdukCheckout })
    navigate(`/pembayaran/${dataProdukCheckout.idPemesanan}`)
  }

  useEffect(() => {
    getDataUser()
  }, [])

  return (
    <div>
    <NavBarLogin logoutHandler={onLogout}/>
      <Loading visible={loading} />
        <div className="container mt-4 mb-5">
            <h2>Keranjang kamu</h2>
            <h6>Pilih produk yang ada di keranjangmu lalu lakukan pembayaran</h6>
            <div className="row m-0">
                <div className="col">
                    {
                        user.keranjang === ''
                          ? <NotFound/>
                          : user.keranjang?.map((data, i) => (
                          <KeranjangItem
                              key={i}
                              keranjang={data}
                              onDeleteHandler = {onDeleteKeranjang}
                              {...data} />
                          ))
                    }
                </div>
                <div className="col-lg-3">
                    <div className="card-custom-keranjang mb-3">
                        <div className="card-body">
                            <h5><b>Rincian Keranjang</b></h5>
                            <br />
                            <p>Total Item : <span><b>{totalItemAll}</b></span></p>
                            <p>Total Harga : <span><b>Rp.{totalHargaAll},-</b></span></p>
                            <div className="text-center mt-5">
                                <span>Total Semua</span>
                                <h3>Rp. {totalHargaAll},-</h3>
                            </div>
                            <ButtonCheckout checkout = {checkout}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Index
