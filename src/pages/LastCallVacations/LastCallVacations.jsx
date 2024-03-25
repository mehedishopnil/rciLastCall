
import { FaMapLocationDot, FaRegHeart } from 'react-icons/fa6';
import { IoFilterSharp } from 'react-icons/io5';

const LastCallVacations = () => {
    return (
        <div className="lg:hidden w-full flex justify-between h-16 p-5 text-gray-600 bg-white fixed bottom-0 left-0">
      <div className="flex gap-10 text-2xl text-[#037092]">
        <FaMapLocationDot />
        <FaRegHeart />
      </div>
      <div className="flex items-center gap-2 text-[#037092]">
        <IoFilterSharp />
        <h1>Filters</h1>
      </div>
    </div>
    );
};

export default LastCallVacations;