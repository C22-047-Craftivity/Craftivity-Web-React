import { useState } from 'react'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import './style.css'
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

  function Register () {
    if (namaUser !== '' && email !== '' && password !== '' && password === passwordRepeat) {
      setLoading(true)
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: namaUser + ', ' + email + ', ' + password + ', ' + passwordRepeat,
          showConfirmButton: false,
          timer: 1500
        })
        setLoading(false)
      }, 3000)
    } else {
      Swal.fire('Gagal', 'Pastikan semua data telah terisi dengan benar', 'error')
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
          <div className='input-register'>
              <input type="text" placeholder='Masukkan Namamu...' id="namaUser" value={namaUser} onChange={setNamaUser} required />
              <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
              <div className='input-passwordRegister'>
                <div>
                  <input type="password" placeholder='Masukkan Password...' id="password" value={password} onChange={setPassword} required />
                  {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPassUser'/> : <FiEye onClick={() => showPass()} className='iconPassUser'/>}
                </div>
                <div>
                  <input type="password" placeholder='Ulangi Password...' id="passwordRepeat" value={passwordRepeat} onChange={setPasswordRepeat} required />
                  {!showPasswordRepeat ? <FiEyeOff onClick={ () => showPassRepeat() } className='iconPassRepeat'/> : <FiEye onClick={() => showPassRepeat()} className='iconPassRepeat'/>}
                </div>
              </div>
          </div>
          <button type='submit' className='btn-daftar' onClick={ () => Register() }>DAFTAR</button>
          <div className="text-center">
              <p>Sudah punya akun? masuk sekarang <Link to="/"><u>di sini</u></Link></p>
          </div>
      </div>
    </div>
  )
}

export default Index
