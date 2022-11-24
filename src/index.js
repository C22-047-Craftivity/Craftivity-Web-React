import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import firebase from './confiq/firebase/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

console.log(firebase)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
