import { NavLink } from 'react-router-dom';

function MenuNavBar() {
    return (
        <div className='sticky top-0 z-50 shadow-sm bg-[#f9f9f9] w-full h-[50px] border-y border-gray-200'>
            <div className='flex flex-wrap lg:mx-[3%]  justify-center my-2.5 text-[14px] leading-[1.8] lg:flex-nowrap lg:gap-8 lg:px-6 lg:justify-start'>
                <ul className='flex flex-wrap justify-center gap-2 text-[14px] lg:flex-nowrap lg:gap-8 lg:px-0 lg:ml-16'>
                    <li>
                        <NavLink
                            to="/menu"
                            className={({ isActive }) =>
                                `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`
                            }
                        >
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/feature"
                            className={({ isActive }) =>
                                `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`
                            }
                        >
                            Featured
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/previousPage"
                            className={({ isActive }) =>
                                `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`
                            }
                        >
                            Previous
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/favouritePage"
                            className={({ isActive }) =>
                                `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`
                            }
                        >
                            Favorites
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MenuNavBar;
