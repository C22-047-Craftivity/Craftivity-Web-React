import React from 'react'
import useInput from '../../hooks/useInput'
import './resetPassword.css'

export default function ResetPasswordPage ({ lupaPassword, visible = false, hidden }) {
  const [emailReset, setEmailReset] = useInput('')

  function submitHandler (event) {
    event.preventDefault()
    lupaPassword(emailReset)
  }

  return (
    visible && <div className='resetPassword-page'>
      <form className='form' onSubmit={submitHandler}>
        <h1 className='title'>Reset Password Craftivity</h1>
        <input type='email' placeholder='Masukkan email' value={emailReset} onChange={setEmailReset} required />
        <button type='submit' className='btn-resetPassword'>Kirim Permintaan Reset Password</button>
        <button type='button' className='btn-close' onClick={hidden()}>tutup</button>
      </form>
    </div>
  )
}
