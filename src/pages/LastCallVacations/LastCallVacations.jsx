import React, { useState, useEffect } from 'react';
import ResortCard from '../../components/resortCard/resortCard'; // Assuming correct import path for resortCard component

const LastCallVacations = () => {
    const [resorts, setResorts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/public/TempData/ResortsData.json'); // Assuming ResortsData.json is served from the public folder
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setResorts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    return (
        <div className="container mx-auto p-4 space-y-5">
            <div className='border-b border-gray-500 py-2'>
                <h1 className='text-xl'>{resorts.length} Resorts </h1>
            </div>

            {/* Render resort cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resorts.map((resort) => (
                  <ResortCard key={resort.id} resort={resort} />
              ))}
            </div>
        </div>
    );
};

export default LastCallVacations;
