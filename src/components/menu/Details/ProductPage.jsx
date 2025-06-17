import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMenu } from '../../../services/api'; // öz yolunla düzəlt

const ProductPage = () => {
    const { category, subcategory, productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('Grande');

    const sizes = [
        { name: 'Short', volume: '8 fl oz' },
        { name: 'Tall', volume: '12 fl oz' },
        { name: 'Grande', volume: '16 fl oz' },
        { name: 'Venti', volume: '20 fl oz' },
    ];

    useEffect(() => {
        getMenu().then(data => {
            const mainCategory = data.find(c => c.name.toLowerCase() === category.toLowerCase());
            const subCategory = mainCategory?.children.find(sc => sc.name.toLowerCase() === subcategory.toLowerCase());
            const foundProduct = subCategory?.products.find(p => p.id.toString() === productId);

            setProduct(foundProduct);
        });
    }, [category, subcategory, productId]);

    if (!product) return <p className="text-white">Loading...</p>;

    return (
        <div className="bg-[#1e3732] text-white min-h-screen p-6">
            {/* Product Header */}
            <div className="text-center mb-8">
                {/* Burada product şəkil və adını product-dan göstər */}
                <img
                    src={product.image || "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_BlondeRoast.jpg"}
                    alt={product.name || "Product Image"}
                    className="mx-auto w-32 h-32 object-cover"
                />
                <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                <p className="text-sm text-gray-300 mt-1">{product.calories ? `${product.calories} calories` : ""}</p>
            </div>

            {/* Size Options */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Size options</h2>
                <div className="flex justify-center gap-4">
                    {sizes.map((size) => (
                        <button
                            key={size.name}
                            onClick={() => setSelectedSize(size.name)}
                            className={`flex flex-col items-center p-3 border rounded-lg w-20 ${selectedSize === size.name
                                    ? 'border-green-400 text-green-400'
                                    : 'border-gray-600'
                                }`}
                        >
                            <div className="text-xl">🥤</div>
                            <span className="text-sm">{size.name}</span>
                            <span className="text-xs text-gray-400">{size.volume}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Customize Button */}
            <div className="flex justify-center mb-8">
                <button className="bg-[#1e3732] border border-green-500 text-green-300 px-6 py-2 rounded-full hover:bg-green-900 transition">
                    ✨ Customize
                </button>
            </div>

            {/* Product Description */}
            <div className="bg-[#152a27] p-6 rounded-lg max-w-2xl mx-auto">
                <p className="text-sm text-yellow-100 mb-2">☕ 100+ item</p>
                <p className="mb-4">{product.description || "Notes of bright citrus and toasted almond."}</p>
                <p className="text-sm text-gray-300 mb-4">
                    {product.details || "Starbucks Sunsera Blend™ is crafted for lovers of balanced, smooth, flavorful, easy-drinking coffee—hot or iced, black or with creamer..."}
                </p>
                <p className="text-sm font-semibold text-white">
                    {product.calories ? `${product.calories} calories, 0g sugar, 0g fat ⚪` : "5 calories, 0g sugar, 0g fat ⚪"}
                </p>
            </div>

            {/* Add to Order Button */}
            <div className="fixed bottom-5 right-5">
                <button className="bg-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition">
                    Add to Order
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
