import '../ItemBarang/itembarang.css'

function Index ({ data, jumlah, totalHarga, gambarBrg, nama }) {
  return (
    <div className="row align-items-center mt-3 card-product-keranjang m-0">
      <div className="col-5">
        <div className="row align-items-center">
            <div className="col-5">
            <img className="image-product-keranjang" width={100} src={gambarBrg} alt="" />
            </div>
            <div className="col">
                <h6><b>{nama}</b></h6>
                {/* <span>{produk.toko.name}</span> */}
            </div>
        </div>
      </div>
      <div className="col-2">
        <div className="row m-0 d-flex align-items-center justify-content-center">
          <span>{jumlah} Item</span>
        </div>
      </div>
      <div className="col text-center">Rp.{totalHarga}</div>
    </div>
  )
}

export default Index
