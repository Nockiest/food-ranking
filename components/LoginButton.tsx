'use client'
import React, { useState,useEffect } from "react";
// import GoogleButton from "../partials/GoogleSignInButton";
import { signInWithGoogle, auth  } from "../firebase"; // Import User type
import { User } from 'firebase/auth';
import "./loginButton.css";
import GoogleButton from 'react-google-button'
import Refresher from "@/UniComponents/Refresher";
 

interface LoginButtonProps {}

const LoginButton: React.FC<LoginButtonProps> = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []); // this exist for refreshing purpouses

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      window.location.reload();
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="loginSection">
      {!user ? (
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <GoogleButton onClick={signInWithGoogle} />
        </div>
      ) : (
        <button className="bg-white text-black rounded-md px-4 py-2" onClick={handleSignOut}>
          Log Out
        </button>
      )}

      {user && (
        <p className="text-center bg-gray-200 rounded-md p-2 mt-2">
          Přihlášen jako: {user.displayName}
        </p>
      )}
    </div>
  );
};

export default LoginButton;
