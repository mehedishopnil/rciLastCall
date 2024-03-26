import { GiStarsStack } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";

const resortCard = ({ resort }) => {
    const { img, price_usd, place_name } = resort;
    
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={img} alt="Shoes" /></figure>
                <p><FaRegHeart /></p>
                <div>
                    <p>Starting At <span>${price_usd} USD</span></p>
                </div>
                <div className="card-body">
                <p>If a dog chews shoes whose shoes does he choose?</p>
                    <h2 className="card-title">
                        {place_name}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                <div>
                    <div>
                    <GiStarsStack />
                    <h1>All-Inclusive</h1>
                    </div>
                    <div>
                        <img src="https://clubs.rci.com/static/media/gold-crown.d40b5cfc.svg" alt="" />
                        <div className="w-[1px] h-full bg-slate-500"></div>
                        <div>
                        <img src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/5.0-32772-5.svg" alt="" />
                            {/* You need to add reviews_amount in resort object */}
                            {/* <div>
                                <p>{reviews_amount} reviews</p>
                            </div> */}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default resortCard;
