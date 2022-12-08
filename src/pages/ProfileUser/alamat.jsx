import React, { useEffect, useState } from 'react'
import CONFIQ from '../../confiq/confiq'
import { getUserById, saveUserData } from '../../confiq/firebase'
import EmptyList from '../../assets/emptyList.png'
import Loading from '../../components/Loading'
import Swal from 'sweetalert2'
import useInput from '../../hooks/useInput'

function AlamatPage ({ titlePage, subtitlePage }) {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [namaPenerima, setnamaPenerima] = useInput('')
  const [notelp, setNoTelp] = useInput('')
  const [tujuan, setTujuan] = useInput('')

  async function getAlamatUser () {
    setLoading(true)
    const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
    setUser(user)
    console.log(user)
    setLoading(false)
  }

  async function saveDataAlamat (event) {
    event.preventDefault()
    setLoading(true)
    const dataAlamat = {
      idalamat: +new Date(),
      iduser: localStorage.getItem(CONFIQ.authUser),
      namaPenerima,
      tujuan,
      notelp
    }
    const { error } = await saveUserData({ ...user, alamat: [user.alamat, dataAlamat] })
    if (!error) {
      window.location.reload()
    } else {
      Swal.fire('Gagal', 'Terjadi kesalahan dalam menambah barang, lakukan beberapa saat lagi!', 'error')
    }
    setLoading(false)
  }

  useEffect(() => {
    getAlamatUser()
  }, [])

  function ItemAlamat ({ alamat }) {
    return (
      <div className='card shadow'>
        <div className="card-body">
          <h3>{alamat.namaPenerima}</h3>
          <span>{alamat.notelp}</span>
          <p>{alamat.tujuan}</p>
        </div>
      </div>
    )
  }

  function ItemNotFound () {
    return (
      <div>
        <img src={EmptyList} width={300} height={300} className='img-fluid mx-auto d-block' alt='' />
          <center>
            <p>Anda belum menambahkan alamat!</p>
          </center>
      </div>
    )
  }

  return (
    <div className='card shadow-lg border-0'>
      <Loading visible={loading} />
      <div className="card-body">
        <div className="mb-4">
          <div className="row d-flex justify-content-center align-items-center m-0">
            <div className="col">
              <h2 className="font-weight-bold">{titlePage}</h2>
              <h6>{subtitlePage}</h6>
            </div>
            <div className="col">
              <button className='btn btn-primary float-right' data-toggle="modal" data-target="#tambahAlamat">Buat alamat baru</button>
              {/* MODAL */}
              <div className="modal fade" id="tambahAlamat" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">Tambah Alamat Baru</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={saveDataAlamat}>
                        <div className="form-group">
                          <label htmlFor="namaPenerima">Nama Penerima</label>
                          <input type="text" className="form-control" id="namaPenerima" value={namaPenerima} onChange={setnamaPenerima} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="notelp">No Telepon Penerima</label>
                          <input type="text" className="form-control" id="notelp" value={notelp} onChange={setNoTelp} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="tujuan">Alamat Tujuan</label>
                          <textarea className="form-control" id="tujuan" value={tujuan} onChange={setTujuan} required />
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
          </div>
        </div>
        <div>
        {user.alamat.length === 0 ? <ItemNotFound /> : <ItemAlamat alamat={user.alamat} />}
        </div>
      </div>
    </div>
  )
}

export default AlamatPage
