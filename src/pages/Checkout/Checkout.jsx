import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { resort } = location.state || {};
  const [duration, setDuration] = useState(1); // Default to 1 day
  const [roomType, setRoomType] = useState("studio");

  const roomPrices = {
    studio: 309,
    "1 bedroom": 339,
    "2 bedroom": 379,
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const calculateTotalPrice = () => {
    const roomPrice = roomPrices[roomType];
    return roomPrice * duration;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking confirmation logic here
    alert(`Booking confirmed for ${duration} days in a ${roomType} room. Total Price: $${calculateTotalPrice()}`);
    // Navigate to payment page
    navigate('/payment', { state: { duration, roomType, totalPrice: calculateTotalPrice() } });
  };

  const handleConfirmClick = () => {
    if (user) {
      // Navigate to payment page if the user is logged in
      navigate('/payment', { state: { duration, roomType, totalPrice: calculateTotalPrice() } });
    } else {
      // Redirect to sign-in page with the current location saved in state
      navigate('/signin', { state: { from: location } });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Checkout Your Booking</h1>

      {resort && (
        <div>
          <h2 className="text-xl font-semibold">{resort.place_name}</h2>
          <p className="text-lg">{resort.location}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="duration" className="block text-lg font-medium">
            Duration (days):
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            min="1"
            max="45"
            onChange={handleDurationChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="roomType" className="block text-lg font-medium">
            Room Type:
          </label>
          <select
            id="roomType"
            value={roomType}
            onChange={handleRoomTypeChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          >
            <option value="studio">Studio - $309 per day</option>
            <option value="1 bedroom">1 Bedroom - $339 per day</option>
            <option value="2 bedroom">2 Bedroom - $379 per day</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Total Price: ${calculateTotalPrice()}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleConfirmClick}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Checkout;
