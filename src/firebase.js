import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyATa5RGHLbkgLOwH_ang-zeUrEUU2edrek",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "safar-d6c76.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "safar-d6c76",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "safar-d6c76.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "603247093436",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:603247093436:web:57a491709ee289505812b9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-843FM4QDDL"
};

// Check if Firebase has valid keys configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "your_api_key_here" &&
  firebaseConfig.projectId
);

let app;
let auth;
let googleProvider;
let analytics;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });

    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (err) {
    console.warn("Firebase initialization error:", err);
  }
} else {
  console.info(
    "Firebase authentication keys are not set in .env file. Running in Demo / Offline Fallback Mode."
  );
}

export { app, auth, googleProvider, analytics };

/**
 * Sign up a user with Email and Password
 */
export async function signUpWithEmail(email, password, fullName) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase Auth is not configured. Please set your VITE_FIREBASE_* variables in .env");
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (fullName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName: fullName });
  }
  return userCredential.user;
}

/**
 * Sign in a user with Email and Password
 */
export async function signInWithEmail(email, password) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase Auth is not configured. Please set your VITE_FIREBASE_* variables in .env");
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle() {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    throw new Error("Firebase Auth is not configured. Please set your VITE_FIREBASE_* variables in .env");
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Send password reset email
 */
export async function resetPassword(email) {
  if (!isFirebaseConfigured || !auth) {
    throw new Error("Firebase Auth is not configured. Please set your VITE_FIREBASE_* variables in .env");
  }
  await sendPasswordResetEmail(auth, email);
}

/**
 * Sign out current user
 */
export async function logOut() {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
}

/**
 * Subscribe to Firebase Auth state changes
 */
export function subscribeToAuthChanges(callback) {
  if (!isFirebaseConfigured || !auth) {
    return () => {};
  }
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const formattedUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
        username: firebaseUser.displayName ? firebaseUser.displayName.split(" ")[0] : (firebaseUser.email?.split("@")[0] || "User"),
        photoURL: firebaseUser.photoURL || null,
        role: firebaseUser.email === "shreyash.admin@gmail.com" ? "Admin" : "Customer"
      };
      callback(formattedUser);
    } else {
      callback(null);
    }
  });
}
