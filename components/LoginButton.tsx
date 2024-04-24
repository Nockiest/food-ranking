"use client";
import React, { useState, useEffect } from "react";
import { signInWithGoogle, auth } from "../firebase"; // Import User type
import { User } from "firebase/auth";
import "./loginButton.css";
import GoogleButton from "react-google-button";
import Refresher from "@/UniComponents/Refresher";
import Image from "next/image";
import { useAuth } from "@/app/authContext";
interface LoginButtonProps {}

const LoginButton: React.FC<LoginButtonProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userLoggedIn, currentUser } = useAuth();

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
    <div className="flex items-center">
      <div className="loginSection">
        {!userLoggedIn ? (
          <div className="flex flex-row">
            {currentUser && currentUser.photoURL ? (
              <div className="mr-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={currentUser?.photoURL ? currentUser.photoURL : undefined}
                  alt="Profile"
                />
              </div>
            ) : (
              <p>no pic</p>
            )}
            <div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <GoogleButton label="Přihlášení" onClick={signInWithGoogle} />
            </div>
          </div>
        ) : (
          <button
            className="bg-white text-black rounded-md px-4 py-2"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        )}

        {currentUser && (
          <p className="text-center bg-gray-200 rounded-md p-2 mt-2">
            Přihlášen jako: {currentUser.displayName}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
