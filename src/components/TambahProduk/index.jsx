import { useRef, useState } from 'react'
import useInput from '../../hooks/useInput'
import CONFIQ from '../../confiq/confiq'
import './tambahProduk.css'
import Swal from 'sweetalert2'

export default function Index ({ saveDataHandler, visible = false, hidden }) {
  const [nama, setNama] = useInput('')
  const [harga, sertHarga] = useInput('')
  const [deskripsi, setDeskripsi] = useInput('')
  const [gambar, setGambar] = useState('')
  const [kategori, setKategori] = useState('')
  const potoProduk = useRef()

  function submitHandler (event) {
    event.preventDefault()
    if (gambar == null) {
      const dataProduk = {
        idBrg: +new Date(),
        idMitra: localStorage.getItem(CONFIQ.authMitra),
        nama,
        deskripsi,
        harga,
        kategori,
        rating: 0,
        terjual: 0,
        reviews: ''
      }
      saveDataHandler(dataProduk, gambar)
    } else {
      Swal.fire('Info', 'Pastikan semua data terisi dengan benar!', 'info')
    }
  }

  return (
    visible && <div className='TambahProduk-page w-screen'>
      <form className='formhhu' onSubmit={submitHandler}>
        <h1 className='title'>Reset Password Craftivity</h1>
        {/* <input type='email' placeholder='Masukkan email' value={emailReset} onChange={setEmailReset} required />
        <button type='submit' className='btn-resetPassword'>Kirim Permintaan Reset Password</button> */}
        <button type='button' className='btn-close' onClick={hidden()}>tutup</button>
      </form>
      {/* <input ref={potoProduk} type='file' hidden accept='image/*' onChange={} /> */}
    </div>
  )
}
