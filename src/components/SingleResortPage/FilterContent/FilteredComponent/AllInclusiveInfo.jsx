import { FaAngleDown, FaBed, FaDoorOpen, FaShower, } from "react-icons/fa";



const AllInclusiveInfo = () => {
    return (
        <div>
            <div className="bg-[#ccf2ff] space-y-2 p-4">
                <h1 className="text-3xl font-semibold">All Inclusive Info</h1>
                <h2 className="text-lg font-semibold">Dining</h2>
                <p className="flex items-center font-semibold gap-2 text-[#037092]">See Restaurant <FaAngleDown /></p>
                <div className="border-b border-gray-300"></div>

                <h2 className="text-lg font-semibold">Golf</h2>
                <p className="flex items-center gap-2 font-semibold text-[#037092]">See Golf <FaAngleDown /></p>
                <div className="border-b border-gray-300"></div>
   
                <h2 className="text-lg font-semibold">All Inclusive Fees</h2>
                <p className="flex items-center gap-2 font-semibold text-[#037092]">See fees & Urgent Information <FaAngleDown /></p>
  
            </div>

            
        </div>
    );
};

export default AllInclusiveInfo;