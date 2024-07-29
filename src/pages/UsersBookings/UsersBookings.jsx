import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const UsersBookings = () => {
  const { allBookingsData } = useContext(AuthContext);
  console.log(allBookingsData);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Total Bookings {allBookingsData.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full hidden lg:table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Resort Name</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allBookingsData.map((booking, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={booking.resort.img}
                    alt="Resort"
                    className="w-24 h-24 object-cover"
                  />
                </td>
                <td>{booking.resort.name}</td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Responsive */}
        <div className="block lg:hidden">
          {allBookingsData.map((booking, index) => (
            <div
              key={index}
              className="card card-side bg-base-100 shadow-xl p-2 py-3 mb-4"
            >
              <figure>
                <img
                  src={booking.resort.img}
                  alt="Resort"
                  className="w-24 h-24 object-cover rounded-md"
                />
              </figure>
              <div className="pl-10 space-y-1">
                <h2 className="card-title">{booking.billingInfo.firstName} {booking.billingInfo.lastName}</h2>
                <div>
                <p>
                  <strong>Booking Date:</strong> 
                </p>
                <p>
               {booking.startDate} 
                </p>
                <p>
                {booking.endDate}
                </p>
                </div>
                <p>
                  <strong>Unit Type:</strong> {booking.unitType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersBookings;
