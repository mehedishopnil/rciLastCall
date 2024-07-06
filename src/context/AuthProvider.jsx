import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [resortData, setResortData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResorts, setTotalResorts] = useState(0);

  const fetchResortData = async (page = 1, limit = 15) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/resorts?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Error fetching resort data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setResortData(data.resorts);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalResorts(data.totalResorts); // Assuming your backend response includes this
    } catch (error) {
      console.error('Error fetching resort data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResortData();
  }, []);

  const searchResorts = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/resorts/search?key=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`Error fetching search results: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching search results:', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    loading,
    resortData,
    totalPages,
    currentPage,
    totalResorts,
    fetchResortData,
    searchResorts,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
