import StarWidget from '../Star'

function RincianDetail ({ data }) {
  return (
    <div className="row m-0 mb-4 d-flex align-items-center justify-content-between">
      <h6>{data.terjual} terjual</h6>
      <span className="block"></span>
      <div className="d-flex align-items-center">
        <StarWidget lengthStar={data.rating} />
        <span className="ml-2">({data.rating})</span>
      </div>
      <span className="block"></span>
      <h6>Kategori cincin</h6>
    </div>
  )
}

export default RincianDetail
