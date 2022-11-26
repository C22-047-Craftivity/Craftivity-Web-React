import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
// import 'firebase/firestore'
import Swal from 'sweetalert2'

const firebaseConfig = {
  apiKey: 'AIzaSyDqpZ9A-ACeB9rXKiA59590yAYmEVyNsuo',
  authDomain: 'craftivity-batch3.firebaseapp.com',
  projectId: 'craftivity-batch3',
  databaseURL: 'https://craftivity-batch3-default-rtdb.firebaseio.com/',
  storageBucket: 'craftivity-batch3.appspot.com',
  messagingSenderId: '261963559720',
  appId: '1:261963559720:web:bfbb0e8d45f7eed67f561d'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app)

export function registerUser (nama, email, password) {
  return (
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        saveUserData(res.user.uid, nama, email)
      })
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Akun berhasil di buat',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: error.code,
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
  )
}

function saveUserData (id, nama, email, imageUrl = 'https://firebasestorage.googleapis.com/v0/b/craftivity-batch3.appspot.com/o/profilTemplate.jpg?alt=media&token=e199f8a1-f33f-4c85-8b51-e07641ef7194') {
  set(ref(database, 'users/' + id), {
    id,
    username: nama,
    email,
    profile_picture: imageUrl
  })
}

export function registerMitra (namaToko, email, password) {
  return (
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        saveMitraData(res.user.uid, namaToko, email)
      })
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Toko berhasil di buat',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: error.code,
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
  )
}

function saveMitraData (id, namaToko, email, imageUrl = 'https://firebasestorage.googleapis.com/v0/b/craftivity-batch3.appspot.com/o/storeTemplate.jpg?alt=media&token=23c3dce9-b841-405f-b166-1fa4a2101b77') {
  set(ref(database, 'Mitra/' + id), {
    id,
    nameStore: namaToko,
    email,
    profile_picture: imageUrl
  })
}
