import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { getDatabase, ref, set, child, get } from 'firebase/database'
import { getStorage, ref as refImg, uploadBytes, getDownloadURL } from 'firebase/storage'
import Swal from 'sweetalert2'
import moment from 'moment'

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
// Initialize Storage and get a reference to the service
const storage = getStorage()

export function registerUser (nama, email, password) {
  return (
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        saveUserData({ idUser: res.user.uid, nama, email })
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

export function saveUserData ({ idUser, nama, email, noHp = '', profilePicture = 'https://firebasestorage.googleapis.com/v0/b/craftivity-batch3.appspot.com/o/profilTemplate.jpg?alt=media&token=e199f8a1-f33f-4c85-8b51-e07641ef7194', alamat = '', keranjang = '', favorit = '' }) {
  set(ref(database, 'User/' + idUser), {
    idUser,
    nama,
    email,
    noHp,
    profilePicture,
    alamat,
    keranjang,
    favorit
  })
}

export function registerMitra (namaToko, email, password) {
  return (
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        saveMitraData({ idMitra: res.user.uid, namaToko, email })
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

export function saveMitraData ({ idMitra, namaToko, email, bergabung = moment().format('DD MMM YYYY'), kota = '', profilePicture = 'https://firebasestorage.googleapis.com/v0/b/craftivity-batch3.appspot.com/o/storeTemplate.jpg?alt=media&token=23c3dce9-b841-405f-b166-1fa4a2101b77' }) {
  set(ref(database, 'Mitra/' + idMitra), {
    idMitra,
    namaToko,
    email,
    kota,
    bergabung,
    profilePicture
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
        Swal.fire(error.code, error.message, 'error')
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

export function getAllMitra () {
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

export function getMitra (mitraId) {
  const dbref = ref(database)
  return (
    get(child(dbref, '/Mitra/' + mitraId))
      .then((snapshot) => {
        const data = snapshot.val()
        return { Mitra: data }
      })
      .catch((error) => {
        console.error(error)
      })
  )
}

export function getAllUser () {
  const dbref = ref(database)
  return (
    get(child(dbref, '/User'))
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
    get(child(dbref, '/User/' + userId))
      .then((snapshot) => {
        const data = snapshot.val()
        return { user: data }
      })
      .catch((error) => {
        console.error(error)
      }
      )
  )
}

export function uploadProfilMitra (file, data) {
  const imagePath = `profilMitra/${+new Date()}${file.name}`
  const storageRef = refImg(storage, imagePath)
  return (
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(refImg(storage, imagePath))
          .then((url) => {
            saveMitraData({ ...data, profilePicture: url })
          })
          .catch((error) => {
            Swal.fire(error.message)
          })
      })
      .then(() => {
        return { error: false }
      }).catch((error) => {
        Swal.fire(error.message)
        return { error: true }
      })
  )
}

export function saveProdukTemp ({ idBrg, idMitra, nama, gambarBrg, deskripsi, harga, rating, terjual, kategori, reviews = '' }) {
  set(ref(database, 'Produk/' + idBrg), {
    idBrg,
    idMitra,
    nama,
    gambarBrg,
    deskripsi,
    harga,
    rating,
    terjual,
    kategori,
    reviews
  })
}

export function saveProduk (file, data) {
  const imagePath = `produk/${+new Date()}`
  const storageRef = refImg(storage, imagePath)
  return (
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(refImg(storage, imagePath))
          .then((url) => {
            saveProdukTemp({ ...data, gambarBrg: url })
          })
          .catch((error) => {
            Swal.fire(error.message)
          })
      })
      .then(() => {
        return { error: false }
      })
      .catch((error) => {
        Swal.fire(error.message)
        return { error: true }
      })
  )
}

export function getAllProduk () {
  const dbref = ref(database)
  return (
    get(child(dbref, '/Produk'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = []
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key
            const childData = childSnapshot.val()
            data.push(childData)
          })
          return { error: false, AllProduk: data }
        } else {
          return { error: false, AllProduk: null }
        }
      })
      .catch((error) => {
        console.error(error)
        return { error: true, AllProduk: null }
      })
  )
}

export function getProduk (idBarang) {
  const dbref = ref(database)
  return (
    get(child(dbref, '/Produk/' + idBarang))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          return { error: false, produk: data }
        } else {
          return { error: false, produk: null }
        }
      })
      .catch((error) => {
        console.error(error)
        return { error: true, produk: null }
      })
  )
}
