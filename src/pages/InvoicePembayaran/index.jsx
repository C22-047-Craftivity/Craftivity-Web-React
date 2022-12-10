import NavBarLogin from '../../components/NavBarLogin'
import Footer from '../../components/Footer'
import '../InvoicePembayaran/invoicePembayaran.css'
import { useState, useEffect } from 'react'
import { getCheckout, getUserById, savePesanan } from '../../confiq/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Swal from 'sweetalert2'
import CONFIQ from '../../confiq/confiq'
import KeranjangItem from '../../components/Keranjang'
import ItemBarang from '../../components/ItemBarang'
import Select from 'react-select'
import { ButtonPesan, ButtonKembali } from '../../components/Button'

function Index ({ onLogout }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produkChekout, setProdukCheckout] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [hargaJasa, setSelectJasa] = useState(0)

  const [valueAlamat, setValueAlamat] = useState('')
  const [valueJasa, setValueJasa] = useState('')

  const biayaLayanan = 1000
  const totalPembayaran = parseInt(produkChekout.totalHargaAll) + hargaJasa + biayaLayanan

  const pengiriman = [
    {
      idPengiriman: 'JNEREG12',
      namaJasa: 'JNE',
      tipePengiriman: 'REGULER',
      harga: 12000
    },
    {
      idPengiriman: 'JNT2022',
      namaJasa: 'J&T',
      tipePengiriman: 'FAST',
      harga: 22000
    },
    {
      idPengiriman: 'EXCEPAT19',
      namaJasa: 'EXPRESS',
      tipePengiriman: 'KILAT',
      harga: 19000
    }
  ]

  async function getDataCheckout () {
    setLoading(true)
    const { checkout } = await getCheckout(id)
    const { user } = await getUserById(checkout.idUser)
    setUser(user)
    console.log(user)
    setProdukCheckout(checkout)
    setLoading(false)
  }

  const options = user.alamat?.map((c) => ({
    value: c,
    label: <div>
    <h6>Nama Penerima : <b>{c.namaPenerima}</b></h6>
    <h6>No Hp : {c.notelp}</h6>
    <span>{c.tujuan}</span>
  </div>
  }))

  const optionsPengiriman = pengiriman.map((c) => ({
    value: c,
    label: <div>
    <h6>Nama Jasa: <b>{c.namaJasa}</b></h6>
    <h6>Tipe Pengiriman: {c.tipePengiriman}</h6>
    <span>Harga: Rp.{c.harga}</span>
  </div>
  }))

  const handleSelectAlamat = (e) => {
    setValueAlamat(e.value)
  }

  const handleSelectJasa = (e) => {
    setValueJasa(e.value)
    setSelectJasa(e.value.harga)
  }

  const kembaliChekout = () => {
    navigate('/keranjang')
  }

  async function buatPesanan () {
    const pesanan = {
      checkout: produkChekout,
      idPemesanan: id,
      alamatPengiriman: valueAlamat,
      jasaPengiriman: valueJasa,
      biayaLayanan,
      totalPembayaran
    }
    if (valueAlamat !== '' && valueJasa !== '') {
      const result = await savePesanan({ ...pesanan })
      Swal.fire('Berhasil', 'Pesanan berhasil dibuat!', 'success').then(navigate('/'))
    } else if (valueAlamat === '' && valueJasa !== '') {
      Swal.fire('Gagal', 'Alamat tidak boleh kosong!', 'error')
    } else if (valueAlamat !== '' && valueJasa === '') {
      Swal.fire('Gagal', 'Harap pilih jasa pengiriman!', 'error')
    } else if (valueAlamat === '' && valueJasa === '') {
      Swal.fire('Gagal', 'Data belum lengkap, periksa kembali!', 'error')
    }
  }

  useEffect(() => {
    getDataCheckout()
  }, [])

  return (
    <div>
      <NavBarLogin logoutHandler={onLogout} />
      <Loading visible={loading} />
      <div className="container mt-4 mb-5">
        <h2>Beli sekarang</h2>
        <h6>Periksa belanjaan anda disini sebelum melakukan pembayaran!</h6>
        <div>
          {
            produkChekout === null
              ? ''
              : produkChekout.barang?.map((data, i) => (
              <ItemBarang
                key={i}
                data={data}
                jumlah={data.jumlah}
                totalHarga={data.totalHarga}
                {...data}
              />
              ))
          }
        </div>
        <div className="row">
          <div className="col">
              <div className="card mt-4">
              <div className="card-header">Alamat Tujuan</div>
              <div className="card-body">
                <Select options={options} onChange={handleSelectAlamat}/>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mt-4">
            <div className="card-header">Opsi Pengiriman</div>
            <div className="card-body">
              <Select options={optionsPengiriman} onChange={handleSelectJasa}/>
            </div>
          </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">Detail Pembayaran</div>
          <div className="card-body">
            <table class="table table-sm">
              <tbody>
                <tr>
                  <th scope="row">Subtotal Produk</th>
                  <td>Rp.{parseInt(produkChekout.totalHargaAll)}</td>
                </tr>
                <tr>
                  <th scope="row">Subtotal Pengiriman</th>
                  <td>Rp.{hargaJasa}</td>
                </tr>
                <tr>
                  <th scope="row">Biaya Layanan</th>
                  <td>Rp.{biayaLayanan}</td>
                </tr>
                <tr>
                  <th scope='row'><h4 className='text-danger'><b>Total Pembayaran</b></h4></th>
                  <td><h4 className='text-danger'><b>Rp.{totalPembayaran}</b></h4></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
          <div className="row justify-content-center mt-3">
            <ButtonKembali onNavigate={kembaliChekout}/>
            <div className='mr-3'></div>
            <ButtonPesan onBuatPesan={buatPesanan}/>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index
