import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const AvailableUnits = () => {
    return (
        <div>
            <div className='w-full px-5 py-2 space-y-2 bg-[#037092]'>
                <div className=' flex flex-col items-center rounded py-1 bg-[#e6f8fc]'>
                    <h1>
                    TRAVEL DATES
                    </h1>
                    <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-semibold'>
                    Select check-in
                    </h1>
                    <FaChevronDown />
                    </div>
                </div>

                <div className=' flex flex-col items-center rounded py-1 bg-[#e6f8fc]'>
                    <h1>
                    TRAVEL DATES
                    </h1>
                    <div className='flex items-center gap-2'>
                    <h1 className='text-xl font-semibold'>
                    Select check-in
                    </h1>
                    <FaChevronDown />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableUnits;