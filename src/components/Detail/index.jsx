import DeskripsiDetail from "./deskripsi-detail";
import ImageDetail from "./image-detail";
import RincianDetail from "./rincian-detail";
import TokoDetail from "./toko-detail";
import "../Detail/style.css";
import { useState } from "react";
import CountDetail from "./count-detail";
import { ButtonBeli, ButtonKeranjang } from "../Button";
import StarWidget from "../Star";
import ReviewItem from "./review-item";

function Index({ data }) {
  const [jumlah, setJumlah] = useState(1);
  const [totalHarga, setTotal] = useState(data.harga);

  return (
    <>
      <div className="row mb-5">
        <ImageDetail data={data} />
        <div className="col-lg-6">
          <h1>Rp.{data.harga}</h1>
          <RincianDetail data={data} />
          <TokoDetail data={data} />
          <DeskripsiDetail data={data} />
          
          <span className="font-weight-bold">Banyak Beli</span>
          <div className="row">
            <CountDetail
              harga={data.harga}
              jumlah={jumlah}
              setJumlah={setJumlah}
              setTotal={setTotal}
              totalHarga={totalHarga}
            />
            <div className="col text-right">
            <span>Total Bayar</span>
            <h3 className="font-weight-bold">Rp.{totalHarga}</h3>
          </div>
          </div>
          <div className="row mt-5 d-flex justify-content-around">
            <ButtonKeranjang />
            <ButtonBeli />
          </div>
        </div>
      </div>

      <div className="row text-center mt-4">
        <div className="col">
            <h6 className="font-weight-bold">Total Review</h6>
            <div className="text-total-review">125 <span style={{fontSize : 30}}>review</span></div>
        </div>
        <div className="col">
            <h6 className="font-weight-bold">Rata-rata Rating</h6>
            <div className="text-total-bintang">4 <span><StarWidget lengthStar={data.star}/></span></div>
        </div>
      </div>
      <div className="p-4">
        {
          data.review.map((review) => (
            <ReviewItem review={review}/>
          ))
        }
      </div>
    </>
  );
}

export default Index;
