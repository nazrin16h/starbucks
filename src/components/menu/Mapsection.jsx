import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { LOCATION } from "../../context/LocationContext";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";


function Mapsection() {
    const { selectedLocation, setSelectedLocation, locations } = useContext(LOCATION);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Helmet>
                <title>Store Locator: Starbucks Coffee Company</title>
            </Helmet>

            <div className="flex flex-col lg:flex-row">
                {/* Sol tərəf */}
                <div className="lg:w-[40%] px-4 py-6">
                    <form className="flex items-center mb-4 relative" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="search"
                            placeholder="Find a store"
                            className="border-b border-gray-400 w-full py-2 px-2 outline-none focus:border-[#00754a]"
                            autoComplete="off"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2"><CiSearch size={21}/></button>
                    </form>

                    <div className="space-y-3 max-h-[80vh] overflow-y-auto">
                        {filteredLocations.length > 0 ? (
                            filteredLocations.map((location) => (
                                <div
                                    key={location.id}
                                    onClick={() => setSelectedLocation(location)}
                                    className={`p-4  cursor-pointer ${selectedLocation.id === location.id
                                        ? "border-[#006241] bg-[#e5efec]"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    <h3 className="font-bold">{location.name}</h3>
                                    <p className="text-sm text-gray-700">{location.address}</p>
                                    <p className="text-sm text-gray-500">{location.distance}</p>
                                    <div className="mt-2">
                                        <Link
                                            to="/basket"
                                            className="inline-block bg-[#006241] text-white text-sm font-semibold px-4 py-2 rounded-full"
                                        >
                                            Order here
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No locations found.</p>
                        )}
                    </div>
                </div>

                {/* Sağ tərəf - xəritə */}
                <div className="lg:w-[60%]">
                    <iframe
                        src={selectedLocation.iframeSrc}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-[450px] lg:h-[90vh] border-0"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Mapsection;
