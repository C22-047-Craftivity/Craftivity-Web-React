import NavbarLogin from '../../components/NavBarLogin'
import CarouselSlider from '../../components/Carousel'
import images from '../../components/Carousel/image'
import KategoriSection from '../../components/KategoriSection'
import kategori from '../../components/KategoriSection/kategori'
import TerlarisSection from '../../components/TerlarisSection'
import terlaris from '../../components/TerlarisSection/terlaris'
import PopulerSection from '../../components/PopulerSection'
import populer from '../../components/PopulerSection/populer'
import Footer from '../../components/Footer'

function Index () {
  return (
        <div>
            <NavbarLogin/>
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
