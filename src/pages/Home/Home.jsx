import { IoSearch } from "react-icons/io5";
import rciImg2 from "../../assets/Images/rci-magazine-people-places.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import magazineImg from "../../assets/Images/rci-magazine-people-places.jpg"
import BeautifulDestination from "./BeautifulDestination/BeautifulDestination";
import img_nature from "../../assets/Images/C82-web-image.png"
import PopularDestinations from "./PopularDestinations/PopularDestinations";

const Home = () => {
  return (
    <div>
      <div className="relative flex justify-center h-[660px] lg:h-[350px] lg:w-full lg:bg-center  bg-no-repeat bg-[url('https://www.rci.com/static/images/content/_NAMER/clubs/wvr-hero1.jpg?impolicy=club-570-760')] lg:bg-[url('https://www.rci.com/static/images/content/_NAMER/clubs/wvr/wvr-hero4-desktop-500.jpg')]">
        <div className="absolute top-[400px] lg:top-[150px] lg:left-16 px-5 py-8 rounded-3xl space-y-3 bg-white">
          <div className="flex justify-center ">
            <h1 className="text-[1.5rem] font-semibold">
              Find your dream vacation!
            </h1>
            <IoSearch className="text-5xl text-[#03709235]" />
          </div>
          <div className="w-full h-[1px] bg-gray-300 mt-2"></div>

          <h1 className="flex items-center text-center font-medium text-[#037092]">
            See all RCI resorts <MdKeyboardDoubleArrowRight />
          </h1>
        </div>
      </div>

      {/* Targeted Clubs */}
      <Link>
        <div>
          <div className="flex flex-col items-center py-20 bg-[#fbf3ec]">
            <img
              src="https://clubs.rci.com/static/media/mi.d7834b71.svg"
              alt=""
              className=""
            />
          </div>

          <div className="w-full py-5 ">
            <div className="px-5">
              <h1 className="text-xl font-bold">
                Clubs Targeted 25% off exchange test
              </h1>
              <p>25% Off exchange test</p>
            </div>

            <div className=" flex flex-col items-center form-control mt-6">
              <Link className="w-11/12">
                <button className="w-11/12 rounded border-2 text-[#037092] border-[#037092] py-2 text-lg font-semibold shadow-md">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Link>

      {/* Choose your adventure */}

      <Link>
        <div className="bg-[#e6f8fc]">
          <div className="text-center  py-5">
            <h1 className="text-4xl font-bold uppercase homeHeader">
              choose your adventure
            </h1>
            <p className="uppercase text-xl font-semibold text-gray-500">
              get inspired by these great offers
            </p>
          </div>

          <div className="flex flex-col items-center py-20 bg-[#fbf3ec]">
            <img
              src="https://clubs.rci.com/static/media/mi.d7834b71.svg"
              alt=""
              className=""
            />
          </div>

          <div className="px-5 py-5">
            <h1 className="text-xl font-bold">
              Clubs Targeted 50% off exchange test
            </h1>
            <p>50% Off exchange test</p>
          </div>
        </div>
      </Link>

      {/* Exchange Plus is Here */}
      <Link>
      <div>
          <div className="flex flex-col items-center py-20 bg-[#fbf3ec]">
            <img
              src={magazineImg}
              alt=""
              className=""
            />
          </div>

          <div className="w-full py-5 ">
            <div className="px-5">
              <h1 className="text-xl font-bold">
              Exchange Plus Is Here
              </h1>
              <p>Exchange Plus is your newest booking option with RCI — and it's giving you more access to popular destinations and travel dates that might have been previously harder to book.</p>
            </div>

          </div>
        </div>
      </Link>

    <BeautifulDestination/>


    <Link>
        <div className="bg-[#e6f8fc]">
          <div className="text-center  py-5">
            <h1 className="text-4xl font-bold uppercase homeHeader">
            your limited time offers
            </h1>
            <p className="uppercase text-xl font-semibold text-gray-500">
            planning a trip? there’s no better <br/> time than now!
            </p>
          </div>

          <div className="">
            <img
              src="https://www.rci.com/static/images/content/_NAMER/C82-Offers/hotel-exchange.jpg"
              alt=""
              className=""
            />
          </div>

          <div className="px-5 py-5">
            <h1 className="text-xl font-bold">
            Use Your Points for Powerful Hotel Savings!
            </h1>
            <p>4,000 Points per night gets you an exclusive discount on already member-low hotel rates.</p>
          </div>
        </div>
      </Link>


    <Link>
        <div className="bg-[#e6f8fc]">

          <div className="">
            <img
              src={img_nature}
              alt=""
              className=""
            />
          </div>

          <div className="px-5 py-5">
            <h1 className="text-xl font-bold">
            Book A Select Exchange Resort
            </h1>
            <p>Receive priority access to worldwide resorts ahead of other RCI members.</p>
          </div>
        </div>
      </Link>

      <div>
      <div className="text-center  py-5">
            <h1 className="text-4xl font-bold uppercase homeHeader">
            popular destinations
            </h1>
            <p className="uppercase text-xl font-semibold text-gray-500">
            other members recently booked...
            </p>
          </div>
          <PopularDestinations/>

      </div>

      <div className="lg:container lg:mx-auto text-center space-y-5  border my-10 p-4">
        <div className="lg:grid lg:grid-cols-2 md:space-x-5 ">
          <div className="md:text-right md:p-5">
            <h1 className="text-3xl font-normal md:font-semibold mb-2">
              You have ZERO points in your RCI account!
            </h1>
            <p className="text-base">
              Before you can book a vacation with RCI, you must have sufficient
              Points in your RCI account. Get inspired by searching available
              RCI vacations, then return to your Club Wyndham account to deposit
              the number of Points required for the trip you'd like to book.
            </p>
          </div>

          <div className="p-5 shadow-md border space-y-2 lg:rounded-none rounded-3xl my-5">
            <h1 className="text-xl font-semibold">
              Get Points for your next vacation
            </h1>
            <p>by depositing your Club Wyndham Points with RCI</p>
            <button className="btn text-black font-bold shadow-md  bg-[#ffcc45] ">
              DEPOSIT MY POINTS
            </button>
          </div>
        </div>

        <div className="w-full lg:grid lg:grid-cols-2 bg-[#e6f8fc] my-10 ">
          <img src={rciImg2} alt="" className="cover" />
          <div className="lg:flex lg:flex-col lg:justify-center text-start  px-4 py-6 space-y-2">
            <h1 className="text-xl font-bold">RCI Magazine®</h1>
            <p className="text-base">
              RCI Magazine® is your all-in-one resource for travel inspiration,
              exclusive offers, and exciting member news. Take a look at our
              Winter 2023 issue today!
            </p>

            <button className="btn w-full lg:w-fit text-lg text-semibold text-[#037092] border rounded-md border-[#037092] shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
