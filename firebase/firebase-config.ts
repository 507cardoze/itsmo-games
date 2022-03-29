// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics, logEvent} from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getPerformance} from 'firebase/performance';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROYECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const getCurrentUser = () => auth.currentUser;

const setPersitanceLocal = async () =>
  await setPersistence(auth, browserLocalPersistence);

setPersitanceLocal();

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: 'popup',
});
facebookProvider.addScope('user_birthday');

if (typeof window !== 'undefined') {
  const analytics = getAnalytics(app);
  logEvent(analytics, 'Web App started...');
  const perf = getPerformance(app);
}

export {
  app,
  auth,
  db,
  storage,
  getCurrentUser,
  googleProvider,
  facebookProvider,
};
