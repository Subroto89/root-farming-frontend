import React, { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.confiq";
import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   onAuthStateChanged,
   onIdTokenChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   updateProfile,
   signOut,
   updatePassword,
   sendPasswordResetEmail,
   GithubAuthProvider,
} from "firebase/auth";

// import axios from "axios";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);
   const [idToken, setIdToken] = useState(null); // Firebase ID token (JWT)

   // -- Helper: get fresh token (forces refresh if `forceRefresh` = true)
   const getToken = useCallback(async (forceRefresh = false) => {
      try {
         const currentUser = auth.currentUser;
         if (!currentUser) return null;
         const token = await currentUser.getIdToken(forceRefresh);
         // keep storage in sync
         setIdToken(token);
         try {
            localStorage.setItem("token", token);
         } catch (e) {
            console.error("Failed to set token in localStorage", e);
         }
         return token;
      } catch (err) {
         console.error("Failed to get ID token", err);
         return null;
      }
   }, []);

   // -- Auth actions (wrap Firebase auth functions)
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
      return signInWithPopup(auth, googleProvider);
   };

   const gitHubSignInUser = () => {
      setLoading(true);
      return signInWithPopup(auth, githubProvider);
   };

   const updateUserProfile = (updateData) => {
      setLoading(true);
      return updateProfile(auth.currentUser, updateData);
   };

   const logOutUser = async () => {
      setLoading(true);
      try {
         localStorage.removeItem("token");
      } catch (e) {
         console.error("Failed to remove token from localStorage", e);
      }
      await signOut(auth);
      setLoading(false);
   };

   const userPasswordUpdate = (user, newPassword) => {
      setLoading(true);
      return updatePassword(user, newPassword);
   };

   const userPasswordReset = (email) => {
      setLoading(true);
      return sendPasswordResetEmail(auth, email);
   };

   // -- onAuthStateChanged: track basic user state (sign in / sign out)
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
         setUser(currentUser);
         setLoading(false);

         // If there's a user, proactively fetch and store token once
         if (currentUser) {
            try {
               const token = await currentUser.getIdToken(false);
               setIdToken(token);
               try {
                  localStorage.setItem("token", token);
               } catch (e) {
                  console.error("Failed to set token in localStorage", e);
               }
            } catch (err) {
               console.error(
                  "Failed to fetch token on auth state change:",
                  err
               );
            }
         } else {
            setIdToken(null);
            try {
               localStorage.removeItem("token");
            } catch (e) {
               console.error("Failed to remove token from localStorage", e);
            }
         }
      });

      return () => unsubscribe();
   }, []);

   // -- onIdTokenChanged: keep token fresh when Firebase refreshes it
   useEffect(() => {
      const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
         if (currentUser) {
            try {
               const token = await currentUser.getIdToken(false);
               setIdToken(token);
               try {
                  localStorage.setItem("token", token);
               } catch (e) {
                  console.log("Failed to set token in localStorage", e);
               }
            } catch (err) {
               console.error("onIdTokenChanged getIdToken failed:", err);
            }
         } else {
            setIdToken(null);
            try {
               localStorage.removeItem("token");
            } catch (e) {
               console.error("Failed to remove token from localStorage", e);
            }
         }
      });

      return () => unsubscribe();
   }, []);

   const authData = {
      loading,
      setLoading,
      user,
      idToken, // available if you want to read directly
      getToken, // async function to get a fresh token (use before socket connect)
      createUser,
      signInUser,
      googleSignInUser,
      gitHubSignInUser,
      updateUserProfile,
      logOutUser,
      userPasswordUpdate,
      userPasswordReset,
   };

   return <AuthContext value={authData}> {children} </AuthContext>;
};

export default AuthProvider;
