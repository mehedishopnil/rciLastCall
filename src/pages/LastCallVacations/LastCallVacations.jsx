import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResortCard from '../../components/resortCard/resortCard';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';

const LastCallVacations = () => {
    const { resortData, searchResorts, loading, totalPages, currentPage, fetchResortData, totalResorts } = useContext(AuthContext);
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
    const [pageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredResortsCount, setFilteredResortsCount] = useState(0); // State for filtered resorts count

    useEffect(() => {
        setFilteredData(resortData);
        setFilteredResortsCount(resortData.length); // Initialize count with total resorts
    }, [resortData]);

    useEffect(() => {
        setLocalCurrentPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setLocalCurrentPage(pageNumber);
        fetchResortData(pageNumber);
        if (pageNumber > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        } else if (pageNumber <= minPageNumberLimit + 1) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextbtn = () => {
        if (localCurrentPage < totalPages) {
            handlePageChange(localCurrentPage + 1);
        }
    };

    const handlePrevbtn = () => {
        if (localCurrentPage > 1) {
            handlePageChange(localCurrentPage - 1);
        }
    };

    const handleSearch = async () => {
        try {
            if (searchTerm.trim() === '') {
                setFilteredData(resortData);
                setFilteredResortsCount(resortData.length); // Reset to total resorts count
                return;
            }
            const data = await searchResorts(searchTerm);
            setFilteredData(data || []);
            setFilteredResortsCount(data.length); // Set count based on filtered data length
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    };

    const renderPageNumbers = Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        if (pageNumber <= maxPageNumberLimit && pageNumber >= minPageNumberLimit) {
            return (
                <li key={pageNumber}>
                    <button
                        className={`px-3 py-1 rounded-md ${localCurrentPage === pageNumber ? 'bg-blue-500 text-white' : 'border text-gray-200'}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                </li>
            );
        }
        return null;
    });

    return (
        <div className="container mx-auto p-4 space-y-5 pb-20">
            <div className='pt-2'>
                <h1 className='text-xl'>{searchTerm.trim() !== '' ? filteredResortsCount : totalResorts} Resorts</h1>
            </div>

            <div className="divider"></div>

            {/* Filter option */}
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Filter by location"
                    className="w-full px-3 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-3 py-2 bg-[#037092] text-white rounded-md"
                >
                    Filter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    <Loading />
                ) : (
                    filteredData.map((resort) => (
                        <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
                            <ResortCard resort={resort} />
                        </Link>
                    ))
                )}
            </div>

            <div className="flex flex-col items-center mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                    onClick={handlePrevbtn}
                    className={`px-3 py-1 rounded-md ${localCurrentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                    disabled={localCurrentPage === 1}
                >
                    Prev
                </button>
                <ul className="flex space-x-2">
                    {renderPageNumbers}
                </ul>
                <button
                    onClick={handleNextbtn}
                    className={`px-3 py-1 rounded-md ${localCurrentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                    disabled={localCurrentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LastCallVacations;
