import { FaShoppingBasket } from "react-icons/fa";
import { useBasket } from "../../context/BasketContext";

export default function BasketButton({ onClick }) {
    const { basketItems } = useBasket();

    // Ümumi say
    const totalQuantity = basketItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <button
            onClick={onClick}
            className="  bottom-1 right-5 bg-green-700 hover:bg-green-800 text-white rounded-full w-14 h-14 flex items-center justify-center relative shadow-lg"
            aria-label="Open Basket"
        >
            <FaShoppingBasket size={24} />
            {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold select-none">
                    {totalQuantity}
                </span>
            )}
        </button>
    );
}
