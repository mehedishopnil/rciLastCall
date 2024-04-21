import { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SearchBarMobile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const navigate = useNavigate();

  // Load search history from local storage on component mount
  useEffect(() => {
    const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedSearchHistory);
  }, []);

  // Save search query to local storage
  const saveSearchQuery = (query) => {
    const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)];
    updatedSearchHistory.splice(10); // Limit search history to the last 10 queries
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      saveSearchQuery(searchQuery);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchBarClick = () => {
    setShowHistoryDropdown(true);
  };

  const handleSearchHistorySelect = (query) => {
    setSearchQuery(query);
    setShowHistoryDropdown(false);
    handleSearch();
  };

  return (
    <div>
      {/* Search bar visible only on mobile screens */}
      <div className="block relative container flex justify-center pb-5 mx-auto lg:hidden">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleSearchBarClick}
          onKeyPress={handleKeyPress}
          className="w-10/12 px-2 py-1 rounded-full bg-gray-200 mt-4"
        />
        <button
          className="absolute right-[7%] top-4 text-xl text-white bg-yellow-500 px-3 py-[6px] rounded-r-full"
          onClick={handleSearch}
        >
          <IoSearch />
        </button>
      </div>
      {/* Display search history dropdown */}
      {showHistoryDropdown && searchHistory.length > 0 && (
        <div className="search-history-dropdown bg-white border mb-2">
          <ul>
            <h1 className="text-center">Your serach History</h1>
            {searchHistory.map((query, index) => (
              <li key={index} onClick={() => handleSearchHistorySelect(query)}>
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarMobile;
