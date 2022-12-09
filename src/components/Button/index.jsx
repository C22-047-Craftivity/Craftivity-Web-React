import '../Button/button.css'

function ButtonBeli () {
  return (
    <button className="button-beli">Beli Sekarang</button>
  )
}

function ButtonKeranjang ({ onTambahKeranjang }) {
  return (
    <button className="button-keranjang" onClick={() => { onTambahKeranjang() }}>Tambah Keranjang</button>
  )
}

function ButtonCari () {
  return (
    <button className="button-cari">Cari</button>
  )
}

function ButtonCheckout () {
  return (
    <button className="button-checkout">Checkout Sekarang</button>
  )
}

function ButtonHapus ({ onDelete, idKeranjang }) {
  return (
    <button className="button-hapus mr-2" onClick={() => onDelete(idKeranjang)}>Hapus</button>
  )
}

function ButtonEdit ({ onDelete, idKeranjang }) {
  return (
    <button className="button-edit" onClick={() => onDelete(idKeranjang)}>Edit</button>
  )
}

export { ButtonBeli, ButtonKeranjang, ButtonCari, ButtonCheckout, ButtonHapus, ButtonEdit }
