import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PreLoader from "../components/Main/PreLoader/PreLoader";
import api from "../utils/apiClient";

// Define types for User and UserAuth
type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
  phone:string;
  isAdmin: boolean;
  role: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  logout: () => void;
};

// Initial values for state
const initialUser: User | null = null;
const initialIsLoggedIn: boolean = false;

// Create AuthContext with initial values
const AuthContext = createContext<UserAuth>({
  isLoggedIn: initialIsLoggedIn,
  user: initialUser,
  setUser: () => {},
  setIsLoggedIn: () => {},
  logout: () => {},
});

// Function to check authentication status
export const checkAuthStatus = async () => {
  try {
    const res = await api.get(`/auth-status`);
    return res.data;
  } catch (error) {
    console.error("Error checking auth status:", error);
    throw error;
  }
};

// AuthProvider component manages authentication state
export const AuthProvider: React.FC<{ authToken: string; children: React.ReactNode }> = ({ authToken, children }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialIsLoggedIn);
  const [loading, setLoading] = useState<boolean>(true); 
  const [, , removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const data = await checkAuthStatus();
        setUser(data.user);
        setIsLoggedIn(true); 
      } catch (error) {
        console.error("Error setting auth status:", error);
        handleLogout();
      } finally {
        setLoading(false); 
      }
    };

    if (authToken && !isLoggedIn) {
      fetchAuthStatus();
    } else {
      setLoading(false); 
    }
  }, [authToken, isLoggedIn]);

  // Logout function clears user state and cookies
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      setIsLoggedIn(false);
      removeCookie("access_token");
      window.localStorage.removeItem("UserID");
      api.defaults.headers.common["Authorization"] = null;
      window.location.href = "/Auth"; 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Provide context value to consumer components
  const contextValue = {
    user,
    isLoggedIn,
    setUser,
    setIsLoggedIn,
    logout: handleLogout,
  };

  if (loading) {
    return <PreLoader/>;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Hook to access AuthContext in functional components
export const useAuth = () => useContext(AuthContext);
