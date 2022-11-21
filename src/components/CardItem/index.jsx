import "../CardItem/style.css";
import StarWidget from "../Star"
function PopulerItem({ populer }) {
  return (
    <div className="col-lg-3 mb-4">
      <div className="card-product">
        <div className="image-product">
            <img src={populer.src} alt={populer.name} className="img-fluid" />
        </div>
        <div className="body-product mt-3">
            <h6>Rp. {populer.harga}</h6>
            <h4>{populer.name}</h4>
            <div className="d-flex align-items-center">
            <StarWidget lengthStar={parseInt(populer.star)}/><span className="ml-2">({populer.star})</span>
            </div>
            <button className="product-button-beli mt-4 mb-3">Beli Sekarang</button>
        </div>
      </div>
    </div>
  );
}

export default PopulerItem;