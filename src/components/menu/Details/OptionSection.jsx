// components/OptionSection.jsx
import { useState } from "react";

function OptionSection({ section, selectedOptions, onSelect }) {
    const [open, setOpen] = useState(null);
    const toggle = (name) => setOpen(open === name ? null : name);

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-black">{section.name}</h2>
            <div className="h-[4px] w-full  bg-[#D4E9E2] my-3"></div>

            <div className="flex flex-col space-y-4">
                {section.children.map((child) => (
                    <div key={child.name} className="mb-3">
                        <button
                            onClick={() => toggle(child.name)}
                            className={`w-full flex justify-between items-center 
                ${open === child.name ? "bg-[#edf6f3] border-[#00754a]" : "bg-[#f9f9f9] border-transparent"} 
                hover:bg-[#edf6f3] text-black font-medium text-left px-4 py-3 rounded-xl border transition-all duration-200`}
                            type="button"
                        >
                            <span className="text-base">{`Add ${child.name}`}</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-300 ${open === child.name ? "rotate-180 text-[#00754a]" : "text-gray-600"}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {open === child.name && (
                            <div className="bg-white px-4 py-4 rounded-xl shadow mt-2 space-y-4 animate-fadeIn">
                                {child.products
                                    .filter((product) => product?.form?.name) // yalnız olanları saxla
                                    .map((product) => (
                                        <button
                                            key={product.productNumber}
                                            onClick={() => onSelect(product.form.name, "selected")}
                                            className={`block w-full text-left bg-[#f1f8f6] hover:bg-[#e1f0ea] 
                                            text-black font-medium py-2 pl-4 pr-10 rounded-[12px] 
                                            shadow-[inset_0_1px_4px_#0000001a] transition`}
                                        >
                                            {product.form.name}
                                        </button>
                                    ))}
                            </div>
                        )}


                    </div>

                ))}
            </div>
        </div>
    );
}
export default OptionSection;