import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ResortCard from '../../components/resortCard/resortCard';
import { AuthContext } from '../../context/AuthProvider';

const LastCallVacations = () => {
    const { resortData } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const resortsPerPage = 15;

    // Calculate indexes of the resorts to be displayed on the current page
    const indexOfLastResort = currentPage * resortsPerPage;
    const indexOfFirstResort = indexOfLastResort - resortsPerPage;
    const currentResorts = resortData.slice(indexOfFirstResort, indexOfLastResort);

    const pages = [];
    for (let i = 1; i <= Math.ceil(resortData.length / resortsPerPage); i++) {
        pages.push(i);
    }

    // Change page
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
            <div className='border-b border-gray-500 py-2'>
                <h1 className='text-xl'>{resortData.length} Resorts</h1>
            </div>

            {/* Render resort cards for the current page */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentResorts.map((resort) => (
                    <Link to={`/singleResortPage/${resort._id}`} key={resort.id}>
                        <ResortCard resort={resort} />
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    className={`px-3 py-1 rounded-md mr-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={handlePrevbtn}
                    disabled={currentPage === 1}
                >
                    &lt; Prev
                </button>
                <ul className="flex space-x-2">
                    {renderPageNumbers}
                </ul>
                <button
                    className={`px-3 py-1 rounded-md ml-2 ${currentPage === pages.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
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
