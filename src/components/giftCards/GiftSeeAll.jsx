import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useEffect, useState } from 'react';
import { getGiftPage } from '../../services/api';
function GiftSeeAll() {
    const [data, setData] = useState([]);
    const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);

    useEffect(() => {
        getGiftPage().then(res => {
            setData(res);
        });
    }, []);

    const featured = data.find(item => item.name === "Featured");
    const others = data.filter(item => item.name !== "Featured");

    return (
        <div className="px-4 md:px-8 lg:px-16 max-w-[1200px] mx-auto">
            <p className='uppercase font-bold mt-8 mb-4 text-[18px] md:text-[22px]'>Featured</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-6">
                {featured && featured.eGifts.map((card, index) => (
                    <div
                        key={index}
                        className="w-full aspect-[3/2] overflow-hidden rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] bg-white"
                    >
                        <img
                            src={card.largeImageUrl}
                            alt={card.altText}
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GiftSeeAll