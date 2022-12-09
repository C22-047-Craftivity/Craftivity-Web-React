import React, { useEffect, useRef, useState } from 'react'
import CONFIQ from '../../confiq/confiq'
import { getUserById, saveUserData, uploadProfilUser } from '../../confiq/firebase'
import Loading from '../../components/Loading'
import { AiFillCamera } from 'react-icons/ai'

function EditProfilePage ({ titlePage, subtitlePage }) {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [nama, setNama] = useState([])
  const [noHp, setNoHp] = useState([])
  const avatar = useRef()

  async function getDataUser () {
    setLoading(true)
    const { user } = await getUserById(localStorage.getItem(CONFIQ.authUser))
    setUser(user)
    setNama(user.nama)
    setNoHp(user.noHp)
    setLoading(false)
  }

  async function uploadProfil (e) {
    setLoading(true)
    const file = e.target.files[0]
    const { error } = await uploadProfilUser(file, user)
    if (!error) { window.location.reload() }
    setLoading(false)
  }

  useEffect(() => {
    getDataUser()
  }, [])

  function simpan () {
    if (nama !== '' && noHp !== '') {
      setLoading(true)
      saveUserData({ ...user, nama, noHp })
      setLoading(false)
      window.location.reload()
    }
  }

  return (
    <div className="card shadow border-0">
      <Loading visible={loading} />
      <div className="card-body">
        <div className="mb-4">
          <h2 className="font-weight-bold">{titlePage}</h2>
          <h6>{subtitlePage}</h6>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <img src={user.profilePicture} alt="" className="img-fluid" />
                <button type='button' className='editPoto' onClick={() => avatar.current.click()}><AiFillCamera /></button>
                <h5 className="mt-3">{user.nama}</h5>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nama Lengkap</label>
                <input type='text' className='form-control' value={nama} onChange={(e) => setNama(e.target.value)}
                required/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">No Hp</label>
                <input type='text' className='form-control' placeholder='Masukkan No Hp...' value={noHp} onChange={(e) => setNoHp(e.target.value)}
                required/>
              </div>
              <div className="form-group">
              <input ref={avatar} type='file' hidden accept='image/*' onChange={uploadProfil} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={simpan}>
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage
