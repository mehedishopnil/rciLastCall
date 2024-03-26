import { useState, useEffect } from 'react';
import AccountOverview from './AccountOverview/AccountOverview';
import AvailablePoints from './AvailablePoints/AvailablePoints';

const MyAccount = () => {
    const filters = [
        { id: 1, name: 'Account Overview', component: <AccountOverview /> },
        { id: 2, name: 'Available Points', component: <AvailablePoints /> },
        { id: 3, name: 'How Points works', component: null },
        { id: 4, name: 'Personal Info', component: null },
        { id: 5, name: 'Additional information', component: null },
        { id: 6, name: 'Statements', component: null },
        // Add more filters as needed

    ];

    const [activeFilter, setActiveFilter] = useState(1);

    const handleFilterClick = (filterId) => {
        setActiveFilter(filterId === activeFilter ? null : filterId);
    };

    useEffect(() => {
        // Set the first filter as active when the component mounts
        setActiveFilter(1);
    }, []);

    return (
        <div className=" flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
            <div className="overflow-x-scroll flex space-x-4 pb-4 max-w-full">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => handleFilterClick(filter.id)}
                        className={`px-4 py-2 rounded-md border ${activeFilter === filter.id ? 'bg-gray-200' : ''}`}
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {activeFilter &&
                    filters.find((filter) => filter.id === activeFilter)?.component}
            </div>
        </div>
    );
};

export default MyAccount;
