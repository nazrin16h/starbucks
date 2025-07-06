import { useBasket } from "../../context/BasketContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../../Logo";
import { GoTrash } from "react-icons/go";

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
                <div className="flex flex-row px-4 ">
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
                <div className="flex flex-col mx-auto justify-center px-10 mt-[200px]">
                    <h1 className="text-2xl font-bold mb-4">
                        Review order ({basketItems.length})
                    </h1>
                    <label className="block text-gray-300 text-lg">
                        <Link to={'/mapsection'}>
                            <select
                                className="mt-1 w-full max-w-xs bg-[#1E3932] border-b border-gray-400 focus:outline-none"
                            >
                                <option>
                                    Pickup store
                                </option>

                            </select>
                        </Link>
                    </label>
                </div>
            </div>

            {/* Sağ panel */}
            <div className="w-full lg:w-2/3 p-6 bg-white ">
                {groupedItems.map(({ name, totalQuantity, sampleItem }) => (
                    <div
                        key={name}
                        className="flex items-center justify-between p-4 border rounded-xl shadow mb-4 max-w-xl mx-auto"
                    >
                        {/* Şəkil */}
                        <img
                            src={sampleItem.image || sampleItem.imageURL}
                            alt={name}
                            className="w-24 h-24 rounded-full object-cover"
                        />

                        {/* Məhsul məlumatları */}
                        <div className="flex-1 ml-4">
                            <h2 className="font-semibold text-lg leading-tight">{name}</h2>
                            <p className="text-sm text-gray-500 mt-1">{sampleItem.size}</p>
                        </div>

                        {/* Funksiya düymələri (SVG-lər dəyişmədən saxlanılıb) */}
                        <div className="flex items-center gap-2">
                            <button className="ml-5">
                                <Link to={`/menu`}>
                                    <svg aria-hidden="true" class="w-[24px] h-[24px] overflow-visible fill-[#686868]" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="m2.646 14.757 11.209-11.15.978.94c.198.19.512.184.702-.015a.5.5 0 0 0-.016-.704l-.959-.922 1.13-1.123a.99.99 0 0 1 1.385-.012l1.13 1.086a.998.998 0 0 1 .012 1.426L5.15 17.281c-.418.417-.95.699-1.528.811l-2.118.413a.012.012 0 0 1-.014-.014l.308-2.057a2.99 2.99 0 0 1 .848-1.677ZM19.235 1.778 18.105.693a2.476 2.476 0 0 0-3.464.028L1.597 13.696a4.485 4.485 0 0 0-1.272 2.516l-.308 2.056a1.505 1.505 0 0 0 1.772 1.704l2.117-.413A4.461 4.461 0 0 0 6.2 18.343L19.266 5.345a2.496 2.496 0 0 0-.031-3.567Z"></path></svg>
                                </Link>
                            </button>
                            <button onClick={() => decreaseQuantityByName(name)} className="p-2 rounded-full hover:bg-gray-200">
                                <svg aria-hidden="true" class="W-[24px] h-[24px] overflow-visible fill-[#686868]" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M 10.993 3.503 C 12.358 3.503 13.637 3.868 14.74 4.506 C 15.677 4.483 16.611 4.586 17.52 4.81 C 12.755 -0.216 4.339 1.804 2.371 8.446 C 1.409 11.692 2.349 15.203 4.804 17.533 C 4.58 16.624 4.476 15.689 4.498 14.753 C 1.614 9.753 5.22 3.503 10.99 3.503 C 10.991 3.503 10.991 3.503 10.993 3.503 Z M 10.493 14.503 L 19.488 14.503 C 19.873 14.503 20.114 14.92 19.921 15.253 C 19.832 15.408 19.667 15.503 19.488 15.503 L 15.49 15.503 L 14.499 15.487 C 14.499 15.872 14.491 15.503 14.491 15.503 L 10.493 15.503 C 10.109 15.503 9.868 15.087 10.061 14.753 C 10.15 14.599 10.315 14.503 10.493 14.503 Z"></path><path d="M 14.991 24.003 C 21.916 24.003 26.243 16.503 22.781 10.503 C 21.174 7.719 18.205 6.003 14.991 6.003 C 8.067 6.003 3.739 13.503 7.201 19.503 C 8.808 22.288 11.778 24.003 14.991 24.003 Z M 14.991 22.503 C 9.22 22.503 5.614 16.253 8.499 11.253 C 9.839 8.933 12.314 7.503 14.991 7.503 C 20.762 7.503 24.367 13.753 21.483 18.753 C 20.143 21.074 17.67 22.503 14.991 22.503 Z"></path></svg>
                            </button>
                            <span className="bg-green-700 text-white px-3 py-1 rounded">{totalQuantity}</span>
                            <button onClick={() => increaseQuantityByName(name)} className="p-2 rounded-full hover:bg-gray-200">
                                <svg aria-hidden="true" class="W-[24px] h-[24px] overflow-visible fill-[#686868]" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M10 2.5c1.366 0 2.646.365 3.75 1.003a10.524 10.524 0 0 1 2.781.304A9 9 0 1 0 3.807 16.53a10.523 10.523 0 0 1-.305-2.78A7.5 7.5 0 0 1 10 2.5ZM14 9a.5.5 0 0 1 .5.5v4h4a.5.5 0 0 1 0 1h-4v4a.5.5 0 0 1-1 0v-4h-4a.5.5 0 0 1 0-1h4v-4A.5.5 0 0 1 14 9Z"></path><path d="M14 23a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-1.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"></path></svg>
                            </button>
                            <button onClick={() => removeByName(name)} className="p-2 rounded-full hover:bg-gray-200">
                                <GoTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Basket;
