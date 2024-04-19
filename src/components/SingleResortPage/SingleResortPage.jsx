import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const SingleResortPage = () => {
    const { resortData } = useContext(AuthContext);
    const { id } = useParams();
    console.log("id:", id); 

    // Parse id to integer
    const idAsInt = parseInt(id);

    // Find the resort with the matching ID
    const resort = resortData.find(resort => parseInt(resort._id) === idAsInt);
    console.log("resort:", resort);

    return (
        <div>
            <h1>This is single resort page</h1>
            {resort && (
                <div>
                    <h2>{resort.name}</h2>
                    <p>Location: {resort.location}</p>
                    <p>Description: {resort.description}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default SingleResortPage;
