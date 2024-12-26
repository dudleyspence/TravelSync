import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUser } from "../axios/index"; // Ensure you import your backend API function

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log(firebaseUser);

          const userData = await getUser(firebaseUser.uid);

          if (userData) {
            setUserLoggedIn(userData);
          } else {
            console.log("User data not found in database.");
            setUserLoggedIn(null);
          }
        } else {
          setUserLoggedIn(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserLoggedIn(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function signOutUser() {
    try {
      await signOut(auth);
      setUserLoggedIn(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const value = {
    userLoggedIn,
    setUserLoggedIn,
    signOutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
