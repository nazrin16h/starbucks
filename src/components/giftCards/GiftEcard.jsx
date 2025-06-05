import React, { useState } from 'react';

const CreateEGift = () => {
    const [recipients, setRecipients] = useState([{ name: '', email: '' }]);
    const maxRecipients = 10;

    const handleAddRecipient = () => {
        if (recipients.length < maxRecipients) {
            setRecipients([...recipients, { name: '', email: '' }]);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500">Gift / Create eGift</p>

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4">Create eGift</h1>

            {/* Image (to be passed via data later) */}
            <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                Image goes here
            </div>

            <p className="text-sm text-red-600 mb-4">* indicates required field</p>

            {/* Gift amount */}
            <div className="mb-6">
                <label className="block font-semibold mb-1">Gift amount</label>
                <select className="w-full border rounded p-2">
                    <option>$5</option>
                    <option>$10</option>
                    <option>$25</option>
                    <option>$50</option>
                    <option>$100</option>
                    <option>Coustem amount</option>
                </select>
            </div>

            {/* Recipients */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Who are you gifting to?</h2>
                <hr className="mb-4 border-green-200" />

                {recipients.map((recipient, index) => (
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
                <hr className="mb-4 border-green-200" />
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
                <hr className="mb-4 border-green-200" />
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
        </div>
    );
};

export default CreateEGift;
