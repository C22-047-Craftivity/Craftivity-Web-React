function KategoriItem ({ kategori }) {
  return (
    <div className="col-lg-2 item-kategori">
        <img src={kategori.src} alt={kategori.name}/>
        <p>{kategori.name}</p>
    </div>
  )
}

export default KategoriItem
