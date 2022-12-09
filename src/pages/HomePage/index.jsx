import NavbarLogin from '../../components/NavBarLogin'
import CarouselSlider from '../../components/Carousel'
import images from '../../components/Carousel/image'
import KategoriSection from '../../components/KategoriSection'
import kategori from '../../components/KategoriSection/kategori'
import TerlarisSection from '../../components/TerlarisSection'
import PopulerSection from '../../components/PopulerSection'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import { getAllProduk } from '../../confiq/firebase'
import Loading from '../../components/Loading'

function Index ({ onLogout }) {
  const [produk, setProduk] = useState([])
  const [loading, setLoading] = useState(false)

  async function getProduk () {
    setLoading(true)
    const { error, AllProduk } = await getAllProduk()
    if (!error) {
      setProduk(AllProduk)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProduk()
  }, [])

  return (
        <div>
            <NavbarLogin logoutHandler={onLogout}/>
            <Loading visible={loading} />
            <div className="container mt-4">
                <section className="mb-5">
                    <CarouselSlider images={images}/>
                </section>
                <section className="mb-5">
                    <KategoriSection categories={kategori}/>
                </section>
                <section className="mb-5">
                    <TerlarisSection />
                </section>
                <section className="mb-5">
                    <PopulerSection populer={produk}/>
                </section>
            </div>
            <Footer/>
        </div>
  )
}

export default Index
