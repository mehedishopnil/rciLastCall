import { useState, useEffect, useContext } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const SearchBarMobile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const navigate = useNavigate();

  const { resortData } = useContext(AuthContext);

  useEffect(() => {
    const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedSearchHistory);
  }, []);

  const saveSearchQuery = (query) => {
    const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)];
    updatedSearchHistory.splice(10);
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
  };

  const removeSearchHistoryItem = (index) => {
    const updatedSearchHistory = [...searchHistory];
    updatedSearchHistory.splice(index, 1);
    setSearchHistory(updatedSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory)); 01626409976
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      saveSearchQuery(searchQuery);
      // Filter resortData based on searchQuery
      const filteredResortData = resortData.filter(item => item.place_name.toLowerCase().includes(searchQuery.toLowerCase()));
      // Extract _id values from filtered resortData
      const ids = filteredResortData.map(item => item._id);
      // Navigate to Search page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&ids=${encodeURIComponent(ids.join(','))}`);
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
      {showHistoryDropdown && searchHistory.length > 0 && (
        <div className="search-history-dropdown bg-white border mb-2 p-4">
          <h1 className="text-center mb-2">Your search History</h1>
          <ul>
            {searchHistory.map((query, index) => (
              <li key={index} className="flex justify-between items-center">
                <span onClick={() => handleSearchHistorySelect(query)}>{query}</span>
                <IoClose onClick={() => removeSearchHistoryItem(index)} className="cursor-pointer" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarMobile;
