import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../components/Loading";

const Overview = () => {
  const { user, bookingsData } = useContext(AuthContext);

  if (!user) {
    return (
      <div>
        <Loading />
      </div>
    ); // or any loading indicator you prefer
  }

  console.log(bookingsData);
  const { name, email, photoURL } = user;

  // Ensure bookingsData is an array
  const bookingsArray = Array.isArray(bookingsData) ? bookingsData : [bookingsData];

  return (
    <div className="my-10 py-10 px-5">
      <div className="flex flex-col justify-center items-center">
        <img src={photoURL} alt="User" className="w-20 rounded-full" />
        <h1 className="text-xl font-bold text-center">{name}</h1>
        <p className="text-sm">{email}</p>
      </div>

      <div className="mt-10">
        <h1 className="text-lg font-bold">Your Bookings:</h1>

        {/* Booking cards */}
        <div className="flex flex-wrap gap-5 mt-2">
          {bookingsArray.length > 0 ? (
            bookingsArray.map((booking, index) => {
              const { img, place_name, location } = booking.resort;
              const { startDate, endDate, unitType } = booking;

              return (
                <div key={index} className="flex gap-5 w-full md:w-1/2 lg:w-1/3 bg-gray-100 rounded-3xl p-5">
                  <div>
                    <img src={img} alt="" className="w-40 rounded" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold">{place_name}</h1>
                    <p>{location}</p>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                    <p>Unit Type: {unitType}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
