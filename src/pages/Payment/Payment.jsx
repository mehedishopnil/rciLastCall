import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { duration, roomType, totalPrice } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Here you would integrate with a payment processor like Stripe
    // For this example, we'll just simulate a payment success
    setTimeout(() => {
      setLoading(false);
      alert(`Payment of $${totalPrice} confirmed for ${duration} days in a ${roomType} room.`);
      navigate('/confirmation');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Confirm Your Payment</h1>
      
      {user ? (
        <form onSubmit={handlePayment} className="mt-4">
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-lg font-medium">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-lg font-medium">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="mt-1 block w-full p-2 border rounded"
              placeholder="MM/YY"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-lg font-medium">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              className="mt-1 block w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Price: ${totalPrice}</h3>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Payment'}
          </button>
        </form>
      ) : (
        <p className="text-center text-red-500">You must be logged in to make a payment.</p>
      )}
    </div>
  );
};

export default Payment;
