import { createContext, useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [resortData, setResortData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

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

  // Function to handle search
  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() !== '') {
      // Filter resortData based on searchQuery
      const results = resortData.filter(resort => resort.place_name.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(results);
      // Redirect to search page
      history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const authInfo = {
    loading,
    resortData,
    searchResults,
    handleSearch,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
