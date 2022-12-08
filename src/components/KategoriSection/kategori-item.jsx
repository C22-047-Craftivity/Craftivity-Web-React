import { Link } from 'react-router-dom'

function KategoriItem ({ kategori }) {
  return (
      <div className="col-4 col-sm-4 col-lg-2 item-kategori text-center">
          <center>
            <Link to={`/kategori/${kategori.name}`} style={{ textDecoration: 'none' }}>
              <img src={kategori.src} alt={kategori.name}/>
              <p>{kategori.name}</p>
            </Link>
          </center>
      </div>
  )
}

export default KategoriItem
