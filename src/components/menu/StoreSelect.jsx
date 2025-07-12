import { useNavigate } from 'react-router-dom'
import BasketButton from './BasketButton';

function StoreSelect() {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 w-full  bg-white flex flex-col cursor-pointer">
            <div className="bg-[#1e3a34]  text-white px-6 py-4 flex justify-evenly items-center">
                <div>
                    <p className="text-sm">For item availability</p>
                    <div onClick={() => navigate("/mapSection")} className="flex items-center gap-20 mt-1">
                        <span className="font-bold mr-2">Choose a store  </span>
                        <svg
                            aria-hidden="true"
                            className="w-[18px] h-[18px] lg:ml-10 fill-white"
                            focusable="false"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                            loading="lazy"
                        >
                            <path d="M11.96 15.5c-.206 0-.402-.084-.546-.232l-5.188-5.33c-.3-.31-.3-.81 0-1.12.3-.31.79-.31 1.093 0l4.64 4.767 4.723-4.853c.3-.31.79-.31 1.09 0 .303.31.303.812.002 1.122l-5.27 5.414c-.145.148-.34.232-.546.232"></path>
                        </svg>
                    </div>
                    <div className="border-t border-white mt-2" />
                </div>
                <div>
                    <BasketButton onClick={() => navigate("/basket")} />

                    {/* <svg
                        aria-hidden="true"
                        className="w-[18px] h-[18px] lg:ml-10 fill-white"
                        focusable="false"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                        loading="lazy"
                    >
                        <path d="M11.96 15.5c-.206 0-.402-.084-.546-.232l-5.188-5.33c-.3-.31-.3-.81 0-1.12.3-.31.79-.31 1.093 0l4.64 4.767 4.723-4.853c.3-.31.79-.31 1.09 0 .303.31.303.812.002 1.122l-5.27 5.414c-.145.148-.34.232-.546.232"></path>
                    </svg> */}
                </div>
            </div>
        </div>
    )
}

export default StoreSelect