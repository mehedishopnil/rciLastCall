import { FaLock, FaRegEdit, FaUser } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdLogout, MdOutlineSupportAgent } from "react-icons/md";

const Profile = () => {
  return (
    <div className=" my-5">
      <h1 className="text-xl text-center font-semibold ">My Profile</h1>

      <div className="flex justify-center items-center gap-5 mt-10">
        <img
          className="w-24 rounded-full"
          src="https://heroshotphotography.com/wp-content/uploads/2023/03/male-linkedin-corporate-headshot-on-white-square-1024x1024.jpg"
          alt=""
        />
        <div>
          <h1 className="text-lg font-semibold">User Name</h1>
          <p>Position </p>
        </div>
      </div>


      <div className="flex flex-col justify-center items-center">

      <div className="w-10/12 flex justify-between items-center gap-5 mt-10 py-4 px-5 rounded-3xl bg-slate-100 border">
        <h1 className="text-base flex items-center gap-3 "><span className="font-semibold"><FaUser /></span> SK Mehedi Hasan</h1>
        <FaRegEdit />
      </div>

      <div className="w-10/12 flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
        <h1 className="text-base flex items-center gap-3 "><span className="font-semibold"><MdEmail /></span> skmehedihasan.jr1@gmail.com</h1>
        <FaRegEdit />
      </div>

      <div className="w-10/12 flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
        <h1 className="text-base flex items-center gap-3 font-bold"><span className="font-semibold"><FaLock /></span> *********</h1>
        <FaRegEdit />
      </div>

      <div className="w-10/12 flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
        <h1 className="text-base flex items-center gap-3 "><span className="text-lg font-semibold"><IoLocation />
</span> USA</h1>
        <FaRegEdit />
      </div>

      <div className="w-10/12 flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
        <h1 className="text-base flex items-center gap-3 "><span className="text-xl font-semibold"><MdOutlineSupportAgent />
</span> Support</h1>
        <FaRegEdit />
      </div>

      <div className="w-10/12 flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
        <h1 className="text-base flex items-center gap-3 "><span className="text-lg font-semibold"><MdLogout />
</span> Log Out</h1>
        <FaRegEdit />
      </div>

      
      </div>
    </div>
  );
};

export default Profile;
