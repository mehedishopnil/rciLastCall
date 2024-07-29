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
import Swal from 'sweetalert2';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [resortData, setResortData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allResortData, setAllResortData] = useState([]);
  const [allBookingsData, setAllBookingsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsData, setBookingsData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [paymentInfoData, setPaymentInfoData] = useState({});
  const [role, setRole] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();





 // Set User Role
 const setUserRole = async (email) => {
  try {
    const response = await fetch(`https://rci-last-call-server.vercel.app/users?email=${email}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data from backend');
    }
    const userData = await response.json();
    if (userData.isAdmin) {
      setRole('admin');
    } else {
      setRole('user');
    }
  } catch (error) {
    console.error('Error setting user role:', error.message);
  }
};


   // SignIn process (with email and password)
   const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = userCredential.user;

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(`https://rci-last-call-server.vercel.app/users?email=${email}`);
      if (!userDataResponse.ok) {
        throw new Error('Failed to fetch user data from backend');
      }

      const userData = await userDataResponse.json();
      setUser(userData[0]); // Set user state with fetched userData

      console.log('User signed in and data fetched:', signedInUser, userData);

      // Show success alert
      Swal.fire({
        title: "Successfully Signed In",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      return userCredential; // Return the userCredential
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error; // Throw the error to handle it in the SignIn component
    } finally {
      setLoading(false);
    }
  };


  
  
  // Function to create user and send data to backend
  const createUser = async (name, email, password, membership) => {
    setLoading(true);
    try {
      // Check if user already exists in the backend
      const userExistsResponse = await fetch(`https://rci-last-call-server.vercel.app/users?email=${email}`);
      
      if (userExistsResponse.status === 404) {
        console.log('User not found, proceeding with registration');
      } else if (!userExistsResponse.ok) {
        throw new Error('Failed to check if user exists');
      } else {
        const userExistsData = await userExistsResponse.json();
        if (userExistsData.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are already registered",
          });
          return; // Stop the registration process
        }
      }
  
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
  
      // Send user data to backend
      const backendResponse = await fetch('https://rci-last-call-server.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          membership
        })
      });
  
      if (!backendResponse.ok) {
        throw new Error('Failed to send user data to backend');
      }
  
      Swal.fire({
        title: "Successfully Registered",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
  
      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(`https://rci-last-call-server.vercel.app/users?email=${email}`);
      if (!userDataResponse.ok) {
        throw new Error('Failed to fetch user data from backend');
      }
      const userData = await userDataResponse.json();
      setUser(userData[0]); // Set user state with fetched userData
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  // Fetch all Users Data
  const fetchAllUsersData = async () => {
    setLoading(true);
    try {
      console.log('Fetching all users data...');
      const response = await fetch('https://rci-last-call-server.vercel.app/all-users');
      if (!response.ok) {
        throw new Error(`Error fetching all users data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAllUsersData(data);
    } catch (error) {
      console.error('Error fetching all users data:', error.message);
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
      setBookingsData([]); // Clear bookings data on sign out
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error.message);
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

    // Check if the user already exists in the backend
    const userExistsResponse = await fetch(`https://rci-last-call-server.vercel.app/users?email=${user.email}`);
    
    if (userExistsResponse.status === 404) {
      console.log('User not found, creating new user');

      // User does not exist, send user data to backend
      const backendResponse = await fetch('https://rci-last-call-server.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.displayName || '', // Use displayName if available
          email: user.email,
          photoURL: user.photoURL
        })
      });

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        console.error(`Failed to update backend data with Google user: ${backendResponse.status} ${backendResponse.statusText}`);
        console.error('Response text:', errorText);
        throw new Error('Failed to update backend data with Google user');
      }

      // Set user state with new user data
      const newUser = {
        name: user.displayName || '',
        email: user.email,
        photoURL: user.photoURL
      };
      setUser(newUser);

      console.log('New user signed up with Google:', user);
    } else if (userExistsResponse.ok) {
      const userExistsData = await userExistsResponse.json();

      if (userExistsData.length > 0) {
        // User exists, set user state with fetched userData
        setUser(userExistsData[0]);
        console.log('User logged in with Google:', user);
      } else {
        // In case the user is not found but the response is ok (not 404), it could be an unexpected scenario
        console.log('Unexpected response: User not found but status is not 404');
      }
    } else {
      const errorText = await userExistsResponse.text();
      console.error(`Failed to check if user exists: ${userExistsResponse.status} ${userExistsResponse.statusText}`);
      console.error('Response text:', errorText);
      throw new Error('Failed to check if user exists');
    }

    return result;
  } catch (error) {
    console.error('Error logging in with Google:', error.message);
    throw error;
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

  // Fetch bookings data based on user's email
  const fetchBookingsData = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`https://rci-last-call-server.vercel.app/bookings?email=${email}`);
      if (!response.ok) {
        throw new Error(`Error fetching bookings data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setBookingsData(data);
    } catch (error) {
      console.error('Error fetching bookings data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment information
const fetchPaymentInformation = async (email) => {
  setLoading(true);
  try {
    const response = await fetch(`https://rci-last-call-server.vercel.app/bookings?email=${email}`);
    if (!response.ok) {
      throw new Error(`Error fetching payment information: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      setPaymentInfoData(data[0]); // Assuming the first object in the array is the needed payment info
    } else {
      setPaymentInfoData({});
    }
    console.log('Payment information fetched:', data);
  } catch (error) {
    console.error('Error fetching payment information:', error.message);
  } finally {
    setLoading(false);
  }
};

// Fetch all Booking Data
const fetchAllBookingsData = async () => {
  setLoading(true);
  try {
    const response = await fetch('https://rci-last-call-server.vercel.app/all-bookings');
    if (!response.ok) {
      throw new Error(`Error fetching all resort data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    setAllBookingsData(data);
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
    fetchAllBookingsData();
    fetchAllUsersData();
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch user data from backend based on email
        const fetchUserData = async () => {
          try {
            const userDataResponse = await fetch(`https://rci-last-call-server.vercel.app/users?email=${currentUser.email}`);
            if (!userDataResponse.ok) {
              throw new Error('Failed to fetch user data from backend');
            }
            const userData = await userDataResponse.json();
            setUser(userData); // Set user state with fetched userData
  
            // Set user role based on isAdmin flag
            await setUserRole(currentUser.email);
  
            // Fetch bookings data for the current user
            await fetchBookingsData(currentUser.email);
            await fetchPaymentInformation(currentUser.email);
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          } finally {
            setLoading(false);
          }
        };
  
        fetchUserData();
      } else {
        setUser(null);
        setRole(null); // Clear role on sign out
        setBookingsData([]);
        setPaymentInfoData([]);
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  


 

  const authInfo = {
    loading,
    user,
    role,
    login,
    googleLogin,
    signOut,
    createUser,
    setLoading,
    resortData,
    filteredData,
    allResortData,
    totalPages,
    currentPage,
    fetchResortData,
    bookingsData,
    allBookingsData,
    allUsersData,
    paymentInfoData
  };
  

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
