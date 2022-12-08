import NavBarLanding from '../../components/NavBarLanding'
import { ButtonCheckout } from '../../components/Button'
import Footer from '../../components/Footer'
import '../InvoicePembayaran/invoicePembayaran.css'

function Index () {
  return (
    <div>
        <NavBarLanding/>
        <h1>Beli Sekarang</h1>
        <div className="col-container">
            <img src="" alt="" />
            <h2>Craftivity</h2>
            <h3>Jakarta Barat</h3>
        </div>

        <div className="col-container-2">
            <a href="">ℹ️</a>
            <img src="" alt="" />
            <h2>Lorem Ipsum</h2>
                <div className="btn-group">
                    <button type="button" class="btn btn-secondary"><b>-</b></button>
                    <button type="button" class="btn btn-secondary">2</button>
                    <button type="button" class="btn btn-secondary"><b>+</b></button>
                </div>
            <div className="col-container-text">
                <h2>Rp. 100.000</h2>
                <p>x2</p>
            </div>
        </div>

        <div className="col-container-main">
            <div className="col-container-m1">
                <p>Proteksi Barang</p>
                <p>Rp. 1.0000 <span>x2</span></p>
            </div>
            <div className="col-container-m2">
                <input type="checkbox"/>
            </div>
        </div>

        <div className="col-container-3">
            <div className="text-icon">
                <img src="" alt="" />
            </div>
            <div className="text-content">
                <h1>Mau Kirim Kemana ?</h1>
                <h5>Jl. Batik Kumeli No.50, Sukaluyu,
                    Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40123
                </h5>
            </div>
        </div>

        <div className="col-container-4">
            <div className="text-icon">
                <img src="" alt="" />
            </div>
            <div className="text-content">
                <h1>Opsi Pengiriman</h1>
                <div class="dropdown">
                    <button class="btn-dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Reguler
                    </button>
                    <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Kargo</a>
                    <a class="dropdown-item" href="#">Nextday</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="card-custom-invoice">
            <div className="card-body">
                <h5><b>Detail Pembayaran</b></h5><br/>
                    <p>Subtotal Produk <span><b>Rp. 100.000</b></span></p>
                    <p>Subtotal Pengiriman <span><b>Rp.11.000</b></span></p>
                    <p>Subtotal Pelayanan <span><b>Rp.1.000</b></span></p>
                        <div className="text-card">
                            <span>Total SPembayaran</span>
                            <h3>Rp. 112.000</h3>
                        </div>
                <ButtonCheckout/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Index
