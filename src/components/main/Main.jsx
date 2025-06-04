import FeaturePage from './FeaturePage'
import summerImg from "../../assets/main-img/summer.webp";
import cofeImg from "../../assets/main-img/cofe.webp";
import hotCofeImg from "../../assets/main-img/hotcofe.jpg";
import tropicalCupIMg from "../../assets/main-img/tropicalCup.jpg";
import graduateImg from "../../assets/main-img/graduate.webp";



const Main = () => {
    return (
        <div className="space-y-10 pt-10">
            <FeaturePage
                image={summerImg}
                title="See You On the Patio"
                text="Soak up the season with Summer-Berry Refreshers and new Iced Horchata Oatmilk Shaken Espresso. Fresh picks and returning favorites are iced and ready."
                buttonText="View the Menu"
                bgColor="bg-[#32462f]"
                textColor="text-white"
                titleSize="text-6xl"
                hoverBg="hover:bg-[#2a3a28]"

            />

            <FeaturePage
                image={cofeImg}
                title="It starts with free"
                text="Enjoy a free handcrafted drink when you make a qualifying purchase during your first week as a Starbucks® Rewards member.*"
                buttonText="Join now"
                reverse={true}
                bgColor="bg-[#d1d1aa]"
                textColor="text-[#34462F]"
                hoverBg="hover:bg-[#bfc29e]"


            />

            <FeaturePage
                image={hotCofeImg}
                title="Free refills while you stay"
                text="When you stay to enjoy your handcrafted or brewed drink in the café, refills of hot and iced brewed coffee or tea are on us.**"
                buttonText="Learn more"
                bgColor="bg-[#006242]"
                textColor="text-white"
                hoverBg="hover:bg-[#00482F]"


            />
            <FeaturePage
                image={graduateImg}
                title="Give it up for the grads"
                text="Celebrate their big achievement by treating them with a Starbucks Card."
                buttonText="Send an eGift"
                reverse={true}
                bgColor="bg-[#32452f]"
                textColor="text-white"
                titleSize="text-6xl"
                hoverBg="hover:bg-[#2a3a28]"
            />

            <FeaturePage
                image={tropicalCupIMg}
                title="FARM Rio + Starbucks®"
                text="We’ve teamed up with Brazilian fashion brand FARM Rio for an exclusive merch collection inspired by the beauty and culture of Rio de Janeiro."
                buttonText="Learn more"
                bgColor="bg-[#32452f]"
                textColor="text-white"
                titleSize="text-6xl"
                hoverBg="hover:bg-[#2a3a28]"

            />

            <div className='px-[16px] md:max-w-[700px] mx-auto text-[14px] leading-[1.8] font-medium py-[32px] text-center' >
                <p>*Valid for new Starbucks Rewards members for 7 days from sign up. Coupon will be available in the offers tab of your Starbucks app following sign up and may take up to 48 hours to arrive. Good at participating U.S. stores for a handcrafted menu-sized beverage with qualifying purchase ($8 max value). Qualifying purchase excludes alcohol, Starbucks Card and Card reloads. Limit one. Cannot be combined with other offers or discounts. Excludes delivery services. Sign up before 6/29/2025.</p>
            </div>
            <div className='px-[16px] md:max-w-[700px] mx-auto text-[14px] leading-[1.8] font-medium py-[32px] text-center'>
                <p>**Free refills of hot and iced brewed coffee or tea during same store visit. Excludes Cold Brew, Nitro Cold Brew, Iced Tea Lemonade, and flavored Iced Tea and Starbucks Refreshers® base. At participating stores. Visit <a href="">starbucks.com/refills</a> to learn more.</p>
            </div>
        </div>
    )
}

export default Main