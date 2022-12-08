import '../CardItem/cardItem.css'
import StarWidget from '../Star'
import { Link } from 'react-router-dom'

function PopulerItem ({ populer }) {
  return (
    <div className="col-lg-3 mb-4">
      <div className="card-product">
        <div className="image-product">
            <img src={populer.gambarBrg} alt={populer.nama} className="img-fluid" />
        </div>
        <div className="body-product mt-3">
            <h6>Rp. {populer.harga}</h6>
            <h4>{populer.nama}</h4>
            <div className="d-flex align-items-center">
            <StarWidget lengthStar={parseInt(populer.rating)}/><span className="ml-2">({populer.rating})</span>
            </div>
            <Link to={`/detail/${populer.idBrg}`}>
              <button className="product-button-beli mt-4 mb-3">Lihat Detail</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default PopulerItem
