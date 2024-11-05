import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResortEdit = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(_id)

  const [resortData, setResortData] = useState(
    location.state?.resort || {
      img: '',
      img2: '',
      img3: '',
      location: '',
      resort_ID: '',
      place_name: '',
      price_usd: '',
      resort_details: '',
      check_in_time: '',
      check_out_time: '',
      rating: '',
      stateRating: '',
      available_amount: '',
      reviews_amount: '',
      room_details: {
        room_Description: '',
        sleeps_room: '',
        privacy_room_amount: '',
        kitchen: '',
        bath: '',
        studio_sleeps_room: '',
        studio_privacy_room_amount: '',
        studio_kitchen: '',
        studio_bath: '',
        hotel_room: '',
        hotel_privacy_room_amount: '',
        hotel_kitchen: '',
        hotel_bath: '',
      },
    }
  );

  // Store the initial data for comparison
  const [initialData, setInitialData] = useState(resortData);

  useEffect(() => {
    if (!location.state?.resort) {
      const fetchResortData = async () => {
        try {
          const response = await fetch(`https://rci-last-call-server.vercel.app/resorts/${_id}`);
          if (!response.ok) throw new Error("Failed to fetch data");
          const data = await response.json();
          setResortData(data);
          setInitialData(data); // Set the initial data for comparison
        } catch (error) {
          console.error('Error fetching resort data:', error);
        }
      };
      fetchResortData();
    }
  }, [_id, location.state]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('room_details.')) {
      const field = name.split('.')[1];
      setResortData((prevData) => ({
        ...prevData,
        room_details: {
          ...prevData.room_details,
          [field]: value,
        },
      }));
    } else {
      setResortData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const getChangedData = (newData, originalData) => {
    const changedData = {};

    // Check each top-level field
    Object.keys(newData).forEach((key) => {
      if (typeof newData[key] === 'object' && !Array.isArray(newData[key])) {
        // Nested object (e.g., room_details)
        const nestedChanges = getChangedData(newData[key], originalData[key] || {});
        if (Object.keys(nestedChanges).length > 0) {
          changedData[key] = nestedChanges;
        }
      } else if (newData[key] !== originalData[key]) {
        changedData[key] = newData[key];
      }
    });

    return changedData;
  };

  //Handle submission of the new data to the server::
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Get only the changed fields
  const changedData = getChangedData(resortData, initialData);

  try {
    const response = await fetch(`https://rci-last-call-server.vercel.app/resorts/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changedData),
    });

    if (response.ok) {
      Swal.fire('Updated!', 'Resort details updated successfully.', 'success');
      navigate(-1); // Go back to the previous page
    } else {
      throw new Error('Failed to update resort details');
    }
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};


  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Resort</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block font-semibold">Primary Image URL</label>
          <input
            type="text"
            name="img"
            value={resortData.img}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Secondary Image URL</label>
          <input
            type="text"
            name="img2"
            value={resortData.img2}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Third Image URL</label>
          <input
            type="text"
            name="img3"
            value={resortData.img3}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={resortData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-semibold">Place Name</label>
          <input
            type="text"
            name="place_name"
            value={resortData.place_name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Update Resort
        </button>
      </form>
    </div>
  );
};

export default ResortEdit;
