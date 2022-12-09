import '../Button/button.css'
import { FaTrash } from 'react-icons/fa'

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

function ButtonCheckout ({ checkout }) {
  return (
    <button className="button-checkout" onClick={() => checkout()}>Checkout Sekarang</button>
  )
}

function ButtonHapus ({ onDelete, id }) {
  return (
    <button className="button-hapus" onClick={() => onDelete(id)}><FaTrash/> Hapus</button>
  )
}

function ButtonEdit ({ onDelete, idKeranjang }) {
  return (
    <button className="button-edit" onClick={() => onDelete(idKeranjang)}>Edit</button>
  )
}

export { ButtonBeli, ButtonKeranjang, ButtonCari, ButtonCheckout, ButtonHapus, ButtonEdit }
