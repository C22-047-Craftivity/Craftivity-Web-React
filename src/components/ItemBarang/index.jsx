import { useState, useEffect } from 'react'
import '../ItemBarang/itembarang.css'
import { getProduk, getUserById } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'

function Index ({ data, jumlah, totalHarga }) {
  const [produk, setProduk] = useState({})

  async function getProdukById () {
    const { error, produk } = await getProduk(data.idBarang)
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
      <div className="col-2">
        <div className="row m-0 d-flex align-items-center justify-content-center">
          <span>{jumlah} Item</span>
        </div>
      </div>
      <div className="col text-center">Rp.{totalHarga}</div>
    </div>
  )
}

export default Index
