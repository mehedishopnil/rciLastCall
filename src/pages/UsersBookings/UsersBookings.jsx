import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const UsersBookings = () => {
  const { allBookingsData } = useContext(AuthContext);
  console.log(allBookingsData);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All The Bookings</h1>
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
              className="card card-side bg-base-100 shadow-xl p-2 mb-4"
            >
              <figure>
                <img
                  src={booking.resort.img}
                  alt="Resort"
                  className="w-24 h-24 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{booking.billingInfo.firstName}</h2>
                <p>
                  <strong>Booking Date:</strong> {booking.startDate} to {booking.endDate}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
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
