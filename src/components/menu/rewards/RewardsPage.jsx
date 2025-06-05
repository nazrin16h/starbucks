import rewardsImg from "../../../assets/rewards-img/rewards-hero.png";
import customImg from "../../../assets/rewards-img/25.png";
import brewedImg from "../../../assets/rewards-img/100.png";
import handcraftImg from "../../../assets/rewards-img/200.png";
import sandwich from "../../../assets/rewards-img/300.png";
import merchandise from "../../../assets/rewards-img/400.png";
import funbie from "../../../assets/rewards-img/1-fun-freebies.jpg";
import order from "../../../assets/rewards-img/2-order-and-pay-ahead.jpg";
import faster from "../../../assets/rewards-img/3-get-to-free-faster.jpg";
import a1 from "../../../assets/rewards-img/1A.png";
import a2 from "../../../assets/rewards-img/2A.png";
import b1 from "../../../assets/rewards-img/1B.png";
import b2 from "../../../assets/rewards-img/2B.png";
import { IoMdStar } from "react-icons/io";
import { useState } from "react";


function RewardsPage() {
  const [selectedStar, setSelectedStar] = useState(25);
  return (
    <div>
      <div className="text-center lg:text-left">
        <div className="w-full h-12 px-4 sm:px-10 bg-[#1e3932] flex items-center ">
          <p className="text-white uppercase font-bold text-[16px]">Starbucks® Rewards</p>
        </div>

        <div className="bg-[#FBF5E8] flex flex-col md:flex-row-reverse mb-6">
          <div className="md:w-1/2">
            <img src={rewardsImg} alt="Horchata Espresso" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 flex p-6 md:p-16 mx-auto text-[#32462F] items-center">
            <div>
              <h2 className="text-3xl md:text-[50px] font-bold mb-2 lg:w-[500px]">
                It’s a great day for free coffee
              </h2>
              <p className="text-base md:text-[19px] font-medium my-4 lg:w-[550px]">
                Sign up and start enjoying the perks of Starbucks® Rewards.
              </p>
              <button className="border bg-[#00754A] rounded-full border-white text-white px-4 py-2 text-sm hover:bg-white hover:text-black transition duration-300">
                Join Now
              </button>
              <p className="pt-5 text-sm">It's even better with the app.</p>
            </div>
          </div>
        </div>
      </div>

      {/*getting start*/}
      <div className="py-10 px-4 md:px-0 text-center flex  flex-col gap-5">
        <h3 className="text-[30px] font-semibold">Getting started is easy</h3>
        <p className="text-[18px] mb-6">Earn Stars and get rewarded in a few easy steps.</p>

        <div className="flex flex-col md:flex-row md:justify-center md:gap-30 gap-10 max-w-5xl mx-auto text-left">
          <div className="w-full md:w-60 flex flex-col items-start md:items-center justify-start md:justify-center">
            <div className="w-12 h-12 rounded-full border-2 mb-5 border-[#01864D] flex items-center justify-center text-green-700 font-bold">
              1
            </div>
            <h4 className="font-semibold text-[20px]">Create an account</h4>
            <p className="font-medium text-black text-[15px] mt-4 max-w-[310px] lg:text-center">
              To get started, join now. You can also join in the app to get access to the full range of Starbucks® Rewards benefits.
            </p>
          </div>

          <div className="w-full md:w-60 flex flex-col items-start md:items-center justify-start md:justify-center">
            <div className="w-12 h-12 rounded-full border-2 mb-5 border-[#01864D] flex items-center justify-center text-green-700 font-bold">
              2
            </div>
            <h4 className="font-semibold text-[20px] w-[270px]">Order and pay how you’d like</h4>
            <p className="font-medium text-black text-[15px] mt-4 max-w-[310px] lg:text-center">
              Use cash, credit/debit card or save some time and pay right through the app. You’ll collect Stars all ways.
            </p>
          </div>

          <div className="w-full md:w-60 flex flex-col items-start md:items-center justify-start md:justify-center">
            <div className="w-12 h-12 rounded-full border-2 mb-5 border-[#01864D] flex items-center justify-center text-green-700 font-bold">
              3
            </div>
            <h4 className="font-semibold text-[20px]">Earn Stars, get Rewards</h4>
            <p className="font-medium text-black text-[15px] mt-4 max-w-[310px] lg:text-center">
              As you earn Stars, you can redeem them for Rewards—like free food, drinks, and more. Start redeeming with as little as 25 Stars!
            </p>
          </div>
        </div>
      </div>


      <div className="w-full">

        {/* Tab Menu */}
        <div className="bg-[#F1F8F5] pt-15 text-center text-[#1F2020] h-50">
          <h2 className="text-[30px] lg:mb-15  font-semibold">Get your favorites for free</h2>
          <div className="flex justify-center flex-nowrap  lg:gap-2 md:gap-4 mt-4 font-medium  px-4">
            {[25, 100, 200, 300, 400].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedStar(star)}
                className={`flex items-center flex-row-reverse gap-1 px-3 py-1 whitespace-nowrap ${selectedStar === star
                  ? "text-green-900 font-semibold border-b-4 border-green-700 transition duration-200"
                  : ""
                  }`}
              >
                <IoMdStar className="text-yellow-500" /> {star}
              </button>
            ))}
          </div>

        </div>

        {/* Customize your drink */}
        {/* Tab Content – unchanged JSX, only updated classNames */}
        {selectedStar === 25 && (
          <div className="bg-[#D4E9E2] flex flex-col md:flex-row gap-5 justify-center items-center mx-auto shadow-gray-800 py-10 px-4">
            <div>
              <img src={customImg} alt="Drink" className="mx-auto h-[150px] md:h-[200px] object-contain" />
            </div>
            <div className="flex flex-col max-w-md mt-6 md:mt-10 text-center md:text-left">
              <h3 className="font-medium mb-2 text-xl md:text-[30px]">Customize your drink</h3>
              <p className="text-sm text-gray-700">
                Make your drink just right with an extra espresso shot or a dash of your favorite syrup.
              </p>
            </div>
          </div>
        )}

        {selectedStar === 100 && (
          <div className="bg-[#D4E9E2] flex flex-col md:flex-row gap-5 justify-center items-center mx-auto shadow-gray-800 py-10 px-4">
            <div>
              <img src={brewedImg} alt="Drink" className="mx-auto h-[150px] md:h-[200px] object-contain" />
            </div>
            <div className="flex flex-col max-w-md mt-6 md:mt-10 text-center md:text-left">
              <h3 className="font-medium mb-2 text-xl md:text-[30px]">
                Brewed hot or iced coffee or tea, bakery item, packaged snack and more
              </h3>
              <p className="text-sm text-gray-700">
                Treat yourself to an iced coffee, buttery croissant, bag of chips and more.
              </p>
            </div>
          </div>
        )}

        {selectedStar === 200 && (
          <div className="bg-[#D4E9E2] flex flex-col md:flex-row gap-5 justify-center items-center mx-auto shadow-gray-800 py-10 px-4">
            <div>
              <img src={handcraftImg} alt="Drink" className="mx-auto h-[150px] md:h-[200px] object-contain" />
            </div>
            <div className="flex flex-col max-w-md mt-6 md:mt-10 text-center md:text-left">
              <h3 className="font-medium mb-2 text-xl md:text-[30px]">
                Handcrafted drink (Cold Brew, lattes and more) or hot breakfast
              </h3>
              <p className="text-sm text-gray-700">
                Turn good mornings great with a delicious handcrafted drink of your choice, breakfast sandwich or oatmeal on us.
              </p>
            </div>
          </div>
        )}

        {selectedStar === 300 && (
          <div className="bg-[#D4E9E2] flex flex-col md:flex-row gap-5 justify-center items-center mx-auto shadow-gray-800 py-10 px-4">
            <div>
              <img src={sandwich} alt="Drink" className="mx-auto h-[150px] md:h-[200px] object-contain" />
            </div>
            <div className="flex flex-col max-w-md mt-6 md:mt-10 text-center md:text-left">
              <h3 className="font-medium mb-2 text-xl md:text-[30px]">
                Sandwich, protein box or at-home coffee
              </h3>
              <p className="text-sm text-gray-700">
                Enjoy a PM pick-me-up with a lunch sandwich, protein box or a bag of coffee—including Starbucks VIA Instant®.
              </p>
            </div>
          </div>
        )}

        {selectedStar === 400 && (
          <div className="bg-[#D4E9E2] flex flex-col md:flex-row gap-5 justify-center items-center mx-auto shadow-gray-800 py-10 px-4">
            <div>
              <img src={merchandise} alt="Drink" className="mx-auto h-[150px] md:h-[200px] object-contain" />
            </div>
            <div className="flex flex-col max-w-md mt-6 md:mt-10 text-center md:text-left">
              <h3 className="font-medium mb-2 text-xl md:text-[30px]">
                Select Starbucks® merchandise
              </h3>
              <p className="text-sm text-gray-700">
                Take home a signature cup, drink tumbler or your choice of coffee merch up to $20.
              </p>
            </div>
          </div>
        )}

        {/* Endless Extras */}
        <div className="py-10 text-center mb-10 flex flex-col gap-5 px-4">
          <h3 className="text-[30px] font-semibold">Endless Extras</h3>
          <p className="text-[16px] max-w-[700px] mx-auto mb-6 font-medium">
            Joining Starbucks® Rewards means unlocking access to benefits like quick and easy ordering, tasty Rewards and—yes, free coffee.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-20 mt-10 max-w-5xl mx-auto">

            {/* Card 1 */}
            <div className="w-full max-w-[250px]">
              <img src={funbie} alt="Freebies" className="mx-auto h-24 mb-2" />
              <h4 className="font-semibold text-[20px]">Fun freebies</h4>
              <p className="font-medium text-black text-[15px] mt-4 mb-4 text-center">
                Not only can you earn free food, drinks and more, look forward to a birthday treat on us.
              </p>
              <a href="#" className="underline text-green-700 flex justify-center">Learn More</a>
            </div>

            {/* Card 2 */}
            <div className="w-full max-w-[250px]">
              <img src={order} alt="Order Ahead" className="mx-auto h-24 mb-2" />
              <h4 className="font-semibold text-[20px]">Order & pay ahead</h4>
              <p className="font-medium text-black text-[15px] mt-4 mb-4 text-center">
                Master the art of ordering ahead with saved favorites and payment methods.
              </p>
              <a href="#" className="underline text-green-700 flex justify-center">Learn More</a>
            </div>

            {/* Card 3 */}
            <div className="w-full max-w-[250px]">
              <img src={faster} alt="Get Faster" className="mx-auto h-24 mb-2" />
              <h4 className="font-semibold text-[20px]">Get to free faster</h4>
              <p className="font-medium text-black text-[15px] mt-4 mb-4 text-center">
                Earn Stars even quicker with Bonus Star challenges, Double Star Days and exciting games.
              </p>
              <a href="#" className="underline text-green-700 flex justify-center">Learn More</a>
            </div>

          </div>
        </div>


        {/* Earn Stars Section */}
        <div className="bg-[#F2F0EB] py-10">
          <h1 className="text-[25px] font-medium mb-2 text-center">Cash or card, you earn Stars</h1>
          <p className="w-full max-w-[700px] px-4 mx-auto mb-6 text-center">
            No matter how you pay, you can earn Stars with your morning coffee. Those Stars add up to (really delicious) Rewards.
          </p>

          {/* 1★ per dollar section */}
          <div className="flex flex-col md:flex-row md:gap-10 md:ml-40 mt-10 items-center md:items-start">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="font-bold">1★ per dollar</h3>
              <p>Pay as you go</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center lg:ml-15 text-center sm:text-left sm:items-start mb-6 md:mb-0">
              <img src={a1} alt="" className="h-20 mb-2 sm:mb-0" />
              <div className="sm:ml-4">
                <h3 className="font-bold">Scan and pay separately</h3>
                <p>Use cash or credit/debit card at the register.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left sm:items-start">
              <img src={a2} alt="" className="h-20 mb-2 sm:mb-0" />
              <div className="sm:ml-4">
                <h3 className="font-bold">Save payment in the app</h3>
                <p className="max-w-[300px]">
                  Check-out faster by saving a credit/debit card or PayPal to your account. You’ll be able to order ahead or scan and pay at the register in one step.
                </p>
              </div>
            </div>
          </div>

          <hr className="w-[90%] max-w-[1100px] mx-auto my-8 text-[#dddcd7]" />

          {/* 2★ per dollar section */}
          <div className="flex flex-col md:flex-row md:gap-10 md:ml-40 items-center md:items-start">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="font-bold">2★ per dollar</h3>
              <p>Add funds in the app</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left sm:items-start mb-6 md:mb-0">
              <img src={b1} alt="" className="h-20 mb-2 sm:mb-0" />
              <div className="sm:ml-4 max-w-[250px]">
                <h3 className="font-bold">Preload</h3>
                <p>
                  To save time and earn Stars twice as fast, add money to your digital Starbucks Card using any payment option. Scan and pay in one step or order ahead in the app.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:ml-15 items-center text-center sm:text-left sm:items-start">
              <img src={b2} alt="" className="h-20 mb-2 sm:mb-0" />
              <div className="sm:ml-4 max-w-[300px]">
                <h3 className="font-bold">Register your gift card</h3>
                <p>
                  Check-out faster by saving a credit/debit card or PayPal to your account. You’ll be able to order ahead or scan and pay at the register in one step.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Partner Rewards */}
        <div className="bg-green-100 py-10 text-center">
          <h3 className="text-xl font-semibold">Keep the Rewards Coming</h3>
          <p className="text-sm text-gray-700 max-w-xl mx-auto mt-2">
            The Rewards don’t stop at your morning coffee. Join Starbucks® Rewards and unlock perks from our partners.
          </p>
          <div className="flex justify-center gap-10 mt-6">
            <img src="/images/delta.png" alt="Delta" className="h-8" />
            <img src="/images/bofa.png" alt="Bank of America" className="h-8" />
            <img src="/images/marriott.png" alt="Marriott" className="h-8" />
          </div>
        </div>

      </div>

    </div >
  )
}

export default RewardsPage