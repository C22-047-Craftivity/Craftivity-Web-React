function TokoDetail ({ mitra }) {
  return (
    <div className="row mb-4 d-flex align-items-center">
      <div className="col-2">
        <img src={mitra.profilePicture} alt={mitra.namaToko}
          className="image-toko"
        />
      </div>
      <div className="col">
        <h5>{mitra.namaToko}</h5>
        <h6>{mitra.kota}</h6>
      </div>
    </div>
  )
}

export default TokoDetail
