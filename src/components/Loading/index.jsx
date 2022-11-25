import React from 'react'
import './style.css'

export default function Loading ({ visible = true }) {
  return (
    visible && <div className='loading'>
      <div class="ring">Loading<span class="dot"></span></div>
    </div>
  )
}
