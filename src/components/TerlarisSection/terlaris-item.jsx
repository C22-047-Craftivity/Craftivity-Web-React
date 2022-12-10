import { Link } from 'react-router-dom'

function TerlarisItem ({ terlaris }) {
  return (
    <div className="col">
        <Link to={`/detail/${terlaris.idBrg}`} style={{ backgroundImage: `url(${terlaris.gambarBrg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', textDecoration: 'none' }} className="card card-terlaris shadow-lg border-0 ">
            <div className="card-body-terlaris">
                <p className="text-dark font-weight-bold">{terlaris.nama}</p>
            </div>
        </Link>
    </div>
  )
}

export default TerlarisItem
