import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.confiq";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  updatePassword,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";

// import axios from "axios";

const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignInUser = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const gitHubSignInUser = () => {
    setLoading(true);
    return signInWithPopup(auth, gitProvider);
  };
  
  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  const logOutUser = () => {
    localStorage.removeItem("token");
    return signOut(auth);
  };

  const userPasswordUpdate = (user, newPassword) => {
    setLoading(true);
    return updatePassword(user, newPassword);
  };

  const userPasswordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

    //   if (currentUser?.email) {
    //     axios
    //       .post(`${import.meta.env.VITE_Server_API_KEY}/jwt`, {
    //         email: currentUser.email,
    //       })
    //       .then((res) => {
    //         const token = res.data.token;
    //         localStorage.setItem("token", token);
    //       });
    //   }
    //   if (!currentUser?.email) {
    //     localStorage.removeItem("token");
    //   }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authData = {
    loading,
    setLoading,
    createUser,
    signInUser,
    googleSignInUser,
    gitHubSignInUser,
    user,
    updateUserProfile,
    logOutUser,
    userPasswordUpdate,
    userPasswordReset
  };

  return <AuthContext value={authData}> {children} </AuthContext>;
};

export default AuthProvider;
