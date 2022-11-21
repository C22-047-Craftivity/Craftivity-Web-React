import "../Footer/style.css";
import {FaFacebookF, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

function Index() {
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
                    <Link to="/kategori:id" className='menus-link'>Ketegori 1</Link><br /><br />        
                    <Link to="/kategori:id" className='menus-link'>Ketegori 2</Link><br /><br />
                    <Link to="/kategori:id" className='menus-link'>Ketegori 3</Link><br /><br />
                    <Link to="/kategori:id" className='menus-link'>Ketegori 4</Link>
                </div>
                <div className="col">
                    <p className="text-headline-section">Cari Produk</p>
                    <div className="input-group">
                        <input
                        type="text"
                        placeholder="Kalung, Bandung..."
                        className="form-control search-input-custom"
                        aria-label="Search Input"
                        />
                        <div className="input-group-append">
                        <span className="input-group-text search-icon-custom">
                            <BiSearchAlt style={{width:20}}/>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <p className="text-footer">Dikembang oleh <b>Tim Creativity</b>, Indonesia 2022</p>
        </footer>
    );
}

export default Index;