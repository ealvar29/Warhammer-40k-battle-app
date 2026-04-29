import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
