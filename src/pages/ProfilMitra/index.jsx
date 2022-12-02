import { useState, useEffect, useRef } from 'react'
import { getMitra, uploadProfilMitra, saveMitraData } from '../../confiq/firebase'
import CONFIQ from '../../confiq/confiq'
import Loading from '../../components/Loading'
import { AiFillCamera } from 'react-icons/ai'
import './profilMitra.css'

export default function Index () {
  const [mitra, setMitra] = useState([])
  const [namaToko, setNamaToko] = useState([])
  const [kota, setKota] = useState([])
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const avatar = useRef()

  useEffect(() => {
    async function getdataMitra () {
      setLoading(true)
      const { Mitra } = await getMitra(localStorage.getItem(CONFIQ.authMitra))
      setMitra(Mitra)
      setNamaToko(Mitra.namaToko)
      setKota(Mitra.kota)
      setLoading(false)
    }
    getdataMitra()
  }, [])

  async function uploadProfil (e) {
    setLoading(true)
    const file = e.target.files[0]
    const { error } = await uploadProfilMitra(file, mitra)
    if (!error) { window.location.reload() }
    setLoading(false)
  }

  function edit () {
    const btnEdit = document.getElementById('btn-editMitra')
    const btnSimpan = document.getElementById('btn-simpanMitra')
    if (readOnly) {
      btnSimpan.style.display = 'block'
      btnEdit.innerHTML = 'Batal'
      setReadOnly(false)
    } else {
      btnSimpan.style.display = 'none'
      setKota(mitra.kota)
      setNamaToko(mitra.namaToko)
      btnEdit.innerHTML = 'Edit'
      setReadOnly(true)
    }
  }

  function simpan () {
    if (kota !== '' && namaToko !== '') {
      setLoading(true)
      saveMitraData({ ...mitra, kota, namaToko })
      setLoading(false)
      window.location.reload()
    }
  }

  return (
    <div className='profilMitra'>
      <Loading visible={loading} />
      <p className='profilMitra-title'>Profil Toko</p>
      <div className='profilMitra-dataUtama'>
        <div className='profilMitra-dataUtama_profil'>
          <img src={mitra.profilePicture} alt='Profil Akun' className='potoProfil' />
          <button type='button' className='editPoto' onClick={() => avatar.current.click()}><AiFillCamera /></button>
        </div>
        <div className='profilMitra-dataUtama_akun'>
          <p>Id: {mitra.id}</p>
          <p>Email: {mitra.email}</p>
          <p>Bergabung sejak {mitra.bergabung}</p>
        </div>
      </div>
      <div className='profilMitra-dataKedua'>
        <div className='d-flex fd-row mb-2'>
          <p className='m-0 w-25'>Nama Toko</p>
          <input disabled={readOnly} value={namaToko} onChange={(e) => setNamaToko(e.target.value)} />
        </div>
        <div className='d-flex fd-row mb-2'>
          <p className='m-0 w-25'>Kota</p>
          <input disabled={readOnly} value={kota} onChange={(e) => setKota(e.target.value)} />
        </div>
        <div className='mt-3 profilMitra-dataKedua_action'>
          <button id='btn-editMitra' onClick={edit}>Edit</button>
          <button id='btn-simpanMitra' onClick={simpan} >Simpan</button>
        </div>
      </div>
      <input ref={avatar} type='file' hidden accept='image/*' onChange={uploadProfil} />
    </div>
  )
}
