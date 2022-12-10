import '../Footer/footer.css'
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BiSearchAlt } from 'react-icons/bi'
import DownloadApp from '../../assets/DownloadApp.png'

function Index () {
  return (
    <footer>
        <div className="row mb-5">
            <div className="col">
                <h1 className="mb-3">Craftivity</h1>
                <h6 className="text-headline-section">Social Media</h6>
                <div className="col-6 mb-4">
                    <div className="row d-flex justify-content-between">
                        <FaInstagram/>
                        <FaFacebookF/>
                        <FaYoutube/>
                        <FaTwitter/>
                    </div>
                </div>
                <h6 className="text-headline-section mb-3">Hubungi kami</h6>
                <span>Alamat : Jakarta, Indonesia</span><br />
                <span>Kontak : +62 896 4234 5322</span>
            </div>
            <div className="col">
                <p className="text-headline-section">Menus</p>
                <Link to="/populer" className='menus-link'>Produk Populer</Link><br /><br />
                <Link to="/favorite" className='menus-link'>Favorite</Link><br /><br />
                <Link to="/keranjang" className='menus-link'>Keranjang</Link><br /><br />
                <Link to="/tentang" className='menus-link'>Tentang Kami</Link>
            </div>
            <div className="col">
                <p className="text-headline-section">Kategori</p>
                <Link to="/kategori/Aksesoris Badan" className='menus-link'>Aksesoris Badan</Link><br /><br />
                <Link to="/kategori/Aksesoris Rumah" className='menus-link'>Aksesoris Rumah</Link><br /><br />
                <Link to="/kategori/Kayu" className='menus-link'>Kayu</Link><br /><br />
                <Link to="/kategori/Bunga" className='menus-link'>Bunga</Link><br /><br />
                <Link to="/kategori/Mainan" className='menus-link'>Mainan</Link>
            </div>
            <div className="col">
                <p className="text-headline-section">Download App</p>
                <img src={DownloadApp} className='img-fluid' />
            </div>
        </div>
        <hr />
        <p className="text-footer">Dikembang oleh <b>Tim Creativity</b>, Indonesia 2022</p>
    </footer>
  )
}

export default Index
