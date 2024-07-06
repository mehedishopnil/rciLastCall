import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import ResortCard from '../../components/resortCard/resortCard';
import Loading from '../../components/Loading';

const Search = () => {
  const { searchResorts } = useContext(AuthContext);
  const location = useLocation();
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // Initialize loading state

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';
    setSearchTerm(searchQuery);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() !== '') {
        setLoading(false); // Set loading to true before fetching data
        try {
          const data = await searchResorts(searchTerm);
          setSearchData(data);
        } catch (error) {
          console.error('Error fetching search results:', error.message);
          setSearchData([]);
        } finally {
          setLoading(false); // Set loading to false after data fetching is complete or on error
        }
      } else {
        setSearchData([]); // Clear search results when search term is empty
      }
    };

    fetchData();
  }, [searchTerm, searchResorts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchData([]); // Clear existing search results on new search
    // Optionally you can set searchTerm here, but it's already updated in useEffect
  };

  return (
    <div className="p-4">
     

      {loading ? (
        <Loading /> // Show loading spinner when loading
      ) : (
        <div>
           <h1 className="text-center text-2xl font-semibold my-2">
        Search Results Found: {searchData.length}
      </h1>
          {searchData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchData.map((resort) => (
                <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
                  <ResortCard resort={resort} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center mt-4">No Results Found</p> // Show "No Results Found" when not loading and no data
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
