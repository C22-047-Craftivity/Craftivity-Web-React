import React, { useEffect, useState } from 'react'
import CONFIQ from '../../confiq/confiq'
import { getAllPemesanan, getProduk } from '../../confiq/firebase'
import Loading from '../../components/Loading'

function LihatPesananPage ({ titlePage, subtitlePage }) {
  const [pesanan, setPesanan] = useState([])
  const [loading, setLoading] = useState(false)
  const [produkState, setProduk] = useState([])

  async function getPesanan () {
    setLoading(true)
    const { dataPemesanan } = await getAllPemesanan()
    setPesanan(dataPemesanan)
    setLoading(false)
  }

  function ItemPesanan ({ pesanan }) {
    return (
      <div className="card mb-3">
        <div className="card-header">Tanggal Pemesanan : {pesanan.checkout.tanggalPemesanan}</div>
          <div className="card-body">
          </div>
      </div>
    )
  }

  useEffect(() => {
    getPesanan()
  }, [])

  return (
    <div className="card shadow border-0">
      <Loading visible={loading} />
      <div className="card-body">
        <div className="mb-4">
          <h2 className="font-weight-bold">{titlePage}</h2>
          <h6>{subtitlePage}</h6>
        </div>
        <div className="col m-0">
        </div>
      </div>
    </div>
  )
}

export default LihatPesananPage
