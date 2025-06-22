import { useBasket } from "../../context/BasketContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Basket() {
    const {
        basketItems,
        increaseQuantityByName,
        decreaseQuantityByName,
        removeByName,
    } = useBasket();
    const navigate = useNavigate();

    const uniqueNames = [...new Set(basketItems.map(item => item.name))];

    const groupedItems = uniqueNames.map(name => {
        const items = basketItems.filter(item => item.name === name);
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const sampleItem = items[0];

        return { name, totalQuantity, sampleItem };

    });
    console.log("basketItems:", basketItems);
    


    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Sol panel */}
            <div className="bg-[#1E3932] text-white w-full lg:w-1/3 p-6">
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
            <div className="w-full lg:w-2/3 p-6 bg-white">
                {groupedItems.length === 0 ? (
                    <p className="text-gray-500 text-lg text-center mt-10">Your basket is empty.</p>
                ) : (
                    groupedItems.map(({ name, totalQuantity, sampleItem }) => (
                        <div
                            key={name}
                            className="flex flex-col sm:flex-row items-center border rounded-md shadow p-4 max-w-full sm:max-w-[600px] mb-6 mx-auto"
                        >

                            <img
                                src={sampleItem.image || sampleItem.imageURL}
                                alt={name}
                                className="w-24 h-24 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6"
                            />
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-xl sm:text-2xl font-semibold">{name}</h2>
                            </div>

                            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                                <button
                                    onClick={() => decreaseQuantityByName(name)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <FaMinus />
                                </button>
                                <span className="bg-green-700 text-white px-3 py-1 rounded">
                                    {totalQuantity}
                                </span>
                                <button
                                    onClick={() => increaseQuantityByName(name)}
                                    className="p-2 rounded-full hover:bg-gray-200"
                                >
                                    <FaPlus />
                                </button>
                                <button
                                    onClick={() => removeByName(name)}
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
