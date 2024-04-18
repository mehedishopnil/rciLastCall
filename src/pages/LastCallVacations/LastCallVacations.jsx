import  { useContext } from 'react';
import ResortCard from '../../components/resortCard/resortCard'; // Assuming correct import path for resortCard component
import { AuthContext } from '../../context/AuthProvider';

const LastCallVacations = () => {
   const {resortData} = useContext(AuthContext);

    return (
        <div className="container mx-auto p-4 space-y-5">
            <div className='border-b border-gray-500 py-2'>
                <h1 className='text-xl'>{resortData.length} Resorts </h1> {/* Use resortData.length */}
            </div>

            {/* Render resort cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {resortData.map((resort) => ( // Use resortData.map
                    <ResortCard key={resort.id} resort={resort} />
                ))}
            </div>
        </div>
    );
};

export default LastCallVacations;
