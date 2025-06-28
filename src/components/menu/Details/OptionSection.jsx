import { useState } from "react";

function OptionSection({ section, selectedOptions, onSelect }) {
    const [open, setOpen] = useState(null);
    const [selectedCounts, setSelectedCounts] = useState({});

    const toggle = (name) => setOpen(open === name ? null : name);

    const increase = (name) => {
        setSelectedCounts((prev) => ({
            ...prev,
            [name]: (prev[name] || 0) + 1,
        }));
        onSelect(name, "selected");
    };

    const decrease = (name) => {
        setSelectedCounts((prev) => {
            const newCount = Math.max((prev[name] || 0) - 1, 0);
            const updated = { ...prev, [name]: newCount };
            if (newCount === 0) delete updated[name];
            return updated;
        });
        onSelect(name, "deselected");
    };

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-bold text-black">{section.name}</h2>
            <div className="h-[3px] w-full bg-[#D4E9E2] my-3 rounded-full"></div>

            {/* Customized kartlar */}
            <div className="space-y-4 mb-4">
                {section.children.flatMap((child) =>
                    child.products
                        .filter((product) => product?.form?.name)
                        .map((product) => {
                            const name = product.form.name;
                            const count = selectedCounts[name] || 0;
                            if (count === 0) return null;

                            return (
                                <fieldset
                                    key={product.productNumber}
                                    className="relative border border-[#00754a] rounded-lg px-4 pt-4 pb-3 shadow-sm"
                                >
                                    {/* Legend və Customized yazısı bir səviyyədə */}
                                    <legend className="text-xs text-gray-500 px-2">
                                        <div className="flex justify-between items-center w-full">
                                            {/* <span>Flavors</span> */}
                                            <span className="text-[#00754a] text-sm font-medium">Customized</span>
                                        </div>
                                    </legend>

                                    {/* Məhsul adı və counter */}
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-[15px] font-medium text-black">{name}</p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => decrease(name)}
                                                className="w-8 h-8 rounded-full bg-[#00754a] text-white text-lg flex items-center justify-center"
                                            >
                                                −
                                            </button>
                                            <span className="w-5 text-center font-medium">{count}</span>
                                            <button
                                                onClick={() => increase(name)}
                                                className="w-8 h-8 rounded-full bg-[#00754a] text-white text-lg flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            );
                        })
                )}
            </div>

            {/* Accordion: Add Syrups, Add Sauces */}
            <div className="flex flex-col space-y-4">
                {section.children.map((child) => (
                    <div key={child.name}>
                        <button
                            onClick={() => toggle(child.name)}
                            className={`w-full flex justify-between items-center px-4 py-3 rounded-xl font-medium text-left transition ${open === child.name ? "bg-[#edf6f3] text-[#00754a]" : "bg-[#f9f9f9]"
                                }`}
                        >
                            <span>{`Add ${child.name}`}</span>
                            <svg
                                className={`w-5 h-5 transition-transform ${open === child.name ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {open === child.name && (
                            <div className="bg-white px-4 py-4 rounded-xl shadow mt-2 space-y-4">
                                {child.products
                                    .filter((product) => product?.form?.name)
                                    .map((product) => {
                                        const name = product.form.name;
                                        return (
                                            <button
                                                key={product.productNumber}
                                                onClick={() => increase(name)}
                                                className="w-full text-left bg-[#f1f8f6] hover:bg-[#e1f0ea] text-black font-medium py-2 px-4 rounded-[12px] shadow-[inset_0_1px_4px_#0000001a] transition"
                                            >
                                                {name}
                                            </button>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OptionSection;
