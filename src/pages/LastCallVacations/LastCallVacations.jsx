import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResortCard from '../../components/resortCard/resortCard';
import { AuthContext } from '../../context/AuthProvider';

const LastCallVacations = () => {
    const { resortData, fetchResortData } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const resortsPerPage = 15;

    useEffect(() => {
        const loadData = async () => {
            await fetchResortData();
            setFilteredData(resortData);
        };

        loadData();
    }, [fetchResortData, resortData]);

    const indexOfLastResort = currentPage * resortsPerPage;
    const indexOfFirstResort = indexOfLastResort - resortsPerPage;
    const currentResorts = filteredData.slice(indexOfFirstResort, indexOfLastResort);

    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / resortsPerPage); i++) {
        pages.push(i);
    }

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        if (pageNumber > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        } else if (pageNumber <= minPageNumberLimit + 1) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextbtn = () => {
        paginate(currentPage + 1);
    };

    const handlePrevbtn = () => {
        paginate(currentPage - 1);
    };

    const handleSearch = () => {
        const filtered = resortData.filter(resort =>
            resort.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
        setMaxPageNumberLimit(10);
        setMinPageNumberLimit(0);
    };

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number}>
                    <button
                        className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'border text-gray-200'}`}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </button>
                </li>
            );
        } else {
            return null;
        }
    });

    return (
        <div className="container mx-auto p-4 space-y-5 pb-20">
            <div className='pt-2'>
                <h1 className='text-xl'>{filteredData.length} Resorts</h1>
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
                {currentResorts.map((resort) => (
                    <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
                        <ResortCard resort={resort} />
                    </Link>
                ))}
            </div>

            <div className="flex flex-col items-center mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={handlePrevbtn}
                    disabled={currentPage === 1}
                >
                    &lt; Prev
                </button>
                <ul className="flex flex-wrap justify-center space-x-2">
                    {renderPageNumbers}
                </ul>
                <button
                    className={`px-3 py-1 rounded-md ${currentPage === pages.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#037092] text-white'}`}
                    onClick={handleNextbtn}
                    disabled={currentPage === pages.length}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

export default LastCallVacations;
