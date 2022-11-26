import React from 'react'
import './style.css'

export default function Loading ({ visible = true }) {
  return (
    visible && <div className='loading'>
      <div className="ring">Loading<span className="dot"></span></div>
    </div>
  )
}
