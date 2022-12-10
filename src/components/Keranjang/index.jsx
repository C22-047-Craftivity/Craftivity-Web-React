import CountDetail from '../Detail/count-detail'
import { useState, useEffect } from 'react'
import { ButtonHapus, ButtonEdit } from '../Button'
import '../Keranjang/keranjang.css'
import { getProduk, getUserById } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'

function Index ({ keranjang, onDeleteHandler }) {
  const [jumlah, setJumlah] = useState(keranjang.jumlah)
  const [totalHarga, setTotal] = useState(keranjang.totalHarga)
  const [pilih, setPilih] = useState(false)
  const [produk, setProduk] = useState({})
  const [produkChek, setCheckout] = useState([])

  // const handleClick = () => setPilih(!pilih)

  async function getProdukById () {
    const { error, produk } = await getProduk(keranjang.idBarang)
    if (!error) {
      setProduk(produk)
    }
  }

  useEffect(() => {
    getProdukById()
  }, [])

  return (
    <div className="row align-items-center mt-3 card-product-keranjang m-0">
      <div className="col-5">
        <div className="row align-items-center">
            <div className="col-5">
            <img className="image-product-keranjang" width={100} src={produk.gambarBrg} alt="" />
            </div>
            <div className="col">
                <h6><b>{produk.nama}</b></h6>
                {/* <span>{produk.toko.name}</span> */}
            </div>
        </div>
      </div>
      {/* <CountDetail
        harga={produk.harga}
        jumlah={jumlah}
        setJumlah={setJumlah}
        setTotal={setTotal}
        totalHarga={totalHarga}
      /> */}
      <div className="col-2">
        <div className="row m-0 d-flex align-items-center justify-content-center">
          <span>{jumlah} Item</span>
        </div>
      </div>
      <div className="col text-center">Rp.{totalHarga}</div>
      <div className="col d-flex justify-content-center">
        <ButtonHapus onDelete = {onDeleteHandler} id = {keranjang.idKeranjang}/>
      </div>
    </div>
  )
}

export default Index
