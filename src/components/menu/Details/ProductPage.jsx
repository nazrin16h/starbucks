import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import short from '../../../assets/cups/short.svg';
import shortActive from '../../../assets/cups/shortactive.svg';
import tall from '../../../assets/cups/tall.svg';
import tallActive from '../../../assets/cups/tallactive.svg';
import grande from '../../../assets/cups/grande.svg';
import grandeActive from '../../../assets/cups/grandeactive.svg';
import venti from '../../../assets/cups/venti.svg';
import ventiActive from '../../../assets/cups/ventiactive.svg';
import { useParams } from "react-router-dom";
import StoreSelect from "../StoreSelect";
import { SlLocationPin } from "react-icons/sl";

export default function ProductPage() {
    const { id, subcategory } = useParams();
    const { state } = useLocation();
    const { product } = state || {};
    const defaultSize = product?.sizes?.find(s => s.sizeCode === "Grande")?.sizeCode || product?.sizes?.[0]?.sizeCode;
    const [selectedSize, setSelectedSize] = useState(defaultSize);

    if (!product) return <p>Product not found.</p>;

    const sizeImages = [
        { name: "Short", size: "8 fl oz", img: short, imgActive: shortActive },
        { name: "Tall", size: "12 fl oz", img: tall, imgActive: tallActive },
        { name: "Grande", size: "16 fl oz", img: grande, imgActive: grandeActive },
        { name: "Venti", size: "20 fl oz", img: venti, imgActive: ventiActive },
    ];

    const getSizeImage = (sizeCode, isActive) => {
        const found = sizeImages.find(s => s.name.toLowerCase() === sizeCode.toLowerCase());
        return isActive ? found?.imgActive : found?.img;
    };
    const getSizeText = (sizeCode) => {
        const found = sizeImages.find(s => s.name.toLowerCase() === sizeCode.toLowerCase());
        return found?.size || "";
    };

    const containerRef = useRef(null);
    const [ringStyle, setRingStyle] = useState({ top: 0, left: 0, width: 0, height: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const selectedButton = container.querySelector(`[data-size="${selectedSize}"]`);
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
    }, [selectedSize]);

    return (
        <div>
            <div className="mx-6 md:mx-28 bg-white text-black text-sm p-4">
                Menu / <span className="font-semibold">{product.name}</span>
            </div>
            <div className="min-h-screen bg-white ">

                {/* Burada flex-col mobil üçün, lg və üstü flex-row */}
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

                {/* Yenə mobil üçün sütun, desktop üçün flex-row */}
                <div className="flex flex-col lg:flex-row lg:mx-27 gap-10 lg:gap-50 px-6 lg:px-0">

                    <div className="px-6 py-8 bg-white" ref={containerRef}>
                        <div className="max-w-4xl mx-auto text-[25px]">
                            <h2 className="font-semibold mb-2">Size options</h2>
                            <hr className="mb-4 border-[#D4E9E2] border-2" />

                            <div className="flex gap-6 flex-wrap text-[15px] font-bold">
                                {sizeImages.map(({ name }) => {
                                    const hasSize = product.sizes?.some(
                                        s => s.sizeCode.toLowerCase() === name.toLowerCase()
                                    );
                                    if (!hasSize) return null;

                                    const isActive = selectedSize.toLowerCase() === name.toLowerCase();
                                    const imageSrc = getSizeImage(name, isActive);

                                    return (
                                        <button
                                            key={name}
                                            data-size={name}
                                            onClick={() => setSelectedSize(name)}
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
                            <span className="mt-1"><SlLocationPin /></span>
                            <span className="color-textBlackSoft"> Select a store to view availability</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button className="px-8 py-3 border-2 bg-[#1E3932] border-[#1E3932] text-white font-semibold rounded-full text-[20px] duration-200 hover:scale-105">
                            ✨ Customize
                        </button>
                    </div>
                </div>

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


                <div className="fixed bottom-6 right-6 left-6 lg:right-6 lg:left-auto max-w-[400px] mx-auto lg:mx-0">
                    <button className="bg-[#00754A] hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-md text-lg font-bold w-full">
                        Add to Order
                    </button>
                </div>
            </div>
            <StoreSelect />
        </div>
    );
}
