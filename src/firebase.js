import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const displayError = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      toast.error("Email already in use. Please try logging in.");
      break;
    case 'auth/invalid-email':
      toast.error("Invalid email format. Please enter a valid email.");
      break;
    case 'auth/operation-not-allowed':
      toast.error("Operation not allowed. Please contact support.");
      break;
    case 'auth/weak-password':
      toast.error("Weak password. Password should be at least 6 characters.");
      break;
    case 'auth/user-disabled':
      toast.error("User account has been disabled.");
      break;
    case 'auth/user-not-found':
      toast.error("No user found with this email.");
      break;
    case 'auth/wrong-password':
      toast.error("Incorrect password. Please try again.");
      break;
    case 'auth/network-request-failed':
      toast.error("Network error. Please check your connection.");
      break;
    default:
      toast.error("An unknown error occurred.");
  }
}

const signup = async (name, email, password) => {
  if (!name || !email || !password) {
    toast.error("Please fill out all fields.");
    return;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Account created successfully!");
  } catch (error) {
    console.log(error);
    displayError(error.code);
  }
}

const login = async (email, password) => {
  if (!email || !password) {
    toast.error("Please fill out all fields.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.log(error);
    displayError(error.code);
  }
}

const logout = () => {
  signOut(auth).then(() => {
    toast.success("Logged out successfully!");
  }).catch((error) => {
    console.log(error);
    toast.error("An error occurred while logging out.");
  });
}

export { auth, db, signup, logout, login };
