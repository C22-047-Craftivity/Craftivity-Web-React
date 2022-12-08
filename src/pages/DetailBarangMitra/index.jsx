import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import CONFIQ from '../../confiq/confiq'
import { getProduk, saveProduk, saveProdukTemp } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import './detailBarang.css'

export default function Index () {
  const { idBrg } = useParams()
  const navigate = useNavigate()
  const [dataProduk, setDataProduk] = useState([])
  const [nama, setNama] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [harga, setHarga] = useState('')
  const [kategori, setKategori] = useState('')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const gambarBrg = useRef()

  async function getDataProduk () {
    setLoading(true)
    const { error, produk } = await getProduk(idBrg)
    if (!error) {
      if (produk === null || produk.idMitra !== localStorage.getItem(CONFIQ.authMitra)) {
        return setDataProduk(null)
      }
      setDataProduk(produk)
      setNama(produk.nama)
      setDeskripsi(produk.deskripsi)
      setHarga(produk.harga)
      setKategori(produk.kategori)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDataProduk()
  }, [])

  async function gantiGambar (e) {
    setLoading(true)
    const file = e.target.files[0]
    const { error } = await saveProduk(file, dataProduk)
    if (!error) { window.location.reload() }
    setLoading(false)
  }

  function edit () {
    const btnEdit = document.getElementById('btn-editBarang')
    const btnSimpan = document.getElementById('btn-simpanBarang')
    if (readOnly) {
      btnSimpan.style.display = 'block'
      btnEdit.innerHTML = 'Batal'
      setReadOnly(false)
    } else {
      btnSimpan.style.display = 'none'
      setNama(dataProduk.nama)
      setDeskripsi(dataProduk.deskripsi)
      setHarga(dataProduk.harga)
      setKategori(dataProduk.kategori)
      btnEdit.innerHTML = 'Edit'
      setReadOnly(true)
    }
  }

  function simpan () {
    if (nama !== '' && deskripsi !== '' && harga !== '0' && kategori !== '') {
      setLoading(true)
      saveProdukTemp({ ...dataProduk, nama, deskripsi, harga, kategori })
      setLoading(false)
      navigate('/list-barang')
    }
  }

  if (dataProduk === null) {
    return (
      <div className='text-center text-secondary'>Barang tidak tersedia</div>
    )
  }

  return (
    <div className='editBarang'>
      <Loading visible={loading} />
      <div className='editBarang-Header'>
        <AiOutlineArrowLeft className='btn-back' onClick={() => navigate('/list-barang')} />
        <p className='m-0'>Edit Barang</p>
      </div>
      <div className='editBarang-dataUtama'>
        <div className='editBarang-dataUtama_gambarBrg'>
          <img src={dataProduk.gambarBrg} alt='Gambar Produk' className='gambarBrg' />
          <button type='button' className='editPoto' onClick={() => gambarBrg.current.click()}><AiFillCamera /></button>
        </div>
        <p className='text-secondary m-0'>Id Barang: {dataProduk.idBrg}</p>
      </div>
      <div className='editBarang-dataKedua'>
        <div className='d-flex fd-row mb-2'>
          <p className='m-0 w-25'>Nama Barang</p>
          <input className='w-75' disabled={readOnly} value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className='d-flex fd-row mb-2'>
          <p className='m-0 w-25'>Deskripsi</p>
          <textarea className='w-75' disabled={readOnly} rows={5} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
        </div>
        <div className='d-flex fd-row mb-2'>
          <p className='m-0 w-25'>Harga</p>
          <input type="number" min={0} step={500} disabled={readOnly} value={Number(harga)} onChange={(e) => setHarga(e.target.value)} />
        </div>
        <div className='d-flex fd-row mb-2'>
          <p className='m-0 w-25'>Kategori</p>
          <select disabled={readOnly} value={kategori} onChange={(e) => setKategori(e.target.value)} >
            <option value=''>Pilih salah satu</option>
            <option value='Aksesoris Badan'>Aksesoris Badan</option>
            <option value='Aksesoris Rumah'>Aksesoris Rumah</option>
            <option value='Kayu'>Kayu</option>
            <option value='Bunga'>Bunga</option>
            <option value='Mainan'>Mainan</option>
          </select>
        </div>
        <div className='mt-3 editBarang-dataKedua_action'>
          <button id='btn-editBarang' onClick={edit}>Edit</button>
          <button id='btn-simpanBarang' onClick={simpan} >Simpan</button>
        </div>
      </div>
      <input ref={gambarBrg} type='file' hidden accept='image/*' onChange={gantiGambar} />
    </div>
  )
}
