"use client";
import React, { useState, useEffect } from "react";
// import GoogleButton from "../partials/GoogleSignInButton";
import { signInWithGoogle, auth } from "../firebase"; // Import User type
import { User } from "firebase/auth";
import "./loginButton.css";
import GoogleButton from "react-google-button";
import Refresher from "@/UniComponents/Refresher";
// import { USER } from "@/signals";
import Image from "next/image";
import { useAuth } from "@/app/context";
// import  circlePlaceholder  from '../svg/circle-dashed.svg'
interface LoginButtonProps {}

const LoginButton: React.FC<LoginButtonProps> = () => {
  // const [user, setUser] = useState<User | null>(auth.currentUser);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {userLoggedIn,currentUser, setCurrentUser} = useAuth()


  const [key, setKey] = useState(0)
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {

  //     USER.value = user
  //     setKey(key+1)
  //     // setUser(user);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []); // this exist for refreshing purpouses

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      window.location.reload();

      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div key={key} className="loginSection">
      {!userLoggedIn ? (
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <GoogleButton label="Přihlášení" onClick={signInWithGoogle} />
        </div>
      ) : (
        <div>
          {/* <Image
            src={USER.value?.photoURL || '' }
            alt="User Profile Icon"
            className="profile-icon"
            height={32}
            width={32}
          /> */}
          <button
            className="bg-white text-black rounded-md px-4 py-2"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        </div>
      )}

      {currentUser && (
        <p className="text-center bg-gray-200 rounded-md p-2 mt-2">
          Přihlášen jako: {currentUser.displayName}
        </p>
      )}
    </div>
  );
};

export default LoginButton;
