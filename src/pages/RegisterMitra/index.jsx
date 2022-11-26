import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { registerMitra } from '../../confiq/firebase'
import './style.css'
import Swal from 'sweetalert2'
import registerVektorMitra from '../../assets/RegisterVektorMitra.png'
import Loading from '../../components/Loading'

function Index () {
  const [namaMitra, setNamaMitra] = useInput('')
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
      await registerMitra(namaMitra, email, password)
      setLoading(false)
      navigate('/loginMitra')
    } else {
      Swal.fire('Gagal', 'Password tidak sesuai', 'error')
    }
  }

  return (
    <div className='register'>
      <Loading visible={loading} />
      <div className='leftSection'>
          <img src={registerVektorMitra} alt='' height={500} width={450} />
          <h3>Ayo bergabung dengan puluhan pengrajinberbakat lainnya dari Indonesia</h3>
          <p>Isi data lalu jadilah orang yang menggunakan layanan kami</p>
      </div>
      <div className='rightSection'>
          <p className='intro'>Gabung Mitra</p>
          <form onSubmit={Register} className='input-register'>
              <input type="text" placeholder='Masukkan Nama Tokomu...' id="namaMitra" value={namaMitra} onChange={setNamaMitra} required />
              <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
              <div className='input-passwordRegister'>
                <div>
                  <input type="password" minLength={6} placeholder='Masukkan 6 digit Password...' id="password" value={password} onChange={setPassword} required />
                  {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPassUser'/> : <FiEye onClick={() => showPass()} className='iconPassUser'/>}
                </div>
                <div>
                  <input type="password" minLength={6} placeholder='Konfirmasi Password...' id="passwordRepeat" value={passwordRepeat} onChange={setPasswordRepeat} required />
                  {!showPasswordRepeat ? <FiEyeOff onClick={ () => showPassRepeat() } className='iconPassRepeat'/> : <FiEye onClick={() => showPassRepeat()} className='iconPassRepeat'/>}
                </div>
              </div>
            <button type='submit' className='btn-daftar'>DAFTAR</button>
          </form>
          <div className="text-center">
              <p>Sudah punya akun? masuk sekarang <Link to="/"><u>di sini</u></Link></p>
          </div>
      </div>
    </div>
  )
}

export default Index
