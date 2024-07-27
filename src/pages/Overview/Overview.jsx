import { FaWpforms } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <div className=" my-10 pt-5 px-5">
      <div>
        <h1 className="text-xl font-bold text-center">Welcome</h1>
      </div>

      <div>
        <ul className="menu text-gray-700 font-semibold text-xl">
          <h1 className="text-base">
            Select button to input the{" "}
            <span className="font-bold ">Resort Data:</span>
          </h1>
          <Link to="/dashboard/resort-input-form" >
            <div className="w-full flex justify-center items-center gap-5 border-2 rounded-lg bg-slate-100 hover:bg-slate-300 mt-2 py-2">
            <FaWpforms /> Resort Input Form
            </div>
          </Link>
          
        </ul>
      </div>
    </div>
  );
};

export default Overview;
