import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import './style.css'
import { login, resetPassword } from '../../confiq/firebase'
import loginVectorUser from '../../assets/LoginVektorUser.png'
import Loading from '../../components/Loading'
import ResetPasswordPage from '../../components/ResetPassword'

function Index ({ onloginUser }) {
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetPass, setResetPass] = useState(false)
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

  async function loginUser (event) {
    event.preventDefault()
    setLoading(true)
    const { error, data } = await login(email, password)
    if (!error) {
      onloginUser(data)
      navigate('/')
    }
    setLoading(false)
  }

  async function lupaPassword (email) {
    setLoading(true)
    await resetPassword(email)
    setLoading(false)
    setResetPass(false)
  }

  function hiddenResetPage () {
    setResetPass(false)
  }

  return (
    <div className='login'>
      <Loading visible={loading} />
      <ResetPasswordPage lupaPassword={lupaPassword} visible={resetPass} hidden={() => hiddenResetPage} />
      <div className='leftSection'>
          <img src={loginVectorUser} alt='' height={500} width={450} />
          <h3>Selamat Datang</h3>
          <p>Agar anda bisa menggunakan aplikasi Craftivity, maka anda harus login terlebih dahulu</p>
      </div>
      <div className='rightSection'>
          <p className='intro'>Selamat Datang</p>
          <form onSubmit={loginUser} className='input-login'>
            <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
            <input type="password" minLength={6} placeholder='Masukkan Password...' id="password" value={password} onChange={setPassword} required />
            {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPass'/> : <FiEye onClick={() => showPass()} className='iconPass'/>}
            <p className='lupaPass'>Lupa password? <button onClick={() => setResetPass(true)}>Klik disini</button></p>
            <button type='submit' className='btn-masuk'>MASUK</button>
          </form>
          <div className="text-center">
              <p>Belum punya akun? daftar sekarang <Link to="/registerUser"><u>di sini</u></Link></p>
              <p>Mau jadi mitra? gabung sekarang <Link to="/loginMitra"><u>di sini</u></Link></p>
          </div>
      </div>
    </div>
  )
}

export default Index
