import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { price, guestInfo, isGuest, resort, startDate, endDate, unitType } =
    location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const { email } = user;

  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);
  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  // Function to determine price based on unitType
  const getPriceByUnitType = (unitType) => {
    switch (unitType) {
      case 'studio':
        return 329.08;
      case '1 bedroom':
        return 361.02;
      case '2 bedroom':
        return 403.63;
      default:
        return price; // Default to the existing price if unitType does not match
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Update price based on unitType
    const updatedPrice = getPriceByUnitType(unitType);

    const bookingInfo = {
      resort,
      email,
      cardNumber,
      expiryDate,
      cvv,
      price: updatedPrice, // Use the updated price here
      startDate,
      endDate,
      unitType,
      billingInfo: guestInfo ? { isGuest: true, ...guestInfo } : billingInfo,
    };

    try {
      const response = await fetch(
        "https://rci-last-call-server.vercel.app/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingInfo),
        }
      );

      if (response.ok) {
        setLoading(false);
        alert("Payment confirmed!");
        navigate("/payment-confirmation", {
          state: { resort },
        });
      } else {
        setLoading(false);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again.");
    }
  };

  // Determine the displayed price based on unitType
  const displayedPrice = getPriceByUnitType(unitType);

  return (
    <div className="container mx-auto">
      <div className="divider"></div>
      <div className="bg-[#e6f8fc] py-2">
        <h1 className="text-3xl font-bold mx-5 mb-5">Secure Payment</h1>

        <div className="bg-[#1fa5c7]  p-4">
        <h1 className="text-white font-semibold">Save USD 50.00 on this purchase</h1>
        <h1 className="text-white">upon approval for the RCI® Elite Rewards® Mastercard®</h1>

        <div>

        </div>

        <div className="py-2 flex flex-col items-center space-y-2">
          <h1 className="text-xl text-center text-white font-semibold">No Annual Fee</h1>
          <img className="w-1/2" src="https://www.rci.com/static/images/content/_NAMER/barclays/Barclay%20CC%20image.png" alt="" />
        </div>
        </div>
      </div>

      {/* Card information */}
      <h1 className="text-xl mx-4  mb-4">
        Confirm Your Payment
      </h1>

      <div className="flex w-32 gap-2 mx-4">
        <img src="https://clubs.rci.com/static/media/visa.aca7f7be.svg" alt="" />
        <img src="https://clubs.rci.com/static/media/master.d4bf55af.svg" alt="" />
        <img src="https://clubs.rci.com/static/media/americanexpress.68149859.svg" alt="" />
        <img src="https://clubs.rci.com/static/media/discover.8e26756a.svg" alt="" />
        <img src="https://clubs.rci.com/static/media/dinersclub.a008ff42.svg" alt="" />
      </div>

      {user ? (
        <form onSubmit={handleContinue} className="mt-4 ">

          <div className="mx-4">
          <div className="mb-4">
            
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="mt-1 block w-full p-2 border rounded shadow"
              placeholder="Credit Card Number:"
              required
            />
          </div>

          <div className="mb-4">
            
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="mt-1 block w-full p-2 border rounded shadow"
              placeholder="Expiration Date (MM/YY):"
              required
            />
          </div>

          <div className="mb-4">
            
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              className="mt-1 block w-full p-2 border rounded shadow"
              placeholder="Security Code"
              required
            />
          </div>
          </div>

          {/* Billing Information */}

          {!guestInfo && (
            <div className="mb-4 mx-4">
              <h3 className="text-lg font-semibold">Billing Information</h3>
              <div className="grid md:grid-cols-2  gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={billingInfo.firstName}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={billingInfo.lastName}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="address1"
                  placeholder="Address Line 1"
                  value={billingInfo.address1}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="address2"
                  placeholder="Address Line 2 (Optional)"
                  value={billingInfo.address2}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={billingInfo.country}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={billingInfo.city}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={billingInfo.state}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={billingInfo.postalCode}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={billingInfo.phoneNumber}
                  onChange={handleBillingInfoChange}
                  className="mt-1 block w-full p-2 border rounded shadow"
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-4 mx-4">
            <h3 className="text-lg font-semibold">View RCI Charges: ${price} <span className="text-sm">USD + Tax</span></h3>
          </div>

          <div className="md:grid grid-cols-2 items-center justify-between px-4 py-4 h-auto z-50 sticky bottom-0 bg-slate-100">
      <div className="flex justify-between font-semibold py-2 gap-10 row-span-1">
        <h1>View RCI Charges</h1>
        <h1 className="text-sm">
          <span className="text-lg">${displayedPrice.toFixed(2)}</span> USD
        </h1>
      </div>

      <div className="flex w-full row-span-1">
        <button
          type="submit"
          className="w-full py-2 rounded font-bold uppercase bg-yellow-400"
          disabled={loading}
          onClick={handleContinue}
        >
          {loading ? "Processing..." : "Make Payment"}
        </button>
      </div>
    </div>
        </form>
      ) : (
        <p className="text-center text-red-500">
          You must be logged in to make a payment.
        </p>
      )}
    </div>
  );
};

export default Payment;
