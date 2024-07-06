import React, { useState, useEffect } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider'; // Import useAuth hook

const SearchBarMobile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
    const navigate = useNavigate();
    const { resortData, searchResorts, setFilteredData, setLoading } = useAuth(); // Use useAuth hook to access context

    // Load search history from localStorage on component mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(savedHistory);
    }, []);

    const saveSearchQuery = (query) => {
        const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)];
        updatedSearchHistory.splice(10); // Limit history to 10 items
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    const removeSearchHistoryItem = (index) => {
        const updatedSearchHistory = [...searchHistory];
        updatedSearchHistory.splice(index, 1);
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    const handleSearch = async () => {
        try {
            if (searchQuery.trim() === '') {
                if (setFilteredData) {
                    setFilteredData(resortData);
                }
                return;
            }
            setLoading(true); // Set loading to true before fetching data
            if (setFilteredData) {
                setFilteredData([]); // Clear existing search results before new search
            }
            const data = await searchResorts(searchQuery);
            if (setFilteredData) {
                setFilteredData(data || []); // Set filtered data based on search results
            }
            const ids = data.map(item => item._id);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}&ids=${encodeURIComponent(ids.join(','))}`);
            saveSearchQuery(searchQuery); // Save search query to history
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        } finally {
            setLoading(false); // Set loading to false after data fetching is complete or on error
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
                    placeholder="Search by resort Name, Location, ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchBarClick}
                    onKeyPress={handleKeyPress}
                    className="w-10/12 px-2 py-1 rounded-full bg-gray-200 mt-4"
                />
                <button
                    className="absolute right-[7%] top-4 text-xl text-white bg-yellow-500 px-3 py-[6px] rounded-r-full"
                    onClick={handleSearch} // Trigger search on button click
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
