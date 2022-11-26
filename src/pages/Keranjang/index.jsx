import NavBarLanding from "../../components/NavBarLanding";
import Footer from "../../components/Footer";
import "../Keranjang/style.css";
import { ButtonCari, ButtonCheckout} from "../../components/Button";
import KeranjangItem from "../../components/Keranjang";
import keranjang from "../../utils/data";


function Index() {
    return (
        <div>
            <NavBarLanding/>
            <div className="container mt-4 mb-5">
                <h2>Keranjang kamu</h2>
                <h6>Pilih produk yang ada di keranjangmu lalu lakukan pembayaran</h6>
                <div className="row m-0">
                    <div className="col">
                        {
                            keranjang.map((data, i) => (
                                <KeranjangItem
                                    key={i}
                                    keranjang={data}
                                    {...data} />
                            ),)
                        }   
                    </div>
                    <div className="col-lg-3">
                        <div className="card-custom-keranjang mb-3">
                            <div className="card-body">
                                <h5><b>Cari Product</b></h5>
                                <input type="text" className="form-control" />
                                <ButtonCari/>
                            </div>
                        </div>
                        <div className="card-custom-keranjang mb-3">
                            <div className="card-body">
                                <h5><b>Rincian Kerajang</b></h5>
                                <br />
                                <p>Total Item : <span><b>1</b></span></p>
                                <p>Total Harga : <span><b>Rp.20.000,-</b></span></p>
                                <div className="text-center mt-5">
                                    <span>Total Semua</span>
                                    <h3>Rp. 20.000,-</h3>
                                </div>
                                <ButtonCheckout/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Index;