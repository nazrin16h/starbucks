import { useNavigate } from 'react-router-dom'

function StoreSelect() {
    const navigate = useNavigate();
    
    return (
        <div className="fixed bottom-0 w-full  bg-white flex flex-col">
            <div className="bg-[#1e3a34]  text-white px-6 py-4 flex justify-evenly items-center">
                <div>
                    <p className="text-sm">For item availability</p>
                    <div onClick={()=>navigate("/mapSection")} className="flex items-center gap-20 mt-1">
                        <span className="font-bold mr-2">Choose a store</span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <div className="border-t border-white mt-2" />
                </div>
                <div>
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 8h14l1 10H4l1-10zm7-5a3 3 0 013 3v1H9V6a3 3 0 013-3z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default StoreSelect