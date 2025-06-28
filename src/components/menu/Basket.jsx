import { useBasket } from "../../context/BasketContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../../Logo";

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
            <div className="bg-[#1E3932] text-white w-full lg:w-1/3 py-6">
                <div className="flex flex-row ">
                    <div className="w-[60px] mb-8 mr-4">
                        <Logo className="bg-amber-300" />
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center mb-8 font-semibold"
                    >
                        <span className="mr-2 text-xl"><IoIosArrowBack /></span> Back to menu
                    </button>

                </div>
                <div className="flex flex-col mx-auto justify-center mt-[200px]">
                    <h1 className="text-2xl font-bold mb-4">
                        Review order ({basketItems.length})
                    </h1>

                    <label className="block text-gray-300 text-lg">

                        <select
                            className="mt-1 w-full max-w-xs bg-[#1E3932] border-b border-gray-400 focus:outline-none"
                        >
                            <option>
                                <Link to={'/mapsection'}>
                                    Pickup store
                                </Link>
                            </option>
                            <option>Store 1</option>
                        </select>
                    </label>
                </div>
            </div>

            {/* Sağ panel */}
            <div className="w-full lg:w-2/3 p-6 bg-white">
                {groupedItems.length === 0 ? (
                    <p className="text-gray-500 text-lg text-center mt-10">Your basket is empty.</p>
                ) : (
                    groupedItems.map(({ name, totalQuantity, sampleItem }) => (
                        <div
                            key={name}
                            className="flex flex-col sm:flex-row items-center sm:items-start border rounded-md shadow p-4 w-full sm:max-w-[600px] mb-6 mx-auto overflow-hidden"
                        >
                            <img
                                src={sampleItem.image || sampleItem.imageURL}
                                alt={name}
                                className="w-24 h-24 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6"
                            />
                            <div className="flex-1 text-center sm:text-left min-w-0">
                                <h2 className="text-xl sm:text-2xl font-semibold truncate">{name}</h2>
                            </div>
                            <div className="flex items-center gap-3 mt-4 sm:mt-0 flex-wrap justify-center sm:justify-start">
                                <button onClick={() => decreaseQuantityByName(name)} className="p-2 rounded-full hover:bg-gray-200">
                                    <FaMinus />
                                </button>
                                <span className="bg-green-700 text-white px-3 py-1 rounded">{totalQuantity}</span>
                                <button onClick={() => increaseQuantityByName(name)} className="p-2 rounded-full hover:bg-gray-200">
                                    <FaPlus />
                                </button>
                                <button onClick={() => removeByName(name)} className="p-2 rounded-full hover:bg-gray-200">
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
