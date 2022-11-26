function TokoDetail({data}) {
  return (
    <div className="row mb-4 d-flex align-items-center">
      <div className="col-2">
        <img
          src={data.toko.image}
          alt={data.toko.name}
          className="image-toko"
        />
      </div>
      <div className="col">
        <h5>{data.toko.name}</h5>
        <h6>{data.toko.location}</h6>
      </div>
    </div>
  );
}

export default TokoDetail;
