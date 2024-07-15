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

  // Signup process (create user with email and password)
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      await newUser.updateProfile({ displayName: name });

      // Send user data to backend
      const backendResponse = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      if (!backendResponse.ok) {
        throw new Error('Failed to create user or update backend data');
      }

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(`http://localhost:5000/users?email=${email}`);
      if (!userDataResponse.ok) {
        throw new Error('Failed to fetch user data from backend');
      }

      const userData = await userDataResponse.json();
      setUser(userData); // Set user state with fetched userData

      console.log('User signed up and data fetched:', newUser, userData);
    } catch (error) {
      console.error('Error signing up:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login process (sign in with email and password)
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
        // Send user data to backend
        const backendResponse = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: user.displayName || '',  // Use displayName if available
            email: user.email,
            photoURL: user.photoURL 
          })
        });

        if (!backendResponse.ok) {
          throw new Error('Failed to update backend data with Google user');
        }

        // Fetch user data from backend based on email
        const userDataResponse = await fetch(`http://localhost:5000/users?email=${user.email}`);
        if (!userDataResponse.ok) {
          throw new Error('Failed to fetch user data from backend');
        }

        const userData = await userDataResponse.json();
        setUser(userData); // Set user state with fetched userData

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

  // Fetch resort data
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

  // Fetch all resorts
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

  // Effect to listen for auth state changes
  useEffect(() => {
    fetchResortData();
    fetchAllResorts();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch user data from backend based on email
        const fetchUserData = async () => {
          try {
            const userDataResponse = await fetch(`http://localhost:5000/users?email=${currentUser.email}`);
            if (!userDataResponse.ok) {
              throw new Error('Failed to fetch user data from backend');
            }
            const userData = await userDataResponse.json();
            setUser(userData); // Set user state with fetched userData
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          } finally {
            setLoading(false);
          }
        };

        fetchUserData();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    signup,
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
