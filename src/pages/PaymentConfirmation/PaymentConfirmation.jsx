import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const PaymentConfirmation = () => {
     const { paymentInfoData } = useContext(AuthContext);
     const { cardNumber, cvv, email, price, expiryDate } = paymentInfoData;
     const { firstName, lastName, address1, address2, country, city, state, postalCode, phoneNumber } = paymentInfoData.billingInfo || {};
     const navigate = useNavigate();

  console.log(paymentInfoData.billingInfo)

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Payment Confirmation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-2">Billing Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Address Line 1:</strong> {address1}</p>
              <p><strong>Address Line 2:</strong> {address2 || 'N/A'}</p>
              <p><strong>Country:</strong> {country}</p>
              <p><strong>City:</strong> {city}</p>
              <p><strong>State:</strong> {state}</p>
              <p><strong>Postal Code:</strong> {postalCode}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>Card Number:</strong> **** **** **** {cardNumber?.slice(-4)}</p>
              <p><strong>Expiry Date:</strong> {expiryDate}</p>
              <p><strong>CVV:</strong> ***</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Total Price:</strong> USD {price}</p>
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
