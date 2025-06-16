import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import effort from "../../assets/giftCards-img/group-gift-cards.png";

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { getGiftPage } from '../../services/api';
import GiftSeeAll from './GiftSeeAll';
import { Link } from 'react-router-dom';

function GiftCardsPage() {
  const [data, setData] = useState([]);
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);

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


  const featured = data.find(item => item.name === "Featured");
  const others = data.filter(item => item.name !== "Featured");

  return (
    <div className='h-full'>
      <div className='container lg:w-[1100px] lg:mx-auto mx-2'>
        <p className='text-[28px] md:text-[35px] font-bold mt-10 mb-8 text-left'>
          Gift Cards
        </p>
      </div>

      {/* 1. Swiper - Featured */}
      {featured && (
        <div className=' mx-2' >
          <div className="flex justify-between items-center mx-auto container lg:w-[1100px] mt-8 mb-4">
            <h2 className='uppercase font-bold text-[18px] md:text-[22px]'>
              {featured.name}
            </h2>
            {!isSeeAllOpen && (
              <Link
                to="/see-all"
                onClick={() => setIsSeeAllOpen(true)}
                className="text-green-800  font-medium hover:text-green-600 text-lg"
              >
                See all
              </Link>
            )}
            {isSeeAllOpen && <GiftSeeAll />}
          </div>

          <div className="relative  overflow-visible swiper-container-wrapper ">
            <Swiper
              navigation={true}
              slidesPerView={4}
              breakpoints={{
                0: { slidesPerView: 2 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              speed={800}
              grabCursor={true}
              spaceBetween={20}
              centeredSlides={false}
              
              pagination={{ type: 'fraction' }}
              modules={[Navigation]}
              className=" lg:mb-10 overflow-visible mx-40"
            >
              {featured.eGifts.map((card, index) => (

                <SwiperSlide key={index} className="group overflow-visible mt-6 container">
                  <Link to={`/Ecard`} state={{ image: card.largeImageUrl, alt: card.altText }}>
                    <div className="rounded-2xl overflow-hidden relative z-10 group-hover:z-20 transform transition-all duration-300 ease-in-out group-hover:-translate-y-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] bg-white">
                      <img
                        src={card.largeImageUrl}
                        alt={card.altText}
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="lg:swiper-overlay-left z-30"></div>
            <div className="lg:swiper-overlay-right z-30"></div>
            <div className="hidden lg:block absolute left-0 top-0 w-40 h-full z-20 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent"></div>
            <div className="hidden lg:block absolute right-0 top-0 w-40 h-full z-20 pointer-events-none bg-gradient-to-l from-white via-white/90 to-transparent"></div>
          </div>

          {/* Effortlessly block */}
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

      {/* 2. Received a gift card? */}
      <div className='bg-[#D9EDE7]  lg:w-full mx-auto p-6 lg:h-[200px] flex flex-col md:flex-row justify-around items-center gap-6 mb-12'>
        <div className='text-center md:text-left'>
          <p className='text-[30px] font-bold'>Received a gift card?</p>
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

      {/* 3. Other categories */}
      <div className='lg:w-[1100px] container mx-auto'>
        {others.map((item, i) => (
          <div key={i}>
            <h2 className='uppercase font-bold mt-8 mb-4 text-[18px] md:text-[22px]'>{item.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
              {item.eGifts.map((card, index) => (
                <Link
                  to={`/Ecard`}
                  state={{ image: card.largeImageUrl, alt: card.altText }}
                  key={index}
                >

                  <div
                    className='w-full aspect-[3/2] overflow-hidden rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] bg-white'
                  >
                    <img
                      src={card.largeImageUrl}
                      alt={card.altText}
                      className='w-full h-full object-cover rounded-2xl'
                    />
                  </div>
                </Link>

              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftCardsPage;
