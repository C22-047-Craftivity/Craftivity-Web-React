import { useEffect, useState } from 'react'
import useInput from '../../hooks/useInput'
import CONFIQ from '../../confiq/confiq'
import { getAllProduk, saveProduk } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import EmptyList from '../../assets/emptyList.png'
import { AiFillStar } from 'react-icons/ai'
import './listBarang.css'
import Swal from 'sweetalert2'

export default function Index () {
  const [loading, setLoading] = useState(false)
  const [produk, setProduk] = useState([])
  const [nama, setNama] = useInput('')
  const [harga, setHarga] = useInput(0)
  const [deskripsi, setDeskripsi] = useInput('')
  const [gambar, setGambar] = useState('')
  const [kategori, setKategori] = useInput('')

  async function getProduk () {
    setLoading(true)
    const { error, AllProduk } = await getAllProduk()
    if (!error) {
      const produkMitra = AllProduk.filter(produk => { return produk.idMitra === localStorage.getItem(CONFIQ.authMitra) })
      setProduk(produkMitra)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProduk()
  }, [])

  function EmptyProduct () {
    return <img src={EmptyList} width={400} height={400} className='img-fluid mx-auto d-block' alt='' />
  }

  function ListProduk ({ produk }) {
    return (
      <div className='listProdukPage'>
        {produk.map((item, index) => (
          <div key={index} className='card'>
            <img className="produkItem_img" src={item.gambarBrg} alt="Gambar Barang" />
            <div className="card-body p-2">
              <div style={{ color: 'silver' }} className='d-flex justify-content-between'>
                <div className='align-self-center'><AiFillStar />{item.rating}</div>
                <div>{item.terjual} Terjual</div>
              </div>
              <h5 className="card-title">{item.nama.length > 10 ? `${item.nama.substring(0, 10)}...` : item.nama}</h5>
              <p style={{ fontSize: '20px', textAlign: 'right', margin: '0px' }}>{'Rp' + Number(item.harga).toLocaleString('id-ID')}</p>
              <a href={`detail/${item.idBrg}`} className="btn d-block btn-outline-info mt-2">Detail</a>
            </div>
          </div>
        ))}
      </div>
    )
  }

  async function saveDataProduk (event) {
    event.preventDefault()
    setLoading(true)
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
    const { error } = await saveProduk(gambar, dataProduk)
    if (!error) {
      window.location.reload()
    } else {
      Swal.fire('Gagal', 'Terjadi kesalahan dalam menambah barang, lakukan beberapa saat lagi!', 'error')
    }
    setLoading(false)
  }

  return (
    <div className='listProdukMitra'>
      <Loading visible={loading} />
      <p className='listProdukMitra-title'>Daftar Barang</p>
      {produk.length === 0 ? <EmptyProduct /> : <ListProduk produk={produk} />}
      <button type='button' className='listProdukMitra-action mx-auto d-block mb-1 mt-4' data-toggle="modal" data-target="#tambahData">Tambah Barang</button>

      {/* MODAL */}
      <div className="modal fade" id="tambahData" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Tambah Barang Baru</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={saveDataProduk}>
                <div className="form-group">
                  <label htmlFor="nama">Nama Barang</label>
                  <input type="text" className="form-control" id="nama" value={nama} onChange={setNama} required />
                </div>
                <div className="form-group">
                  <label htmlFor="gambar">Upload gambar Barang</label>
                  <div className='d-flex'>
                    <input className='form-control-file' type='file' id="gambar" accept='image/*' onChange={(event) => setGambar(event.target.files[0])} required />
                    {gambar && <img src={URL.createObjectURL(gambar)} width={75} height={75} className='img-fluid' />}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="deskripsi">Deskripsi Barang</label>
                  <textarea className="form-control" id="deskripsi" value={deskripsi} onChange={setDeskripsi} required />
                </div>
                <div className='d-flex justify-content-between'>
                  <div className="form-group">
                    <label htmlFor="harga">Harga Barang</label>
                    <input type="number" min={0} step={500} className="form-control" id="harga" value={harga} onChange={setHarga} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="kategori">Kategori Barang</label>
                    <select className="form-control" id="kategori" value={kategori} onChange={setKategori} required >
                      <option value=''>Pilih salah satu</option>
                      <option value='Aksesoris Badan'>Aksesoris Badan</option>
                      <option value='Aksesoris Rumah'>Aksesoris Rumah</option>
                      <option value='Kayu'>Kayu</option>
                      <option value='Bunga'>Bunga</option>
                      <option value='Mainan'>Mainan</option>
                    </select>
                  </div>
                </div>
                <div className='d-flex justify-content-around mt-3 mb-3'>
                  <button type="button" className="btn-batalSimpanProduk" data-dismiss="modal">Batal</button>
                  <button type="submit" className="btn-simpanProduk">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
