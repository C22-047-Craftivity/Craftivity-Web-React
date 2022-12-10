import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import './loginMitra.css'
import { login, resetPassword } from '../../confiq/firebase'
import loginVectorMitra from '../../assets/LoginVektorMitra.png'
import Loading from '../../components/Loading'
import ResetPasswordPage from '../../components/ResetPassword'

function Index ({ onLoginMitra }) {
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [resetPass, setResetPass] = useState(false)

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

  async function loginMitra (event) {
    event.preventDefault()
    setLoading(true)
    const { error, data } = await login(email, password)
    if (!error) {
      onLoginMitra(data)
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
          <img src={loginVectorMitra} alt='' height={450} width={450} className='mt-4' />
          <h3>Selamat Datang</h3>
          <p>Nikmati kemudahan berjualan dan saling terhubung dengan para pengrajin di Craftivity</p>
      </div>
      <div className='rightSection'>
          <p className='intro'>Selamat Datang</p>
          <form onSubmit={loginMitra} className='input-login'>
            <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
            <input minLength={6} type="password" placeholder='Masukkan Password...' id="password" value={password} onChange={setPassword} required />
            {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPass'/> : <FiEye onClick={() => showPass()} className='iconPass'/>}
            <p className='lupaPass'>Lupa password? <button type='button' onClick={() => setResetPass(true)}>Klik disini</button></p>
            <button type='submit' className='btn-masuk'>MASUK</button>
          </form>
          <div className="text-center">
              <p>Belum punya akun? daftar sekarang <Link to="/registerMitra"><u>di sini</u></Link></p>
          </div>
      </div>
    </div>
  )
}

export default Index
