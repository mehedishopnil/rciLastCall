import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const AdminOverview = () => {
  const { user, allBookingsData } = useContext(AuthContext);
  const { name, photoURL, email,  } = user;

  if (!user && !allBookingsData) {
    return <div><Loading/></div>; // or any loading indicator you prefer
  }


  return (
    <div className="py-5">
      <div>
        <div className="flex justify-center relative">
          <img src={photoURL} alt=""  className="rounded-full"/>
          <h1 className="absolute bottom-1 ml-16 badge bg-pink-200 text-blue-900">Admin</h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-center">{name}</h1>
          <h1 className="text-sm font-semibold text-center">{email}</h1>
        </div>
      </div>

      <div className="flex justify-center gap-5 shadow-sm m-5 p-5">
          <Link to="/admin-panel/users-bookings">
          <div className="text-center card border p-4">
               <h1 className="font-bold text-gray-500">Total Bookings:</h1>
               <h1 className="text-3xl text-gray-700">{allBookingsData.length}</h1>
          </div>
          </Link>

          <div className="text-center card border p-4">
               <h1 className="font-bold text-gray-500">Total Users:</h1>
               <h1 className="text-3xl text-gray-700">{allBookingsData.length}</h1>
          </div>

     
      </div>
    </div>
  );
};

export default AdminOverview;
