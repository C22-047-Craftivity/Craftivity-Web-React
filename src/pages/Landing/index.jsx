import { useState } from 'react'
import NavBarLanding from '../../components/NavBarLanding'
import CarouselSlider from '../../components/Carousel'
import images from '../../components/Carousel/image'
import KategoriSection from '../../components/KategoriSection'
import kategori from '../../components/KategoriSection/kategori'
import TerlarisSection from '../../components/TerlarisSection'
import terlaris from '../../components/TerlarisSection/terlaris'
import PopulerSection from '../../components/PopulerSection'
import populer from '../../components/PopulerSection/populer'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'

function Index () {
  const [loading, setLoading] = useState(false)

  if (loading) { return (<Loading visible={loading} />) }
  return (
    <div>
        <NavBarLanding/>
        <div className="container mt-4">
            <section className="mb-5">
                <CarouselSlider images={images}/>
            </section>
            <section className="mb-5">
                <KategoriSection categories={kategori}/>
            </section>
            <section className="mb-5">
                <TerlarisSection terlaris={terlaris}/>
            </section>
            <section className="mb-5">
                <PopulerSection populer={populer}/>
            </section>
        </div>
        <Footer/>
    </div>
  )
}

export default Index
