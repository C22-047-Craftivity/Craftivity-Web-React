function ImageDetail ({ data }) {
  return (
    <div className="col image-detail">
      <img src={data.src} alt={data.name}/>
    </div>
  )
}

export default ImageDetail
