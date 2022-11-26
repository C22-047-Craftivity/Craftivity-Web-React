import StarWidget from '../Star';

function RincianDetail({data}) {
  return (
    <div className="row m-0 mb-4 d-flex align-items-center justify-content-between">
      <h6>1289 terjual</h6>
      <span className="block"></span>
      <div className="d-flex align-items-center">
        <StarWidget lengthStar={data.star} />
        <span className="ml-2">({data.star})</span>
      </div>
      <span className="block"></span>
      <h6>Kategori cincin</h6>
    </div>
  );
}

export default RincianDetail;
