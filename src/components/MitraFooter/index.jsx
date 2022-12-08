import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'
import './mitraFooter.css'

export default function Index () {
  return (
    <div className='footerMitra'>
        <p className='title'>Dikembangkan oleh <b>Tim Creativity</b>, Indonesia 2022</p>
        <div className='sosialMedia'>
            <FaInstagram/>
            <FaFacebookF/>
            <FaYoutube/>
            <FaTwitter/>
        </div>
    </div>
  )
}
