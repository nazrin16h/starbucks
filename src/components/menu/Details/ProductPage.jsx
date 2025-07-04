import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import short from '../../../assets/cups/short.svg';
import shortActive from '../../../assets/cups/shortactive.svg';
import tall from '../../../assets/cups/tall.svg';
import tallActive from '../../../assets/cups/tallactive.svg';
import grande from '../../../assets/cups/grande.svg';
import grandeActive from '../../../assets/cups/grandeactive.svg';
import venti from '../../../assets/cups/venti.svg';
import ventiActive from '../../../assets/cups/ventiactive.svg';
import { SlLocationPin } from "react-icons/sl";
import { useBasket } from "../../../context/BasketContext";
import Customize from "./Customize";

export default function ProductPage() {
    const { basketItems, addToBasket } = useBasket();
    const { id, subcategory } = useParams();
    const { state } = useLocation();
    const { product } = state || {};

    // LocalStorage-dan seçilmiş ölçü və customized seçimləri oxu
    const [selectedSize, setSelectedSize] = useState(null);
    const [customSelections, setCustomSelections] = useState({});

    useEffect(() => {
        const savedSize = localStorage.getItem("selectedSize");
        if (savedSize) setSelectedSize(savedSize);

        const savedCustom = localStorage.getItem("customDrink");
        if (savedCustom) setCustomSelections(JSON.parse(savedCustom));
    }, []);

    const defaultSize =
        product?.sizes?.find((s) => s.sizeCode === "Grande")?.sizeCode ||
        product?.sizes?.[0]?.sizeCode;
    const [localSelectedSize, setLocalSelectedSize] = useState(selectedSize || defaultSize);

    const [customizeMode, setCustomizeMode] = useState(false);

    const selectedSizeObj = product?.sizes?.find(
        (s) => s.sizeCode.toLowerCase() === localSelectedSize?.toLowerCase()
    );

    const sizeImages = [
        { name: "Short", size: "8 fl oz", img: short, imgActive: shortActive },
        { name: "Tall", size: "12 fl oz", img: tall, imgActive: tallActive },
        { name: "Grande", size: "16 fl oz", img: grande, imgActive: grandeActive },
        { name: "Venti", size: "20 fl oz", img: venti, imgActive: ventiActive },
    ];

    const getSizeImage = (sizeCode, isActive) => {
        const found = sizeImages.find(
            (s) => s.name.toLowerCase() === sizeCode.toLowerCase()
        );
        return isActive ? found?.imgActive : found?.img;
    };
    const getSizeText = (sizeCode) => {
        const found = sizeImages.find(
            (s) => s.name.toLowerCase() === sizeCode.toLowerCase()
        );
        return found?.size || "";
    };

    const handleAddToBasket = () => {
        if (!product || !selectedSizeObj) return;

        addToBasket({
            id: product.productNumber + "-" + selectedSizeObj.sizeCode,
            name: product.name,
            price: selectedSizeObj.price,
            size: selectedSizeObj.sizeCode,
            image: product.imageURL,
            customizations: customSelections, // istəyə bağlı, customized məlumatı əlavə et
        });
    };

    const containerRef = useRef(null);
    const [ringStyle, setRingStyle] = useState({ top: 0, left: 0, width: 0, height: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const selectedButton = container.querySelector(`[data-size="${localSelectedSize}"]`);
        if (selectedButton) {
            const rect = selectedButton.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            setRingStyle({
                top: rect.top - containerRect.top - 6 + "px",
                left: rect.left - containerRect.left - 6 + "px",
                width: rect.width + 12 + "px",
                height: rect.height + 12 + "px",
            });
        }
    }, [localSelectedSize]);

    if (!product) return <p>Product not found.</p>;

    return (
        <div>
            <div className="mx-6 md:mx-28 bg-white text-black text-sm p-4">
                Menu / <span className="font-semibold">{product.name}</span>
            </div>
            <div className="min-h-screen bg-white ">
                {/* Product info */}
                <div className="bg-[#1F3933] flex flex-col lg:flex-row mx-auto justify-start gap-10 items-center px-6 lg:px-10">
                    <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-full max-w-[400px] h-auto object-cover mb-4 lg:mb-0 lg:ml-20"
                    />
                    <div className="flex flex-col float-right">
                        <h1 className="text-[32px] lg:text-[40px] font-bold text-white">{product.name}</h1>
                        <p className="text-gray-300 mt-2 mb-2">5 calories</p>
                    </div>
                </div>

                {/* Size selector */}
                <div className="flex flex-col lg:flex-row lg:mx-27 gap-10 lg:gap-50 px-6 lg:px-0">
                    {!customizeMode && (
                        <div className="px-6 py-8 bg-white" ref={containerRef}>
                            <div className="max-w-4xl mx-auto text-[25px]">
                                <h2 className="font-semibold mb-2">Size options</h2>
                                <hr className="mb-4 border-[#D4E9E2] border-2" />

                                <div className="flex gap-6 flex-wrap text-[15px] font-bold">
                                    {sizeImages.map(({ name }) => {
                                        const hasSize = product.sizes?.some(
                                            (s) => s.sizeCode.toLowerCase() === name.toLowerCase()
                                        );
                                        if (!hasSize) return null;

                                        const isActive = localSelectedSize?.toLowerCase() === name.toLowerCase();
                                        const imageSrc = getSizeImage(name, isActive);

                                        return (
                                            <button
                                                key={name}
                                                data-size={name}
                                                onClick={() => {
                                                    setLocalSelectedSize(name);
                                                    localStorage.setItem("selectedSize", name); // yaddaşa yaz
                                                }}
                                                className={`flex flex-col items-center transition duration-150
                                                    ${isActive ? "text-green-800 font-semibold" : "text-gray-700"}`}
                                            >
                                                <img
                                                    src={imageSrc}
                                                    alt={name}
                                                    className={`w-12 h-12 object-contain transition-all duration-300 ease-out
                                                    ${isActive
                                                            ? "ring-2 ring-[#006241] rounded-full p-1 bg-green-50 scale-110"
                                                            : "scale-110"
                                                        }`}
                                                />
                                                <span className="mt-2">{name}</span>
                                                <span className="text-xs text-gray-500">{getSizeText(name)}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex mt-10 gap-2">
                                <span className="mt-1">
                                    <SlLocationPin />
                                </span>
                                <span className="color-textBlackSoft"> Select a store to view availability</span>
                            </div>

                            {/* --- Burada seçilmiş customizations göstərilir --- */}
                            <div className="mt-10 bg-[#f0f0f0] p-4 rounded-md max-w-md mx-auto">
                                <h3 className="font-semibold mb-2 text-lg">Your Custom Selections:</h3>
                                {Object.keys(customSelections).length === 0 ? (
                                    <p className="text-gray-600">No custom selections yet.</p>
                                ) : (
                                    <ul className="list-disc list-inside text-gray-800">
                                        {Object.entries(customSelections).map(([name, count]) => (
                                            <li key={name}>
                                                {name}: {count} {count > 1 ? "pcs" : "pc"}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Customize düyməsi */}
                    {!customizeMode ? (
                        <div className=" mt-6">
                            <button
                                onClick={() => setCustomizeMode(true)}
                                className="px-8 py-3 border-2 bg-[#1E3932] border-[#1E3932] text-white font-semibold rounded-full text-[20px] duration-200 hover:scale-105"
                            >
                                ✨ Customize
                            </button>
                        </div>
                    ) : (
                        <Customize onDone={() => setCustomizeMode(false)} />
                    )}
                </div>

                {/* Add to Basket düyməsi */}
                <button
                    onClick={handleAddToBasket}
                    className="bg-[#00754A] hover:bg-green-800 fixed bottom-30 right-0 z-120 text-white rounded-full shadow-md text-lg font-bold w-50 h-12"
                >
                    Add to Order
                </button>

                {/* Məhsul haqqında məlumat */}
                <div className="bg-[#1E3932] text-white px-6 mt-10 py-10">
                    <div className="text-sm mb-4">
                        <span className="border px-2 py-1 rounded text-yellow-400 border-yellow-500 mr-2">
                            200+ item
                        </span>
                        Notes of bright citrus and toasted almond.
                    </div>
                    <p className="text-sm leading-relaxed">
                        Starbucks Sunsera Blend™ is crafted for lovers of balanced,
                        smooth, flavorful, easy-drinking coffee—hot or iced, black or
                        with creamer. Just as the name greets the sun, the coffee itself,
                        a blend of semi-washed and sun-dried Brazilian and washed
                        Colombian beans, is shaped by it.
                    </p>
                    <p className="mt-3 text-sm font-medium">
                        <strong>15 calories</strong>, 0g sugar, 0g fat
                    </p>
                    <button className="mt-4 underline text-sm">
                        Full nutrition & ingredients list
                    </button>
                </div>
            </div>
        </div>
    );
}
