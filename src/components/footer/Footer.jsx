import React, { useState } from "react";
import {
    FaSpotify,
    FaFacebookF,
    FaPinterestP,
    FaInstagram,
    FaYoutube,
    FaXTwitter,
} from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi";

const AccordionItem = ({ title, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-t-2  border-gray-200">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex justify-between items-center py-4 text-sm font-medium text-gray-900 hover:text-gray-700 focus:outline-none"
            >
                <span>{title}</span>
                <HiChevronDown
                    className={`transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                        }`}
                    size={20}
                />
            </button>
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? "max-h-60" : "max-h-0"
                    }`}
            >
                <ul className="pb-4 text-sm text-gray-500 space-y-2">{children}</ul>
            </div>
        </div>
    );
};

function Footer() {
    return (
        <div className="border-t-1 border-gray-300 px-2 " >
            <footer className="bg-white lg:w-full  mx-auto ">
                <div className="mx-auto w-full max-w-screen-xl">
                    <div className="md:hidden">
                        <AccordionItem title="About Us">
                            <li>
                                <a href="#" className="hover:text-black">
                                    Our Company
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Our Coffee
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    About Starbucks
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Starbucks Archive
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Investor Relations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Customer Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Contact Us
                                </a>
                            </li>
                        </AccordionItem>

                        <AccordionItem title="Careers">
                            <li>
                                <a href="#" className="hover:text-black">
                                    Culture and Values
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Belonging at Starbucks
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    College Achievement Plan
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Alumni Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    U.S. Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    International Careers
                                </a>
                            </li>
                        </AccordionItem>

                        <AccordionItem title="Social Impact">
                            <li>
                                <a href="#" className="hover:text-black">
                                    Communities
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Starbucks Foundation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Sustainability
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Environmental and Social Impact Reporting
                                </a>
                            </li>
                        </AccordionItem>

                        <AccordionItem title="For Business Partners">
                            <li>
                                <a href="#" className="hover:text-black">
                                    Landlord Support Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Suppliers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Corporate Gift Card Sales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Office and Foodservice Coffee
                                </a>
                            </li>
                        </AccordionItem>

                        <AccordionItem title="Order and Pick Up">
                            <li>
                                <a href="#" className="hover:text-black">
                                    Order on the App
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Order on the Web
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Delivery
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Order and Pick Up Options
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-black">
                                    Explore and Find Coffee for Home
                                </a>
                            </li>
                        </AccordionItem>
                    </div>

                    <div className="hidden md:grid grid-cols-2 gap-15 px-4 py-6 lg:py-8 md:grid-cols-5 ">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                About Us
                            </h2>
                            <ul className="text-gray-500 font-medium space-y-2">
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Our Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Our Coffee
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        About Starbucks
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Starbucks Archive
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Investor Relations
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Customer Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Careers
                            </h2>
                            <ul className="text-gray-500 font-medium space-y-2">
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Culture and Values
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Belonging at Starbucks
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        College Achievement Plan
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Alumni Community
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        U.S. Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        International Careers
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Social Impact
                            </h2>
                            <ul className="text-gray-500 font-medium space-y-2">
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Communities
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Starbucks Foundation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Sustainability
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Environmental and Social Impact Reporting
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                For Business Partners
                            </h2>
                            <ul className="text-gray-500 font-medium space-y-2 ">
                                <li>
                                    <a href="#" className=" hover:text-black  ">
                                        Landlord Support Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Suppliers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Corporate Gift Card Sales
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Office and Foodservice Coffee
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                Order and Pick Up
                            </h2>
                            <ul className="text-gray-500 font-medium space-y-2">
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Order on the App
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Order on the Web
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Delivery
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Order and Pick Up Options
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">
                                        Explore and Find Coffee for Home
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr className="text-gray-300  container " />



                    <div className="px-4 py-6 md:flex gap-4 md:flex-col md:items-start">
                        {/* Sosial ikonlar */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {[
                                <FaSpotify />,
                                <FaFacebookF />,
                                <FaPinterestP />,
                                <FaInstagram />,
                                <FaYoutube />,
                                <FaXTwitter />,
                            ].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                                >
                                    {Icon}
                                </a>
                            ))}
                        </div>

                        <nav className="flex flex-col space-y-2 gap-2 ">
                            <a href="#" className="hover:underline">
                                Privacy Notice
                            </a>
                            <a href="#" className="hover:underline">
                                Consumer Health Privacy Notice
                            </a>
                            <a href="#" className="hover:underline">
                                Terms of Use
                            </a>
                            <a href="#" className="hover:underline">
                                Do Not Share My Personal Information
                            </a>
                            <a href="#" className="hover:underline">
                                CA Supply Chain Act
                            </a>
                            <a href="#" className="hover:underline">
                                Accessibility
                            </a>
                            <a href="#" className="hover:underline">
                                Cookie Preferences
                            </a>
                        </nav>

                        <p className="text-gray-500 text-sm mt-4">
                            © 2025 Starbucks Coffee Company. All rights reserved.
                        </p>
                    </div>
                </div>

            </footer>
        </div>
    );
}

export default Footer;
