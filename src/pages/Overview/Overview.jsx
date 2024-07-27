import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";


const Overview = () => {
  const {user} = useContext(AuthContext);
  const {name, email, photoURL} = user;


  return (
    <div className=" my-10 py-10 px-5">
      <div className="flex flex-col justify-center items-center">
        <img src={photoURL} alt="" className="w-20 rounded-full"/>
        <h1 className="text-xl font-bold text-center">{name}</h1>
        <p className="text-sm">{email}</p>
      </div>

      <div>
      
      </div>
    </div>
  );
};

export default Overview;
