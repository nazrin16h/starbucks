import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import StoreSelect from "../StoreSelect";
import { SELECTCONTEXT } from "../../../context/SelectContext";

export default function ProductPage({ customizeMode: customizeModeProp }) {
    const { basketItems, addToBasket } = useBasket();
    const { id, subcategory } = useParams();
    const { state } = useLocation();
    const { product } = state || {};
    const [showMessage, setShowMessage] = useState(false);
    const [addedProductName, setAddedProductName] = useState("");
    const [customSelections, setCustomSelections] = useState({});
    const [defaultCount2, setDefaultCount2] = useState(3);

    const [productName, setProductName] = useState(null);
    const [showCustomize, setShowCustomize] = useState(true);
    const [calory, setCalory] = useState(15);
    const [size, setSize] = useState("Grande");
    const [visible, setVisible] = useState(false);

    const {
        allEvents,
        setAllEvents,
        checked,
        setChecked,
        countChai,
        setCountChai,
        countSweet,
        setCountSweet,
        reset,
        idState,
        setIdState,
    } = useContext(SELECTCONTEXT);
    const initialState2 = {
        count: defaultCount2,
        selectedVal: "Water",
        selectedVal2: "Signature Espresso",
        showCustomized: false,
        showCustomized2: false,
    };
    const reset2 = () => {
        setCount(initialState2.count);
        setSelectedVal(initialState2.selectedVal);
        setSelectedVal2(initialState2.selectedVal2);
        setShowCustomized(initialState2.showCustomized);
        setShowCustomized2(initialState2.showCustomized2);
    };
    const [count, setCount] = useState(initialState2.count);
    const [selectedVal, setSelectedVal] = useState(initialState2.selectedVal);
    const [selectedVal2, setSelectedVal2] = useState(initialState2.selectedVal2);
    const [showCustomized, setShowCustomized] = useState(
        initialState2.showCustomized
    );
    const [showCustomized2, setShowCustomized2] = useState(
        initialState2.showCustomized2
    );

    const handleReset = () => {
        reset();
        reset2();
    };
    const handleChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedVal(selectedOption);

        // Əgər seçilən dəyər "No Water"dirsə, Customized yazısını gizlətmək üçün
        if (selectedOption === "No Water") {
            setShowCustomized(false); // Customized yazısını gizlədirik
        } else {
            setShowCustomized(true); // Digər seçimlərdə Customized yazısını göstəririk
        }
    };
    const handleChange2 = (e) => {
        const selectedOption = e.target.value;
        setSelectedVal2(selectedOption);

        // Əgər seçilən dəyər "Decaf Espresso Roast"dirsə, Customized yazısını gizlətmək üçün
        if (selectedOption === "Signature Espresso") {
            setShowCustomized2(false); // Customized yazısını gizlədirik
        } else {
            setShowCustomized2(true); // Digər seçimlərdə Customized yazısını göstəririk
        }
    };

    const defaultCount =
        size === "Short" ? 1 : size === "Tall" ? 2 : size === "Grande" ? 3 : 4;

    useEffect(() => {
        if (size === "Short") {
            setCalory(5);
            setCount(1);
            setDefaultCount2(1);
        } else if (size === "Tall") {
            setCalory(10);
            setCount(2);
            setDefaultCount2(2);
        } else if (size === "Grande") {
            setCalory(15);
            setCount(3);
            setDefaultCount2(3);
        } else if (size === "Venti") {
            setCalory(15);
            setCount(4);
            setDefaultCount2(4);
        } else if (size === "Trenta") {
            setCalory(20);
            setCount(4);
            setDefaultCount2(4);
        }
    }, [size]);
    const chooseSize = (selectedSize) => {
        setSize(selectedSize);
    };
    // console.log(productName);

    const handleCustomize = (val) => {
        setShowCustomize(val);
    };






    const defaultSize =
        product?.sizes?.find((s) => s.sizeCode === "Grande")?.sizeCode ||
        product?.sizes?.[0]?.sizeCode;
    const [localSelectedSize, setLocalSelectedSize] = useState(defaultSize);

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
        const found = sizeImages.find((s) => s.name.toLowerCase() === sizeCode.toLowerCase());
        return isActive ? found?.imgActive : found?.img;
    };

    const getSizeText = (sizeCode) => {
        const found = sizeImages.find((s) => s.name.toLowerCase() === sizeCode.toLowerCase());
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
            customizations: customSelections,
        });

        setAddedProductName(product.name);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
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

    const handleIncrease = (name) => {
        setCustomSelections((prev) => {
            const updated = { ...prev, [name]: (prev[name] || 0) + 1 };
            return updated;
        });
    };

    const handleDecrease = (name) => {
        setCustomSelections((prev) => {
            const updated = { ...prev };
            if (updated[name] <= 1) {
                delete updated[name];
            } else {
                updated[name] -= 1;
            }
            return updated;
        });
    };

    const [customizeMode, setCustomizeMode] = useState(customizeModeProp || false);

    useEffect(() => {
        setCustomizeMode(customizeModeProp);
    }, [customizeModeProp]);

    if (!product) return <p>Product not found.</p>;

    return (
        <div>
            <div className="mx-6 md:mx-28 bg-white text-black text-sm p-4">
                Menu / <span className="font-semibold">{product.name}</span>
            </div>
            <div className="min-h-screen bg-white">
                <div className="bg-[#1F3933] flex flex-col lg:flex-row mx-auto justify-start gap-10 items-center px-6 lg:px-10">
                    <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-full max-w-[400px] h-auto object-cover mb-4 lg:mb-0 lg:ml-20"
                    />
                    <div className="flex flex-col float-right">
                        <h1 className="text-[32px] lg:text-[40px] font-bold text-white">{product.name}</h1>
                        <p className="text-gray-300 mt-2 mb-2">15 calories</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:mx-27 gap-10 lg:gap-50 px-6 lg:px-0">
                    {/* {!customizeMode && (
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
                                                    localStorage.setItem("selectedSize", name);
                                                }}
                                                className={`flex flex-col items-center transition duration-150 ${isActive
                                                    ? "text-green-800 font-semibold"
                                                    : "text-gray-700"
                                                    }`}
                                            >
                                                <img
                                                    src={imageSrc}
                                                    alt={name}
                                                    className={`w-12 h-12 object-contain transition-all duration-300 ease-out ${isActive
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


                        </div>
                    )} */}

                    {/* ele ebeleeeeeeeeeeee */}
                    {showCustomize ? (
                        <div className=" lg:flex flex-row justify-between items-start">
                            <div className="sizes max-w-[450px] px-[1.6rem] lg:w-[50%] xl:w-[40%] xl:mx-[80px] mx-auto mt-[1.3rem]">
                                <div  className="flex flex-row ">
                                    {!customizeMode && (
                                        <div className="px-6 py-8 bg-white" ref={containerRef}>
                                            <div className="max-w-4xl w-[200px] text-[25px]">
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
                                                                    localStorage.setItem("selectedSize", name);
                                                                }}
                                                                className={`flex flex-col items-center transition duration-150 ${isActive
                                                                    ? "text-green-800 font-semibold"
                                                                    : "text-gray-700"
                                                                    }`}
                                                            >
                                                                <img
                                                                    src={imageSrc}
                                                                    alt={name}
                                                                    className={`w-12 h-12 object-contain transition-all duration-300 ease-out ${isActive
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


                                        </div>
                                    )}
                                </div>
                                <form className="mt-10">
                                    <fieldset className="flex items-center justify-center gap-8">
                                        {productName?.sizes &&
                                            productName?.sizes.map((item) => {
                                                const sizeImage = sizeImages.find(
                                                    (ad) => ad.name === item.sizeCode
                                                );

                                                return (
                                                    <label
                                                        key={item.sizeCode}
                                                        onClick={() => chooseSize(item.sizeCode)}
                                                        className={`flex flex-col items-center justify-center cursor-pointer h-[104px] text-center`}
                                                    >
                                                        <img
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.target.src = "/assets/imgError.png";
                                                            }}
                                                            // src={
                                                            //   size === item.sizeCode
                                                            //     ? sizeImage?.imgActive
                                                            //     : sizeImage?.img
                                                            // }
                                                            src={
                                                                sizeImage
                                                                    ? size === item.sizeCode
                                                                        ? sizeImage.imgActive
                                                                        : sizeImage.img
                                                                    : "/assets/imgError.png" // sizeImage tapılmadıqda imgError.png istifadə et
                                                            }
                                                            alt={item?.sizeCode}
                                                            className={`w-[45px] h-[45px]  object-contain ${size === item.sizeCode
                                                                ? " outline-2 outline-[#00754a] outline-offset-2 rounded-full bg-[#f0f7f5] transition-all" // Aktiv olarkən tətbiq olunan siniflər
                                                                : ""
                                                                }`}
                                                        />
                                                        <p className="font-semibold text-[14px] py-1 md:text-[17px]">
                                                            {item?.sizeCode}
                                                        </p>
                                                        <p className="text-[14px] md:text-[15px] ">
                                                            {sizeImage?.size}
                                                        </p>
                                                    </label>
                                                );
                                            })}
                                    </fieldset>
                                </form>
                            </div>
                            <div className="included max-w-[550px] px-[1.6rem] lg:w-[50%] xl:w-[60%] xl:ml-[40px] mx-auto mt-[1.6rem]">
                                <div className="">
                                    <h2 className="font-semibold text-[1.2rem] pb-[1rem] px-2 md:text-[1.7rem] border-b-[4px] border-[#d4e9e2]">
                                        What's included
                                    </h2>
                                </div>
                                {/* LOCALLLSTORAGEDEN GELENLERRRRR */}
                                <div className="mt-5">
                                    {Object.entries(allEvents[idState] || {}).map(
                                        ([key, field], index) => {
                                            const specialOptions = [
                                                "select-Ristretto or Long Shot",
                                                "select-Shot Prep",
                                            ].includes([key, field][0]);

                                            return (
                                                <div key={index} className="mb-4">
                                                    {/* Şərt: Options sayı 2-dən çoxdursa, select göstər */}
                                                    {Array.isArray(field.options) &&
                                                        (field.options.length > 2 || specialOptions) ? (
                                                        <div className="relative">
                                                            <div className="flex items-center relative overflow-hidden justify-end min-h-[47px] border sha
                                                            
                                                            w-[inset_0_1px_4px_#0000001a] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%87%/33%)] rounded-lg px-[16px] py-[12px] md:py-[8px]  mt-8">
                                                                <select
                                                                    id={key}
                                                                    name={key}
                                                                    className={`bg-[#f9f9f9] px-4 pr-10 w-full md:text-[20px] whitespace-normal appearance-none shadow-[inset_0_1px_4px_#0000001a] absolute inset-0 h-full outline-none`}
                                                                    value={field.value || ""}
                                                                    onChange={(e) => {
                                                                        setAllEvents((prev) => ({
                                                                            ...prev,
                                                                            [idState]: {
                                                                                ...prev[idState],
                                                                                [key]: {
                                                                                    ...prev[idState][key],
                                                                                    value: e.target.value,
                                                                                },
                                                                            },
                                                                        }));
                                                                    }}
                                                                >
                                                                    {field.options.map((option, idx) => {
                                                                        return (
                                                                            <option
                                                                                key={idx}
                                                                                value={option.name || option}
                                                                            >
                                                                                {option.name || option}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                                <div className="flex items-center whitespace-normal absolute right-4 top-1/2 transform -translate-y-1/2">
                                                                    <svg
                                                                        aria-hidden="true"
                                                                        className="w-[24px] h-[24px] fill-[#00754a] "
                                                                        focusable="false"
                                                                        preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24"
                                                                        loading="lazy"
                                                                    >
                                                                        <path d="M11.4135 16.2678C11.5585 16.4158 11.7545 16.4998 11.9595 16.4998C12.1645 16.4998 12.3605 16.4158 12.5055 16.2678L17.7745 10.8538C18.0756 10.5438 18.0756 10.0418 17.7745 9.73175C17.4725 9.42275 16.9835 9.42275 16.6825 9.73175L11.9595 14.5848L7.31851 9.81675C7.0165 9.50675 6.5275 9.50675 6.2265 9.81675C5.9245 10.1268 5.9245 10.6288 6.2265 10.9388L11.4135 16.2678Z"></path>
                                                                        <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12Z"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <span className="absolute top-[-50%] transform translate-y-[50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold px-[.4rem]">
                                                                Customized
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        // Options sayı 2 və ya azdırsa, + və - düymələri ilə div göstər
                                                        <div className="flex relative shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%87%/33%)]  rounded-lg justify-between">
                                                            <div>

                                                                <p className="w-full md:text-[1.2rem] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%87%/33%)] outline-none px-[16px] py-[12px] md:py-[9px]">
                                                                    {field.value}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center px-4">
                                                                <button
                                                                    onClick={() => {
                                                                        setAllEvents((prev) => {
                                                                            const updatedField = {
                                                                                ...prev[idState][key],
                                                                            }; // Access key from the idState correctly
                                                                            updatedField.number =
                                                                                updatedField.number > 1
                                                                                    ? updatedField.number - 1
                                                                                    : 1; // Decrease number safely
                                                                            return {
                                                                                ...prev,
                                                                                [idState]: {
                                                                                    ...prev[idState],
                                                                                    [key]: updatedField, // Update the state for the correct key
                                                                                },
                                                                            };
                                                                        });
                                                                    }}
                                                                >
                                                                    {
                                                                        <svg
                                                                            aria-hidden="true"
                                                                            className={`w-[24px] h-[24px] fill-[#00754a] ${field.number === 1 && "hidden"
                                                                                }`}
                                                                            focusable="false"
                                                                            preserveAspectRatio="xMidYMid meet"
                                                                            viewBox="0 0 24 24"
                                                                            loading="lazy"
                                                                        >
                                                                            <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                                            <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                                                        </svg>
                                                                    }
                                                                </button>
                                                                <span className="px-2">{field.number || 0}</span>
                                                                <button
                                                                    onClick={() => {
                                                                        setAllEvents((prev) => {
                                                                            const updatedField = {
                                                                                ...prev[idState][key],
                                                                            }; // Access key from the idState correctly
                                                                            updatedField.number =
                                                                                updatedField.number + 1; // Decrease number safely
                                                                            return {
                                                                                ...prev,
                                                                                [idState]: {
                                                                                    ...prev[idState],
                                                                                    [key]: updatedField, // Update the state for the correct key
                                                                                },
                                                                            };
                                                                        });
                                                                    }}
                                                                >
                                                                    <svg
                                                                        aria-hidden="true"
                                                                        className={` w-[24px] h-[24px] fill-[#00754a] ${field.number === 12 && "hidden"
                                                                            }`}
                                                                        focusable="false"
                                                                        preserveAspectRatio="xMidYMid meet"
                                                                        viewBox="0 0 24 24"
                                                                        loading="lazy"
                                                                    >
                                                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>

                                                            <span className="absolute top-[-50%] transform translate-y-[50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold px-[.4rem]">
                                                                Customized
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )}

                                    {countChai && (
                                        <div className="flex relative w-full mt-8 shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] px-[16px] py-[12px] rounded-lg overflow-hidden justify-between">
                                            <p className="md:text-[20px] ">Add Chai</p>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() =>
                                                        setCountChai((prev) =>
                                                            prev === 1 ? null : Math.max(prev - 1, 1)
                                                        )
                                                    }
                                                >
                                                    {
                                                        <svg
                                                            aria-hidden="true"
                                                            className={`${countChai === null ? "hidden" : "block"
                                                                } w-[24px] h-[24px] fill-[#00754a]`}
                                                            focusable="false"
                                                            preserveAspectRatio="xMidYMid meet"
                                                            viewBox="0 0 24 24"
                                                            loading="lazy"
                                                        >
                                                            <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                            <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                                        </svg>
                                                    }
                                                </button>
                                                <span
                                                    className={`${countChai === null ? "hidden" : "block"
                                                        } px-2`}
                                                >
                                                    {countChai}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setCountChai((prev) =>
                                                            prev === null ? 1 : Math.min(prev + 1, 12)
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className={`${countChai === 12 ? "hidden" : "block"
                                                            } w-[24px] h-[24px] fill-[#00754a]`}
                                                        focusable="false"
                                                        preserveAspectRatio="xMidYMid meet"
                                                        viewBox="0 0 24 24"
                                                        loading="lazy"
                                                    >
                                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {countSweet && (
                                        <div className="flex relative w-full mt-8 shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] px-[16px] py-[12px] rounded-lg overflow-hidden justify-between">
                                            <p className="md:text-[20px] ">Add Classic Syrup</p>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() =>
                                                        setCountSweet((prev) =>
                                                            prev === 1 ? null : Math.max(prev - 1, 1)
                                                        )
                                                    }
                                                >
                                                    {
                                                        <svg
                                                            aria-hidden="true"
                                                            className={`${countSweet === null ? "hidden" : "block"
                                                                } w-[24px] h-[24px] fill-[#00754a]`}
                                                            focusable="false"
                                                            preserveAspectRatio="xMidYMid meet"
                                                            viewBox="0 0 24 24"
                                                            loading="lazy"
                                                        >
                                                            <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                            <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                                        </svg>
                                                    }
                                                </button>
                                                <span
                                                    className={`${countSweet === null ? "hidden" : "block"
                                                        } px-2`}
                                                >
                                                    {countSweet}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setCountSweet((prev) =>
                                                            prev === null ? 1 : Math.min(prev + 1, 12)
                                                        )
                                                    }
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className={`${countSweet === 12 ? "hidden" : "block"
                                                            } w-[24px] h-[24px] fill-[#00754a]`}
                                                        focusable="false"
                                                        preserveAspectRatio="xMidYMid meet"
                                                        viewBox="0 0 24 24"
                                                        loading="lazy"
                                                    >
                                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {checked && (
                                        <div className="flex relative w-full mt-8 shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] px-[16px] py-[12px] rounded-lg overflow-hidden justify-between">
                                            <div className="flex items-center">
                                                <label
                                                    htmlFor="checkbox"
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <span>Personal Cup</span>
                                                    <span className="ml-4">
                                                        <input
                                                            onChange={(e) => setChecked(e.target.checked)}
                                                            className="absolute w-0 h-0 opacity-0 right-4"
                                                            type="checkbox"
                                                            id="checkbox"
                                                        />
                                                        <svg
                                                            aria-hidden="true"
                                                            className={`w-[24px] h-[24px] border absolute right-4 top-3 rounded-lg border-[#00754a] ${checked ? "bg-[#00754a] fill-white" : "fill-none"
                                                                }`}
                                                            focusable="false"
                                                            preserveAspectRatio="xMidYMid meet"
                                                            viewBox="0 0 24 24"
                                                            loading="lazy"
                                                        >
                                                            <path d="M4.29 12.104c-.277-.308-.75-.332-1.06-.054-.306.278-.33.752-.053 1.06l4.485 4.963c.29.322.795.33 1.096.017L20.414 6.003c.288-.298.28-.773-.02-1.06-.297-.288-.772-.28-1.06.02L8.237 16.47 4.29 12.105z"></path>
                                                        </svg>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="water_added">
                                    <div className="shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)]  rounded-lg px-[16px] py-[12px] md:py-[8px] relative  mt-5">
                                        <label
                                            className="absolute left-[12px] text-[#00000094] tracking-wider text-[14px] md:text-[15px] bg-white top-[-50%] transform translate-y-[50%] px-[.4rem]"
                                            htmlFor="name"
                                        >
                                            Add-ins
                                        </label>
                                        {showCustomized && (
                                            <span className="absolute top-[-50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold  px-[.4rem] transform translate-y-[50%]">
                                                Customized
                                            </span>
                                        )}
                                        <select
                                            className="w-full opacity-0 appearance-none absolute inset-0 h-full z-[1] outline-none"
                                            name="name"
                                            id="name"
                                            // value={isCustomized}
                                            onChange={handleChange}
                                        >
                                            <option value="Extra Water">Extra Water</option>
                                            <option value="Light Water">Light Water</option>
                                            <option value="No Water">No Water</option>
                                            <option value="Water">Water</option>
                                        </select>
                                        <span className="flex justify-between">
                                            <span className="md:text-[1.3rem]">{selectedVal}</span>
                                            <svg
                                                aria-hidden="true"
                                                className="w-[24px] h-[24px] fill-[#00754a]"
                                                focusable="false"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 24 24"
                                                loading="lazy"
                                            >
                                                <path d="M11.4135 16.2678C11.5585 16.4158 11.7545 16.4998 11.9595 16.4998C12.1645 16.4998 12.3605 16.4158 12.5055 16.2678L17.7745 10.8538C18.0756 10.5438 18.0756 10.0418 17.7745 9.73175C17.4725 9.42275 16.9835 9.42275 16.6825 9.73175L11.9595 14.5848L7.31851 9.81675C7.0165 9.50675 6.5275 9.50675 6.2265 9.81675C5.9245 10.1268 5.9245 10.6288 6.2265 10.9388L11.4135 16.2678Z"></path>
                                                <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12Z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="shadow-[0_0_0_1px_#00000094] mt-15 focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] rounded-lg px-[16px] py-[12px] md:py-[8px] relative ">
                                    <label
                                        className="absolute left-[12px] text-[#00000094] tracking-wider text-[14px] md:text-[15px] bg-white top-[-70%]  transform translate-y-[50%] px-[.4rem]"
                                        htmlFor="name"
                                    >
                                        Espresso & Shot Options
                                    </label>
                                    {showCustomized2 && (
                                        <span className="absolute top-[-50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold  px-[.4rem] transform translate-y-[50%]">
                                            Customized
                                        </span>
                                    )}
                                    <select
                                        className="w-full opacity-0 appearance-none absolute inset-0 h-full z-[1] outline-none"
                                        name="name"
                                        id="name"
                                        onChange={handleChange2}
                                    >
                                        <option value="Signature Espresso">Signature Espresso</option>
                                        <option value="Blone Espresso">Blone Espresso</option>
                                        <option value="Decaf Espresso Roast">
                                            Decaf Espresso Roast
                                        </option>
                                        <option value=" 1/3 Decaf"> 1/3 Decaf</option>
                                        <option value=" 1/2 Decaf"> 1/2 Decaf</option>
                                        <option value=" 2/3 Decaf"> 2/3 Decaf</option>
                                    </select>
                                    <span className="flex justify-between">
                                        <span className="md:text-[1.3rem]">{selectedVal2}</span>
                                        <svg
                                            aria-hidden="true"
                                            className="w-[24px] h-[24px] fill-[#00754a]"
                                            focusable="false"
                                            preserveAspectRatio="xMidYMid meet"
                                            viewBox="0 0 24 24"
                                            loading="lazy"
                                        >
                                            <path d="M11.4135 16.2678C11.5585 16.4158 11.7545 16.4998 11.9595 16.4998C12.1645 16.4998 12.3605 16.4158 12.5055 16.2678L17.7745 10.8538C18.0756 10.5438 18.0756 10.0418 17.7745 9.73175C17.4725 9.42275 16.9835 9.42275 16.6825 9.73175L11.9595 14.5848L7.31851 9.81675C7.0165 9.50675 6.5275 9.50675 6.2265 9.81675C5.9245 10.1268 5.9245 10.6288 6.2265 10.9388L11.4135 16.2678Z"></path>
                                            <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12Z"></path>
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <div className="shadow-[0_0_0_1px_#00000094] rounded-lg px-[16px] py-[12px] md:py-[8px] relative  mt-8">
                                        <label
                                            className="absolute left-[12px] text-[#00000094] tracking-wider text-[14px] md:text-[15px]  bg-white top-[-50%] transform translate-y-[50%] px-[.4rem]"
                                            htmlFor="name"
                                        >
                                            Espresso & Shot Options
                                        </label>
                                        {count !== defaultCount && (
                                            <span className="absolute top-[-50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold  px-[.4rem] transform translate-y-[50%]">
                                                Customized
                                            </span>
                                        )}
                                        <div className="flex justify-between">
                                            <p className="w-full md:text-[1.3rem]">Shots</p>
                                            <div className="flex items-center">
                                                <button onClick={() => setCount(Math.max(count - 1, 1))}>
                                                    {
                                                        <svg
                                                            aria-hidden="true"
                                                            className={`${count === 1 ? "hidden" : "block"
                                                                } w-[24px] h-[24px] fill-[#00754a] `}
                                                            focusable="false"
                                                            preserveAspectRatio="xMidYMid meet"
                                                            viewBox="0 0 24 24"
                                                            loading="lazy"
                                                        >
                                                            <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                            <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                                        </svg>
                                                    }
                                                </button>
                                                <span className="px-2">{count}</span>
                                                <button
                                                    onClick={() =>
                                                        setCount((prev) => Math.min(prev + 1, 12))
                                                    }
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className={`${count === 12 ? "hidden" : "block"
                                                            } w-[24px] h-[24px] fill-[#00754a]`}
                                                        focusable="false"
                                                        preserveAspectRatio="xMidYMid meet"
                                                        viewBox="0 0 24 24"
                                                        loading="lazy"
                                                    >
                                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cusomize-button text-center lg:text-start">
                                    <button
                                        onClick={() => handleCustomize(false)}
                                        className="bg-[#1e3932] py-[16px] px-[32px] rounded-[500px] text-white mt-[2rem]"
                                    >
                                        <span className="flex items-center font-bold text-[20px]">
                                            <svg
                                                aria-hidden="true"
                                                className="w-[24px] h-[24px] fill-[#cba258] mr-2"
                                                focusable="false"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 24 24"
                                                loading="lazy"
                                            >
                                                <path d="M9.818 3.166a.55.55 0 0 0-.271.572l.914 5.377-4.908 2.895a.55.55 0 0 0 .174 1.013l5.587 1.112.913 5.377a.55.55 0 0 0 1.02.183l2.806-4.867 5.59.524a.55.55 0 0 0 .449-.928l-3.856-4.049 2.301-5.094a.55.55 0 0 0-.73-.726l-5.102 2.34-4.258-3.666a.55.55 0 0 0-.629-.063zm1.069 1.893 3.367 2.9a.55.55 0 0 0 .588.082l4.088-1.875-1.848 4.094a.55.55 0 0 0 .102.607l3.097 3.252-4.476-.42a.55.55 0 0 0-.53.274l-2.218 3.847-.723-4.244a.55.55 0 0 0-.434-.447l-4.545-.904 3.99-2.354a.55.55 0 0 0 .264-.566ZM17.375.848a.25.25 0 0 0-.25.148c-.247.566-.334.828-.395.893a.25.25 0 0 0-.005.006c-.03.034-.072.062-.186.113-.114.05-.288.117-.521.23a.25.25 0 0 0-.036.428c.21.151.368.247.471.316.103.07.139.102.162.141a.25.25 0 0 0 .004.008c.047.073.087.345.23.943a.25.25 0 0 0 .473.043c.248-.565.335-.827.395-.892a.25.25 0 0 0 .004-.006c.03-.035.073-.063.187-.114.114-.05.286-.118.52-.232a.25.25 0 0 0 .037-.428c-.21-.15-.368-.245-.47-.314-.104-.07-.142-.104-.165-.143a.25.25 0 0 0-.004-.006c-.047-.073-.087-.346-.23-.945a.25.25 0 0 0-.221-.19Zm-.086.972c.03.122.052.328.117.43.08.13.19.215.309.295.023.016.062.044.088.06a8.775 8.775 0 0 0-.098.043.988.988 0 0 0-.357.239c-.082.09-.138.29-.19.406-.03-.123-.051-.33-.117-.432a.974.974 0 0 0-.31-.295l-.088-.058.1-.045a.971.971 0 0 0 .357-.238c.081-.09.137-.29.19-.405zm.805 16.998a.25.25 0 0 0-.235.143c-.373.782-.477 1.131-.615 1.26a.25.25 0 0 0-.006.004c-.134.132-.479.212-1.265.54a.25.25 0 0 0-.016.456c.763.384 1.099.488 1.225.63a.25.25 0 0 0 .005.006c.13.139.21.494.53 1.301a.25.25 0 0 0 .457.016c.373-.782.477-1.132.615-1.26a.25.25 0 0 0 .006-.006c.134-.133.477-.213 1.264-.54a.25.25 0 0 0 .017-.454c-.762-.384-1.099-.488-1.224-.63a.25.25 0 0 0-.006-.007c-.13-.138-.21-.493-.53-1.3a.25.25 0 0 0-.222-.159Zm-.03.836c.121.358.227.76.415.961.186.21.573.348.925.502-.361.129-.757.237-.957.434-.2.187-.334.58-.478.928-.121-.36-.227-.762-.416-.963-.186-.209-.572-.345-.922-.498.36-.129.755-.24.955-.436.2-.187.334-.58.478-.928zM22.5 8.75a.754.754 0 0 0-.75.75c0 .411.339.75.75.75s.75-.339.75-.75a.754.754 0 0 0-.75-.75zm0 .5c.141 0 .25.109.25.25 0 .141-.109.25-.25.25a.246.246 0 0 1-.25-.25c0-.141.109-.25.25-.25zm-19 6.5a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75Zm1.5-10c-.687 0-1.25.563-1.25 1.25S4.313 8.25 5 8.25 6.25 7.687 6.25 7 5.687 5.75 5 5.75Zm0 .5c.417 0 .75.333.75.75s-.333.75-.75.75A.746.746 0 0 1 4.25 7c0-.417.333-.75.75-.75Zm5.746 7.771-8.41 8.41a.55.55 0 0 0 .777.78l8.328-8.328-.127-.748z"></path>
                                            </svg>
                                            Customize
                                        </span>
                                    </button>
                                </div>

                                <div className="text-center lg:text-start pt-[3rem]">
                                    <button
                                        onClick={handleReset}
                                        className="px-[16px] py-[7px] font-semibold border border-[#00754a] hover:bg-[#e5f1ec] text-[#00754a] rounded-full"
                                    >
                                        Reset to standard recipe
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Customize
                            handleCustomize={handleCustomize}
                            count={count}
                            setCount={setCount}
                            size={size}
                        />
                    )}

                </div>

                <button
                    onClick={handleAddToBasket}
                    className="bg-[#00754A] hover:bg-green-800 fixed bottom-35 right-0 z-120 text-white rounded-full shadow-md text-lg font-bold w-50 h-12"
                >
                    Add to Order
                </button>

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

            {showMessage && (
                <div className="fixed bottom-20 w-full bg-green-700 text-white px-4 py-3 pr-10 shadow-lg z-50">
                    <button
                        onClick={() => setShowMessage(false)}
                        className="absolute top-1 right-2 text-white text-xl font-bold"
                    >
                        ×
                    </button>
                    <p className="text-sm font-medium">
                        ✅ <span className="font-semibold">{addedProductName}</span> added to basket
                    </p>
                </div>
            )}

            <StoreSelect />
        </div>
    );
}
