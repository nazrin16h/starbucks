import prev from "../../assets/menu-img/moon-phases.gif";
import LocationSelect from "./StoreSelect";
import MenuNavBar from "./MenuNavBar";
const PrevPage = () => {

    return (
        <div>
                <MenuNavBar/>
            <div className="max-w-md mx-auto text-center p-6">

                <h2 className="text-xl font-bold mb-6 text-left">Previous</h2>

                <div className="flex justify-center mb-6">
                    <img
                        src={prev}
                        alt="No orders"
                        className="w-32 h-32"
                    />
                </div>

                <h3 className="text-xl font-semibold mb-2">When history repeats itself</h3>
                <p className="text-gray-500 mb-6">
                    Previous orders will appear here to quickly order again.
                </p>

                <div className="flex justify-center gap-4">
                    <button className="border border-black rounded-full px-4 py-2 text-black hover:bg-gray-100 transition">
                        Sign in
                    </button>
                    <button className="bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800 transition">
                        Join now
                    </button>
                </div>
            </div>
            <LocationSelect/>
        </div>
    );
};

export default PrevPage;
