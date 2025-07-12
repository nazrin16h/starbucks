import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from "react-helmet";


import effort from "../../assets/giftCards-img/group-gift-cards.png";
import businessGift from "../../assets/giftCards-img/bulk-gift-cards.jpg";

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
      <Helmet>
        <title>Starbucks | Gift Cards</title>
        <meta name="description" content="Buy and send Starbucks gift cards for every occasion. Easy to customize and send instantly." />
      </Helmet>
      <div className='mx-2 md:mx-4 lg:mx-auto max-w-[1100px]'>
        <p className='text-[24px] md:text-[32px] lg:text-[35px] font-bold mt-10 mb-8 w-fit  '>
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
      <div className='lg:w-[1100px] container px-4'>
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

      <div className="py-10 mt-10 bg-[#f9f9f9] md:text-center md:flex items-center justify-ceter md:px-[90px]">
        <img
          className="w-full max-w-[375px] px-4 pt-5"
          src={businessGift}
          alt="bulk-gift-cards"
        />
        <div className="pt-[1.5rem] text-start ml-4 max-w-[375px] md:ml-5 lg:ml-10">
          <h2 className="text-[20px] font-semibold md:text-[26px]">
            Business gifting — simplified
          </h2>
          <p className="my-3 text-[#00000094] text-[14px] md:text-[17px]">
            Bulk send physical or digital Starbucks Cards to gift, reward,
            incentivize, or show appreciation towards your customers, clients
            and team members. Minimum 15 cards per order.
          </p>
          <a
            href=""
            className="inline-flex border items-center px-[16px] py-[7px] md:mt-5 border-black rounded-full"
          >
            <span className="font-semibold text-[14px] md:text-[17px]">
              Shop now
            </span>
            <svg
              aria-hidden="true"
              className="w-[24px] h-[24px]"
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              loading="lazy"
            >
              <path d="M14.75 18H7.875C6.84 18 6 17.16 6 16.125V9.25c0-1.036.84-1.875 1.875-1.875h5.11c.276 0 .5.224.5.5s-.224.5-.5.5h-5.11c-.483 0-.875.392-.875.875v6.875c0 .483.392.875.875.875h6.875c.483 0 .875-.392.875-.875V11c0-.276.224-.5.5-.5s.5.224.5.5v5.125c0 1.035-.84 1.875-1.875 1.875zM14 6.5c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5V7.72l-4.66 4.74c-.19.196-.507.2-.704.005-.197-.193-.2-.51-.006-.707L16.307 7H14.5c-.276 0-.5-.224-.5-.5z"></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="bg-[#edebe9] px-[1rem] py-[2rem] flex flex-col md:flex-row md:px-[100px]">
        <div>
          <h2 className="font-semibold text-[18px] md:text-[20px]">
            About eGift cards
          </h2>
          <p className="text-[14px] font-normal py-3">
            A Starbucks eGift card (also known as an “eGift”) is a Starbucks
            Gift Card that is purchased and sent digitally.
          </p>
          <p className="text-[14px] font-normal pb-3">
            For Senders of an eGift, go to eGift History when signed in to
            view, send, or resend eGifts you’ve purchased — or, to directly
            contact Starbucks eGift Support for help with your order.
          </p>

          <h2 className="font-semibold text-[18px] mt-3 md:text-[20px]">
            Questions around eGift cards?
          </h2>
          <p className="text-[14px] font-normal py-3">
            Check our Frequently Asked Questions — your question might already
            be answered. There, you’ll find answers for all Starbucks Gift
            Cards in general (including eGifts).
          </p>
          <a
            href=""
            className="inline-flex border items-center px-[16px] py-[7px] md:mt-5 border-black rounded-full"
          >
            <span className="font-semibold text-[14px] md:text-[17px]">
              Card FAQs
            </span>
            <svg
              aria-hidden="true"
              className="w-[24px] h-[24px]"
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              loading="lazy"
            >
              <path d="M14.75 18H7.875C6.84 18 6 17.16 6 16.125V9.25c0-1.036.84-1.875 1.875-1.875h5.11c.276 0 .5.224.5.5s-.224.5-.5.5h-5.11c-.483 0-.875.392-.875.875v6.875c0 .483.392.875.875.875h6.875c.483 0 .875-.392.875-.875V11c0-.276.224-.5.5-.5s.5.224.5.5v5.125c0 1.035-.84 1.875-1.875 1.875zM14 6.5c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5V7.72l-4.66 4.74c-.19.196-.507.2-.704.005-.197-.193-.2-.51-.006-.707L16.307 7H14.5c-.276 0-.5-.224-.5-.5z"></path>
            </svg>
          </a>
        </div>
        <div className="pl-10">
          <h2 className="font-semibold text-[18px] mt-3 md:text-[20px]">
            About Starbucks Gift Cards in general
          </h2>
          <p className="text-[14px] font-normal py-3">
            Starbucks Gift Cards, including eGifts, can be used to pay in a
            Starbucks store or to join Starbucks® Rewards{" "}
          </p>
          <p className="text-[14px] font-normal pb-3">
            Register Gift Cards and eGifts to a Starbucks® Rewards account and
            earn 2★ per dollar every time you pay with that card. Those Stars
            quickly add up to free food, drinks, and more!
          </p>
          <a
            href=""
            className="inline-flex border items-center px-[16px] py-[7px] md:mt-5 border-black rounded-full"
          >
            <span className="font-semibold text-[14px] md:text-[17px]">
              Card Terms & Conditions
            </span>
            <svg
              aria-hidden="true"
              className="w-[24px] h-[24px]"
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              loading="lazy"
            >
              <path d="M14.75 18H7.875C6.84 18 6 17.16 6 16.125V9.25c0-1.036.84-1.875 1.875-1.875h5.11c.276 0 .5.224.5.5s-.224.5-.5.5h-5.11c-.483 0-.875.392-.875.875v6.875c0 .483.392.875.875.875h6.875c.483 0 .875-.392.875-.875V11c0-.276.224-.5.5-.5s.5.224.5.5v5.125c0 1.035-.84 1.875-1.875 1.875zM14 6.5c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5V7.72l-4.66 4.74c-.19.196-.507.2-.704.005-.197-.193-.2-.51-.006-.707L16.307 7H14.5c-.276 0-.5-.224-.5-.5z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default GiftCardsPage;
