import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBMi728saHWai3qEzpIKxqCgSFqOnmGWpk',
  authDomain: 'shorty-app-2fa86.firebaseapp.com',
  projectId: 'shorty-app-2fa86',
  storageBucket: 'shorty-app-2fa86.appspot.com',
  messagingSenderId: '443608176128',
  appId: '1:443608176128:web:7c5c96825ca0ecdc662ae5',
  measurementId: 'G-CTVW75V0KW',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export { db }
