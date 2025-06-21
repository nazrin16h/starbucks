import { useBasket } from "../../context/BasketContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Basket() {
    const {
        basketItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromBasket,
    } = useBasket();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex">
            {/* Sol panel */}
            <div className="bg-[#1E3932] text-white w-1/3 p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center mb-8 font-semibold"
                >
                    <span className="mr-2 text-xl">←</span> Back to menu
                </button>

                <h1 className="text-2xl font-bold mb-4">
                    Review order ({basketItems.length})
                </h1>

                <label className="block text-gray-300 text-lg">
                    Pickup store
                    <select className="mt-1 w-full bg-[#1E3932] border-b border-gray-400 focus:outline-none">
                        <option>Choose store</option>
                        <option>Store 1</option>
                    </select>
                </label>
            </div>

            {/* Sağ panel */}
            <div className="w-2/3 p-10 bg-white">
                {basketItems.length === 0 ? (
                    <p className="text-gray-500 text-lg">Your basket is empty.</p>
                ) : (
                    basketItems.map((item) => (
                        <div
                            key={item.uniqueId}
                            className="flex items-center border rounded-md shadow p-6 max-w-[600px] mb-6"
                        >
                            <img
                                src={item.image || item.imageURL}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-full mr-6"
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600 text-lg mt-1">{item.size || "Grande"}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => decreaseQuantity(item.uniqueId)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <FaMinus />
                                </button>
                                <span className="bg-green-700 text-white px-3 py-1 rounded">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => increaseQuantity(item.uniqueId)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <FaPlus />
                                </button>
                                <button
                                    onClick={() => removeFromBasket(item.uniqueId)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Basket;
