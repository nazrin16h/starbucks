import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import effort from "../../../assets/giftCards-img/group-gift-cards.png";


import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { getGiftPage } from '../../../services/api';

function GiftCardsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getGiftPage().then(res => {
      setData(res);
    });
  }, []);

  // Featured kateqoriyanı ayrıca ayırırıq
  const featured = data.find(item => item.name === "Featured");
  // Digər kateqoriyalar
  const others = data.filter(item => item.name !== "Featured");

  return (
    <div className='h-full'>
      <div className='container w-[1100px] mx-auto'>

        <p className='text-[28px]  md:text-[35px] font-bold mt-10 mb-8 lg:text-left text-center'>Gift Cards</p>
      </div>

      {/* 1. Swiper - Featured */}
      {featured && (
        <div>
          <h2 className='uppercase font-bold mt-8 mb-4 text-[18px] md:text-[22px] mx-auto container w-[1100px]'>{featured.name}</h2>
          <div className="relative swiper-container-wrapper">
            <Swiper
              effect={'fade'}
              fadeEffect={{ crossFade: true }}
              navigation={true}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              spaceBetween={20}
              centeredSlides={true}
              pagination={{ type: 'fraction' }}
              modules={[Navigation]}
              className="w-full h-[200px] rounded-2xl mb-10"
            >
              {featured.eGifts.map((card, index) => (
                <SwiperSlide
                  key={index}
                  className='w-[250px] h-[160px] overflow-hidden mb-2 transform hover:-translate-y-2 shadow-md hover:shadow-xl rounded-2xl transition-all duration-300'
                >
                  <img
                    src={card.largeImageUrl}
                    alt={card.altText}
                    className='w-full h-full object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Sol və sağ overlay */}
            <div className="swiper-overlay-left"></div>
            <div className="swiper-overlay-right"></div>
          </div>

          {/* "Effortlessly send..." bloku Featured-in altında */}
          <div className='bg-[#F2F0EB] lg:w-[1100px] container p-4 mx-auto rounded-lg flex items-center gap-4 my-10'>
            <img
              src={effort}
              alt="Gift card"
              className='w-[50px] h-[50px] object-contain'
            />
            <p className='text-[16px]'>
              Effortlessly send up to 10 eGifts per purchase. Select a design to start!
            </p>
          </div>
        </div>
      )}

      {/* 2. Received a gift card? hissəsi */}
      <div className='bg-[#D9EDE7] h-[150px] p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6 mb-12'>
        <div className='text-center md:text-left mx-26'>
          <p className='text-[20px] font-bold'>Received a gift card?</p>
          <p className='text-[16px] text-gray-600'>Earns 2★ per $1</p>
        </div>
        <div className='flex gap-4 flex-wrap justify-center'>
          <button className='border border-black px-4 py-2 rounded-full font-medium hover:bg-gray-100'>
            Add or Reload
          </button>
          <button className='bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800'>
            Check balance
          </button>
        </div>
        <div className='text-center md:text-right'>
          <a href='#' className='text-green-800 font-medium underline'>
            Card Terms & Conditions
          </a>
        </div>
      </div>

      {/* 3. Digər kateqoriyalar griddə */}
      <div className=' lg:w-[1100px] container mx-auto '>

        {others.map((item, i) => (
          <div key={i} >
            <h2 className='uppercase font-bold mt-8 mb-4 text-[18px] md:text-[22px]'>{item.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
              {item.eGifts.map((card, index) => (
                <div
                  key={index}
                  className='w-full aspect-[3/2] overflow-hidden rounded-2xl transition-transform duration-300 transform hover:-translate-y-2 shadow-md hover:shadow-xl'
                >
                  <img
                    src={card.largeImageUrl}
                    alt={card.altText}
                    className='w-full h-full object-cover rounded-2xl'
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default GiftCardsPage;
