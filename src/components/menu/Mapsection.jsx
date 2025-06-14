import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';


function Mapsection() {
    const navigate = useNavigate();
    return (
        <div>   
            <div className="flex flex-col md:flex-row flex-1">
                <div className="p-6 md:w-1/3">
                    <div className="flex items-center mb-4 space-x-4">
                        <button className="px-4 py-2 bg-green-700 text-white rounded-full font-bold">
                            Pickup
                        </button>
                        <button onClick={()=>navigate("/delivery")} className="px-4 py-2 border border-green-700 text-green-700 rounded-full font-bold">
                            Delivery
                        </button>
                    </div>

                    <div className="relative mb-4 mx-2">
                        <input
                            type="text"
                            placeholder="Find a store"
                            className="w-[300px] border-b-2 border-gray-300 py-2 pl-2 focus:outline-none"
                        />
                        <div className="absolute right-25 top-13">
                            <GoSearch />
                        </div>
                    <button className="px-5 py-2 mt-10 border border-green-700 text-green-700 rounded-full mb-6">
                        Filter
                    </button>
                    </div>


                    <h2 className="text-xl font-bold mb-2 text-[25px]">Zoomed out too far</h2>
                    <p className="text-gray-500 mb-10 ">
                        Try searching for a location or zooming in to see results.
                    </p>

                    <ul className="space-y-2 text-green-700 ">
                        <li><a href="">Privacy Notice</a></li>
                        <li><a href="">Terms of Use</a></li>
                        <li><a href="">Do Not Share My Personal Information</a></li>
                    </ul>
                </div>

                {/* Map */}
                <div className="flex-1">
                    <iframe
                        title="Google Map"
                        className="w-full h-full min-h-[500px]"
                        src="https://maps.google.com/maps?q=usa&z=4&output=embed"
                        loading="lazy"
                    />
                </div>
            </div></div>
    )
}

export default Mapsection