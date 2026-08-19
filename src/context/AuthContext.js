import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
  const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const signOut = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
