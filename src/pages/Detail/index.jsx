// import { useParams, useNavigate } from 'react-router-dom';
import NavBarLanding from "../../components/NavBarLanding";
import Footer from "../../components/Footer";
import populer from "../../components/PopulerSection/populer";
import { useEffect } from "react";

import DeskripsiDetail from "../../components/Detail/deskripsi-detail";
import ImageDetail from "../../components/Detail/image-detail";
import RincianDetail from "../../components/Detail/rincian-detail";
import TokoDetail from "../../components/Detail/toko-detail";
import CountDetail from "../../components/Detail/count-detail";
import { ButtonBeli, ButtonKeranjang } from "../../components/Button";
import StarWidget from "../../components/Star";
import ReviewItem from "../../components/Review/review-item";
import { useState } from "react";

import "../Detail/style.css"

function Index() {
  const data = populer[0];
  const [jumlah, setJumlah] = useState(1);
  const [totalHarga, setTotal] = useState(data.harga);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [])

  return (
    <div>
      <NavBarLanding />
      <div className="container mt-4 mb-5">
        <h4>{data.name}</h4>
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
      </div>
      <Footer />
    </div>
  );
}
export default Index;