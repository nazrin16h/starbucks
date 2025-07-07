import boble from "../../assets/menu-img/boble.jpg";
import creamcofe from "../../assets/menu-img/creamcofe.webp";
import icedcofe from "../../assets/menu-img/icedcofe.jpg";
import sandwich from "../../assets/menu-img/sandwich.jpg";


const FeaturePage = () => {
    return (
        <div>
            <div className="max-w-full py-10 ">

                <h1 className="text-center text-2xl font-bold mb-10 text-[#1e3932] text-[29px] lg:text-[45px]">See you on the patio</h1>

                <div className="flex flex-col md:flex-row mb-6">
                    <div className="md:w-1/2">
                        <img src={boble} alt="Summer-Berry" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 flex items-center text-center justify-center bg-[#32462f] p-6 text-white">
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-center lg:text-[50px] text-[35px] lg:w-[500px] mx-auto">Summer–Berry is back</h2>
                            <p className="text-sm mb-4 text-center my-4 text-[19px] font-medium  lg:text-[30px] lg:w-[550px]">
                                A favorite returns with berry flavors shaken with ice and coconutmilk or lemonade,
                                then poured over bursting raspberry flavored pearls.
                            </p>
                            <button className="border rounded-full border-white text-white px-4 py-2 text-s hover:bg-white hover:text-black transition  duration-300">
                                Order now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse mb-6">
                    <div className="md:w-1/2">
                        <img src={creamcofe} alt="Horchata Espresso" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 flex items-center text-center justify-center bg-[#d1d1aa] p-6 text-black">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-center lg:text-[50px] text-[35px] lg:w-[400px] mx-auto text-[#1e3932]">New Iced Horchata Oatmilk Shaken Espresso</h2>
                            <p className="text-sm mb-4 text-center my-4 text-[19px] font-medium  lg:text-[30px] lg:w-[550px] text-[#1e3932]">
                                Boldly refreshing with Starbucks® Blonde Espresso, cinnamon, vanilla and
                                rice-flavored horchata syrup, and a splash of creamy oatmilk.
                            </p>
                            <button className="border font-bold  rounded-full border-black text-[#1e3932] px-4 py-2 text-s hover:bg-[#1e3932] hover:text-white transition duration-300">
                                Order now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row mb-6">
                    <div className="md:w-1/2">
                        <img src={icedcofe} alt="Summer-Berry" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 flex items-center text-center justify-center bg-[#32462f] p-6 text-white">
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-center lg:text-[50px] text-[35px] lg:w-[500px]  mx-auto">Salted Caramel Cream Cold Brew and Vanilla Sweet Cream Cold Brew</h2>
                            <p className="text-sm mb-4 text-center my-4 text-[19px] font-medium  lg:text-[30px] lg:w-[550px]">
                                Our signature cold brew with vanilla syrup and topped with either Salted Caramel Cream Cold Foam or Vanilla Sweet Cream.
                            </p>
                            <button className="border  rounded-full border-white text-white px-4 py-2 text-s hover:bg-white hover:text-black transition  duration-300">
                                Order now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse mb-6">
                    <div className="md:w-1/2">
                        <img src={sandwich} alt="Horchata Espresso" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 flex items-center text-center justify-center bg-[#d1d1aa] p-6 text-black">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-center lg:text-[50px] text-[35px] lg:w-[450px]  mx-auto text-[#1e3932]">Egg, Pesto & Mozzarella Sandwich</h2>
                            <p className="text-sm mb-4 text-center my-4 text-[19px] font-medium lg:text-[30px] lg:w-[550px] text-[#1e3932]">
                                Protein-packed with a fluffy, cage-free egg frittata, kale-basil pesto and mozzarella on a toasted Cheddar and onion bun.
                            </p>
                            <button className="border  rounded-full border-black font-bold text-[#1e3932] px-4 py-2 text-s hover:bg-[#1e3932] hover:text-white transition  duration-300">
                                Order now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeaturePage;
