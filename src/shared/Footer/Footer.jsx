
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-10 bg-[#edebef] space-y-5">
      <div className="text-center font-bold text-lg">
      <Link><h1 className="">About RCI</h1></Link>
      <Link><h1 className="">Resort Directory</h1></Link>
      <Link><h1 className="">RCI TV</h1></Link>
      <Link><h1 className="">Privacy Policy</h1></Link>
      <Link><h1 className="">Contact Us</h1></Link>
      </div>

      <div className="text-center space-y-5">
        <h1 className="text-xl">JOIN OUR COMMUNITY</h1>
        <div className="flex justify-center gap-5 text-2xl">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaPinterest /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
