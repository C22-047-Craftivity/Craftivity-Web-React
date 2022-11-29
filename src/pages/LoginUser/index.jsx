import { useState } from 'react'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import './style.css'
import Swal from 'sweetalert2'
import loginVectorUser from '../../assets/LoginVektorUser.png'
import Loading from '../../components/Loading'

function Index () {
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [showPassword, setShowPassword] = useState(false)
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

  function login () {
    if (email !== '' && password !== '') {
      setLoading(true)
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'email: ' + email + ' dan pass: ' + password + ' disimpan',
          showConfirmButton: false,
          timer: 1500
        })
        setLoading(false)
      }, 3000)
    } else {
      Swal.fire('Gagal', 'Pastikan semua data telah terisi', 'error')
    }
  }

  return (
    <div className='login'>
      <Loading visible={loading} />
      <div className='leftSection'>
          <img src={loginVectorUser} alt='' height={500} width={450} />
          <h3>Selamat Datang</h3>
          <p>Agar anda bisa menggunakan aplikasi Craftivity, maka anda harus login terlebih dahulu</p>
      </div>
      <div className='rightSection'>
          <p className='intro'>Selamat Datang</p>
          <div className='input-login'>
              <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
              <input type="password" placeholder='Masukkan Password...' id="password" value={password} onChange={setPassword} required />
              {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPass'/> : <FiEye onClick={() => showPass()} className='iconPass'/>}
          </div>
          <button className='btn-masuk' onClick={ () => login() }>MASUK</button>
          <div className="text-center">
              <p>Belum punya akun? daftar sekarang <Link to="/registerUser"><u>di sini</u></Link></p>
              <p>Mau jadi mitra? gabung sekarang <Link to="/loginMitra"><u>di sini</u></Link></p>
          </div>
      </div>
    </div>
  )
}

export default Index
