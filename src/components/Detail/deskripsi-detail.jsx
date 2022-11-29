function DeskripsiDetail ({ data }) {
  return (
    <>
        <span className="font-weight-bold">Deksripsi Produk</span>
        <br />
        <span>{data.deskripsi}</span>
        <br />
        <br />
    </>
  )
}

export default DeskripsiDetail
