import { FaAngleDown, FaBed, FaDoorOpen, FaShower } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";

const RoomDetails = ({ room_details }) => {
  const {
    bath,
    kitchen,
    privacy_room_amount,
    sleeps_room,
    room_Description,
    studio_sleeps_room,
    studio_privacy_room_amount,
    studio_kitchen,
    studio_bath,
  } = room_details;
  return (
    <div className="my-5 p-4">
      <h1 className="text-4xl font-semibold mb-2">Room Details</h1>
      <p>{room_Description}</p>

      <h2 className="font-semibold my-2">
        Actual room configurations may vary
      </h2>

      {/* Hotel */}
      <div className="border rounded mb-5">
        <h1 className="text-center text-2xl pt-3 font-semibold">Hotel</h1>
        <div className="divider divider-info"></div>

        <div className="px-5 space-y-3 py-3 bg-[#f4f4f4]">
          <p className="text-center">Features at a glance</p>
          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <FaBed /> Sleeps: {sleeps_room}
          </h2>

          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <FaDoorOpen /> Privacy: {privacy_room_amount}
          </h2>

          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <RiFridgeFill /> Kitchen: {kitchen}
          </h2>

          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <FaShower /> Bath: {bath}
          </h2>
        </div>
        <p className="flex items-center justify-center gap-2 font-semibold py-2 text-[#037092]">
          More room features <FaAngleDown />
        </p>
      </div>

      {/* Studio */}
      <div className="border rounded ">
        <h1 className="text-center text-2xl pt-3 font-semibold">Studio</h1>
        <div className="divider divider-info"></div>

        <div className="px-5 space-y-3 py-3 bg-[#f4f4f4]">
          <p className="text-center">Features at a glance</p>
          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <FaBed /> Sleeps: {studio_sleeps_room}
          </h2>

          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <FaDoorOpen /> Privacy: {studio_privacy_room_amount}
          </h2>

          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <RiFridgeFill /> Kitchen: {studio_kitchen}
          </h2>

          <h2 className="flex items-center gap-2 font-semibold text-xl text-[#037092]">
            <FaShower /> Bath: {studio_bath}
          </h2>
        </div>
        <p className="flex items-center justify-center gap-2 font-semibold py-2 text-[#037092]">
          More room features <FaAngleDown />
        </p>
      </div>
    </div>
  );
};

export default RoomDetails;
