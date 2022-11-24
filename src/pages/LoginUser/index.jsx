import { useState } from 'react'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import './style.css'
import loginVectorUser from '../../assets/LoginVektorUser.png'

function Index () {
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [showPassword, setShowPassword] = useState(false)

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

  return (
    <div className='login'>
        <div className='leftSection'>
            <img src={loginVectorUser} alt='' height={500} width={450} />
            <h3>Selamat Datang</h3>
            <p>Agar anda bisa menggunakan aplikasi Craftivity, maka anda harus login terlebih dahulu</p>
        </div>
        <div className='rightSection'>
            <p className='intro'>Selamat Datang</p>
            <div className='input-login'>
                <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} />
                <input type="password" placeholder='Masukkan Password...' id="password" value={password} onChange={setPassword} />
                {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPass'/> : <FiEye onClick={() => showPass()} className='iconPass'/>}
            </div>
            <button className='btn-masuk'>MASUK</button>
            <div className="text-center">
                <p>Belum punya akun? daftar sekarang <Link to="/registerUser"><u>di sini</u></Link></p>
                <p>Mau jadi mitra? gabung sekarang <Link to="/loginMitra"><u>di sini</u></Link></p>
            </div>
        </div>
    </div>
  )
}

export default Index
