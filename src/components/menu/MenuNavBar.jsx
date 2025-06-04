import { NavLink, useNavigate } from 'react-router-dom';


function MenuNavBar() {
    return (
        (
            <div className='sticky top-0 z-50 shadow-sm px-4 bg-[#f9f9f9] lg:w-full h-[50px] border-y-[1px] border-gray-200'>
                <div className='flex flex-row'>
                    <ul className='flex flex-row gap-8 lg:ml-[130px] my-2.5  text-[14px] leading-[1.8] font-medium'>

                        <li>
                            <NavLink
                                to="/menu"
                                className={({ isActive }) =>
                                    `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent  '}`
                                }
                            >
                                Menu
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/feature"
                                className={({ isActive }) =>
                                    `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent  '}`
                                }
                            >
                                Featured
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/previousPage"
                                className={({ isActive }) =>
                                    `py-1 transition-all duration-150 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent  '}`
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

        ))
}

export default MenuNavBar