import deliveryImage from "../../assets/delivery-img/delivery-hero.png";
import { useNavigate } from 'react-router-dom';

function DeliverySection() {
    const navigate = useNavigate();
    return (
        <div><div className="flex flex-col md:flex-row min-h-screen ">
            <div className="md:w-1/2 px-8 pt-4 pb-8 flex flex-col gap-10 justify-start text-center items-start">
                <div className="mb-6 flex space-x-4 text-center mx-auto">
                    <button onClick={() => navigate("/mapSection")} className="px-4 py-2 border-2 border-green-700 text-green-700 rounded-full font-bold">
                        Pickup
                    </button>
                    <button className="px-4 py-2 bg-green-700 text-white rounded-full font-bold shadow-inner">
                        Delivery
                    </button>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-center mx-auto">Today deserves delivery</h1>
                <p className="mb-4">
                    Enjoy Starbucks® delivery powered by DoorDash. For additional help,
                    visit{" "}
                    <a href="#" className="underline text-green-700 font-medium">
                        Delivery FAQs
                    </a>
                    .
                </p>

                <button className="bg-green-700 text-white text-center mx-auto px-6 py-3 rounded-full text-lg font-semibold shadow-md flex items-center gap-2 hover:bg-green-800 transition">
                    Get started
                </button>

                <p className="text-sm text-gray-600 mt-8 max-w-md text-center mx-auto">
                    Menu limited. Menu pricing for delivery may be higher than posted in
                    stores or as marked. Additional fees may apply. Delivery orders are
                    not eligible for Starbucks® Rewards benefits at this time.
                </p>
            </div>

            <div className="md:w-1/2 bg-gradient-to-t from-green-200 to-green-700 flex items-end justify-center">
                <img
                    src={deliveryImage}
                    alt="Delivery Starbucks"
                    className="lg:w-[450px] w-[300px] h-auto object-contain scale-125 md:scale-150 mb-10 transition-transform"
                />
            </div>
        </div></div>
    )
}

export default DeliverySection