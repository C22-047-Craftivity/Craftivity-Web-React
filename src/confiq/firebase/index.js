import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { getDatabase, ref, set, child, get } from 'firebase/database'
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
        return { error: false }
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
        return { error: true }
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
        return { error: false }
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
        return { error: true }
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

export function login (email, password) {
  return (
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = auth.currentUser
        return { error: false, data: user }
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
        return { error: true, data: null }
      })
  )
}

export function resetPassword (email) {
  return (
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire('Berhasil', 'Silahkan cek email Anda!', 'success')
      })
      .catch((error) => {
        console.log(error)
      })
  )
}

export function logout () {
  return (
    signOut(auth)
      .then(() => {
        return { error: false }
      })
      .catch(() => {
        return { error: true }
      })
  )
}

export function getMitra () {
  const dbref = ref(database)
  return (
    get(child(dbref, '/Mitra'))
      .then((snapshot) => {
        const data = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()
          data.push(childData)
        })
        return { DataMitra: data }
      })
      .catch((error) => {
        console.error(error)
      })
  )
}

export function getUser () {
  const dbref = ref(database)
  return (
    get(child(dbref, '/users'))
      .then((snapshot) => {
        const data = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()
          data.push(childData)
        })
        return { DataUser: data }
      })
      .catch((error) => {
        console.error(error)
      })
  )
}

export function getUserById (userId) {
  const dbref = ref(database)
  return (
    get(child(dbref, '/users/' + userId))
      .then((snapshot) => {
        const data = snapshot.val()
        return { user: data }
      })
      .catch((error) => {
        console.error(error)
      })
  )
}
