'use client'
import   { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";

// Define the type for the authentication context value
interface AuthContextValue {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create the authentication context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Custom hook to access the authentication context
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Authentication provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isEmailUser, setIsEmailUser] = useState<boolean>(false);
  const [isGoogleUser, setIsGoogleUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser({ ...user });

      // Check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Check if the auth provider is Google or not
      // const isGoogle = user.providerData.some(
      //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      // );
      // setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value: AuthContextValue = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
