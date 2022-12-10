import { useEffect, useState } from 'react'
import CONFIQ from '../../confiq/confiq'
import { getAllPemesanan, getAllProduk } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import './dashboardMitra.css'

export default function Index () {
  const [loading, setLoading] = useState(false)
  const [penjualan, setPenjualan] = useState([])
  const [produk, setProduk] = useState([])

  async function getPenjualan () {
    setLoading(true)
    const { error, dataPemesanan } = await getAllPemesanan()
    if (!error) {
      const dataPenjualan = []
      dataPemesanan.map((item) => (
        item.checkout.barang.map((barang) => (barang.idMitra === localStorage.getItem(CONFIQ.authMitra) ? dataPenjualan.push(item) : ''))
      ))
      setPenjualan(dataPenjualan)
    }
    setLoading(false)
  }

  async function getProduk () {
    setLoading(true)
    const { error, AllProduk } = await getAllProduk()
    if (!error) {
      const produkMitra = AllProduk.filter(produk => { return produk.idMitra === localStorage.getItem(CONFIQ.authMitra) })
      setProduk(produkMitra)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPenjualan()
    getProduk()
  }, [])

  return (
    <div className='dashboardMitra'>
      <Loading visible={loading} />
      <p className='dashboardMitra-title'>Dashboard Penjualan</p>
      <div className='dashboardMitra-DataPenjualan mb-5 mt-5'>
        {penjualan.map((item, index) => (
          <div key={index} className='listPenjualan'>
            <p className='m-0 text-secondary'>ID: {item.idPemesanan} ( Tanggal: {item.checkout.tanggalPemesanan} )</p>
            <div className='row listBarangTerjual'>
                {
                    item.checkout.barang.map((barangTerjual) => (
                      <div className='col-6 d-flex flex-row'>
                        <img className='rounded img-fluid' src={barangTerjual.gambarBrg} width={150} height={150} />
                        <div className='d-flex flex-column justify-content-center ml-3'>
                            <p className='m-0 font-weight-bold'>{barangTerjual.nama}</p>
                            <p className='m-0'>Qty: {barangTerjual.jumlah}</p>
                            <p className='m-0'>Harga: {'Rp' + Number(barangTerjual.totalHarga).toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))
                }
            </div>
            <p className='keterangan'>Pengiriman: {item.jasaPengiriman.namaJasa} ({item.jasaPengiriman.tipePengiriman}) - {'Rp' + Number(item.jasaPengiriman.harga).toLocaleString('id-ID')}</p>
            <p className='keterangan'>Penerima: {item.alamatPengiriman.namaPenerima} ({item.alamatPengiriman.notelp})</p>
            <p className='keterangan'>Alamat: {item.alamatPengiriman.tujuan}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
