import { auth } from "../services/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { redirect } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

export const loginWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("auth account succes");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signupWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("auth account succes");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    // Additional user info (if needed)
    // const additionalUserInfo = result.additionalUserInfo;

    // Lanjutkan dengan langkah-langkah setelah berhasil login

    //simpan akses token ke local storage
    localStorage.setItem("AccesToken", token);
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData ? error.customData.email : null;
    const credential = GoogleAuthProvider.credentialFromError(error);

    // Handle specific errors or log general error information
    console.error(`Google Login Error [${errorCode}]: ${errorMessage}`);

    // If needed, handle specific error codes
    if (errorCode === "auth/account-exists-with-different-credential") {
      // Handle the case where the same email already exists with a different provider
      console.error(
        "An account with the same email already exists with a different provider."
      );
    }
  }
};
