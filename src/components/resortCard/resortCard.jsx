import { GiStarsStack } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";

const resortCard = ({ resort }) => {
    const { img,  place_name,reviews_amount,location, ownerExclusive
    } = resort;
    
    return (
        <div>
            <div className=" card h-full bg-white shadow-xl">
                <figure className=" relative">
                    <img src={img} alt="Shoes" />
                    <p className="absolute top-5 right-5 text-xl"><FaRegHeart /></p>
                {/* <div className= "absolute flex flex-col items-center bottom-5 right-5 p-2 rounded bg-white">
                    <p className="">Starting At </p>
                    <p className="text-lg font-bold"> ${price_usd} USD</p>
                </div> */}
                    </figure>
                
                <div className="card-body">
                <p>{location}</p>
                    <h2 className="card-title">
                        {place_name}
                        
                    </h2>
                <div>
                    <div className="flex items-center gap-2">
                    {/* <GiStarsStack /> */}
                    <h1>{ownerExclusive}</h1>
                    </div>

                        <div className="divider"></div>

                    <div className="flex items-center gap-1">
                        <img src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg" alt="" />
                        <div className="border-l-2 "></div>

                        <div className="">
                        <img src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg" alt="" />
                            {/* You need to add reviews_amount in resort object */}
                            <div>
                                <p>{reviews_amount} reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default resortCard;
