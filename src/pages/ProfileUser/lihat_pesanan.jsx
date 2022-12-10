import React, { useEffect, useState } from 'react'
import CONFIQ from '../../confiq/confiq'
import { getAllPemesanan } from '../../confiq/firebase'
import Loading from '../../components/Loading'

function LihatPesananPage ({ titlePage, subtitlePage }) {
  const [pesanan, setPesanan] = useState([])
  const [loading, setLoading] = useState(false)

  async function getPesanan () {
    setLoading(true)
    const { dataPemesanan } = await getAllPemesanan()
    setPesanan(dataPemesanan)
    setLoading(false)
  }

  useEffect(() => {
    getPesanan()
  }, [])

  function ItemPesanan ({ pesanan }) {
    return (
      <div className="card">
        <div className="card-body">{pesanan.biayaLayanan}</div>
      </div>
    )
  }

  return (
    <div className="card shadow">
      <Loading visible={loading} />
      <div className="card-body">
        <div className="mb-4">
          <h2 className="font-weight-bold">{titlePage}</h2>
          <h6>{subtitlePage}</h6>
        </div>
        <div className="row">
          {pesanan.map((data, i) =>
            data.iduser === localStorage.getItem(CONFIQ.authUser)
              ? (
              <ItemPesanan pesanan={data} />
                )
              : (
                  'error'
                )
          )}
        </div>
      </div>
    </div>
  )
}

export default LihatPesananPage
