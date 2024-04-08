'use client'
import   { createContext, useContext, useState, useEffect } from "react";
import { auth, cacheVoter, db } from "../firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { Voter } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";

// Define the type for the authentication context value
interface AuthContextValue {
  userLoggedIn: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  votingAccount: Voter|null
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
  const [votingAccount, setVotingAccount] = useState<Voter|null>(null)
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setCurrentUser({ ...user });

        // Check if there's an entry in the Firebase database with the user's email
        const email = user.email;
        if (email) {
          await cacheVoter(user)
          const userDoc = await getDoc(doc(db, "users", email));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setVotingAccount(userData as Voter); // Assuming userData has the structure of Voter type
          } else {
            setVotingAccount(null);
          }
        } else {
          setVotingAccount(null);
        }

        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setVotingAccount(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value: AuthContextValue = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
    votingAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, initializeUser);
  //   return unsubscribe;
  // }, []);

  // async function initializeUser(user: User | null) {
  //   if (user) {
  //     setCurrentUser({ ...user });

  //     // Check if there's an entry in the Firebase database with the user's email
  //     const userDoc  = await getDoc(doc(db, "users", user.email)); // db.collection("users").doc(user.email);
  //     // const userDocSnapshot = await userDocRef.get();
  //     if (userDoc.exists()) {
  //       const userData = userDoc.data();
  //       setVotingAccount(userData as Voter); // Assuming userData has the structure of Voter type
  //     } else {
  //       setVotingAccount(null);
  //     }

  //     setUserLoggedIn(true);
  //   } else {
  //     setCurrentUser(null);
  //     setUserLoggedIn(false);
  //     setVotingAccount(null);
  //   }

  //   setLoading(false);

    // if (user) {
    //   setCurrentUser({ ...user });

    //   // Check if provider is email and password login
    //   const isEmail = user.providerData.some(
    //     (provider) => provider.providerId === "password"
    //   );
    //   // setIsEmailUser(isEmail);

    //   // Check if the auth provider is Google or not
    //   // const isGoogle = user.providerData.some(
    //   //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    //   // );
    //   // setIsGoogleUser(isGoogle);

    //   setUserLoggedIn(true);
    // } else {
    //   setCurrentUser(null);
    //   setUserLoggedIn(false);
    // }

    // setLoading(false);
  // }