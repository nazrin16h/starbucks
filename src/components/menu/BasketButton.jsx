import { useBasket } from "../../context/BasketContext";
import basket from '../../assets/basket-img.svg';


export default function BasketButton({ onClick }) {
    const { basketItems } = useBasket();

    // Ümumi say
    const totalQuantity = basketItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <button
            onClick={onClick}
            aria-label="Open Basket"
            className="mt-5"
        >
            <img src={basket} alt="img-basket" />
            {totalQuantity > 0 && (
                <span className="absolute top-10 text-[19px] lg:right-92.5  text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold select-none">
                    {totalQuantity}
                </span>
            )}
        </button>
    );
}
