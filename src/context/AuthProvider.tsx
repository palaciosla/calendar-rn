import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../credentials";

export const AuthContext = createContext<AuthState | undefined>(undefined);

type Data = {
  email: string;
  password: string;
};

export type AuthState = {
  user: User;
  loginUser: (data: Data) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
  sendResetPasswordEmail: (email: string) => void;
  handleOpenSnackbar: (message: string) => void;
};

const AuthProvider = ({
  children,
  handleOpenSnackbar,
}: {
  children: JSX.Element;
  handleOpenSnackbar: (message: string) => void;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const loginUser = (data: Data) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, data.email, data.password).finally(
      () => setLoading(false)
    );
  };

  const logOut = () => {
    setLoading(false);
    return signOut(auth);
  };

  const sendResetPasswordEmail = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        handleOpenSnackbar("Password reset email sent!");
      })
      .catch((error) => {
        handleOpenSnackbar("Password reset email could not been sent!");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue: AuthState = {
    user: user!,
    loginUser,
    logOut,
    loading,
    sendResetPasswordEmail,
    handleOpenSnackbar,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
