import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [resortData, setResortData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allResortData, setAllResortData] = useState([]); // Add allResortData state
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);


  const fetchResortData = async (page = 1, limit = 15) => {
    setLoading(true);
    try {
        const response = await fetch(`https://rci-last-call-server.vercel.app/resorts?page=${page}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Error fetching resort data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setResortData(data.resorts);
        setFilteredData(data.resorts); // Assuming filteredData setup
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
    } catch (error) {
        console.error('Error fetching resort data:', error.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchResortData(); // Initial fetch on component mount
}, []);



  const fetchAllResorts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://rci-last-call-server.vercel.app/all-resorts');
      if (!response.ok) {
        throw new Error(`Error fetching all resort data: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAllResortData(data); // Update allResortData with fetched data
    } catch (error) {
      console.error('Error fetching all resort data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResortData();
    fetchAllResorts(); // Fetch all resorts data on component mount
  }, []); // Empty dependency array ensures it runs once on mount

  const authInfo = {
    loading,
    setLoading,
    resortData,
    filteredData,
    allResortData,
    totalPages,
    currentPage,
    fetchResortData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
