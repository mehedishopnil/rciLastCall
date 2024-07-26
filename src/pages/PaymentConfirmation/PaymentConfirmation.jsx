import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation = ({ paymentInfo }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Payment Confirmation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-2">Billing Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>First Name:</strong> {paymentInfo.firstName}</p>
              <p><strong>Last Name:</strong> {paymentInfo.lastName}</p>
              <p><strong>Address Line 1:</strong> {paymentInfo.addressLine1}</p>
              <p><strong>Address Line 2:</strong> {paymentInfo.addressLine2}</p>
              <p><strong>Country:</strong> {paymentInfo.country}</p>
              <p><strong>City:</strong> {paymentInfo.city}</p>
              <p><strong>State:</strong> {paymentInfo.state}</p>
              <p><strong>Postal Code:</strong> {paymentInfo.postalCode}</p>
              <p><strong>Phone Number:</strong> {paymentInfo.phoneNumber}</p>
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>Card Number:</strong> **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
              <p><strong>Expiry Date:</strong> {paymentInfo.expiryDate}</p>
              <p><strong>CVV:</strong> ***</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Duration:</strong> {paymentInfo.duration} days</p>
            <p><strong>Room Type:</strong> {paymentInfo.roomType}</p>
            <p><strong>Total Price:</strong> USD {paymentInfo.totalPrice}</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
