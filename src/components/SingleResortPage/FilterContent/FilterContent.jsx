import React, { useState } from 'react';
import AvailableUnits from './FilteredComponent/AvailableUnits';

const FilterContent = () => {
    // State to track the active menu
    const [activeMenu, setActiveMenu] = useState('Available Units');

    // Function to handle menu click and set active menu
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    // Demo content for each menu
    const menuContent = {
        'Available Units': (
            <AvailableUnits />
        ),
        
        'All-inclusive info': (
            <div>
                <h2>All-inclusive info</h2>
                <p>This section provides details about all-inclusive packages offered by the resort.</p>
            </div>
        ),
        'Room': (
            <div>
                <h2>Room</h2>
                <p>This section contains information about room types and amenities.</p>
            </div>
        ),
        'Room Details': (
            <div>
                <h2>Room Details</h2>
                <p>Detailed descriptions of each room type, including features and pricing.</p>
            </div>
        ),
        'Resort Details': (
            <div>
                <h2>Resort Details</h2>
                <p>Information about the resort's facilities, services, and location.</p>
            </div>
        ),
        'Area info': (
            <div>
                <h2>Area info</h2>
                <p>Details about the surrounding area, attractions, and local amenities.</p>
            </div>
        ),
        'Reviews': (
            <div>
                <h2>Reviews</h2>
                <p>Guest reviews and ratings of the resort.</p>
            </div>
        )
    };

    return (
        <div className=''>
            <div className='carousel'>
                <ul className="carousel-item space-x-5  relative text-xl font-semibold my-5">
                    {Object.keys(menuContent).map((menu) => (
                        <li key={menu} className={activeMenu === menu ? 'active underline text-[#037092] ' : ''} onClick={() => handleMenuClick(menu)}>
                            {menu}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content for each menu can be added below */}
            {menuContent[activeMenu]}
        </div>
    );
};

export default FilterContent;
