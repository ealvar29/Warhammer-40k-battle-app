import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBaUSG4gj8F8j9CeVsccJC0msGwtWIINFg',
  authDomain: 'mathhammer-d810e.firebaseapp.com',
  projectId: 'mathhammer-d810e',
  storageBucket: 'mathhammer-d810e.firebasestorage.app',
  messagingSenderId: '522154493610',
  appId: '1:522154493610:web:9414fdd29b986704d2b2d3',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function saveCrusade(syncCode, data) {
  const ref = doc(db, 'crusades', syncCode)
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

export async function loadCrusade(syncCode) {
  const ref = doc(db, 'crusades', syncCode)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}
