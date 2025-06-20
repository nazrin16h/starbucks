import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGiftPage } from '../../services/api';

const CreateEGift = () => {
    const { state } = useLocation();
    const image = state?.image || ''; // Linkdən gələn şəkil

    const [recipients, setRecipients] = useState([{ name: '', email: '' }]);
    const maxRecipients = 10;

    const handleAddRecipient = () => {
        if (recipients.length < maxRecipients) {
            setRecipients([...recipients, { name: '', email: '' }]);
        }
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        getGiftPage().then(res => {
            setData(res);
        });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // <-- Əlavə et
        getGiftPage().then(res => {
            setData(res);
        });
    }, []);


    return (
        <div className="max-w-md mx-auto p-6 ">
            <p className="text-sm text-gray-500">Gift / Create eGift</p>

            <h1 className="text-2xl font-bold mb-4">Create eGift</h1>

            <div className="w-full h-48 bg-gray-200 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                {image ? (
                    <img src={image} alt="Selected Gift" className="w-full h-full object-cover rounded" />
                ) : (
                    <p className="text-gray-400">No image selected</p>
                )}
            </div>

            <p className="text-sm text-black mb-4"><span className='text-green-800'>*</span> indicates required field</p>

            {/* Gift amount */}
            <div className="mb-6">
                <label className="block font-semibold mb-1">Gift amount</label>
                <select className="w-full border rounded p-2">
                    <option>$5</option>
                    <option>$10</option>
                    <option>$25</option>
                    <option>$50</option>
                    <option>$100</option>
                    <option>Custom amount</option>
                </select>
            </div>

            {/* Recipients */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Who are you gifting to?</h2>
                <hr className="mb-4  border-[#D4E9E2] border-2" />

                {recipients.map((_, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            placeholder="* Recipient Name"
                            className="w-full border rounded p-2 mb-2"
                        />
                        <input
                            type="email"
                            placeholder="* Recipient Email"
                            className="w-full border rounded p-2"
                        />
                    </div>
                ))}

                <p className="text-sm text-gray-500 mb-2">Maximum of 10 recipients</p>
                <button
                    onClick={handleAddRecipient}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Add another recipient
                </button>
            </div>

            {/* Personal note */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Personal note</h2>
                <hr className="mb-4  border-[#D4E9E2] border-2" />
                <textarea
                    placeholder="Message (optional)"
                    className="w-full border rounded p-2 h-24 resize-none"
                    maxLength={160}
                />
                <p className="text-sm text-right text-gray-500 mt-1">0 / 160</p>
            </div>

            {/* From */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">From</h2>
                <hr className="mb-4 border-[#D4E9E2] border-2" />
                <input
                    type="text"
                    placeholder="* Sender Name"
                    className="w-full border rounded p-2 mb-2"
                />
                <input
                    type="email"
                    placeholder="* Sender Email"
                    className="w-full border rounded p-2"
                />
            </div>
            <button
                className="fixed bottom-7 right-7 bg-[#00754A] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 hover:bg-green-800 transition-all duration-300 ease-in-out"
            >
                Checkout $5.00
            </button>
        </div >
    );
};

export default CreateEGift;
