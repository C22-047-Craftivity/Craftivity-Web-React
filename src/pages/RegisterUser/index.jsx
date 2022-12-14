import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { registerUser } from '../../confiq/firebase'
import './registerUser.css'
import Swal from 'sweetalert2'
import registerVektorUser from '../../assets/RegisterVektorUser.png'
import Loading from '../../components/Loading'

function Index () {
  const [namaUser, setNamaUser] = useInput('')
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [passwordRepeat, setPasswordRepeat] = useInput('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function showPass () {
    const password = document.getElementById('password')
    if (showPassword) {
      password.setAttribute('type', 'password')
      setShowPassword(false)
    } else {
      password.setAttribute('type', 'text')
      setShowPassword(true)
    }
  }

  function showPassRepeat () {
    const passwordRepeat = document.getElementById('passwordRepeat')
    if (showPasswordRepeat) {
      passwordRepeat.setAttribute('type', 'password')
      setShowPasswordRepeat(false)
    } else {
      passwordRepeat.setAttribute('type', 'text')
      setShowPasswordRepeat(true)
    }
  }

  async function Register (event) {
    event.preventDefault()
    if (password === passwordRepeat) {
      setLoading(true)
      const { error } = await registerUser(namaUser, email, password)
      if (!error) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Akun berhasil di buat',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/')
      }
      setLoading(false)
      window.location.reload()
    } else {
      Swal.fire('Gagal', 'Password tidak sesuai', 'error')
    }
  }

  return (
    <div className='register'>
      <Loading visible={loading} />
      <div className='leftSection'>
          <img src={registerVektorUser} alt='' height={500} width={450} />
          <h3>Mulai jadi pengguna kami</h3>
          <p>Isi data lalu jadilah orang yang menggunakan layanan kami</p>
      </div>
      <div className='rightSection'>
          <p className='intro'>Daftar Akunmu</p>
          <form onSubmit={Register} className='input-register'>
            <input type="text" placeholder='Masukkan Namamu...' id="namaUser" value={namaUser} onChange={setNamaUser} required />
            <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
            <div className='input-passwordRegister'>
              <div>
                <input minLength={6} type="password" placeholder='Masukkan 6 digit Password...' id="password" value={password} onChange={setPassword} required />
                {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPassUser'/> : <FiEye onClick={() => showPass()} className='iconPassUser'/>}
              </div>
              <div>
                <input minLength={6} type="password" placeholder='Konfirmasi Password...' id="passwordRepeat" value={passwordRepeat} onChange={setPasswordRepeat} required />
                {!showPasswordRepeat ? <FiEyeOff onClick={ () => showPassRepeat() } className='iconPassRepeat'/> : <FiEye onClick={() => showPassRepeat()} className='iconPassRepeat'/>}
              </div>
            </div>
            <button className='btn-daftar'>DAFTAR</button>
          </form>
          <div className="text-center">
              <p>Sudah punya akun? masuk sekarang <Link to="/"><u>di sini</u></Link></p>
          </div>
      </div>
    </div>
  )
}

export default Index
