import { useEffect, useState } from 'react'
import TerlarisItem from './terlaris-item'
import { getAllProduk } from '../../confiq/firebase'
import '../TerlarisSection/terlarisSection.css'

function Index () {
  const [produk, setProduk] = useState([])

  async function getProduk () {
    const { error, AllProduk } = await getAllProduk()
    if (!error) {
      setProduk(AllProduk.sort((a, b) => b.terjual - a.terjual).slice(0, 5))
    }
  }

  useEffect(() => {
    getProduk()
  }, [])

  return (
    <div className="container-terlaris">
        <h2>Terlaris</h2>
        <h6>Lihat yang banyak orang beli selama ini.</h6>
        <div className="row mt-4">
          {
            produk.map((item, index) => (
              <TerlarisItem key={index} terlaris={item} {...item} />
            ))
          }
        </div>
    </div>
  )
}

export default Index
