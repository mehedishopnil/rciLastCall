import { useState } from "react";
import Swal from "sweetalert2";

const ResortInputForm = () => {
  const [formData, setFormData] = useState({
    img: '',
    location: '',
    resortID: '',
    placeName: '',
    priceUSD: '',
    resortDetails: '',
    checkInTime: '',
    checkOutTime: '',
    rating: '',
    availableAmount: '',
    reviewsAmount: '',
    roomDetails: {
      roomDescription: '',
      sleepsRoom: '',
      privacyRoomAmount: '',
      kitchen: '',
      bath: ''
    }
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRoomDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      roomDetails: {
        ...prevData.roomDetails,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('your-backend-api-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
  
      // Reset form after successful submission
      setFormData({
        img: '',
        location: '',
        resortID: '',
        placeName: '',
        priceUSD: '',
        resortDetails: '',
        checkInTime: '',
        checkOutTime: '',
        rating: '',
        availableAmount: '',
        reviewsAmount: '',
        roomDetails: {
          roomDescription: '',
          sleepsRoom: '',
          privacyRoomAmount: '',
          kitchen: '',
          bath: ''
        }
      });
  
      // Show success popup
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      });
  
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Show error popup
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };
  

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Resort Input Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Image */}
        <div className="mb-4">
          <label htmlFor="img" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* ResortID */}
        <div className="mb-4">
          <label htmlFor="resortID" className="block text-sm font-medium text-gray-700">Resort ID</label>
          <input
            type="text"
            id="resortID"
            name="resortID"
            value={formData.resortID}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Place Name */}
        <div className="mb-4">
          <label htmlFor="placeName" className="block text-sm font-medium text-gray-700">Place Name</label>
          <input
            type="text"
            id="placeName"
            name="placeName"
            value={formData.placeName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Price USD */}
        <div className="mb-4">
          <label htmlFor="priceUSD" className="block text-sm font-medium text-gray-700">Price USD</label>
          <input
            type="text"
            id="priceUSD"
            name="priceUSD"
            value={formData.priceUSD}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Resort Details */}
        <div className="mb-4">
          <label htmlFor="resortDetails" className="block text-sm font-medium text-gray-700">Resort Details</label>
          <textarea
            id="resortDetails"
            name="resortDetails"
            value={formData.resortDetails}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {/* Check-in Time */}
        <div className="mb-4">
          <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700">Check-in Time</label>
          <input
            type="text"
            id="checkInTime"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Check-out Time */}
        <div className="mb-4">
          <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700">Check-out Time</label>
          <input
            type="text"
            id="checkOutTime"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Available Amount */}
        <div className="mb-4">
          <label htmlFor="availableAmount" className="block text-sm font-medium text-gray-700">Available Amount</label>
          <input
            type="text"
            id="availableAmount"
            name="availableAmount"
            value={formData.availableAmount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Reviews Amount */}
        <div className="mb-4">
          <label htmlFor="reviewsAmount" className="block text-sm font-medium text-gray-700">Reviews Amount</label>
          <input
            type="text"
            id="reviewsAmount"
            name="reviewsAmount"
            value={formData.reviewsAmount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Room Description */}
        <div className="mb-4">
          <label htmlFor="roomDescription" className="block text-sm font-medium text-gray-700">Room Description</label>
          <textarea
            id="roomDescription"
            name="roomDescription"
            value={formData.roomDetails.roomDescription}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {/* Sleeps Room */}
        <div className="mb-4">
          <label htmlFor="sleepsRoom" className="block text-sm font-medium text-gray-700">Sleeps Room</label>
          <input
            type="text"
            id="sleepsRoom"
            name="sleepsRoom"
            value={formData.roomDetails.sleepsRoom}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Privacy Room Amount */}
        <div className="mb-4">
          <label htmlFor="privacyRoomAmount" className="block text-sm font-medium text-gray-700">Privacy Room Amount</label>
          <input
            type="text"
            id="privacyRoomAmount"
            name="privacyRoomAmount"
            value={formData.roomDetails.privacyRoomAmount}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Kitchen */}
        <div className="mb-4">
          <label htmlFor="kitchen" className="block text-sm font-medium text-gray-700">Kitchen</label>
          <input
            type="text"
            id="kitchen"
            name="kitchen"
            value={formData.roomDetails.kitchen}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Bath */}
        <div className="mb-4">
          <label htmlFor="bath" className="block text-sm font-medium text-gray-700">Bath</label>
          <input
            type="text"
            id="bath"
            name="bath"
            value={formData.roomDetails.bath}
            onChange={handleRoomDetailsChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResortInputForm;
