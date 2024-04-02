import React, { useState } from "react";
import GoogleButton from "../partials/GoogleSignInButton";
import { signInWithGoogle, auth  } from "../firebase"; // Import User type
import { User } from 'firebase/auth';
import "./loginButton.css";

interface LoginButtonProps {
  // user: User | null; // Use User type here
  // setUser: React.Dispatch<React.SetStateAction<User | null>>; // Update setUser type
}

const LoginButton: React.FC<LoginButtonProps> = ( ) => {
  const user = auth.currentUser;
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      console.log(result);

      // if (result.user) {
      //   const { displayName, photoURL, email } = result.user;
      //   // setUser({ displayName, photoURL, email }); // Set User type correctly
      // }
    } catch (error) {
      setErrorMessage(`Error signing in with Google. ${error}`);
    }
  };

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "fit-content",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    marginTop: "10px",
    transition: "background-color 0.3s",
  };

  return (
    <div className="loginSection">
      {!user ? (
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <GoogleButton onClick={handleSignInWithGoogle} />
        </div>
      ) : (
        <button className="log-out-btn btn" onClick={handleSignOut} style={logoutButtonStyles}>
          Log Out
        </button>
      )}

      {user && (
        <p className="logged-in-text" style={logginTextStyles}>
          Logged in as: {user.displayName}
        </p>
      )}
    </div>
  );
};

export default LoginButton;
