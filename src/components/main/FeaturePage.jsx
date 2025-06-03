const FeaturePage = ({ image, title, text, buttonText, reverse, bgColor, textColor,hoverBg }) => {
    return (
        <div className={`flex flex-col md:flex-row  ${reverse ? 'md:flex-row-reverse' : ''} items-center ${bgColor} , ${textColor}`}>
            <div className="w-full md:w-1/2 ">
                <img src={image} alt={title} className="w-full object-cover max-w-[100%]" />
            </div>
            <div className="w-full md:w-1/2  m-auto items-center p-6 text-center justify-center ">
                <h2 className={` text-4xl font-medium lg:w-[600px] break-words whitespace-normal  mb-5`}>{title}</h2>
                <p className="mb-4 text-wrap m-auto lg:w-[450px] break-words whitespace-normal lg:text-2xl font-medium">{text}</p>
                {buttonText && (
                    <button className={` bg-transparent ${textColor} px-4 py-1 rounded-full font-semibold border-2 mt-4 ${hoverBg} transition duration-300 `}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FeaturePage;
