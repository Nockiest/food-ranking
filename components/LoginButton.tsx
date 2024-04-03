import React, { useState,useEffect } from "react";
// import GoogleButton from "../partials/GoogleSignInButton";
import { signInWithGoogle, auth  } from "../firebase"; // Import User type
import { User } from 'firebase/auth';
import "./loginButton.css";
import GoogleButton from 'react-google-button'
import Refresher from "@/UniComponents/Refresher";
interface LoginButtonProps {
  // user: User | null; // Use User type here
  // setUser: React.Dispatch<React.SetStateAction<User | null>>; // Update setUser type
}

const LoginButton: React.FC<LoginButtonProps> = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser); // Initialize user state with current user
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update user state when authentication state changes
    });
    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from auth state changes
    };
  }, []); // Run effect only once on component mount

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      window.location.reload();
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const logoutButtonStyles: React.CSSProperties = {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '5px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  };

  const logginTextStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    width: 'fit-content',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  };

  return (
    <div className="loginSection">
      {!user ? (
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <GoogleButton onClick={signInWithGoogle} />
        </div>
      ) : (
        <button className="log-out-btn btn" onClick={handleSignOut} style={logoutButtonStyles}>
          Log Out
        </button>
      )}

      {user && (
        <p className="logged-in-text" style={logginTextStyles}>
          Přihlášen jako: {user.displayName}
        </p>
      )}

    </div>
  );
};


export default LoginButton;
// <Refresher refreshers={[auth.currentUser, user]} />