import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Overview = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  const { name, email, photoURL } = user;

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
          <div className="flex gap-5 mt-2">
            {/* Booking card */}
            <div className="flex w-full h-32 bg-gray-100 rounded-3xl p-5">
              <div>
                <img src="" alt="" />
              </div>

              <div>
              <h1>Resort Name</h1>
              <p>Start Date: YYYY-MM-DD</p>
              <p>End Date: YYYY-MM-DD</p>
              </div>
            </div>
      
        </div>
      </div>
    </div>
  );
};

export default Overview;
