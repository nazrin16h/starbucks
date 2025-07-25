import { useEffect, useRef, useState } from 'react'
import { MdOutlineClose } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import Logo from '../../Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';



function Header() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const simpleHeaderPaths = ['/signup', '/signin'];
    const isSimpleHeader = simpleHeaderPaths.includes(location.pathname);


    return (
        <div className='font-helvetica' >
            <header className="relative  top-0 left-0 w-full p-4 z-50 
            dark:text-gray-800" style={{ boxShadow: '0 2px 5px -1px rgba(0, 0, 0, 0.2)' }}>
                <div className="container flex justify-between h-16 mx-auto">
                    <div className="flex">

                        <div className='w-[64px] h-[64px]' onClick={() => {
                            setActiveIndex(null);
                        }}>
                            <Logo />
                        </div>

                        <div>
                            {!isSimpleHeader && (
                                <ul className=".header-lists items-stretch hidden lg:flex text-[15px] gap-5 font-bold uppercase">
                                    <li className="inline-block items-center mt-5 pl-6">
                                        <Link
                                            to="/menu"
                                            className={`pb-2 hover:text-[#00754A] block ${activeIndex === 0
                                                ? "border-b-[6px] border-[#006241] pb-[32px]"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                setActiveIndex(0);
                                                // Yalnız sidebar açıqdırsa klikdə bağla
                                                if (sidebarOpen) {
                                                    setSidebarOpen(false);
                                                }
                                            }}
                                        >
                                            Menu
                                        </Link>
                                    </li>

                                    <li className="inline-block items-center mt-5">
                                        <Link
                                            to="/rewards"
                                            className={`px-2 pb-2 hover:text-[#00754A] block ${activeIndex === 1 ? "border-b-[6px] border-[#006241] pb-[32px]" : ""
                                                }`}
                                            onClick={() => {
                                                setActiveIndex(1);
                                            }}>
                                            Rewards
                                        </Link>
                                    </li>

                                    <li className="inline-block items-center mt-5">
                                        <Link
                                            to="/giftCards"
                                            className={`px-2  pb-2 hover:text-[#00754A] block ${activeIndex === 2 ? "border-b-[6px] border-[#006241] pb-[32px]" : ""
                                                }`}
                                            onClick={() => {
                                                setActiveIndex(2);
                                            }}>
                                            Gift Cards
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>

                    </div>
                    <div className="items-center gap-5 flex-shrink-0 hidden lg:flex">
                        <div className='flex flex-row hover:text-[#00754A]'>
                            <Link to={'/mapSection'} className='flex items-center px-1 pr-4  -mb-1 font-bold  text-bold dark:border- '><MdLocationPin size={25} />Find a store</Link>
                        </div>
                        <Link
                            to={'/signin'}
                            type="button" className="px-4 py-1 font-semibold border rounded-full dark:border-gray-800 dark:text-gray-800 hover:bg-gray-200 transition duration-300" >Sign in</Link>
                        <Link
                            to={'/signup'}
                            type="button" className="px-4 py-1 font-semibold rounded-full bg-gray-950 dark:text-gray-100 hover:bg-gray-600 transition duration-300">Join now </Link>
                    </div>
                    {/* Menyu düyməsi */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:block  block lg:hidden duration-300 transition-[max-height]"
                    >
                        {isOpen ? '' : <IoMdMenu size={24} />}
                    </button>

                </div>

            </header>
            <div>
                {
                    <div
                        ref={menuRef}
                        className={`lg:hidden fixed top-0 pt-[100px] right-0 w-74 h-full bg-white z-60  p-4  transform transition-transform duration-400  ease-in-out
                        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                        <div className="flex flex-col items-start gap-y-4 p-4 top-10 fixed ">
                            <div className="flex flex-col items-end gap-y-4 p-4 top-4 right-4 fixed">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="md:hidden duration-300 transition-[max-height] ease-[cubic-bezier(0.17,0.67,0.83,0.67)]"
                                >
                                    {isOpen ? <MdOutlineClose size={26} /> : ''}
                                </button>
                            </div>

                            <ul className="space-y-6 font-medium ">
                                <li><Link
                                    to="/menu"
                                    onClick={() => {
                                        setActiveIndex(0);
                                    }}>Menu</Link></li>
                                <li><Link
                                    to="/rewards"
                                    onClick={() => {
                                        setActiveIndex(0);
                                    }}>Rewards</Link></li>
                                <li><Link
                                    to="/giftCards"
                                    onClick={() => {
                                        setActiveIndex(0);
                                    }}>Gift Cards</Link></li>
                            </ul>

                            <hr className="w-full border-gray-300" />

                            <div className='flex flex-row gap-2'>
                                <Link
                                    to={"/signin"}
                                    type="button"
                                    className="px-4 py-1 font-semibold border rounded-full border-gray-800 text-gray-800 hover:bg-gray-200 transition duration-300">
                                    Sign in
                                </Link>

                                <Link
                                    to={"/signup"}
                                    type="button"
                                    className="px-4 py-1 font-semibold rounded-full bg-gray-950 text-gray-100 hover:bg-gray-600 transition duration-300">
                                    Join now
                                </Link>
                            </div>

                            <div className="flex items-center space-x-2 hover:text-[#00754A] cursor-pointer">
                                <MdLocationPin size={25} />
                                <span className="font-bold" onClick={() => navigate("/mapSection")}>Find a store</span>
                            </div>
                        </div>
                    </div>


                }
            </div>





        </div>
    )
}

export default Header