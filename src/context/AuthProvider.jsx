import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [resortData, setResortData] = useState([]);

    useEffect(() => {
        const fetchResortData = async () => {
          setLoading(true);
          try {
            const response = await fetch('http://localhost:5000/resorts');
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