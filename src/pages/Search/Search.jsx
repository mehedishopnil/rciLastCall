import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
  
    useEffect(() => {
      // Simulate fetching data (replace with actual data fetching logic)
      const fetchData = async () => {
        // Fetch search results using searchQuery from your data source
        // For demonstration purposes, setting empty array as initial searchResults
        // Replace this with actual data fetching logic
        const data = []; // Replace with actual data fetching logic
        setSearchResults(data);
        setLoading(false); // Set loading to false after data fetching
      };
      
      fetchData();
    }, [searchQuery]);
  
    return (
      <div>
        <h1>Search Results for: {searchQuery}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{/* Display search result item */}</li>
            ))}
          </ul>
        ) : (
          <p>No Result Found</p>
        )}
      </div>
    );
};

export default Search;
