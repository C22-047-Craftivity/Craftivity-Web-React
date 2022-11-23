import CountDetail from "../Detail/count-detail";
import { useState } from "react";
import { ButtonHapus } from "../Button";
import "../Keranjang/style.css"

function Index({ keranjang }) {
  const [jumlah, setJumlah] = useState(1);
  const [totalHarga, setTotal] = useState(keranjang.harga);
  const [pilih, setPilih] = useState(false);

  const handleClick = () => setPilih(!pilih);

  return (
    <div className="row align-items-center mt-3 card-product-keranjang">
      <div className="col-0">
        <input onClick={handleClick} checked={pilih} type="checkbox" />
      </div>
      <div className="col-5">
        <div className="row align-items-center">
            <div className="col-5">
            <img className="image-product-keranjang" width={100} src={keranjang.image} alt="" />
            </div>
            <div className="col">
                <h6><b>{keranjang.name}</b></h6>
                <span>{keranjang.toko.name}</span>
            </div>
        </div>
      </div>
      <CountDetail
        harga={20000}
        jumlah={jumlah}
        setJumlah={setJumlah}
        setTotal={setTotal}
        totalHarga={totalHarga}
      />
      <div className="col text-center">Rp.{keranjang.harga}</div>
      <div className="col">
        <ButtonHapus/>
      </div>
    </div>
  );
}

export default Index;
