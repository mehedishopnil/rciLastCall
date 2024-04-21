import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [resortData, setResortData] = useState([]);
 

  useEffect(() => {
    const fetchResortData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://rci-last-call-server.vercel.app/resorts');
        if (!response.ok) {
          throw new Error(`Error fetching hotelData.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setResortData(data);
      } catch (error) {
        console.error('Error fetching hotelData.json:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResortData();
  }, []);



  const authInfo = {
    loading,
    resortData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
