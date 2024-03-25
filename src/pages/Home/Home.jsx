import { IoSearch } from "react-icons/io5";
import rciImg2 from "../../assets/Images/rci-magazine-people-places.jpg";

const Home = () => {
  return (
    <>
      <div className="relative flex justify-center h-[660px] bg-no-repeat bg-[url('https://www.rci.com/static/images/content/_NAMER/clubs/wvr-hero1.jpg?impolicy=club-570-760')]">
        <div className="absolute top-[400px] px-5 py-8 rounded-3xl space-y-3 bg-white">
          <div className="flex justify-center ">
            <h1 className="text-[1.5rem] font-semibold">
              Find your dream vacation!
            </h1>
            <IoSearch className="text-5xl text-[#03709235]" />
          </div>
          <div className="w-full h-[1px] bg-gray-300 mt-2"></div>

          <h1 className="text-center font-medium text-[#037092]">
            See all RCI resorts >>
          </h1>
        </div>
      </div>

      <div className="text-center space-y-5 border my-10 p-4">
        <h1 className="text-3xl font-normal">
          You have ZERO points in your RCI account!
        </h1>
        <p className="text-base">
          Before you can book a vacation with RCI, you must have sufficient
          Points in your RCI account. Get inspired by searching available RCI
          vacations, then return to your Club Wyndham account to deposit the
          number of Points required for the trip you'd like to book.
        </p>

        <div className="p-5 shadow-md border space-y-2 rounded-3xl my-5">
          <h1 className="text-xl font-semibold">
            Get Points for your next vacation
          </h1>
          <p>by depositing your Club Wyndham Points with RCI</p>
          <button className="btn text-black font-bold shadow-md  bg-[#ffcc45] ">
            DEPOSIT MY POINTS
          </button>
        </div>

        <div className="w-full bg-[#e6f8fc] my-10 ">
          <img src={rciImg2} alt="" className="cover" />
          <div className="text-start px-4 py-6 space-y-2">
            <h1 className="text-xl font-bold">RCI Magazine®</h1>
            <p className="text-base">
              RCI Magazine® is your all-in-one resource for travel inspiration,
              exclusive offers, and exciting member news. Take a look at our
              Winter 2023 issue today!
            </p>

            <button className="btn w-full text-lg text-semibold text-[#037092] border rounded-md border-[#037092] shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
