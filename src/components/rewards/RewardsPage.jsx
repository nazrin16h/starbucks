import rewardsImg from "../../assets/rewards-img/rewards-hero.png";
import customImg from "../../assets/rewards-img/25.png";
import brewedImg from "../../assets/rewards-img/100.png";
import handcraftImg from "../../assets/rewards-img/200.png";
import sandwich from "../../assets/rewards-img/300.png";
import merchandise from "../../assets/rewards-img/400.png";
import funbie from "../../assets/rewards-img/1-fun-freebies.jpg";
import order from "../../assets/rewards-img/2-order-and-pay-ahead.jpg";
import faster from "../../assets/rewards-img/3-get-to-free-faster.jpg";
import a1 from "../../assets/rewards-img/1A.png";
import a2 from "../../assets/rewards-img/2A.png";
import b1 from "../../assets/rewards-img/1B.png";
import b2 from "../../assets/rewards-img/2B.png";
import silkway from "../../assets/rewards-img/delta-skymiles.png";
import marriott from "../../assets/rewards-img/marriott-logo.png";
import bank from "../../assets/rewards-img/bank-of-america.png";
import { IoMdStar } from "react-icons/io";
import { useState } from "react";


function RewardsPage() {
  const [selectedStar, setSelectedStar] = useState(25);
  return (
    <div className="min-h-screen">
      <div className=" sticky top-0 z-50 w-full   h-12 px-2 lg:px-32 bg-[#1e3932] flex items-center ">
        <p className="text-white uppercase font-bold text-[16px]">Starbucks® Rewards</p>
      </div>
      <div className="  text-center lg:text-left">
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
                Join in the app
              </button>
              <p className="pt-5 text-sm">Or join online</p>
            </div>
          </div>
        </div>
      </div>

      {/*getting start*/}
      <div className="py-10 px-4 md:px-0 text-center flex flex-col gap-5">
        <h3 className="text-[30px] font-semibold">Getting started is easy</h3>
        <p className="text-[18px] mb-6">Earn Stars and get rewarded in a few easy steps.</p>
        <div className="flex flex-col md:flex-row md:justify-center md:gap-12 gap-10 max-w-5xl mx-auto lg:text-center text-left">
          <div className="w-full md:w-1/3 flex lg:flex-col flex-row items-start lg:items-center justify-start lg:justify-center px-2">
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 rounded-full border-2 border-[#01864D] flex items-center justify-center text-green-700 font-bold mb-4 flex-shrink-0">
              1
            </div>
            <div className="flex flex-col ml-5 lg:ml-0">
              <h4 className="font-semibold text-[20px] text-left lg:text-center">Create an account</h4>
              <p className="font-medium text-black text-[15px] mt-4 max-w-[310px] text-left lg:text-center">
                To get started, join now. You can also join in the app to get access to the full range of Starbucks® Rewards benefits.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex lg:flex-col flex-row items-start lg:items-center justify-start lg:justify-center px-2">
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 rounded-full border-2 border-[#01864D] flex items-center justify-center text-green-700 font-bold mb-4 flex-shrink-0">
              2
            </div>
            <div className="flex flex-col ml-5 lg:ml-0">
              <h4 className="font-semibold text-[20px] text-left lg:text-center">Order and pay how you’d like</h4>
              <p className="font-medium text-black text-[15px] mt-4 max-w-[310px] text-left lg:text-center">
                Use cash, credit/debit card or save some time and pay right through the app. You’ll collect Stars all ways. Learn how
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex lg:flex-col flex-row items-start lg:items-center justify-start lg:justify-center px-2">
            <div className="w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 rounded-full border-2 border-[#01864D] flex items-center justify-center text-green-700 font-bold mb-4 flex-shrink-0">
              3
            </div>
            <div className="flex flex-col ml-5 lg:ml-0">
              <h4 className="font-semibold text-[20px] text-left lg:text-center">Earn Stars, get Rewards</h4>
              <p className="font-medium text-black text-[15px] mt-4 max-w-[310px] text-left lg:text-center">
                As you earn Stars, you can redeem them for Rewards—like free food, drinks, and more. Start redeeming with as little as 25 Stars!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Menu */}
      <div className="w-full">

        <div className="bg-[#F1F8F5] pt-15 text-center text-[#1F2020] h-50">
          <h2 className="text-[30px] lg:mb-15  font-semibold">Get your favorites for free</h2>
          <div className="flex justify-center flex-nowrap flex-shrink-0  lg:gap-2 md:gap-4 mt-4 font-medium  px-4">
            {[25, 100, 200, 300, 400].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedStar(star)}
                className={`flex items-center flex-row-reverse gap-1 px-0.5 py-1 whitespace-nowrap ${selectedStar === star
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
        <div className="py-10 text-left lg:text-center mb-10 flex flex-col gap-5 px-4">
          <h3 className="text-[30px] font-semibold text-center">Endless Extras</h3>
          <p className="text-[16px] max-w-[700px] mx-auto mb-6 font-medium">
            Joining Starbucks® Rewards means unlocking access to benefits like quick and easy ordering, tasty Rewards and—yes, free coffee.
          </p>
          <div className="flex flex-col md:flex-row justify-start lg:justify-center items-start lg:items-center gap-10 md:gap-20 mt-10 max-w-5xl mx-auto">

            <div className="w-full max-w-[350px] flex flex-row lg:flex-col items-start lg:items-center gap-5">
              <img src={funbie} alt="Freebies" className="h-24" />
              <div>
                <h4 className="font-semibold text-[20px] text-left lg:text-center">Fun freebies</h4>
                <p className="font-medium text-black text-[15px] mt-4 mb-4 text-left lg:text-center">
                  Not only can you earn free food, drinks and more, look forward to a birthday treat on us.
                </p>
                <a href="#" className="underline text-green-700 text-left lg:text-center block">Learn More</a>
              </div>
            </div>

            <div className="w-full max-w-[350px] flex flex-row lg:flex-col items-start lg:items-center gap-5">
              <img src={order} alt="Order Ahead" className="h-24" />
              <div>
                <h4 className="font-semibold text-[20px] text-left lg:text-center">Order & pay ahead</h4>
                <p className="font-medium text-black text-[15px] mt-4 mb-4 text-left lg:text-center">
                  Master the art of ordering ahead with saved favorites and payment methods.
                </p>
                <a href="#" className="underline text-green-700 text-left lg:text-center block">Learn More</a>
              </div>
            </div>

            <div className="w-full max-w-[350px] flex flex-row lg:flex-col items-start lg:items-center gap-5">
              <img src={faster} alt="Get Faster" className="h-24" />
              <div>
                <h4 className="font-semibold text-[20px] text-left lg:text-center">Get to free faster</h4>
                <p className="font-medium text-black text-[15px] mt-4 mb-4 text-left lg:text-center">
                  Earn Stars even quicker with Bonus Star challenges, Double Star Days and exciting games.
                </p>
                <a href="#" className="underline text-green-700 text-left lg:text-center block">Learn More</a>
              </div>
            </div>

          </div>
        </div>



        {/* Earn Stars Section */}
        <div className="bg-[#F2F0EB] py-10">
          <h1 className="text-[25px] font-medium mb-2 text-center">Cash or card, you earn Stars</h1>
          <p className="w-full max-w-[700px] px-4 mx-auto mb-6 text-center">
            No matter how you pay, you can earn Stars with your morning coffee. Those Stars add up to (really delicious) Rewards.
          </p>

          {/* 1 per dollar section */}
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

          {/* 2 per dollar section */}
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


        {/* Keep the Rewards Coming*/}
        <section
          className="py-12 px-4  bg-[#D4E9E2] text-center relative bg-no-repeat bg-cover bg-left-top md:bg-[url('https://www.starbucks.com/app-assets/844262945b2a8b8cfb29.png')]"
        >
          <div className=" bg-[#D4E9E2] p-10">
            <h2 className="text-3xl font-bold mb-4 text-green-900">Keep the Rewards Coming</h2>
            <p className="text-green-800 mb-10 max-w-3xl mx-auto">
              The Rewards don't stop at your morning coffee. Join Starbucks® Rewards and unlock perks from our partners,
              all while earning more Stars.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start max-w-6xl mx-auto">
              {/* Delta SkyMiles */}
              <div className="space-y-4">
                <img
                  src={silkway}
                  alt="Delta SkyMiles"
                  className="mx-auto h-10"
                />
                <p className="text-green-800 text-sm">
                  <a href="#" className="text-green-900 underline">Link your Delta SkyMiles</a> and Starbucks® Rewards
                  accounts to earn miles on Starbucks Card reloads of $25 or more, plus Double Stars on travel days.
                  <sup>1</sup>
                </p>
              </div>

              {/* Bank of America */}
              <div className="space-y-4">
                <img
                  src={bank}
                  alt="Bank of America"
                  className="mx-auto h-10"
                />
                <p className="text-green-800 text-sm">
                  <a href="#" className="text-green-900 underline">Link your Bank of America</a> eligible card and
                  Starbucks® Rewards account to earn 2% Cash Back and Bonus Stars on qualifying Starbucks in-app
                  purchases.<sup>2</sup>
                </p>
              </div>

              {/* Marriott  */}
              <div className="space-y-4">
                <img
                  src={marriott}
                  alt="Marriott Bonvoy"
                  className="mx-auto h-10"
                />
                <p className="text-green-800 text-sm">
                  <a href="#" className="text-green-900 underline">Link your Marriott Bonvoy</a> and Starbucks® Rewards
                  accounts to earn Double Stars during eligible stays, points during any Marriott Bonvoy Week and more.
                  <sup>3</sup>
                </p>
              </div>
            </div>

            <button className="mt-10 bg-green-700 text-white lg:px-6 px-2 py-3 rounded-full font-semibold hover:bg-green-800">
              Join Starbucks® Rewards
            </button>
          </div>
        </section>

        {/*question section */}
        <div className="lg:text-left text-[25px] container lg:w-[1000px] mx-auto my-20 px-10">
          <h2 className="font-medium">Questions?</h2>
          <p className="lg:w-[800px]">We want to help in any way we can. You can ask your barista anytime or we’ve answered the most commonly asked terms
            right over here
            .</p>
        </div>

        {/*terms & Info */}

        <div className="bg-[#F3F3F3] font-medium text-[#202020]">
          <div className=" text-gray-800 text-sm px-6 py-8 md:px-10 md:py-12 max-w-6xl mx-auto
                grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8
                text-left md:text-left space-y-6 md:space-y-0">
            <div className="md:col-span-2 space-y-4">
              <p>
                <sup>1</sup>Excludes taxes and gratuities. At participating stores. Some restrictions apply.
                Flights purchased close to departure may not earn double Stars. Stars and miles may not be earned
                on purchases of alcohol, Starbucks Cards and Starbucks Card reloads. For details, visit
                <a href="https://deltastarbucks.com/terms" className="text-green-800 underline ml-1" target="_blank" rel="noopener noreferrer">
                  deltastarbucks.com/terms
                </a>.
              </p>
              <p>
                <sup>2</sup>At participating stores only. Some restrictions apply. Linked Card members will earn 2% Cash Back on
                the full purchase price of every Qualifying Purchase. Extra Star offer excludes taxes and tips.
                Stars may not be earned on purchases of alcohol or on reloads of Starbucks Cards that are not registered.
                For details, visit
                <a href="#" className="text-green-800 underline ml-1">Terms and Conditions</a>.
              </p>
              <p>
                <sup>3</sup>Individuals must link loyalty program accounts to participate in offer. For full details, visit
                <a href="https://www.starbucks.com/MarriottBonvoy" className="text-green-800 underline ml-1" target="_blank" rel="noopener noreferrer">
                  Starbucks.com/MarriottBonvoy
                </a>.
              </p>
            </div>

            {/* Sol sütun */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold uppercase text-gray-900 text-sm mb-1">Earning Stars</h3>
                <p>Stars cannot be earned on purchases of alcohol, Starbucks Cards or Starbucks Card reloads.</p>
                <p>Earn 1 Star per $1 when you scan your member barcode in the app, then pay at store. Earn 2 Stars when paying with a digital Starbucks Card in the app.</p>
              </div>

              <div>
                <h3 className="font-semibold uppercase text-gray-900 text-sm mb-1">Benefits</h3>
                <p>Free refills during same in-store visit only. To qualify for the Birthday Reward, make at least one Star-earning transaction.</p>
              </div>
            </div>

            {/* Sağ sütun */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold uppercase text-gray-900 text-sm mb-1">Terms of Use</h3>
                <p>
                  Visit
                  <a href="https://starbucks.com/rewards/terms" className="text-green-800 underline ml-1" target="_blank" rel="noopener noreferrer">
                    starbucks.com/rewards/terms
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold uppercase text-gray-900 text-sm mb-1">Redeeming Rewards</h3>
                <p>Rewards cannot be redeemed for alcoholic beverages or multi-serve items. Some stores redeem 200 Stars for free items only.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div >
  )
}

export default RewardsPage