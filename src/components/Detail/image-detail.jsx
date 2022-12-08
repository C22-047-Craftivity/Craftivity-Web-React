function ImageDetail ({ data }) {
  return (
    <div className="col image-detail">
      <img src={data.gambarBrg} alt={data.nama}/>
    </div>
  )
}

export default ImageDetail
