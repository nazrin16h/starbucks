import { useLocation, useNavigate } from 'react-router-dom';

function ProductPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { product } = state || {};

    if (!product) return <p>Product not found.</p>;

    return (
        <div className="min-h-screen flex">
            {/* Sol panel */}
            <div className="bg-green-900 text-white w-1/3 p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center mb-8 font-semibold"
                >
                    <span className="mr-2 text-xl">←</span> Back to menu
                </button>

                <h1 className="text-2xl font-bold mb-4">Review order (1)</h1>

                <label className="block text-gray-300 text-lg">
                    Pickup store
                    <select className="mt-1 w-full bg-green-900 border-b border-gray-400 focus:outline-none">
                        <option>Choose store</option>
                        <option>Store 1</option>
                    </select>
                </label>
            </div>

            {/* Sağ panel */}
            <div className="w-2/3 p-10 bg-white">
                <div className="flex items-center border rounded-md shadow p-6 max-w-[600px]">
                    <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-full mr-6"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600 text-lg mt-1">
                            {product.size || "Grande"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-full hover:bg-gray-200">✏️</button>
                        <button className="p-2 rounded-full hover:bg-gray-200">➕</button>
                        <span className="bg-green-600 text-white px-3 py-1 rounded">1</span>
                        <button className="p-2 rounded-full hover:bg-gray-200">➖</button>
                        <button className="p-2 rounded-full hover:bg-gray-200">🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
