import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [resortData, setResortData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allResortData, setAllResortData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Create User
  const createUser = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      await newUser.updateProfile({ displayName: name });
      setUser({ name, email });

      // Send user data to backend
      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      console.log('User created:', newUser);
    } catch (error) {
      console.error('Error creating user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login process
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        name: userCredential.user.displayName,
        email: userCredential.user.email
      });
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
const googleLogin = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists
    if (user) {
      // Update local state
      setUser({
        name: user.displayName || '',  // Use displayName if available
        email: user.email
      });

      // Send user data to backend
      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: user.displayName || '',  // Use displayName if available
          email: user.email 
        })
      });

      console.log('User logged in with Google:', user);
      return result;
    }
  } catch (error) {
    console.error('Error logging in with Google:', error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};


  // Sign out process
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchResortData = async (page = 1, limit = 15) => {
    setLoading(true);
    try {
      const response = await fetch(`https://rci-last-call-server.vercel.app/resorts?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Error fetching resort data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setResortData(data.resorts);
      setFilteredData(data.resorts);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Error fetching resort data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllResorts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://rci-last-call-server.vercel.app/all-resorts');
      if (!response.ok) {
        throw new Error(`Error fetching all resort data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAllResortData(data);
    } catch (error) {
      console.error('Error fetching all resort data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResortData();
    fetchAllResorts();
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    createUser,
    login,
    googleLogin,
    signOut,
    setLoading,
    resortData,
    filteredData,
    allResortData,
    totalPages,
    currentPage,
    fetchResortData,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
