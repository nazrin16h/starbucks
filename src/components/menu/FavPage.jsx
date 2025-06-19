import fav from "../../assets/menu-img/fav-tapes.png";
import LocationSelect from "./StoreSelect";
import MenuNavBar from "./MenuNavBar";
const FavPage = () => {
    return (
        <div>
            <MenuNavBar />

            <div className="max-w-md mx-auto text-center p-6">
                <h2 className="text-xl font-bold mb-6 text-left">Favorites</h2>

                <div className="flex justify-center mb-6">
                    <img
                        src={fav}
                        alt="No orders"
                        className="w-32 h-32"
                    />
                </div>

                <h3 className="text-xl font-semibold mb-2">Save your favorite mixes</h3>
                <p className="text-gray-500 mb-6">
                    Use the heart to save customizations. Your favorites will appear here to order again.
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
            <LocationSelect />
        </div>
    );
};

export default FavPage;
